const { userService, tokenService, authService } = require("../../services");
const { tokenTypes } = require("../../config/token");
const { authController } = require("../../controller");

const userResolver = {
  Query: {},

  Mutation: {
    registerUser: async (parent, { input }, context) => {
      const userExist = await userService.getUserByEmail(input.email);
      if (userExist) {
        throw new Error("Email already taken");
      }
      const user = await userService.createUser(input);
      return user;
    },

    loginUser: async (parent, { email, password }, context) => {
      const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
      );
      const { access, refresh } = await tokenService.generateAuthTokens(user);
      return { user, access, refresh };
    },

    refreshToken: async (parent, { token }) => {
      const tokenDoc = await tokenService.verifyToken(
        token,
        tokenTypes.REFRESH
      );
      const user = await userService.getUserById(tokenDoc.user);
      const newTokens = await tokenService.generateAuthTokens(user);
      return {
        user,
        accessToken: newTokens.access,
        refreshToken: newTokens.refresh,
      };
    },

    forgotPassword: async (parent, { email }) => {
      const response = await authController.forgotPassword(email);
      return response;
    },

    resetPassword: async (parent, { token, newPassword }) => {
      const response = await authController.resetPassword(token, newPassword);
      return response;
    },
  },
};

module.exports = { userResolver };
