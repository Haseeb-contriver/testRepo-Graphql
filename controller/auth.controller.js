const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, tokenService, emailService } = require("../services");

// const refreshTokens = catchAsync(async (req, res) => {
//   const tokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...tokens });
// });
const forgotPassword = async (email) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    email
  );
  await emailService.sendResetPasswordEmail(email, resetPasswordToken);
  return "password reset link is sent to your email account";
};

const resetPassword = async (token, password) => {
  await authService.resetPassword(token, password);
  return "password reset successfully.";
};

module.exports = {
  forgotPassword,
  resetPassword,
};
