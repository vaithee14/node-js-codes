const productService = require("../services/servicsproducts");

// Add a product
const addProduct = async (req, res) => {
  const product = await productService.addProduct(req.body);
  res.send(product);
};

// Get all products
const getaddProduct = async (req, res) => {
  const products = await productService.getAllProducts(req.boby);
  res.send(products);
};

// order
const addOrder = async (req, res) => {
  const product = await productService.orderProduct(req.body);
  res.send(product);
};

// Add product to wishlist
const addWishlist = async (req, res) => {
  const wishlist = await productService.addToWishlist(req.body);
  res.send(wishlist);
};

// Get user's wishlist
const getWishlist = async (req, res) => {
  const wishlist = await productService.getUserWishlist(req.params.userId);
  res.send(wishlist);
};

// get order
const getOrder = async (req, res) => {
  const getorderlist = await productService.getorderdetails(req.params.id);
  res.send(getorderlist);
};

module.exports = {
  addProduct,
  getaddProduct,
  addOrder,
  addWishlist,
  getWishlist,
  getOrder,
};
