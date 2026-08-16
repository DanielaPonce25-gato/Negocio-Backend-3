import dotenv from "dotenv";

dotenv.config();

const isTesting = process.argv.some(arg => arg.includes("mocha"));


const mongoUri = isTesting
    ? process.env.MONGODB_TEST_URI
    : process.env.MONGODB_URI;


if (!mongoUri) {
    throw new Error(
        isTesting
            ? "Falta la variable de entorno MONGODB_TEST_URI"
            : "Falta la variable de entorno MONGODB_URI"
    );
}


export const envConfig = {
    port: process.env.PORT || 3000,
    mongoUri,
    nodeEnv: process.env.NODE_ENV || "development"
};

