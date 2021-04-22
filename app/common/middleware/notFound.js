const { baseResponse } = require("./../helper/baseResponse");
const notFound = (req, res) => {
  const urlOrigin = req.originalUrl;
  return baseResponse({
    success: false,
    message: `Sorry ${urlOrigin} not Found`,
  })(res, 400);
};

module.exports = { notFound };
