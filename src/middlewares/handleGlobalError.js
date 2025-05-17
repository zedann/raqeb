exports.handleGlobalError = (err, req, res, next) => {
  return res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
};
