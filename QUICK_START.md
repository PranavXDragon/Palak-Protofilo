# Contact Form MongoDB Integration - Quick Start

## What Was Set Up

Your portfolio's contact form is now fully integrated with MongoDB Atlas to store all submissions. Here's what I've created:

### Backend Files
- **server.js** - Express server with MongoDB connection and contact form API endpoint
- **.env.example** - Template showing what environment variables you need
- **API_TESTING.js** - Examples for testing the API with different tools

### Updated Files
- **Contact.jsx** - Enhanced with API integration and loading/error states
- **vite.config.js** - Added proxy for development API calls
- **package.json** - Added backend dependencies and new npm scripts
- **.gitignore** - Added .env to prevent committing sensitive credentials

### Configuration Files
- **MONGODB_SETUP.md** - Complete setup guide (10 easy steps!)

---

## Quick Setup (5 minutes)

### 1️⃣ Create MongoDB Atlas Account
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up and create a FREE cluster
- Create database user with username/password

### 2️⃣ Get Connection String
In MongoDB Atlas:
- Click your cluster → Connect
- Choose "Drivers" → Node.js
- Copy the connection string provided

### 3️⃣ Create .env File
Create `.env` file in project root:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/palak-portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

⚠️ **Replace `username` and `password` with your database credentials!**

### 4️⃣ Run Both Servers
```bash
npm run dev:full
```

This runs:
- React frontend: http://localhost:5173
- Express backend: http://localhost:5000

### 5️⃣ Test It Out!
1. Open portfolio at http://localhost:5173
2. Go to Contact page
3. Fill in form and submit
4. You should see success message!
5. Check MongoDB Atlas → Collections to see saved message

---

## npm Scripts Available

```bash
npm run dev              # React frontend only (port 5173)
npm run server          # Express backend only (port 5000)
npm run dev:full        # Both frontend and backend together
npm run build           # Build for production
npm run preview         # Preview production build
```

---

## How It Works

### Frontend (React)
1. User fills contact form
2. Form validates client-side
3. Submits to `/api/contact` endpoint
4. Shows success/error message
5. Clears form on success

### Backend (Express + MongoDB)
1. Receives form data
2. Validates all fields:
   - fullname: 2-100 characters
   - email: valid email format
   - message: 10-5000 characters
3. Saves to MongoDB with metadata:
   - IP address of sender
   - User agent (browser info)
   - Timestamp
4. Returns success or error response

### Database (MongoDB)
- **Database:** palak-portfolio
- **Collection:** contacts
- **Each document stores:**
  - Sender's name, email, message
  - Status (new/read/replied)
  - IP address & user agent
  - Created/updated timestamps

---

## Important Notes

### Security
⚠️ **For Production:**
1. Never share your `.env` file
2. Restrict MongoDB network access to specific IPs
3. Use HTTPS
4. Add rate limiting
5. Add reCAPTCHA validation

### Environment Variables
- `.env` is in `.gitignore` - won't be committed
- Use `.env.example` as reference for required variables
- Always create `.env` file locally before running

### Connection Pool
- Configured for development environments
- Automatically handles 5 concurrent connections
- Closes idle connections after 30 seconds
- Production: May need adjustment based on traffic

---

## Troubleshooting

**"Cannot connect to MongoDB"**
- Verify connection string in .env
- Check MongoDB cluster is running
- Confirm your IP is whitelisted in Network Access
- Test connection: Check server logs for "Successfully connected to MongoDB Atlas"

**"Port 5000 already in use"**
- Change PORT in .env to different port (e.g., 5001)
- Or kill process using port: `netstat -ano | findstr :5000`

**"Form won't submit"**
- Check browser console for errors (F12)
- Verify backend is running on port 5000
- Check firewall isn't blocking localhost:5000

**"ValidationError" on submission**
- Message must be at least 10 characters
- Email must be valid format
- Full name required (2-100 characters)

---

## API Reference

### Submit Contact Form
**POST** `/api/contact`

**Request:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com", 
  "message": "Your message here (minimum 10 characters)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "id": "...",
    "fullname": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-04-19T10:30:00.000Z"
  }
}
```

---

## Next Steps

1. **Complete MongoDB Setup** (follow MONGODB_SETUP.md)
2. **Test the Form** (use Contact page or API_TESTING.js)
3. **View Your Data** (MongoDB Atlas → Collections)
4. **Deploy** (see MONGODB_SETUP.md for production steps)
5. **Add Features** (email notifications, admin dashboard, etc.)

---

## Files Summary

```
📁 Project Root
├── 📄 server.js                    ← Express backend
├── 📄 MONGODB_SETUP.md             ← Detailed setup guide
├── 📄 API_TESTING.js               ← Test examples
├── 📄 .env.example                 ← Template (copy to .env)
├── 📄 .env                         ← Your credentials (CREATE THIS)
├── 📄 vite.config.js               ← Updated with proxy
├── 📄 package.json                 ← Added backend dependencies
├── 📄 .gitignore                   ← Updated to ignore .env
└── 📁 src/components/pages/
    └── 📄 Contact.jsx              ← Updated with API integration
```

---

## Support Files

- **MONGODB_SETUP.md** - Step-by-step MongoDB Atlas setup guide
- **API_TESTING.js** - Examples for testing API endpoints
- **.env.example** - Reference for environment variables

---

## What's Next?

Ready for more features?
- 📧 Email notifications when form submitted
- 🔐 Admin panel to view/manage submissions  
- 🛡️ reCAPTCHA spam protection
- 📊 Submission analytics dashboard
- 💾 Export submissions to CSV

Let me know if you need help with any of these! 🚀
