const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: { type: String, required: true },
    feedback: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedbacks", feedbackSchema);
