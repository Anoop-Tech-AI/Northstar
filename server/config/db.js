const mongoose = require('mongoose');

const dns = require('dns');

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/northstar-weather';
  if (uri.startsWith('mongodb+srv://')) {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch {}
  }
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    isConnected = false;
    console.error('MongoDB connection error:', err.message);
    if (uri !== 'mongodb://127.0.0.1:27017/northstar-weather') {
      try {
        await mongoose.connect('mongodb://127.0.0.1:27017/northstar-weather', {
          serverSelectionTimeoutMS: 2000
        });
        isConnected = true;
        console.log('Fell back to local MongoDB successfully');
      } catch {}
    }
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
