var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var exec = require('child_process').exec;

//models
var adminmodel = require('../models/adminmodel');
var cbsmodel = require('../models/cbsmodel');
var apimodel = require('../models/apimodel');
var usermodel = require('../models/usermodel');
var selectedapimodel = require('../models/selectedapimodel'); 
  
var routes = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: true});
routes.use(bodyParser.json());

var sess;

//YOU SHOULD USE 'urlencodedParser' TO GET THE POST DATA
routes.route('/sendmail')
.post(urlencodedParser,(req,res)=>{

    var sess = req.session;
    var pass = req.body.pass;
    var hashpwd = passwordHash.generate(pass);
    //if(passwordHash.verify(pass,hashpwd))

    //generate a code.
    var date = new Date();
    var timestamp = date.getTime();

    //make an entry in the database in a collection called users.
    //use the schema of the collection.
    var newuser = new adminmodel({
        username: req.body.username,
        ts : timestamp,
        email : req.body.email,
        confirmation : false,
        cbs : "default",
        version : "default",
        intopt : "default",
        api_list: null,
        sip : "default",
        cred : "default",
        fname : req.body.fname,
        lname : req.body.lname,
        integrated : false,
        pass : hashpwd,
        standard: "default",
        bcintegrated : false,
        environment : "default",
        bank : sess.bank
    });
    newuser.save((err)=>{
        if(err)
        console.log("error while inserting user " + err);
    });


    sess = req.session;
    sess.email = req.body.email;

    var sub = "Email confirmation for Bank Connect";
    sendmail(req.body.email,timestamp,sub,req.body.username);
    var msg = "Email sent.. Please check your email to continue the process'+ `<br>` + 'you can close this window";
    res.json(msg);
});

routes.route('/loginconfirm')
.post(urlencodedParser,(req,res)=>{
    var sess = req.session;
    adminmodel.find({email: req.body.email},(err,doc)=>{
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

    adminmodel.find({ts : req.params.ts},(err,doc)=>{
        if(req.params.ts == doc[0].ts){
            adminmodel.findOneAndUpdate({ts : req.params.ts},{$set : {confirmation : true}},{new : true},(err,doc)=>{
            });
            res.redirect('/dashboard'); //dashboard
         }
        else{
            adminmodel.findByIdAndRemove({ts : req.params.ts});
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
    var standard = req.body.standard;
    var sip = req.body.sip;
    var cred = req.body.cred;

    var sess = req.session;
    console.log("standard at routes.js "+standard);
    // use $set to update a single field
    adminmodel.findOneAndUpdate({ email : sess.email }, {cbs : cbs, version : version, standard: standard, intopt : intopt, sip: sip, cred:cred},{new : true},(err,doc)=>{
            if(err) console.log(err);
        });

    res.json("updated details");
});

routes.route('/api')
.get((req,res)=>{

    var sess = req.session;
    global.apis=[];

    //get the apis based on the users cbs and version.
    adminmodel.find({email : sess.email },(err,doc)=>{
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

    api = req.body.apis;
    value = req.body.value;
    env = req.body.env;
    console.log("api selected: "+api+" "+value+" "+env);
    var sess = req.session;

    //let api list be in the adminmodel as well.
    adminmodel.findOneAndUpdate({email : sess.email},{api_list : api, environment : env, integrated: true },(err,doc)=>{
        if(err) console.log(err);
    });

    for(var i=0;i<api.length;++i){
        var newapi = new selectedapimodel({
            name : api[i],
            value : value[i],
            security : "oauth2", //by default oauth2 is provided.
            email : sess.email,
            published : false
        });

        newapi.save();
    }

    // ========================= DEPLOYING IN API MANAGER =========================
    adminmodel.find({email:sess.email},(err,doc)=>{
        var cbs = doc[0].cbs;
        var env = req.body.env;

        //run  a shell command before sending the response

        var prod_path = 'cd '+ __dirname +'\\api_files\\'+cbs+'\\product';
        var stub_path = 'cd '+ __dirname +'\\api_files\\'+cbs+'\\stub';

        //console.log(prod_path+" "+stub_path);
        for(var i=0;i<value.length;++i){
            console.log("api to be published ->"+value[i]);
            var prod_file_name = value[i]+'-product_1.0.0.yaml';
            var stub_file_name = value[i]+'-stub_1.0.0.yaml';

            //for product
            exec(`${prod_path} && apic products publish ${prod_file_name} --org think --catalog ${env} --server platform.9.202.177.31.xip.io`,
            (err,stdout)=>{
                if (err) console.log("error in product publishing "+err);
                console.log("product publish output: "+stdout);
            });
        }
    })
      
    res.json("Services published successfully");
});

routes.route('/api/selected')
.get((req,res)=>{

    var sess = req.session;
    global.apis=[];

    //get the apis based on the users cbs and version.
    adminmodel.find({email : sess.email },(err,doc)=>{
        //only 1 document will be returned.
        //directly get the api_list
        var selected_api = doc[0].api_list;

        res.json(selected_api);
    });
});

routes.route('/api/unselected')
.get((req,res)=>{
    var sess = req.session;

    //get the apis based on the users cbs and version.
    adminmodel.find({email : sess.email },(err,doc)=>{
        //only 1 document will be returned.
        var cbs = doc[0].cbs;
        var ver = doc[0].version;

        apimodel.find({cbs : cbs},(err,doc)=>{
            if(err) console.log(err);
            var apis = [];
            var len = doc.length; var i=0;

            for(i=0;i<len;++i){
                apis.push(doc[i].name);
            }

            //get the selected apis
            adminmodel.find({email : sess.email },(err,doc)=>{
                var selected_api = doc[0].api_list;

                var unselected = [];
                for(i=0;i<apis.length;++i){
                    if(selected_api.indexOf(apis[i]) == -1)
                        unselected.push(apis[i]);
                }
                console.log("unselected apis: "+unselected);
                res.json(unselected);
            });
        });
    });

})

routes.route('/confirmed')
.get((req,res)=>{
    var sess = req.session;

    adminmodel.find({email:sess.email},(err,doc)=>{
        if(doc[0].confirmation && !doc[0].integrated && !doc[0].bcintegrated){
          res.json(1);
        }else{ res.json(0);}
    })

})

routes.route('/integrated')
.get((req,res)=>{
    var sess = req.session;

    adminmodel.find({email:sess.email},(err,doc)=>{
        if(doc[0].integrated && doc[0].confirmation && !doc[0].bcintegrated){
            res.json(1);
        }else {res.json(0);}
    })
})

routes.route('/bcintegrated')
.get((req,res)=>{
    var sess = req.session;

    adminmodel.find({email:sess.email},(err,doc)=>{
        if(doc[0].integrated && doc[0].confirmation && doc[0].bcintegrated)
            res.json(1);
        else res.json(0);
    })
})

.post(urlencodedParser,(req,res)=>{
    var sess = req.session;
    
  adminmodel.findOneAndUpdate({email : sess.email},{bcintegrated: true },(err,doc)=>{
      if(err) console.log(err);
  });

  res.json("Bank Connect integration successful");
});

routes.route('/checklogin')
.get((req,res)=>{
    var sess = req.session;

    if(sess.email){
      adminmodel.find({email: sess.email},(err,doc)=>{
        res.json(doc[0].username)
      });
    }else {res.json(0); }
})

routes.route('/profile')
.get((req,res)=>{
    var sess = req.session;

    adminmodel.find({email: sess.email},(err,doc)=>{
      var myObj = {
        username: doc[0].username,
        fname: doc[0].fname,
        lname: doc[0].lname,
        useremail: doc[0].email
      }
      res.json(myObj)
    })
});

routes.route('/checkshell')
.get((req,res)=>{
    exec(`cd C:/Users/TusharMALCHAPURE/Desktop/api_connect && apic products publish dummy-product_1.0.0.yaml --org think --catalog sandbox --server platform.9.202.177.31.xip.io
    `,(err,stdout)=>{
        console.log("this executed");
        if(err) throw err;

        console.log(stdout);
    });
})

routes.route('/role')
.post((req,res)=>{

    var sess = req.session;
    //set the role here
    var newuser = new usermodel({
        role : req.body.role,
        username : "default",
        fname : "default",
        lname : "default",
        email : req.body.email
    });
    newuser.save();

    //send a mail
    var sub = `${sess.email} has invited you to accept the role of ${req.body.role}. Please click on the link to accept the invitation`.
    sendemail(req.body.email,ts,sess.email,sub);

    res.json("Mail has been sent.");
})

routes.route('/password')
.post((req,res)=>{

    var sess = req.session;

    //check if the passwords are correct
    adminmodel.find({email : sess.email},(err,doc)=>{
        if(passwordHash.verify(req.body.old,doc[0].pass)){
            //check if the two passwords match
            if(req.body.new == req.body.renew){
                var hashpwd = passwordHash.generate(pass);
                adminmodel.findOneAndUpdate({email :  sess.email},{$set:{pass : hashpwd }},(err,doc)=>{
                    if(err) console.log(err);
                    res.json(1);
                });
            }else res.json(-1);
        }else res.json(0);
    });
})

routes.route('/registry')
.post((req,res)=>{
    var sess = req.session;
    res.json("updated registry.. not really xD");
})

routes.route('/getapiDetails/:name')
.get((req,res)=>{
    apimodel.find({name:req.params.name},(err,doc)=>{
        var keys = []; var uses = [];

        var myObj ={
            name : req.params.name,
            desc : doc[0].desc,
            key_features : doc[0].key_features,
            use_cases : doc[0].use_cases
        }
        //console.log("final object is :"+myObj.use);
        res.json(myObj);
    })
})

routes.route('/getEmail')
.get((req,res)=>{
    var sess = req.session;

    res.json(sess.email);
})

routes.route('/getBank')
.get((req,res)=>{
    var sess = req.session;
    console.log("getting bank "+sess.bank);
    res.json(sess.bank);
})

routes.route('/updateSecurity')
.post((req,res)=>{
    //get the apis from seletedapimodel

    var sess = req.session;
    selectedapimodel.find({email: sess.email},(err,doc)=>{
        var apis = [];
        for(i=0;i<doc.length;++i)
            apis.push(doc[i].name);

        for(i=0;i<apis.length;++i){
            var newsecurity = req.body.sec.apis[i].security;
            selectedapimodel.findOneAndUpdate({email:sess.email, name:apis[i]},{security: newsecurity},{new:true},(err,doc)=>{
            })    
        }        
    });

    res.send("security updated!");
})

routes.route('/setBank')
.post((req,res)=>{
    var bank = req.body.bank;
    var sess = req.session;
    sess.bank = bank;

    res.json("bank successfully set");
})

routes.route('/logout')
.get((req,res)=>{
    var sess = req.session;
    sess.admin  = 0;
    sess.email = "null";

    res.send("logged out!");
})
//==============================END OF ROUTING =======================================

function sendmail(email,ts,sub,uname){
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
            subject: `${sub}`,
            text: 'That was easy!',
            html : `
            <html>
            <head>
                <style>
                    .maindiv{
                        box-shadow: 5px 5px 10px grey;
                        margin-left: 35%;
                        border: solid 2px grey;
                        width: 550px;
                        margin-top: 20px;
                        padding-left: 35px;
                        padding-bottom: 20px;
                        border-radius: 20px;
                        padding-top: 10px;
                    }
                    h2{
                        margin-left: 44%;
                        color:rgb(91, 91, 204);
                    }
        
                    a{
                        text-decoration: none;
                        color:rgb(83, 134, 6)
                    }
                </style>
            </head>
            <body>  
                <div class="maindiv">
                    <h2> IDBP </h2>
                    <p> Hi ${uname}. This is in response to your request to create an account in IDBP</p> <br>
                    <p> Click on <a href="${link}"><b>ACCEPT</b></a> to create your IDBP account! </p>    
                </div> 
            </body>
        </html> `
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
