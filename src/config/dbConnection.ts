import mongoose from "mongoose";

const dbConnector = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rafaelbvc:12345678909876543211@rbvcprofile.4n8x6qq.mongodb.net/"
    );
  } catch (err) {
    console.log(err);
  }
};

export default dbConnector;
