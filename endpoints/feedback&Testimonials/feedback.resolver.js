const { AuthenticationError } = require("apollo-server-express");
const Feedback = require("../../db/models/feedback.model");
const feedbackResoler = {
  Query: {},
  Mutation: {
    createFeeback: async (parent, { fName, lName, feedback }, context) => {
      if (!context.user) {
        throw new AuthenticationError("User not found");
      }
      try {
        const data = await Feedback.create({
          fName: fName,
          lName: lName,
          feedback: feedback,
          user: context.user._id,
        });
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = { feedbackResoler };
