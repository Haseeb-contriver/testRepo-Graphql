const mongoose = require("mongoose");
const tokenTypesObject = require("../../config/token");

const { tokenTypes } = tokenTypesObject;

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        tokenTypes.ACCESS,
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timpestamps: true,
  }
);

// add plugin that converts mongoose to json
// tokenSchema.plugin(toJSON);

module.exports = mongoose.model("Token", tokenSchema);
