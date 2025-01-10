const { registerUser, loginUser } = require("../services/serviceform");
const jwt = require("jsonwebtoken");
const Usermodal = require("../modals/usermodalsform");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (user) => {
  const secretKey =
    "ae4fe2af3f6b1d59ce14fdf608a4befec9de16a36674ac52962edac8aa98bb5d9e6104cf550ea8c55fe081d8b3a62ac6eef80bae2f66d2d35a185cca00d6b485";

  const payload = { id: user._id, gmail: user.gmail, name: user.name };

  const token = jwt.sign(payload, secretKey);

  return token;
};

// Register
const register = async (req, res) => {
  try {
    const { gmail, password, name } = req.body;

    if (!gmail || !password || !name) {
      return res
        .status(400)
        .send({ message: "email, Password, and Name are required" });
    }

    // Check if email already exists
    const existingUser = await Usermodal.findOne({ gmail });

    if (existingUser) {
      return res.status(400).send({ message: "Gmail already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Usermodal({ gmail, password: hashedPassword, name });
    await newUser.save();

    // success message
    const token = generateToken(newUser);
    res.status(201).send({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        gmail: newUser.gmail,
        name: newUser.name,
      },
      token,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { gmail, password } = req.body;
    
    if (!gmail || !password) {
      return res
        .status(400)
        .send({ message: "Gmail and Password are required" });
    }

    const user = await Usermodal.findOne({ gmail });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const token = generateToken(user);
    res.status(200).send({
      message: "Login successful",
      user: {
        _id: user._id,
        gmail: user.gmail,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = { register, login, generateToken };
