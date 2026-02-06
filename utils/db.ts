import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  } else {
    try {
      await mongoose.connect(process.env.MONGODB_URI as string, {
        dbName: "share_prompt",
      });

      isConnected = true;

      console.log("MongoDB connected");
    } catch (error) {
      console.log(`Error connecting MongoDB: ${error}`);
    }
  }
};
