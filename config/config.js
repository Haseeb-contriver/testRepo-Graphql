const path = require("path");
const Joi = require("joi");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envSchema = Joi.object()
  .keys({
    PORT: Joi.number().required(),
    MONGODB_NAME: Joi.string().required(),
    MONGODB_URI: Joi.string().required(),
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
};
