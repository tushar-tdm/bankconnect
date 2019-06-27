var express = require('express');
var path = require('path');
var multer = require('multer');
var busboy = require('connect-busboy');
var Busboy = require('busboy');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var partner = require('../models/partnermodel');
var docs = require('../models/docs');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, 'uploads'))
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);

	}
});

var upload = multer({ storage: storage })

var files = express.Router();

files.route('/acceptdoc')
	.post((req, res) => {
		//accept the doc so add him to the partner
		var sess = req.session;

		var email = sess.docemail;
		var org = sess.docorg;

		var newpartner = new partner({
			name: org,
			email: email,
			amnt: 0,
			freq: 0,
			accno: 0,
			mid: "default",
			appid: "default",
			cid: "default",
			active: true
		});

		newpartner.save();

		//delete the request from pending docs
		docs.findOneAndDelete({ email: sess.docemail }, (err, doc) => {
			//do nothing
		});

		//send a mail saying that he has been onboarded succesfully
		var sub = "IDBP Partner Portal";
		var bankname = `${sess.bank}`
		var msg = `<p> Hello partner! your request to register an interest for API's has been <b>ACCEPTED</b> by ${sess.bank}. Please click on the link below to upload documents and continue with us.</p>`;
		var pemail = partneremail;
		sendRequestMailAccept(pemail, sub, bankname, msg);

		res.redirect('/profile');
	});

files.route('/declinedoc')
	.post((req, res) => {
		var sess = req.session;

		var email = sess.docemail;
		docs.findOneAndDelete({ email: sess.docemail }, (err, doc) => {
			//do nothing
		});

		//send a mail saying that his request to onboard has been rejected.

		res.redirect('/profile');
	})


function sendRequestMailAccept(email, sub, bankname, msg) {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			// user: process.env.GMAIL_USER,
			// pass: process.env.GMAIL_PASS
			user: 'ibm.idbp@gmail.com',
			pass: 'Modified@2017'
		}
	});

	readHTMLFile(path.join(__dirname, '../views/idbp-partner-final-onboard.html'), function (err, html) {
		var template = handlebars.compile(html);
		var replacements = {
			bankname: `${bankname}`,
			link: `${link}`
		}
		var htmlToSend = template(replacements);
		var mailOptions = {
			from: 'ibm.idbp@gmail.com',
			to: `${email}`,
			subject: `${sub}`,
			text: 'That was easy!',
			html: htmlToSend
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

	});

}


module.exports = files;