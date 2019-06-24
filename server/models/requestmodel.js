var mongoose = require('mongoose');

var requests = mongoose.Schema({
    org : String,
    email : String,
    via : String
},{
    timestamp : true
});

module.exports = mongoose.model('request',requests);
