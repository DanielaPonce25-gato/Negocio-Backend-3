import dotenv from "dotenv";

dotenv.config();

const isTesting = process.argv.some(arg => arg.includes("mocha"));

export const envConfig = {
  port: process.env.PORT || 3000,
  mongoUri: isTesting
    ? process.env.MONGODB_TEST_URI
    : process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || "development"
};

