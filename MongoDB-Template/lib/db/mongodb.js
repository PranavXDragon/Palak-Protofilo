import mongoose from 'mongoose';

// MongoDB connection cached globally to reuse across serverless invocations
// This prevents creating new connections on every API request
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with optimized connection pooling.
 * Configuration is optimized for Next.js API routes.
 * 
 * Pool sizing rationale:
 * - maxPoolSize: 10 - Typical Next.js deployments have moderate concurrency
 * - minPoolSize: 2 - Maintain a few warm connections for faster response times
 * - maxIdleTimeMS: 60000 - Release unused connections after 1 minute
 * - serverSelectionTimeoutMS: 5000 - Quick failover for topology changes
 */
export async function connectDB() {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // If promise exists, wait for it to resolve (handles concurrent requests)
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    cached.promise = mongoose
      .connect(uri, {
        // Connection pool configuration
        maxPoolSize: 10,        // Maximum 10 connections in the pool
        minPoolSize: 2,         // Maintain at least 2 ready connections
        maxIdleTimeMS: 60000,   // Prune idle connections after 1 minute
        
        // Timeout settings
        serverSelectionTimeoutMS: 5000,  // Fail fast on server unavailability
        socketTimeoutMS: 45000,           // 45 second timeout for socket operations
        
        // Connection behavior
        retryWrites: true,      // Automatically retry writes in transaction scenarios
        w: 'majority',          // Wait for majority acknowledgment on writes
      })
      .then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB connection failed:', err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
