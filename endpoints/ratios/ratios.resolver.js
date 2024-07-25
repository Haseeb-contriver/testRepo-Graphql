const { any } = require("joi");
const Cities = require("../../db/models/cities.model");
const RatiosModel = require("../../db/models/ratios.model");
const DataModel = require("../../db/models/stateDetail.model");
const mongoose = require("mongoose");

const ratiosResolver = {
  Query: {
    getCities: async (parent, args, context) => {
      try {
        const cities = await Cities.find({}, { city: 1, _id: 0 });
        console.log("cities", cities);

        if (cities) {
          return cities;
        } else {
          throw new Error("No records found");
        }
      } catch (error) {
        console.log("Error while getting cities record from DB:", error);
        throw error;
      }
    },

    getRatios: async (parent, { cities }, context) => {
      console.log("cities", cities);

      try {
        const ratios = await RatiosModel.find({
          "ratiosData.city": { $in: cities },
        });
        console.log("ratios", ratios);

        let ratiosData = [];

        // if (ratios) {
        //   for (let i = 0; i < ratios.length; i++) {
        //     ratiosData.push({
        //       state: ratios[i].ratiosData.state,
        //       city: ratios[i].ratiosData.city,
        //       dateOfAuditReport: ratios[i].ratiosData.dateOfAuditReport,
        //       name: ratios[i].ratiosData.name,
        //       details: ratios[i].ratiosData.details,
        //       ratio: `${Math.floor(ratios[i].ratiosData.ratio * 100)}%`,
        //       category: ratios[i].ratiosData.category,
        //     });
        //   }
        // } else {
        //   throw new Error("No records found");
        // }

        if (ratios) {
          return ratios;
        } else {
          throw new Error("No records found");
        }
      } catch (error) {
        console.log("Error while getting ratios record from DB:", error);
        throw error;
      }
    },

    getFilteredRatios: async (parent, { state, county, years }, context) => {
      console.log("state", state);
      console.log("cities", county);
      console.log("years", years);

      try {
        const ratios = await RatiosModel.find({
          "ratiosData.state": state,
          "ratiosData.city": { $in: county },
          $or: years.map((year) => ({
            "ratiosData.dateOfAuditReport": {
              $regex: new RegExp(`${year}$`),
            },
          })),
        });
        console.log("ratios", ratios);

        if (ratios && ratios.length > 0) {
          return ratios;
        } else {
          throw new Error("No records found");
        }
      } catch (error) {
        console.log("Error while getting ratios record from DB:", error);
        throw error;
      }
    },

    getCounties: async (parents, { state }, context) => {
      try {
        const data = {
          Virginia: ["Alexandria", "Fairfax"],
          Michigan: ["Flint", "Wayne"],
          California: ["Palo Alto", "Sacramento"],
          Florida: ["Miami-Dade"],
          Ohio: ["Columbus"],
          Utah: ["Utah", "Salt Lake"],
        };

        //   const data = {
        //     "Virginia":[{Alexandria:[2019,2020,2021]},{Fairfax:[2019,2021]},{thirdCounty:[2019]}],
        //     // "florida":[{fairfax:[2019,2020,2021]},{alexendia:[2019,2021]},{thirdCounty:[2019]}]
        // }

        return data[state] || [];
      } catch (error) {
        throw error;
      }
    },

    getCountyYear: async (parents, { county }, context) => {
      try {
        const year = {
          Alexandria: ["2019", "2020", "2021"],
          Fairfax: ["2019", "2020", "2021"],
          Flint: ["2019", "2020", "2021"],
          Wayne: ["2019", "2020"],
          "Palo Alto": ["2019", "2020", "2021"],
          Sacramento: ["2019", "2020", "2021"],
          "Miami-Dade": ["2019", "2020", "2021"],
          Columbus: ["2019", "2020", "2021"],
          Utah: ["2019", "2020", "2021"],
          "Salt Lake": ["2019", "2020", "2021"],
        };

        return year[county] || [];
      } catch (error) {
        throw error;
      }
    },

    getStates: async () => {
      try {
        // Fetch all states from the database
        return await DataModel.find();
      } catch (error) {
        console.error("Error fetching states:", error);
        throw new Error("Unable to fetch states");
      }
    },
  },

  Mutation: {
    createState: async (_, { state, counties }) => {
      const existingState = await DataModel.findOne({ state });
      if (existingState) {
        throw new Error("State already exists");
      }
      const newState = new DataModel({ state, counties });
      await newState.save();
      return newState;
    },

    updateCounty: async (_, { state, countyId, countyData }) => {
      const objectId = new mongoose.Types.ObjectId(countyId);
      const updatedState = await DataModel.findOneAndUpdate(
        { state, "counties._id": objectId },
        { $set: { "counties.$": countyData } },
        { new: true }
      );
      return updatedState;
    },
    

    deleteState: async (_, { id }) => {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await DataModel.findOneAndDelete({ _id: objectId });
      if (result) {
        return "State deleted successfully";
      } else {
        return "State not found";
      }
    },
  },
};

module.exports = { ratiosResolver };
