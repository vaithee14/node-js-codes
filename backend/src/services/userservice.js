const mongoose = require("mongoose");
const userModel = require("../modals/usermodals");

const addUserData = async (bodyData) => {
  const data = await userModel.create(bodyData);
  return data;
};

const getAllUser = async () => {
  const usersData = await userModel.find({});
  return usersData;
};

const getSpecificUser = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { error: "Invalid User ID" };
  }
  const data = await userModel.findById(id);
  return data || { error: "User not found" };
};

// Update
const updateUserDatas = async (id, body) => {
  const checkUser = await userModel.findById({ _id: id });
  if (!checkUser) {
    console.log("user not found");
  }
  const updateDetails = await userModel.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });

  return updateDetails;
};

// Delete
const deleteUserData = async (id) => {
  const checkUser = await userModel.findById({ _id: id });
  if (!checkUser) {
    console.log("user not found");
  }
  const deleteData = await userModel.findByIdAndDelete({ _id: id });
  return deleteData;
};

// Aggregate
const getOrderData = async (id) => {
  const getData = await userModel.aggregate([
    // $match
    // {
    //   $match: {
    //     _id: id,
    //   },
    // },
    // Equal
    // {
    //   $match: {
    //     $and: [{ _id: { $eq: id } }],
    //   },
    // },
    // Not equal
    // {
    //   $match: {
    //     $and: [{ _id: { $ne: id } }],
    //   },
    // },
    // Id and Name(equal)
    // {
    //   $match: {
    //     $and: [{ _id: { $eq: id } }, { name: { $eq: "priya" } }],
    //   },
    // },
    // Or
    // {
    //   $match: {
    //     $or: [{ _id: { $eq: id } }, { name: { $eq: "vaithi" } }],
    //   },
    // },
    // nor
    // {
    //   $match: {
    //     $nor: [{ _id: { $eq: id } }, { name: { $eq: "vaithi" } }],
    //   },
    // },
  ]);
};

module.exports = {
  addUserData,
  getAllUser,
  getSpecificUser,
  updateUserDatas,
  deleteUserData,
  getOrderData,
};
