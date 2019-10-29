require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

connectDB = async () => {
  try {
    // console.log(db);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("db connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
