const { registerUser, loginUser } = require("../services/serviceform");

// Register
const register = async (req, res) => {

  try {
    const userData = req.body;

    const newUser = await registerUser(userData);
    res.status(201).send({
      message: "User registered successfully",

      user: {
        _id: newUser._id,
        email: newUser.email,
      },
    });

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    res.status(200).send({
      message: "Login successful",
      
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = { register, login };
