const nodemailer = require("nodemailer");
const userModel = require("../modals/usermodals");
const crypto = require("crypto");
const OTPModal = require("../modals/OTPModal");

const sendMessage = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "svaithi2004@gmail.com",
      pass: "fwff mwre gwlu hhhd",
    },
  });

  const mailOptions = {
    from: "svaithi2004@gmail.com",




    
    to: "susmi605@gmail.com",
    subject: "Hello! Welcome to a New Year",
    text: `Hello,

This is a test email sent using Nodemailer. We're excited to reach out and stay connected. Thank you for testing this feature!

Best regards,
Your Friendly App`,
  };
  try {
    await transporter.sendMail(mailOptions);

    // After successfully sending the email, update the database
    const emailStatus = new OTPModal({ emailSent: true });
    await emailStatus.save();

    console.log("Email sent and status updated in database.");
  } catch (error) {
    console.error("Error sending email:", error);

    // Optionally, update the database with a failed status
    const emailStatus = new OTPModal({ emailSent: false });
    await emailStatus.save();

    throw new Error("Failed to send email.");
  }
};

// send OTP

const sendMessageWithOTP = async (email) => {
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  console.log(otp, "otp");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "svaithi2004@gmail.com",
      pass: "fwff mwre gwlu hhhd", // Make sure to use environment variables in production
    },
  });

  const mailOptions = {
    from: "svaithi2004@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Hello,

Your OTP code is: ${otp}

Best regards,
Your Friendly App`,
  };

  try {
    // Send the OTP email
    await transporter.sendMail(mailOptions);
    const otpData = {
      email_id: email,
      otp: otp,
    };

    const craeteOtp = await OTPModal.create(otpData);
    return craeteOtp;

  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email.");
  }
};



module.exports = {
  sendMessage,
  sendMessageWithOTP,
};
