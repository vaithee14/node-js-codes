const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const emailSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  emailSent: { type: Boolean, default: false },
  email: { type: String, required: true },
  otp: { type: Number, required: false }, // OTP is optional for generic emails
});

module.exports = mongoose.model("EmailStatus", emailSchema);
