const mongoose = require("mongoose");

const countySchema = new mongoose.Schema({
  [String]: [Number],
});

const stateSchema = mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  counties: [countySchema],
});

const DataModel = mongoose.model('StateData', stateSchema);

module.exports = DataModel;