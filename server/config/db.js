const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/northstar-weather';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    isConnected = false;
    console.error('MongoDB connection error:', err.message);
  }
}

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

mongoose.connection.on('connected', () => {
  isConnected = true;
});

function getDbStatus() {
  return isConnected && mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
}

module.exports = { connectDB, getDbStatus };
