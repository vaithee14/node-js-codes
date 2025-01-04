const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const orderSchema = new mongoose.Schema({
    _id:{
        type: String,
        default:uuidv4
    },
    userId:{
        type: String
    },
    productId:{
        type: String
    },
    status:{
        type: String,
        default:" ordered"
    }
   
})

const orderModal = mongoose.model("order",orderSchema);
module.exports = orderModal




