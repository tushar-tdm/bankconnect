var mongoose = require('mongoose');

var userschema = mongoose.Schema({
    username: String,
    ts : String,
    email : String,
    confirmation : Boolean,
    cbs : String,
    version : String,
    intopt : String,
    api_list : Array,
    sip : String,
    cred : String,
    password: String,
    fname : String,
    lname: String,
    admin: String,
    integrated: Boolean
},{
    timestamp : true
});

module.exports = mongoose.model('User',userschema);
