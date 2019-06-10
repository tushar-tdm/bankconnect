var mongoose = require('mongoose');

var userschema = mongoose.Schema({
    username : String,
    fname : String,
    lname : String,
    role : String,
    email : String,
    bank : String
},{
    timestamp : true
});

module.exports = mongoose.model('user',userschema);