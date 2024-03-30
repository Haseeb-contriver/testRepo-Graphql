const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const { ratiosTypeDefs } = require("./ratios/ratios.typeDefs.js");
const { ratiosResolver } = require("./ratios/ratios.resolver.js");

// const type = [ratiosTypeDefs];
// const resolver = [ratiosResolver];

const typeDefs = mergeTypeDefs([ratiosTypeDefs]);
const resolvers = mergeResolvers([ratiosResolver]);

module.exports = { typeDefs, resolvers };
