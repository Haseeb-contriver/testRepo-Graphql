const { userService, tokenService, authService } = require("../../services");

const userResolver = {
  Query: {},

  Mutation: {
    registerUser: async (parent, { input }, context) => {
      const userExist = await userService.getUserByEmail(input.email);
      if (userExist) {
        throw new Error("Email already taken");
      }
      const user = await userService.createUser(input);

      // const token = await tokenService.generateVerifyEmailToken(user)

      const { access, refresh } = await tokenService.generateAuthTokens(user);

      return { user, access, refresh };
    },

    loginUser: async (parent, { email, password }, context) => {
      const user = await authService.loginUserWithEmailAndPassword(
        email,
        password
      );
      const { access, refresh } = await tokenService.generateAuthTokens(user);
      return {user, access, refresh };
    },
  },
};

module.exports = { userResolver };
