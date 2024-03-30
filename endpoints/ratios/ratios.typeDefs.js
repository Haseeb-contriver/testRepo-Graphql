const { gql } = require("apollo-server-express");

const ratiosTypeDefs = gql`
  type Cities {
    city: String
  }

  type Query {
    getCities: [Cities]
  }
`;

module.exports = { ratiosTypeDefs };
