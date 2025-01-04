const express = require("express");
const emailController = require("../controller/emailcontroller"); 
const router = express.Router();

 router.post("/send-email", emailController.triggerEmail);

router.post("/verify", emailController.verifyOtp);


module.exports = router;
