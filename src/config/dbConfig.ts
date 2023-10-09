import { connect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URL as string;

export const connectDb = async () => {
  try {
    await connect(MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
