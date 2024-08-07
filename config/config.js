const path = require("path");
const Joi = require("joi");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envSchema = Joi.object()
  .keys({
    PORT: Joi.number().required(),
    MONGODB_NAME: Joi.string().required(),
    MONGODB_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
  })
  .unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  mongoose: {
    uri: `${envVars.MONGODB_URI}/${envVars.MONGODB_NAME}`,
    name: envVars.MONGODB_NAME,
    options: {
      // useCreateIndex: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
  },
  port: envVars.PORT,
  jwt:{
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyAddressExpirationMinutes: envVars.JWT_VERIFY_ADDRESS_EXPIRATION_MINUTES,
  },
};
