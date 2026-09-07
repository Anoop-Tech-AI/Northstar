require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { connectDB, getDbStatus } = require('./config/db');
const { apiLimiter } = require('./middleware/rateLimit.middleware');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const preferenceRoutes = require('./routes/preference.routes');
const alertRoutes = require('./routes/alert.routes');
const searchHistoryRoutes = require('./routes/searchHistory.routes');
const weatherRoutes = require('./routes/weather.routes');

const app = express();
const PORT = process.env.PORT || 8000;
const CLIENT_ROOT = path.resolve(__dirname, '..');

connectDB();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://unpkg.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://*.tile.openstreetmap.org", "https://unpkg.com", "blob:"],
        connectSrc: [
          "'self'",
          "https://api.open-meteo.com",
          "https://air-quality-api.open-meteo.com",
          "https://geocoding-api.open-meteo.com",
          "https://api.bigdatacloud.net"
        ]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${PORT}`,
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    server: 'ok',
    database: getDbStatus()
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/favorites', apiLimiter, favoriteRoutes);
app.use('/api/v1/preferences', apiLimiter, preferenceRoutes);
app.use('/api/v1/alerts', apiLimiter, alertRoutes);
app.use('/api/v1/search-history', apiLimiter, searchHistoryRoutes);
app.use('/api/v1/weather', apiLimiter, weatherRoutes);

app.use(express.static(CLIENT_ROOT));

app.use('/api', notFoundHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_ROOT, 'index.html'));
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Northstar server listening on port ${PORT}`);
});

function gracefulShutdown() {
  console.log('Shutting down server gracefully');
  server.close(async () => {
    try {
      await mongoose.connection.close(false);
      console.log('MongoDB connection closed');
      process.exit(0);
    } catch (err) {
      console.error('Error closing database:', err.message);
      process.exit(1);
    }
  });
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = app;
