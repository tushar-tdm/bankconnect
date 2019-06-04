var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var exec = require('child_process').exec;


var adminmodel = require('../models/adminmodel');
var cbsmodel = require('../models/cbsmodel');
var apimodel = require('../models/apimodel');
var usermodel = require('../models/usermodel');

var routes = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: true});
routes.use(bodyParser.json());

var sess;

routes.route('/getDetails/:apiname')
.get((req,res)=>{
    var api_name = req.params.apiname;
    apimodel.find({name:api_name},(err,doc)=>{
        var myObj ={
            name : api_name,
            desc : doc[0].desc,
            key : doc[0].key_features,
            use : doc[0].usecases
        }
        res.json(myObj);
    })
})