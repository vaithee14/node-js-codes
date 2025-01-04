const { registerUser, loginUser } = require("../services/serviceform");

// register
const register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await registerUser(userData); 
    res.status(201).send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
// login
const login = async (req, res) => {
  try {
    const { gmail, password } = req.body;
    const user = await loginUser(gmail, password);  // Call service to log in user
    res.send({ message: "Login successful", user });
  } catch (error) {
    res.status(401).send({ message: "Email or password is incorrect" });
  }
};

module.exports = { register, login };