import mongoose from "mongoose";

export const mongodbClient = async () => {
  try {
    const uri = process.env.MONGODB_URL || "";
    await mongoose.connect(uri);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};
