const mongoose = require ("mongoose");
const {Schema} = mongoose;

const countySchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true},
  years: { type: [Number], required: true },
});

const stateSchema = new Schema({
  state: { type: String, required: true },
  counties: [countySchema],
});

module.exports = mongoose.model("StateData", stateSchema);
