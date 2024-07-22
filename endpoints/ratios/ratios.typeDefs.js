const { gql } = require("apollo-server-express");

const ratiosTypeDefs = gql`
type RatioData {
  state: String
  city: String
  dateOfAuditReport: String
  name: String
  details: String
  ratio: String
  source: String
  sourcedoc: String
}

  type RatioSet {
    logo: String
    ratiosData: [RatioData]
  }

  type Cities {
    city: String
  }
  
  type Both {
    city: String
    state: String
  }

  type Query {
    getCities: [Cities]
    getRatios(cities: [String]!): [RatioSet]
    getBoth: [Both]
    getFilteredRatios(state: String, county: [String]!, years: [Int!]): [RatioSet]
    getCounties(state: String!): [String]
    getCountyYear(county: String!): [String]
  }
`;

module.exports = { ratiosTypeDefs };
