const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    fName: String
    lName: String
    email: String!
    subscription: Boolean
  }

  type Query {
    getAllUsers: [User]
  }

  type Mutation {
    registerUser(input: UserInput): UserAndTokenResponse
    loginUser(email: String!, password: String!): UserAndTokenResponse
  }

  type UserAndTokenResponse {
    user: User
    access: Token!
    refresh: Token!
  }

  type Token {
    token: String!
    expires: String!
  }

  input UserInput {
    fName: String
    lName: String
    email: String!
    password: String!
    subscription: Boolean
  }
`;

module.exports = { userTypeDefs };
