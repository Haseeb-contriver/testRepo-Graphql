const { gql } = require("apollo-server-express");

const passwordTypeDefs = gql`
  type Query {
    getPassword: String
  }

  type Mutation {
    login(password: String): String
  }
`;

module.exports = { passwordTypeDefs };
