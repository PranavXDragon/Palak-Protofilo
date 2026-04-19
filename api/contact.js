const mongoose = require('mongoose');

// MongoDB Connection Configuration
const mongoUri = process.env.MONGODB_URI || '';

const mongoOptions = {
  maxPoolSize: 5,
  minPoolSize: 0,
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 5000,
};

// Contact Form Schema
const contactSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

let Contact;
let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log('📦 Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(mongoUri, mongoOptions);
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas');
    
    // Create model - check if already exists
    if (mongoose.models.Contact) {
      Contact = mongoose.models.Contact;
    } else {
      Contact = mongoose.model('Contact', contactSchema);
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
    return;
  }

  try {
    console.log('📨 New contact form submission received');

    // Connect to MongoDB
    await connectDB();

    const { fullname, email, message } = req.body;

    // Validation
    if (!fullname || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    console.log(`Received: ${fullname}, ${email}`);

    // Create new contact document
    const newContact = new Contact({
      fullname,
      email,
      message,
      ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    });

    // Save to MongoDB
    const savedContact = await newContact.save();
    console.log(`✅ Contact saved with ID: ${savedContact._id}`);

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        id: savedContact._id,
        fullname: savedContact.fullname,
        email: savedContact.email,
        createdAt: savedContact.createdAt,
      },
    });
  } catch (error) {
    console.error('❌ Contact form submission error:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }

    // Handle duplicate email
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email has already submitted a message recently.',
      });
    }

    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
