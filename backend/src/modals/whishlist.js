const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");

const wishlistSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },

  userId: {
    type: String,
    required: true, // ID of the user
  },
  productId: {
    type: String,
    required: true, // ID of the product
  },
  productName: {
    type: String,
  },
});

const wishlistModal = mongoose.model("Wishlist", wishlistSchema);
module.exports = wishlistModal;
