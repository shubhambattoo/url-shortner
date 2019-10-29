const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: [true, "urlCode is required"]
  },
  longUrl: {
    type: String,
    required: [true, "longUrl is required"]
  },
  shortUrl: {
    type: String,
    required: [true, "shortUrl is required"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Url", urlSchema);
