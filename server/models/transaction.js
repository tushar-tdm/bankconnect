var mongoose = require('mongoose');

const transaction = mongoose.Schema({
    org : String,
    hits : Number,
    sucess : Number,
    fail : Number,
    bank : String
})

module.exports = mongoose.model('transaction',transaction);
