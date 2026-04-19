module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  res.status(200).json({
    message: 'API is working',
    time: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      debug: '/api/debug',
      contact: '/api/contact (POST)',
    },
    mongodb: {
      configured: !!process.env.MONGODB_URI,
    },
  });
};
