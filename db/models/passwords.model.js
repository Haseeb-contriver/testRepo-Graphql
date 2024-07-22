const mongoose = require("mongoose");

const passwordSchema = mongoose.Schema(
  {
    password: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Password", passwordSchema);
