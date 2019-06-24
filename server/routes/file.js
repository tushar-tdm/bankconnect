var express = require('express');
var path = require('path');
var multer = require('multer');
var busboy = require('connect-busboy');
var Busboy = require('busboy');
var bodyParser = require('body-parser');

var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,path.join(__dirname,'uploads'))
	},
	filename: function(req,file,cb){
		cb(null,Date.now() + file.originalname);
 
	}
});

var upload = multer({storage:storage})

var files = express.Router();

files.route('/fileupload')
.post(upload.any(),(req,res)=>{
    console.log("came here");
    console.log(req.files);
});

module.exports = files;