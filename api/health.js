export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'Vercel',
    mongodb: process.env.MONGODB_URI ? 'configured' : 'not_configured',
  });
}
