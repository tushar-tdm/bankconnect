var mongoose = require('mongoose');

var userschema = mongoose.Schema({
    username: String,
    ts : String,
    email : String,
    bank : String,
    confirmation : Boolean,
    cbs : String,
    version : String,
    intopt : String,
    secret_key : String,
    api_list : Array,
    sip : String,
    cred : String,
    password: String
},{
    timestamp : true
});

module.exports = mongoose.model('User',userschema);
