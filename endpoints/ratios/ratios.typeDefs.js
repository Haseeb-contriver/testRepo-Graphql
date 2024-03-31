const { gql } = require("apollo-server-express");

const ratiosTypeDefs = gql`
  type RatioData {
    state: String
    city: String
    dateOfAuditReport: String
    name: String
    details: String
    ratio: String
  }

  type RatioSet {
    logo: String
    ratiosData: [RatioData]
  }

  type Cities {
    city: String
  }

  type Query {
    getCities: [Cities]
    getRatios(cities: [String]!): [RatioSet]
  }
`;

module.exports = { ratiosTypeDefs };
