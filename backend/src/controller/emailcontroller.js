const emailService = require("../services/emailservice");
const userModel = require("../modals/usermodals");
const OTPModal = require("../modals/OTPModal");

// send  mail
const triggerEmail = async (req, res) => {
  try {
    await emailService.sendMessage();
    res.status(200).send("Email process completed.");
  } catch (error) {
    res.status(500).send("Failed to send email.");
  }
};

// send otp
const sendmail = async (req, res) => {
  const { email_id } = req.body;
  console.log(email_id, "email_id");

  if (!email_id) {
    return res.status(400).json({
      status: "error",
      message: "Email is required.",
    });
  }

  try {
    const user = await userModel.findOne({ email_id });
    if (user) {
      console.log(user);

      await emailService.sendMessageWithOTP(email_id);
    } else {
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "OTP send successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to verify OTP.",
    });
  }
};

// verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email_id, otp } = req.body;

    // Validate input
    if (!email_id || !otp) {
      return res.status(400).json({
        status: "error",
        message: "Email and OTP are required.",
      });
    }

    const otpRecord = await OTPModal.findOne({ email_id });

    if (!otpRecord) {
      return res.status(404).json({
        status: "error",
        message: "No OTP found for this email.",
      });
    }


    

    if (otpRecord.otp === Number(otp)) {
      // OTP matches
      return res.status(200).json({
        status: "success",
        message: "OTP verification successful.",
      });
    } else {
      // OTP does not match
      return res.status(400).json({
        status: "error",
        message: "Invalid OTP.",
      });
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to verify OTP. Please try again later.",
    });
  }
};
module.exports = {
  triggerEmail,
  sendmail,
  verifyOtp,
};
