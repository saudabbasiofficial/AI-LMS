import mongoose from "mongoose";

let isConnected = false; // track the connection

export default async function dbConnect() {
  if (isConnected) {
    // Already connected
    return;
  }
const dbURL=process.env.DBURL as string
  try {
    await mongoose.connect(dbURL);


  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("MongoDB connection failed");
  }
}
