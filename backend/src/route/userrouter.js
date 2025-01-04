const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");

// Add a user
router.route("/add/user").post(userController.addUser);

// Get all users
router.route("/get/all").get(userController.getAllUser);

// Get specific user by ID
router.route("/get/user/:id").get(userController.getSpecificUser);

// update user details
router.route("/update/user/:id").put(userController.updateUser);

// delete method
router.route("/delete/user/:id").delete(userController.deleteUser)

// $match & aggregate
router.route("/users/router/:id").get(userController.getorders)



module.exports = router;
