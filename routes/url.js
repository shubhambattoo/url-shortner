const express = require("express");
const router = express.Router();
const urlController = require("./../controllers/urlController");

/**
 * @route POST /api/url/shorten
 * @description Create short url
 */
router.post("/shorten", urlController.shortenUrl);

module.exports = router;
