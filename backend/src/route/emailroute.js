const express = require("express");
const emailController = require("../controller/emailcontroller");
const router = express.Router();

// send mail
router.post("/send-email", emailController.triggerEmail);
// otp send
router.post("/send-otp", emailController.sendmail);
//verificition OTP
router.post("/verification/OTP", emailController.verifyOtp);

module.exports = router;
