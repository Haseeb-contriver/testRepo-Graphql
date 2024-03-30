const mongoose = require("mongoose");

const ratiosSchema = mongoose.Schema(
  {
    logo: String,
    ratiosData: [
      {
        state: String,
        city: String,
        dateOfAuditReport: String,
        name: String,
        details: String,
        ratio: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ratio", ratiosSchema);
