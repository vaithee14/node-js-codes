const userService = require("../services/userservice");

const addUser = async (req, res) => {
  const createData = await userService.addUserData(req.body);
  res.send(createData);
};

const getAllUser = async (req, res) => {
  const users = await userService.getAllUser();
  res.send(users);
};

const getSpecificUser = async (req, res) => {
  const user = await userService.getSpecificUser(req.params.id);
  res.send(user);
};
// update
const updateUser = async(req,res)=>{
  const update = await userService.updateUserDatas(req.params.id,req.body)
  res.send(update)
}


// delete
const deleteUser = async(req,res)=>{
  const deletedata = await userService.deleteUserData(req.params.id)
  res.send(deletedata)
}

// $match & aggregate

const getorders = async(req,res)=>{
  const orders = await userService.getOrderData(req.params.id)
  res.send(orders)
}

module.exports = {
  addUser,
  getAllUser,
  getSpecificUser,
  updateUser,
  deleteUser,
  getorders
};
