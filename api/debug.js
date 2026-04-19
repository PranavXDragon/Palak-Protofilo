module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    // Log request details
    const requestInfo = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      body: req.body,
      timestamp: new Date().toISOString(),
    };

    // Check environment
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI ? '✅ CONFIGURED' : '❌ NOT SET',
      VERCEL: !!process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
    };

    // Check MongoDB connection
    let mongoStatus = '⏳ Not tested';
    try {
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState === 1) {
        mongoStatus = '✅ Connected';
      } else if (mongoose.connection.readyState === 0) {
        mongoStatus = '❌ Disconnected';
      } else {
        mongoStatus = '⏳ Connecting...';
      }
    } catch (error) {
      mongoStatus = '❌ Error: ' + error.message;
    }

    const debugInfo = {
      status: 'debug',
      requestInfo,
      envInfo,
      mongoStatus,
      nodeVersion: process.version,
      uptime: process.uptime(),
    };

    res.status(200).json(debugInfo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
