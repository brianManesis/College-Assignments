const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Phone',
        required:true
    }]
});

const OrderDetails = mongoose.model('OrderDetails',orderDetailsSchema,'OrderDetails');
module.exports = OrderDetails;