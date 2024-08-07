const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/token");

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    // throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    throw new Error("Incorrect email or password");
  }
  return user;
};
module.exports = {
  refreshAuth,
  loginUserWithEmailAndPassword,
};
