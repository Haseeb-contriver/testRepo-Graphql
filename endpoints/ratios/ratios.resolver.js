const Cities = require("../../db/models/cities.model");
const RatiosModel = require("../../db/models/ratios.model");

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
  },
};

module.exports = { ratiosResolver };
