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

   type County {
    name: String!
    years: [Int!]!
  }

  type State {
    id: ID!
    state: String!
    counties: [County!]!
  }

  input CountyInput {
    name: String!
    years: [Int!]!
  }

  input CountyUpdateInput {
    countyId: ID!
    countyData: CountyInput!
  }

  type Query {
    getCities: [Cities]
    getRatios(cities: [String]!): [RatioSet]
    getBoth: [Both]
    getStates: [State]
    getFilteredRatios(state: String, county: [String]!, years: [Int!]): [RatioSet]
    getCounties(state: String!): [String]
    getCountyYear(county: String!): [String]
  }

   type Mutation {
    createState(state: String!, counties: [CountyInput]!): State
    updateCounties(state: String!, counties: [CountyUpdateInput!]!, newState: String): State
    deleteState(id: ID!): String
  }
`;

module.exports = { ratiosTypeDefs };
// updateCounty(state: String!, countyId: String!, countyData: CountyInput!): State
