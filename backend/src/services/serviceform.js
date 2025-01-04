const User = require("../modals/usermodalsform");  // Correct path

// Register a new user
const registerUser = async (userData) => {
  const existingUser = await User.findOne({ gmail: userData.gmail });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const user = await User.create(userData);  // Create a new user
  return user;
};

// Login a user
const loginUser = async (email, password) => {
  const user = await User.findOne({ gmail: email });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.password !== password) {
    throw new Error("Invalid credentials");
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
