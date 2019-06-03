var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');

var usermodel = require('../models/usermodel');
var cbsmodel = require('../models/cbsmodel');
var apimodel = require('../models/apimodel');

var routes = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: true});
routes.use(bodyParser.json());

var sess;

//YOU SHOULD USE 'urlencodedParser' TO GET THE POST DATA
routes.route('/sendmail')
.post(urlencodedParser,(req,res)=>{

    var pass = req.body.pass;
    var hashpwd = passwordHash.generate(pass);
    //if(passwordHash.verify(pass,hashpwd))

    //generate a code.
    var date = new Date();
    var timestamp = date.getTime();

    //make an entry in the database in a collection called users.
    //use the schema of the collection.
    var newuser = new usermodel({
        username: req.body.username,
        fname : req.body.fname,
        lname : req.body.lname,
        ts : timestamp,
        email : req.body.email,
        confirmation : false,
        version : "default",
        api_list: null,
        intopt : "default",
        cbs : "default",
        sip : "default",
        cred : "default",
        integrated : false,
        pass : hashpwd,
        standard: "default"
    });
    newuser.save((err)=>{
        if(err)
        console.log("error while inserting user " + err);
    });


    sess = req.session;
    sess.email = req.body.email;
    sess.ts = timestamp;

    sendmail(req.body.email,timestamp);
    var msg = "Email sent.. Please check your email to continue the process'+ `<br>` + 'you can close this window";
    res.json(msg);
});

routes.route('/loginconfirm')
.post(urlencodedParser,(req,res)=>{
    var sess = req.session;
    usermodel.find({email: req.body.email},(err,doc)=>{
        if(doc.length == 0){
            var msg = "Invalid email";
            var obj = {
                status: 0,
                msg : "entered invalid email"
            }
            res.json(obj);
        }
        else{
            //check for password.
            if(passwordHash.verify(req.body.pass,doc[0].pass)){
                //login successful
                sess.email = req.body.email;
                var obj = {
                    status: 1,
                    msg : "Login Successful"
                }
                res.json(obj);
            }else{
                console.log("entered wrong pass");
                var obj = {
                    status: 0,
                    msg : "Wrong Password.Please try again"
                }
                res.json(obj);
            }
        }
    })
});

routes.route('/confirm/:ts/:id')
.get((req,res)=>{

    usermodel.find({ts : req.params.ts},(err,doc)=>{
        if(req.params.ts == doc[0].ts){
            usermodel.findOneAndUpdate({ts : req.params.ts},{$set : {confirmation : true}},{new : true},(err,doc)=>{
            });
            res.redirect('/dashboard'); //dashboard
         }
        else{
            usermodel.findByIdAndRemove({ts : req.params.ts});
            res.json('confirmation failed');
        }
     }).limit(1).sort({ ts : -1});
});

routes.route('/corebankservices/register')
.get((req,res)=>{
    var sess = req.session;
//retrieve the versions, integration option based on the cbs.

    cbsmodel.find({},(err,doc)=>{
        var obj = {
            fin : [],
            tcs : [],
            flex : []
        }
        for(i=0; i< doc.length;++i){
            if(doc[i].name == "Finnacle"){
                obj.fin = doc[i].versions;
            }else if(doc[i].name == "TCS Bancs"){
                obj.tcs = doc[i].versions;
            }else if(doc[i].name == "Flexcube"){
                obj.flex = doc[i].versions;
            }
        }
        res.json(obj);
    })
})

//to show the connecting with finnacle message and browse api's option.
.post(urlencodedParser,(req,res)=>{

    var cbs = req.body.cbs;
    var version = req.body.version;
    var intopt = req.body.intopt;
    var sip = req.body.sip;
    var cred = req.body.cred;

    var sess = req.session;

    // use $set to update a single field
    usermodel.findOneAndUpdate({ email : sess.email }, {cbs : cbs, version : version, intopt : intopt, sip: sip, cred:cred},{new : true},(err,doc)=>{
            if(err) console.log(err);
        });

    res.json("updated details");
});

routes.route('/api')
.get((req,res)=>{

    var sess = req.session;
    global.apis=[];

    //get the apis based on the users cbs and version.
    usermodel.find({email : sess.email },(err,doc)=>{
        //only 1 document will be returned.
        var cbs = doc[0].cbs;
        var ver = doc[0].version;

        apimodel.find({cbs : cbs},(err,doc)=>{
            if(err) console.log(err);

            var len = doc.length; var i=0;

            for(i=0;i<len;++i){
                global.apis.push(doc[i].name);
            }

            res.json(global.apis);
        });
    });

})

.post(urlencodedParser,(req,res)=>{
    //add the chosen apis in the user models.
    var apis = req.body.apis;
    var sess = req.session;
    var standard = req.body.standard;

    console.log(standard);
    usermodel.findOneAndUpdate({email : sess.email},{api_list : apis, integrated: true, standard: standard },(err,doc)=>{
        if(err) console.log(err);
    });

    res.json("Services published successfully");
});

routes.route('/api/selected')
.get((req,res)=>{

    var sess = req.session;
    global.apis=[];

    //get the apis based on the users cbs and version.
    usermodel.find({email : sess.email },(err,doc)=>{
        //only 1 document will be returned.
        //directly get the api_list
        var selected_api = doc[0].api_list;

        res.json(selected_api);
    });
});

routes.route('/confirmed')
.get((req,res)=>{
    var sess = req.session;

    if(sess.email){
        usermodel.find({email: sess.email},(err,doc)=>{
            if(!doc[0].integrated && doc[0].confirmation){
                res.json(1);
            }
            else res.json(0);
        });
    }else
        res.json(1);

})

routes.route('/integrated')
.get((req,res)=>{
    var sess = req.session;

    usermodel.find({email:sess.email},(err,doc)=>{
        if(doc[0].integrated)
            res.json(1);
        else res.json(0);
    })
})

routes.route('/profile')
.get((req,res)=>{
    var sess = req.session;

    usermodel.find({email: sess.email},(err,doc)=>{
      var myObj = {
        username: doc[0].username,
        fname: doc[0].fname,
        lname: doc[0].lname,
        admin: doc[0].admin,
        useremail: doc[0].email
      }
      res.json(myObj)
    })
});
//==============================END OF ROUTING =======================================

function sendmail(email,ts){
    var link = `http://localhost:3000/route/confirm/${ts}/${email}`;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: process.env.GMAIL_USER,
            // pass: process.env.GMAIL_PASS
            user : 'tushartdm117@gmail.com',
            pass : 'fcb@rc@M$N321'
        }
        });

        var mailOptions = {
            from: 'tushartdm117@gmail.com',
            to: `${email}`,
            subject: 'Email confirmation for Bank Connect',
            text: 'That was easy!',
            html : `${link}`
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
}

module.exports = routes;
