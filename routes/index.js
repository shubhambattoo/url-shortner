const express = require("express");
const router = express.Router();
const urlController = require("./../controllers/urlController");

/**
 * @route GET /:code
 * @description Redirect to the long/original URL
 */
router.get("/:code", urlController.redirectUrl);

module.exports = router;
