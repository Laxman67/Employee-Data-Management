import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "employeeDataManagement",
    });
    logger.info(
      `MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`
    );
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
