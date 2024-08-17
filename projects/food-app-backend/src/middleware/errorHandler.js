// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    // Log the error
    console.error(err.stack);
  
    // Set response status based on the error
    const status = err.statusCode || 500;
    
    // Send error response
    res.status(status).json({
      error: {
        message: err.message || "Internal Server Error"
      }
    });
  };
  
  module.exports = errorHandler;
  