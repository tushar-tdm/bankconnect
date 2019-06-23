var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var exec = require('child_process').exec;
var multer = require('multer');
var path = require('path');
var multipart  = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:path.join(__dirname,'uploads')});
var handlebars = require('handlebars');
var fs = require('fs');

// to read html file
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};
//models
var adminmodel = require('../models/adminmodel');
var cbsmodel = require('../models/cbsmodel');
var apimodel = require('../models/apimodel');
var usermodel = require('../models/usermodel');
var selectedapimodel = require('../models/selectedapimodel');
var request = require('../models/requestmodel');
var partner = require('../models/partnermodel');
var file = require('../models/filemodel');

var routes = express.Router();

var urlencodedParser = bodyParser.urlencoded({limit:'50mb',extended: true});
routes.use(bodyParser.json({limit : '50mb', extended:true}));

// bodyParser = {
//     json:{limit:'50mb',extended:true},
//     urlencoded : {limit:'50mb',extended: true}
// };
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

    var newuser = new usermodel({
        username: req.body.username,
        email : req.body.email,
        pass: hashpwd,
        fname : req.body.fname,
        lname : req.body.lname,
        role : "admin"
    });
    newuser.save();

    sess = req.session;
    sess.email = req.body.email;
    console.log(sess.email);
    sess.admin = 1;
    sess.role = "admin";

    var sub = "Email confirmation for IDBP";
    sendmail(req.body.email,timestamp,sub,req.body.username);
    var msg = "Email sent.. Please confirm your email to continue the process'+ `<br>` + 'you can close this window";
    res.json(msg);
});

// =================Partner Payment rules details================================

routes.route('/paymentrulesdetails')
.get((req,res)=>{
  partner.find({},(err,doc)=>{
      var part = [];
      for(i=0;i<doc.length;++i){
          part.push(doc[i]);
      }
      res.json(part);
  })

})

.post(urlencodedParser,(req,res)=>{

    var sess = req.session;

    //generate a code.
    var date = new Date();
    var timestamp = date.getTime();

    console.log('partner email is'+req.body.email);
    console.log('org name is '+req.body.org);
    console.log('amount '+req.body.amnt);

    partner.findOneAndUpdate({email:req.body.email},{amnt:req.body.amnt, freq:req.body.freq, accno:req.body.accno, mid:req.body.mid, appid:req.body.appid, cid:req.body.cid },{new:true},(err,doc)=>{
      console.log(err);
    });


    //send mail to partner below here, with the payment rules
    var sub = "Payment Rules from bank";
    sendmail(req.body.email,timestamp,sub,req.body.username);
    var msg = "Payment rules for partner is set successfully";
    res.json(msg);
});

// ===================Its over here=====================================

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
                sess.role = doc[0].role;
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

routes.route('/confirmRole/:id')
.get((req,res)=>{
    var sess = req.session;
    usermodel.find({email : req.params.id},(err,doc)=>{
        //to get the extra details
        sess.role = doc[0].role;
        sess.email = req.params.id;
        console.log(sess.email +" will create an account now");
        res.redirect('/roleSignup');
    });
});

routes.route('/role')
.post(urlencodedParser,(req,res)=>{
    console.log("role route enetered");
    var sess = req.session;
    console.log("email of the user is :"+sess.email);
    var hashpwd = passwordHash.generate(req.body.pass);
    usermodel.findOneAndUpdate({email:sess.email},{username: req.body.username,fname: req.body.fname, lname: req.body.lname, pass : hashpwd},{new:true},(err,doc)=>{
        //we updated the user.
    });
    res.json("updated successfully");
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

    console.log("email at 246: "+sess.email);
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
    console.log("email at 260: "+sess.email);
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

    //send the apis only if he is an admin
    console.log("338: "+sess.email);
    usermodel.find({email:sess.email},(err,doc)=>{
        if(doc[0].role == "admin"){
            //get the apis based on the users cbs and version.
            adminmodel.find({email : sess.email },(err,doc)=>{
                //only 1 document will be returned.
                //directly get the api_list
                var selected_api = doc[0].api_list;
                res.json(selected_api);
            });
        }else{
            //send an empty list of apis
            res.json(global.apis);
        }
    })
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
    usermodel.find({email: sess.email},(err,doc)=>{
        if(doc[0].role == "admin"){
            adminmodel.find({email:sess.email},(err,doc)=>{
                if(doc[0].confirmation && !doc[0].integrated && !doc[0].bcintegrated){
                  res.json(1);
                }else{ res.json(0);}
            })
        }else{
            res.json(0);
        }
    });
})

routes.route('/integrated')
.get((req,res)=>{
    var sess = req.session;

    usermodel.find({email: sess.email},(err,doc)=>{
        if(doc[0].role == "admin"){
            adminmodel.find({email:sess.email},(err,doc)=>{
                if(doc[0].integrated && doc[0].confirmation && !doc[0].bcintegrated){
                    res.json(1);
                }else {res.json(0);}
            })
        }else{
            res.json(0);
        }
    });
})

routes.route('/bcintegrated')
.get((req,res)=>{
    var sess = req.session;

    usermodel.find({email: sess.email},(err,doc)=>{
        if(doc[0].role == "admin"){
            adminmodel.find({email:sess.email},(err,doc)=>{
                if(doc[0].integrated && doc[0].confirmation && doc[0].bcintegrated)
                    res.json(1);
                else res.json(0);
            })
        }else{
            res.json(0);
        }
    });

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

    //change the adminmodel to usermodel.
    if(sess.email){
      usermodel.find({email: sess.email},(err,doc)=>{
        res.json(doc[0].username)
      });
    }else {res.json(0); }
})

routes.route('/profile')
.get((req,res)=>{
    var sess = req.session;

    //check what kind of user he is..

    console.log('session email Bank A '+ sess.email)

    usermodel.find({email: sess.email},(err,doc)=>{
      var myObj = {
        username: doc[0].username,
        fname: doc[0].fname,
        lname: doc[0].lname,
        useremail: doc[0].email
      }
      res.json(myObj);
    })
});

routes.route('/sendRoleMail')
.post((req,res)=>{
    console.log("entered send role mail route");
    console.log(req.body.role+" "+req.body.email);

    var sess = req.session;
    //so check if req.body.email already exists.
    usermodel.find({email:req.body.email},(err,doc)=>{
        if(doc.length > 0){
            console.log("existing user");
            usermodel.findOneAndUpdate({email: req.body.email},{role: req.body.role},{new : true},(err,doc)=>{});
        }else{
            console.log("new user");
            var newuser = new usermodel({
                role : req.body.role,
                username : "default",
                fname : "default",
                lname : "default",
                email : req.body.email,
                bank : sess.bank,
                pass : "default"
            });
            newuser.save();
        }
    })

    usermodel.find({email: sess.email},(err,doc)=>{
        var uname = doc[0].username;
        var sub = `Invitation to Accept the role of ${req.body.role}`;
        var msg = `${uname} has invited you to accept the role of ${req.body.role}. Please click on the link to accept the invitation`;
        sendRoleMail(req.body.email,sub,msg);
    })
    res.json("Mail has been sent.");
})

routes.route('/password')
.post((req,res)=>{

    var sess = req.session;

    //check if the passwords are correct
    usermodel.find({email : sess.email},(err,doc)=>{
        if(passwordHash.verify(req.body.old,doc[0].pass)){
            //check if the two passwords match
            if(req.body.new == req.body.renew){
                var hashpwd = passwordHash.generate(pass);
                usermodel.findOneAndUpdate({email :  sess.email},{$set:{pass : hashpwd }},(err,doc)=>{
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

    res.json(sess.bank);
})

routes.route('/getUserType')
.get((req,res)=>{
    var sess = req.session;
    console.log("sess.email: "+sess.email);
    usermodel.find({email: sess.email},(err,doc)=>{
        res.json(doc[0].role);
    })
})

routes.route('/pendingReq')
.get((req,res)=>{
    request.find({},(err,doc)=>{
        var req = [];
        for(i=0;i<doc.length;++i){
            req.push(doc[i]);
        }
        res.json(req);
    })
})
.post(urlencodedParser,(req,res)=>{
    var id = req.body.id;
    var state = req.body.state;
    var name = req.body.name;
    var partneremail = req.body.email;
    var sess =req.session;

    if(state){
        //send mail saying that the req has been granted. and add him to partners
        request.find({org: name},(err,doc)=>{
          if(doc[0]){
            console.log('partner email is '+ partneremail);

            // ===============This is for saikumar==============
            // var newpartner = new partner({
            //   name : name,
            //   email : partneremail
            // });
            // newpartner.save();
            // ==============It ends here=======================

            //send link,sub,msg,email,
            var sub = "IDBP Partner Portal"
            var msg = `<p> Hello partner! your request to register an interest for API's has been <b>ACCEPTED</b> by ${sess.bank}. Please click on the link below to continue with us.</p>`;
            var link = `http://localhost:9000/route/setDocs/${partneremail}/${name}/${sess.bank}`;
            var pemail = partneremail;
            sendRequestMailAccept(pemail,sub,msg,link);
            request.findOneAndDelete({org: name}, (err, doc)=> console.log(err));

            }else{console.log('not deleted')}
          });
    }else{
        request.find({org: name},(err,doc)=>{
            var sub = "IDBP Partner Portal"
            var msg = `Hello partner! We are sorry to inform you that your request to register an interest for API's has been <b>DECLINED</b> by ${sess.bank}`;
            var link = "";
            var pemail = partneremail;
            sendRequestMailDecline(pemail,sub,msg);
            request.findOneAndDelete({org: name}, (err, doc)=> console.log(err));
        });
    }
    //removing the request

})

routes.route('/setPartner')
.post(urlencodedParser,(req,res)=>{
    if(req.body.status){
        var newpatrtner = new partner({
            email : req.body.email,
            name : req.body.org,
            amnt : null,
            freq : null,
            accno: null,
            mid : "default",
            appid : "default",
            cid : "default"
        });

        newpatrtner.save();
    }
})

routes.route('/sendInterest')
.post(urlencodedParser,(req,res)=>{
    console.log("request recived:"+req.body.org+req.body.email);
    var newreq = new request({
        org : req.body.org,
        email : req.body.email
    });
    newreq.save();

    res.json("interest added");
})

var store = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./uploads');
    },
    filename:function(req,res,cb){
        cb(null,Date.now()+'.'+file.originalname)
    }
});

var upload = multer({storage:store}).single('file');
routes.route('/partnerfile')
.get((req,res)=>{
    res.redirect('/reginterest');
})

.post(upload,(req,res)=>{
    //get all the details.
    //now req.body.files has all the files in b64 format.
    console.log("recieved the files: "+req);
    res.json("reply from server");
});

routes.route('/setDocs/:email/:org/:bank')
.post(urlencodedParser,(req,res)=>{
    var fs = require('fs');
    var user = req.body.user;
    console.log("user is :"+user);

    file.find({user: user},(err,doc)=>{
        var file = doc[0].file;
        console.log("document of :"+doc[0].user);
        //put this in the image.
        var fpath = path.join(__dirname,'..','..','src','assets','demo.jpg');
        console.log("the path is :"+fpath);

        fs.writeFile(fpath,new Buffer(doc[0].file,"base64"),(err)=>{});
    });
})

//==============================END OF ROUTING =======================================

function sendmail(email,ts,sub,uname){
    var link = `http://idbpportal.bank.com:3000/route/confirm/${ts}/${email}`;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : 'ibm.idbp@gmail.com',
            pass : 'Modified@2017'
        }
        });

        readHTMLFile(path.join(__dirname, '../views/idbp-email-confirmation.html'), function(err, html) {
          var template = handlebars.compile(html);
          var replacements = {
               username: `${uname}`,
               link: `${link}`
          }
          var htmlToSend = template(replacements);
          var mailOptions = {
            from: 'ibm.idbp@gmail.com',
            to: `${email}`,
            subject: `${sub}`,
            text: 'That was easy!',
            html : htmlToSend
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
        });
}

function sendRoleMail(email,sub,msg){
    console.log("function send role mail called. the parameters passed are..");
    console.log(email+" "+sub+" "+msg);
    var link = `http://idbpportal.bank.com:3000/route/confirmRole/${email}`;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: process.env.GMAIL_USER,
            // pass: process.env.GMAIL_PASS
            user : 'ibm.idbp@gmail.com',
            pass : 'Modified@2017'
        }
        });

        var mailOptions = {
            from: 'ibm.idbp@gmail.com',
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
                    <p> ${msg}  </p> <br>
                    <p> Click on <a href="${link}"><b>ACCEPT</b></a> to accept the role! </p>
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

function sendRequestMailAccept(email,sub,msg,link){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: process.env.GMAIL_USER,
            // pass: process.env.GMAIL_PASS
            user : 'ibm.idbp@gmail.com',
            pass : 'Modified@2017'
        }
        });

        var mailOptions = {
            from: 'ibm.idbp@gmail.com',
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
                    ${msg}
                    <p> Click on <a href="${link}"><b>ACCEPT</b></a> to continue with us! </p>
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

function sendRequestMailDecline(email,sub,msg){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: process.env.GMAIL_USER,
            // pass: process.env.GMAIL_PASS
            user : 'ibm.idbp@gmail.com',
            pass : 'Modified@2017'
        }
        });

        var mailOptions = {
            from: 'ibm.idbp@gmail.com',
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
                    ${msg}
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
