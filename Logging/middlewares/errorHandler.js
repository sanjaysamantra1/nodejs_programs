const logger = require('./logger');

// Custom global error handler
function errorHandler(err, req, res, next) {
  // Log detailed error
  logger.error(err.message, { stack: err.stack });

  // Customize response
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  // Include stack trace only in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
