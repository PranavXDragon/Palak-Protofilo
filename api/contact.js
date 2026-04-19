const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

console.log('[CONTACT] API Loading...');
console.log('[CONTACT] MongoDB URI set:', !!mongoUri);

const contactSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

let Contact;

const connectDB = async () => {
  console.log('[CONTACT] Checking MongoDB connection...');
  
  if (mongoose.connection.readyState === 1) {
    console.log('[CONTACT] Already connected');
    if (mongoose.models.Contact) {
      Contact = mongoose.models.Contact;
    } else {
      Contact = mongoose.model('Contact', contactSchema);
    }
    return;
  }
  
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    console.log('[CONTACT] Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('[CONTACT] Connected successfully');
    
    if (mongoose.models.Contact) {
      Contact = mongoose.models.Contact;
    } else {
      Contact = mongoose.model('Contact', contactSchema);
    }
  } catch (error) {
    console.error('[CONTACT] Connection error:', error.message);
    throw error;
  }
};

module.exports = async (req, res) => {
  console.log('\n[CONTACT] ========== REQUEST ==========');
  console.log('[CONTACT] Method:', req.method);
  console.log('[CONTACT] URL:', req.url);
  console.log('[CONTACT] Body:', req.body);
  console.log('[CONTACT] ============================\n');

  // Set headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    console.log('[CONTACT] CORS preflight');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('[CONTACT] Wrong method:', req.method);
    return res.status(405).json({ 
      error: 'Method not allowed',
      received: req.method,
    });
  }

  try {
    console.log('[CONTACT] Processing form submission...');
    
    await connectDB();
    console.log('[CONTACT] DB connected');

    const { fullname, email, message } = req.body;

    if (!fullname || !email || !message) {
      console.log('[CONTACT] Missing fields:', { fullname, email, message });
      return res.status(400).json({ 
        error: 'Missing required fields',
        received: { fullname: !!fullname, email: !!email, message: !!message },
      });
    }

    console.log('[CONTACT] Saving contact:', { fullname, email });
    
    const newContact = new Contact({ fullname, email, message });
    const saved = await newContact.save();
    
    console.log('[CONTACT] Saved successfully:', saved._id);

    return res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: {
        id: saved._id,
        fullname: saved.fullname,
        email: saved.email,
      }
    });
  } catch (error) {
    console.error('[CONTACT] Error:', error.message);
    console.error('[CONTACT] Stack:', error.stack);
    
    return res.status(500).json({ 
      error: error.message || 'Server error',
      type: error.name,
    });
  }
};
