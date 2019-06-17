var mongoose = require('mongoose');


var fileschema = mongoose.Schema({
    user : String,
    file : String
},{
    timestamp : true
});

module.exports = mongoose.model('file',fileschema);