const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.set("strictQuery", true);
mongoose.connect(config.mongoose.uri, config.mongoose.options);

module.exports = mongoose.connection;
