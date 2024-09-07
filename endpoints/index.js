const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const { ratiosTypeDefs } = require("./ratios/ratios.typeDefs.js");
const { ratiosResolver } = require("./ratios/ratios.resolver.js");

const { userTypeDefs } = require("./user/user.typeDefs.js");
const { userResolver } = require("./user/user.resolver.js");

const {
  feedbackTypeDefs,
} = require("./feedback&Testimonials/feedback.typeDefs.js");
const {
  feedbackResoler,
} = require("./feedback&Testimonials/feedback.resolver.js");
// const type = [ratiosTypeDefs];
// const resolver = [ratiosResolver];

const typeDefs = mergeTypeDefs([
  ratiosTypeDefs,
  userTypeDefs,
  feedbackTypeDefs,
]);
const resolvers = mergeResolvers([
  ratiosResolver,
  userResolver,
  feedbackResoler,
]);

module.exports = { typeDefs, resolvers };
