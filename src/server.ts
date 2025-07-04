import 'dotenv/config'
import mongoose from "mongoose";
import { app } from "./app";
const server = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Database connected successfully");
    app.listen(process.env.port, () => {
      console.log(`Server is running on http://localhost:${process.env.port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

server();