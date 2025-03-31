import mongoose from "mongoose";

async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

export default connectDB;