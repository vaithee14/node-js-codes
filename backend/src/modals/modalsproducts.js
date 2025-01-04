const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 20,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const productModal = mongoose.model("Product", productSchema);
module.exports = productModal;
