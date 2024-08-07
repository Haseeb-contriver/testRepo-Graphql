const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const { ratiosTypeDefs } = require("./ratios/ratios.typeDefs.js");
const { ratiosResolver } = require("./ratios/ratios.resolver.js");

const { userTypeDefs } = require("./user/user.typeDefs.js");
const { userResolver } = require("./user/user.resolver.js");
// const type = [ratiosTypeDefs];
// const resolver = [ratiosResolver];

const typeDefs = mergeTypeDefs([ratiosTypeDefs, userTypeDefs]);
const resolvers = mergeResolvers([ratiosResolver, userResolver]);

module.exports = { typeDefs, resolvers };
