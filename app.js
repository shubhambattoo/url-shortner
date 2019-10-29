const express = require("express");
const app = express();
const globalErrorHandler = require("./controllers/errorController");

app.use(express.json({ extended: false }));
// app.use(express.static(`${__dirname}/public`));

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;