var mongoose = require('mongoose');

var partner = mongoose.Schema({
    name: String,
    email: String,
    amnt: Number,
    freq: Number,
    accno: Number,
    mid: String,
    appid: String,
    cid: String,
    active: Boolean,
    subapis: Array
}, {
        timestamp: true
    });

module.exports = mongoose.model('partner', partner);
