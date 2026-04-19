module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    // Check MongoDB connection
    let mongoStatus = '⏳ Not initialized';
    let mongoConnected = false;
    try {
      const mongoose = require('mongoose');
      const state = mongoose.connection.readyState;
      if (state === 1) {
        mongoStatus = '✅ Connected';
        mongoConnected = true;
      } else if (state === 0) {
        mongoStatus = '❌ Disconnected (0)';
      } else if (state === 2) {
        mongoStatus = '⏳ Connecting (2)';
      } else {
        mongoStatus = `❓ Unknown state (${state})`;
      }
    } catch (error) {
      mongoStatus = '❌ ' + error.message;
    }

    // Environment info
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      MONGODB_URI_SET: !!process.env.MONGODB_URI,
      MONGODB_URI_PREVIEW: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 50) + '...' : 'NOT SET',
      VERCEL: !!process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV || 'not vercel',
    };

    const debugInfo = {
      status: 'debug_info',
      timestamp: new Date().toISOString(),
      environment: envInfo,
      mongodb: {
        status: mongoStatus,
        connected: mongoConnected,
      },
      nodeVersion: process.version,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };

    res.status(200).json(debugInfo);
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({
      error: 'debug_error',
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    });
  }
};
