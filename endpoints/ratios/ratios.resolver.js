const Cities = require("../../db/models/cities.model");

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
  },
};

module.exports = { ratiosResolver };
