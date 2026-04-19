module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      api: 'contact-form',
      mongodb_uri_set: !!process.env.MONGODB_URI,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
