import mongoose from "mongoose";

const dbConnector = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI_DEV);
  } catch (err) {
    console.log(err);
  }
};

export default dbConnector;
