
import mongoose from "mongoose";
import { envConfig } from "./env.js";
import "../models/Store.js";

const connectDB = async () => {
  if (!envConfig.mongoUri) {
    throw new Error("Falta la URI de conexión a MongoDB");
  }

  await mongoose.connect(envConfig.mongoUri);

  console.log("MongoDB conectado");
  console.log("Base de datos:", mongoose.connection.name);
};

export default connectDB;
