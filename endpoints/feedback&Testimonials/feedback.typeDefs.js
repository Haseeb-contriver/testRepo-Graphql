const { gql } = require("apollo-server-express");

const feedbackTypeDefs = gql`
  type Feedback {
    fName: String
    lName: String
    feedback: String
    user: ID
  }
  type Query {
    getFeedbacks: [String]
  }

  type Mutation {
    createFeeback(fName: String!, lName: String!, feedback: String!): Feedback
  }
`;

module.exports = { feedbackTypeDefs };
