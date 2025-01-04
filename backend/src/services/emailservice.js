const nodemailer = require("nodemailer");
const EmailStatus = require("../modals/modalemail");
const crypto = require("crypto");
const userModel = require("../modals/usermodals");

const sendMessage = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "svaithi2004@gmail.com",
      pass: "pvkk eiun hral yawg",
    },
  });

  const mailOptions = {
    from: "svaithi2004@gmail.com",
    to: "susmi605@gmail.com",
    subject: "Hello! ",
    text: `Hello,

 This is a test email sent using Nodemailer. We're excited to reach out and stay connected. Thank you for testing this feature!

Best regards,
 Your Friendly App`,
  };
  try {
    await transporter.sendMail(mailOptions);

    const emailStatus = new userModel({ emailSent: true });
    await emailStatus.save();
    console.log("Email sent and status updated in database.");
  } catch (error) {
    console.error("Error sending email:", error);

    
    const emailStatus = new userModel({ emailSent: false });
    await emailStatus.save();
    throw new Error("Failed to send email.");
  }
};

const sendMessageWithOTP = async (email) => {
  try {
    const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "svaithi2004@gmail.com",
        pass: "pvkk eiun hral yawg", // Replace with environment variable for production
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

    await transporter.sendMail(mailOptions);

    const emailStatus = new EmailStatus({ email, otp, emailSent: true });
    await emailStatus.save();
    console.log("OTP email sent and saved in database.");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    const emailStatus = new EmailStatus({ email, emailSent: false });
    await emailStatus.save();
    throw new Error("Failed to send OTP email.");
  }
};


module.exports = {
  sendMessage,
  sendMessageWithOTP,
};