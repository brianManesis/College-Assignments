const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    Title:{
        type:String,
        enum:["Mx","Ms","Mr","Mrs","Miss","Dr","Other"],
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },   
    Surname:{ 
        type:String,
        required:true
    },
    Mobile:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Address:{
        AddressLine1:{
            type:String,
            required:true
        },
        AddressLine2:{
            type:String,
        },
        Town:{
            type:String,
            required:true
        },
        County_City:{
            type:String,
            required:true
        },
        Eircode:{
            type:String,
        }
    },
    ShippingAddress:{
        AddressLine1:{
            type:String,
            required:true
        },
        AddressLine2:{
            type:String,
        },
        Town:{
            type:String,
            required:true
        },
        County_City:{
            type:String,
            required:true
        },
        Eircode:{
            type:String,
        }
    }
});

const Customer = mongoose.model('Customer',customerSchema,'Customer');
module.exports = Customer;