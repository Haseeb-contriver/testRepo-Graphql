const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      //   trim: true,
    },
    lName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }

        // if (!value.endsWith("@ratioplatform.com")) {
        //   throw new Error("Email must be from the domain @ratioplatform.com");
        // }

        const atCount = value.split('@').length - 1;
          if (atCount !== 1) {
            throw new Error("Email must contain exactly one @ symbol");
          }
          // Validate local part (before @ratioplatform.com)
          const localPart = value.split('@')[0];
          if (!/^[a-zA-Z0-9]+$/.test(localPart)) {
            throw new Error("Email local part must contain only alphanumeric characters");
          }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },
    subscription: {
      type: Boolean,
      default: false,
    },
  },
  {
    timpestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
