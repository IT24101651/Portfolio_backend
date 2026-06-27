const ApiError = require('../utils/apiError');

function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : err.statusCode || 500;

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource id',
      data: {},
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate value already exists',
      data: {},
    });
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((entry) => entry.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: { errors },
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    data: err.details ? { errors: err.details } : {},
  });
}

module.exports = {
  notFound,
  errorHandler,
};

