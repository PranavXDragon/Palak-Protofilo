# MongoDB Atlas Contact Form Setup Guide

This guide will walk you through connecting your portfolio's contact form to MongoDB Atlas.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Sign Up** (or Sign In if you have an account)
3. Complete the registration process

## Step 2: Create a Free Cluster

1. After logging in, click **Create a Deployment**
2. Select **MongoDB Atlas** 
3. Choose **Free** tier (M0 cluster)
4. Select your preferred cloud provider and region (use closest to your location)
5. Click **Create** and wait for cluster to be provisioned (~10 minutes)

## Step 3: Set Up Database Access

1. In the left sidebar, go to **Security** → **Database Access**
2. Click **Add New Database User**
3. Create a username and password (save these!)
4. Click **Add User**

## Step 4: Configure Network Access

1. In the left sidebar, go to **Security** → **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development; restrict in production)
4. Click **Confirm**

## Step 5: Get Your Connection String

1. Go back to **Databases** in the left sidebar
2. Find your cluster and click **Connect**
3. Choose **Drivers**
4. Select **Node.js** and version **4.x or later**
5. Copy the connection string provided

Your connection string should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

**Note:** Replace `username` and `password` with your database credentials from Step 3

## Step 6: Set Up Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/palak-portfolio?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```

3. **Never commit `.env` to git** - it's already in `.gitignore`

## Step 7: Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `mongoose` - MongoDB ODM (Object Data Mapper)
- `cors` - Enable cross-origin requests
- `dotenv` - Load environment variables
- `concurrently` - Run frontend & backend simultaneously

## Step 8: Run Development Servers

### Option 1: Run both servers with one command
```bash
npm run dev:full
```

This will:
- Start React dev server on http://localhost:5173
- Start Express server on http://localhost:5000

### Option 2: Run separately in different terminals

Terminal 1 - React Frontend:
```bash
npm run dev
```

Terminal 2 - Express Backend:
```bash
npm run server
```

## Step 9: Test the Connection

1. Open http://localhost:5173 in your browser
2. Navigate to the **Contact** page
3. Fill out the form and click **Send Message**
4. You should see: ✅ "Message sent successfully!"

## Step 10: View Your Data in MongoDB Atlas

1. Go back to MongoDB Atlas
2. Click on your cluster
3. Click **Collections** tab
4. You should see a `palak-portfolio` database with a `contacts` collection
5. Click on the collection to see your submitted messages

---

## Troubleshooting

### "Connection refused" error
- Make sure MongoDB Atlas cluster is running (check **Databases** tab)
- Verify your connection string is correct
- Check that your IP is whitelisted in **Network Access**

### "Cannot GET /api/contact"
- Make sure backend server is running (`npm run server`)
- Check that the proxy is set up correctly in `vite.config.js`

### "ValidationError: email"
- Verify email format is valid
- Message validation requires 10+ characters

### "Cannot find module 'mongoose'"
- Run `npm install` again
- Verify all dependencies installed: `npm list`

### Port already in use
If port 5000 or 5173 is already in use:
```bash
# Change port in .env
PORT=5001

# Or kill process using the port (Windows):
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## Project Structure

```
vcard-personal-portfolio/
├── server.js                 # Express backend server
├── src/
│   └── components/
│       └── pages/
│           └── Contact.jsx   # Updated with API calls
├── .env                      # Your MongoDB credentials (don't commit!)
├── .env.example              # Template for .env
├── vite.config.js            # Proxy configuration added
└── package.json              # Backend dependencies added
```

---

## API Endpoint

### POST /api/contact

**Request:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to discuss a project."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "fullname": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-04-19T10:30:00.000Z"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Database Schema

The contact form saves documents with this structure:

```javascript
{
  _id: ObjectId,
  fullname: String,      // Required, 2-100 characters
  email: String,         // Required, valid email format
  message: String,       // Required, 10-5000 characters
  status: String,        // 'new' | 'read' | 'replied' (default: 'new')
  ipAddress: String,     // Captured automatically
  userAgent: String,     // Captured automatically
  createdAt: Date,       // Timestamp
  updatedAt: Date        // Timestamp
}
```

---

## Next Steps

1. **Production Deployment:**
   - Deploy backend to Heroku, Railway, or Vercel
   - Update frontend API endpoint
   - Restrict MongoDB network access to your server IP

2. **Email Notifications:**
   - Integrate SendGrid or Gmail API
   - Send confirmation emails to users
   - Notify yourself of new submissions

3. **Admin Dashboard:**
   - Create admin panel to view/reply to messages
   - Add message filtering and search
   - Track message status

4. **Security Enhancements:**
   - Add rate limiting to prevent spam
   - Implement reCAPTCHA validation
   - Add CSRF protection

---

## Security Tips

⚠️ **Important for Production:**

1. **Never expose `.env` file:**
   - Add `.env` to `.gitignore` (already done)
   - Use environment variables in hosting platform

2. **Database Access:**
   - Restrict MongoDB network access to specific IPs
   - Use strong passwords for database users
   - Enable IP whitelisting

3. **API Security:**
   - Add rate limiting (express-rate-limit)
   - Validate and sanitize all inputs
   - Use HTTPS in production
   - Add CORS restrictions

4. **Error Handling:**
   - Don't expose sensitive errors to clients
   - Log errors securely on server
   - Monitor for suspicious activity

---

## Support

For more information:
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
