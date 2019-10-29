const validUrl = require("valid-url");
const shortid = require("shortid");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const Url = require("./../models/urlModel");

exports.shortenUrl = catchAsync(async (req, res, next) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(baseUrl)) {
    return next(new AppError("invalid base url", 401));
  }

  // create url code
  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    let url = await Url.findOne({ longUrl });
    if (url) {
      res.json({
        status: "success",
        data: { url }
      });
    } else {
      const shortUrl = baseUrl + "/" + urlCode;

      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date()
      });

      url = await url.save();

      res.json({
        status: "success",
        data: { url }
      });
    }
  } else {
    return next(new AppError("Invalid long url", 401));
  }
});

exports.redirectUrl = catchAsync(async (req, res, next) => {
  const url = await Url.findOne({ urlCode: req.params.code });

  if (url) {
    return res.redirect(url.longUrl);
  } else {
    return next(new AppError("URL not found", 404));
  }
});
