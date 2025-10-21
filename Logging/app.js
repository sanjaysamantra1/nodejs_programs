const express = require('express');
const path = require('path');
const morgan = require('morgan');
const logger = require('./middlewares/logger');

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
app.use((req, res) => {
  logger.warn(`404 - Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error' });
});


const PORT = 3000;
app.listen(PORT, () => logger.info(`✅ Server running on http://localhost:${PORT}`));
