const mongoose = require("mongoose");
const { AuthenticationError } = require("apollo-server-express");

const feedbackResoler = {
  Query: {},
  Mutation: {
    createFeeback: (parent, { fName, lName, feedback }, context) => {
      // const data =
    },
  },
};

module.exports = feedbackResoler;
