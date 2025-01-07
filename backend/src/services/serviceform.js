const bcrypt = require("bcryptjs");
const User = require("../modals/usermodalsform");

// Register a new user
const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Save the user with the hashed password
  userData.password = hashedPassword;
  const user = await User.create(userData);

  return user;
};

// Login a user
const loginUser = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }

  // Compare the provided password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
