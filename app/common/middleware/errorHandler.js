const errorHandler = (error, req, res, next) => {
  const payload = {
    success: false,
    message: error.message,
    error: error,
  };
  return res.json(payload);
};

module.exports = { errorHandler };
