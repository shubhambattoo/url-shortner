const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const Url = require("./../models/urlModel");

/**
 * @route POST /api/url/shorten
 * @description Create short url
 */
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("invalid base url");
  }

  // create url code
  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        url = await url.save();
        res.json(url);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Server error");
    }
  } else {
    return res.status(401).json("invalid long url");
  }
});

module.exports = router;
