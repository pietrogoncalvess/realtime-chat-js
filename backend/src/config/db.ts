import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/chat" as string);
  //   await mongoose.connect("mongodb://mongo:27017/chat" as string);
  // await mongoose.connect(process.env.MONGO_URI as string);
  console.log("MongoDB conectado");
}
