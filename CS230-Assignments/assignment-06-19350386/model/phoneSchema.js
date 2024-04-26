const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    Manufacturer:{
        type:String,
        required:true
    },
    Model:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    }
});

const Phone = mongoose.model('Phone',phoneSchema,'Phone');
module.exports = Phone;