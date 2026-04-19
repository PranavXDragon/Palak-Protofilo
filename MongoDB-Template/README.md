# MongoDB Template for Next.js Projects

This folder contains a reusable MongoDB setup template for Next.js projects. Use this to quickly integrate MongoDB into any new Next.js project.

## Files Included

- **lib/db/mongodb.js** - MongoDB connection function with connection pooling
- **lib/models/Contact.js** - Example Mongoose model for contact messages
- **api/contact/route.js** - Example API route for POST/GET contact operations
- **.env.example** - Environment variable template
- **jsconfig.json** - Path alias configuration

## How to Use

1. Copy this entire folder to your Next.js project root
2. Install dependencies (if not already installed):
   ```bash
   npm install mongoose dotenv
   ```
3. Create `.env.local` in your project root:
   ```bash
   cp .env.example .env.local
   ```
4. Update `.env.local` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority
   ```
5. Copy the folder structure into your project:
   - Copy `lib/` folder to your `app/lib/` directory
   - Copy `api/` folder to your `app/api/` directory
   - Merge `jsconfig.json` with your existing one

6. Update API imports if your app structure differs (adjust `@/app/lib/...` paths as needed)

## Getting MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a cluster (free tier available)
3. Click "Connect" → "Drivers"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<database>` with your values

## Important - MongoDB Atlas Setup

Before deploying:
1. Go to MongoDB Atlas → Your Cluster → **Network Access**
2. Add your IP or use `0.0.0.0/0` for development
3. For Vercel deployment, add Vercel's IP or use `0.0.0.0/0`

## File Structure

```
MongoDB-Template/
├── lib/
│   ├── db/
│   │   └── mongodb.js          (Connection logic)
│   └── models/
│       └── Contact.js          (Example model)
├── api/
│   └── contact/
│       └── route.js            (Example API routes)
├── .env.example                (Environment template)
├── jsconfig.json               (Path aliases)
└── README.md                   (This file)
```

## Customization

To use with different models/collections:

1. Create new model files in `lib/models/` (copy Contact.js as template)
2. Create new API routes in `app/api/` 
3. Import and use `connectDB()` in your routes
4. Update MongoDB collections and schemas as needed

## Example Usage in API Route

```javascript
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db/mongodb';
import YourModel from '@/app/lib/models/YourModel';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const result = await YourModel.create(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

## Troubleshooting

**Error: "Can't resolve '@/app/lib/db/mongodb'"**
- Make sure `jsconfig.json` is in your project root
- Verify paths in imports match your folder structure

**Error: "MONGODB_URI not defined"**
- Create `.env.local` file with your connection string
- Restart your dev server after updating .env.local

**Connection Refused Error**
- Add your IP to MongoDB Atlas Network Access
- Or use `0.0.0.0/0` to allow all IPs (development only)

---

Created for easy MongoDB integration in Next.js projects ✅
