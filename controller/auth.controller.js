const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, tokenService, emailService } = require("../services");

// const refreshTokens = catchAsync(async (req, res) => {
//   const tokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...tokens });
// });
const forgotPassword = async (email, origin) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    email
  );
  await emailService.sendResetPasswordEmail(email, resetPasswordToken, origin);
  return "A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.";
};

const resetPassword = async (token, password) => {
  await authService.resetPassword(token, password);
  return "Your password has been successfully reset. You can now log in with your new credentials.";
};

module.exports = {
  forgotPassword,
  resetPassword,
};
