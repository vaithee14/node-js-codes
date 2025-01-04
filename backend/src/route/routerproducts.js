const express = require("express");
const router = express.Router();
const productController = require("../controller/controllerproducts");

// Add a product
router.route("/add/product").post(productController.addProduct);

// Get all products
router.route("/get/usersproducts").get(productController.getaddProduct);

// add order
router.route("/add/order").post(productController.addOrder);

// get order 
router.route("/get/orders/:id").get(productController.getOrder)

// Add product to wishlist
router.route("/wishlist/add").post(productController.addWishlist);

// Get user's wishlist
router.route("/wishlist/:id").get(productController.getWishlist);

module.exports = router;
