const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("../config/config");
const User = require("../db/models/user.model");
const ApiError = require("../utils/ApiError");

const createUser = async (userBody) => {
  // if (await User.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  // }
  return await User.create(userBody);
};

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserByToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);

  // console.log('PayLoad: ', payload);

  return getUserById(new mongoose.Types.ObjectId(payload.sub));
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByToken,
  updateUserById,
  deleteUserById,
};
