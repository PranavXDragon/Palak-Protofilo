import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection Configuration
// Following MongoDB Connection Optimizer best practices for serverless-like pattern
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster.mongodb.net/palak-portfolio?retryWrites=true&w=majority';

// Connection options optimized for serverless environments
const mongoOptions = {
  maxPoolSize: 5,           // Serverless-optimized small pool
  minPoolSize: 0,           // No idle connections maintained
  maxIdleTimeMS: 30000,     // 30s idle timeout for connection cleanup
  connectTimeoutMS: 10000,  // 10s connection timeout
  socketTimeoutMS: 30000,   // 30s socket timeout
  serverSelectionTimeoutMS: 5000, // 5s server selection timeout
};

// Connect to MongoDB Atlas
mongoose.connect(mongoUri, mongoOptions)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });

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
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Create Contact model
const Contact = mongoose.model('Contact', contactSchema);

// API Routes

/**
 * POST /api/contact
 * Submit a new contact form message
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { fullname, email, message } = req.body;

    // Validation
    if (!fullname || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Create new contact document
    const newContact = new Contact({
      fullname,
      email,
      message,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    // Save to MongoDB
    const savedContact = await newContact.save();

    // Return success response
    res.status(201).json({
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
    console.error('Contact form submission error:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }

    // Handle duplicate email within time period (optional)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email has already submitted a message recently. Please wait before sending another.',
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Contact API: POST http://localhost:${PORT}/api/contact`);
  console.log(`💚 Health check: GET http://localhost:${PORT}/api/health`);
});
