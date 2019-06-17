var express = require('express');
var exec = require('child_process').exec;
var path = require('path');
var multer = require('multer');
var busboy = require('connect-busboy');
var Busboy = require('busboy');

//models
var adminmodel = require('../models/adminmodel');
var cbsmodel = require('../models/cbsmodel');
var apimodel = require('../models/apimodel');
var usermodel = require('../models/usermodel');
var selectedapimodel = require('../models/selectedapimodel');
var request = require('../models/requestmodel');
var partner = require('../models/partnermodel');

var files = express.Router();

files.use(busboy());

files.route('/fileupload')
.post((req,res)=>{
    console.log("came here");

    var busboy = new Busboy({ headers: req.headers});
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join('.', filename);
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    //return req.pipe(busboy);
    return busboy.end(req.rawBody);
});

module.exports = files;