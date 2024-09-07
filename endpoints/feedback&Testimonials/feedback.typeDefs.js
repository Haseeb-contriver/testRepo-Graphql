const { gql } = require("apollo-server-express");

const feedbacTypeDefs = gql`

type Query {
getFeedbacks: [String]
}

type Mutation{
createFeeback (fName!, lName!, feedback!); [string]!
}`;

module.exports = { feedbacTypeDefs };
