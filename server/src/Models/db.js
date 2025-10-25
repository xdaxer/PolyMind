import moongoose from "mongoose";

const connectDB = async () => {
  const DB_URI = process.env.DB_URI;

  if (!DB_URI) {
    throw new Error("DB_URI environment variable is not set!");
  }

  try {
    await moongoose.connect(DB_URI);
    console.log("DB is Connected");
  } catch (error) {
    throw new Error(error);
  }
};

export default connectDB;
