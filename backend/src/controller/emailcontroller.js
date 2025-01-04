const emailService = require("../services/emailservice");
const userModel = require("../modals/usermodals");

const triggerEmail = async (req, res) => {
  try {
    await emailService.sendMessage();
    res.status(200).send("Email process completed.");
  } catch (error) {
    res.status(500).send("Failed to send email.");
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ status: "error", message: "Email and OTP are required." });
  }

  try {
    const user = await emailService.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: "error", message: "Email not found." });
    }

    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ status: "error", message: "Invalid OTP." });
    }

    return res.status(200).json({ status: "success", message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ status: "error", message: "Failed to verify OTP." });
  }
}

module.exports = {
  triggerEmail,
  verifyOtp,
};
