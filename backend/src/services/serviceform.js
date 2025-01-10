const bcrypt = require("bcryptjs");
const Usermodal = require("../modals/usermodalsform");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async ({ gmail, password, name }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Usermodal({ gmail, password: hashedPassword, name });
  
  await newUser.save();
  return newUser;
};

// Login User
const loginUser = async (gmail, password) => {
  const user = await Usermodal.findOne({ gmail });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

module.exports = { registerUser, loginUser };

