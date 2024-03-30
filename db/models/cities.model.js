const mongoose = require("mongoose");

const citiesSchema = mongoose.Schema(
  {
    city: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cities", citiesSchema);
