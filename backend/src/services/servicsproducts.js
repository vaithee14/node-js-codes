const productModal = require("../modals/modalsproducts");
const orderModal = require("../modals/ordered");
const userModel = require("../modals/usermodals");
const wishlistModal = require("../modals/whishlist");

// Add a product
const addProduct = async (productData) => {
  const data = await productModal.create(productData);
  return data;
};

// Get all products
const getAllProducts = async () => {
  const productsData = await productModal.find({});
  return productsData;
};

// order
const orderProduct = async (orderedData) => {
  const data = await orderModal.create(orderedData);
  return data;
};

// Add product to wishlist
const addToWishlist = async (wishlistData) => {
  const data = await wishlistModal.create(wishlistData);
  return data;
};

// Get user's wishlist
const getUserWishlist = async (userId) => {
  const wishlist = await wishlistModal.find({ userId });
  return wishlist;
};

// get order
const getorderdetails = async (Id) => {
  console.log(Id, "Id");

  const getOrders = await userModel.aggregate([
    {
      $match: {
        _id: Id,
      },
    },
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "userId",
        as: "orderdetails",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "orderdetails.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $addFields: {
        totalPrice: { $sum: "$productDetails.price" },
        totalCount: { $size: "$productDetails" },
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        mobile_number: 1,
        address: 1,
        email_id: 1,
        productDetails: 1,
        totalPrice: 1,
        totalCount: 1,
      },
    },
  ]);
  return getOrders;
};

module.exports = {
  addProduct,
  getAllProducts,
  orderProduct,
  addToWishlist,
  getUserWishlist,
  getorderdetails,
};
