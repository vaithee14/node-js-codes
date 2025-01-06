const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const otpSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  email_id: {
    type: String,
    required: true,
  },

  otp: {
    type: Number,
  },
});
module.exports = mongoose.model("otp", otpSchema);
