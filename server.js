const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

process.on("uncaughtException", err => {
  console.log("Unhandler Exception! Shutting Down...");
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("db connected successfully");
  })
  .catch(err => {
    console.log(err);
  });

const app = require("./app");

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`server started on ${port}`);
});

process.on("unhandledRejection", err => {
  console.log("Unhandler Rejection! Shutting Down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
