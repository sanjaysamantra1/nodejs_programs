const express = require('express');
const path = require('path');
const morgan = require('morgan');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const app = express();

app.use(express.json());

// Morgan for request logs → pipe to Winston
app.use(
  morgan('tiny', {
    stream: {
      write: (message) => logger.http ? logger.http(message.trim()) : logger.info(message.trim())
    }
  })
);

// Routes
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Handler — always last
app.use(errorHandler);


const PORT = 3000;
app.listen(PORT, () => logger.info(`✅ Server running on http://localhost:${PORT}`));
