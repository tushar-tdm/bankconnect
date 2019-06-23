var mongoose = require('mongoose');


var fileschema = mongoose.Schema({
    email : String,
    file : String,
    org : String,
    bank : String,
    filename : String
},{
    timestamp : true
});

module.exports = mongoose.model('file',fileschema);
