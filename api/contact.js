const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

console.log('📝 Contact API Loading...');
console.log('MongoDB URI configured:', !!mongoUri);

const contactSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

let Contact;

const connectDB = async () => {
  console.log('🔄 Checking MongoDB connection...');
  console.log('Connection state:', mongoose.connection.readyState);
  
  if (mongoose.connection.readyState === 1) {
    console.log('✅ Already connected to MongoDB');
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
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected successfully');
    
    if (mongoose.models.Contact) {
      Contact = mongoose.models.Contact;
    } else {
      Contact = mongoose.model('Contact', contactSchema);
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = async (req, res) => {
  console.log('\n========== CONTACT API REQUEST ==========');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('=========================================\n');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('✅ OPTIONS request - CORS preflight');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔄 Starting form submission process...');
    
    await connectDB();
    console.log('✅ Database connected');

    const { fullname, email, message } = req.body;

    console.log('📦 Received data:', { fullname, email, message });

    if (!fullname || !email || !message) {
      console.log('❌ Missing fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('✅ All fields present, saving to database...');
    
    const newContact = new Contact({ fullname, email, message });
    const saved = await newContact.save();
    
    console.log('✅ Contact saved:', saved._id);

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: saved 
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
