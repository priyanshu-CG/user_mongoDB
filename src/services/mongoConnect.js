const { mongoose } = require("mongoose");

const connect = async () => {
  try {
    console.log("Connecting to MongoDB");

    await mongoose.connect(process.env.MONGODB_URL, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    });

    console.log("Connected to MongoDB successfully");
    return true;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

module.exports={
    connect
}