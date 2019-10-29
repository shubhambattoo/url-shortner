const AppError = require("./../utils/appError");

/**
 * Sends error response in the development env
 * @param {any} err error object
 * @param {any} res response objetc of Expess
 */
const sendErrorDev = (err, res) => {
  // console.log(err.isOperational);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

/**
 * Send Error response while in prod env
 * @description Contains to blocks of code, first block
 * represents the operational errors, the second blocks deals
 * with the programming error
 * @param {any} err the complete error object
 * @param {any} res the response object of Express
 * @returns void
 * @example
 * sendErrorProd(err, res);
 */
const sendErrorProd = (err, res) => {
  // Operational, Trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
    // Programming error, where we dont want to leak info
  } else {
    // 1) log to console
    // eslint-disable-next-line no-console
    console.error(`ERROR`, err);
    // 2) send generic message
    res.status(500).json({
      status: "error",
      message: "something went wrong"
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    sendErrorProd(error, res);
  }
};
