var mongoose = require('mongoose');

var selectedapi = mongoose.Schema({
    name :  String,
    email : String,
    security : String,
    published : Boolean,
    value : String,
    serverIP : String,
    cred : String
},{
    timestamp : true
});

module.exports = mongoose.model('selectedApi',selectedapi);
