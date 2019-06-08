var mongoose = require('mongoose');

var adminschema = mongoose.Schema({
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
    integrated: Boolean,
    pass : String,
    standard : String,
    bcintegrated : Boolean,
    environment : String 
},{
    timestamp : true
});

module.exports = mongoose.model('Admin',adminschema);
