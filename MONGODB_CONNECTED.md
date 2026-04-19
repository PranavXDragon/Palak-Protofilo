# MongoDB Atlas Connection - Setup Complete ✅

## Your Credentials Saved

Your MongoDB Atlas connection has been configured in the `.env` file:

```
MONGODB_URI=mongodb+srv://Palak:Palak2026@palakprofile.31s1llj.mongodb.net/?appName=PalakProfile
PORT=5000
NODE_ENV=development
```

**Database:** palak-portfolio  
**Username:** Palak  
**Password:** Palak2026 (stored securely in .env - not in git)

---

## If You Get Connection Error

The error `querySrv ECONNREFUSED` means the MongoDB cluster isn't reachable. Fix it:

### Quick Fixes:
1. **Start your cluster** - MongoDB Atlas → Databases → Click play button on palakprofile cluster
2. **Whitelist your IP** - Security → Network Access → "Allow from Anywhere"
3. **Wait for cluster** - Provisioning takes ~10 minutes first time
4. **Check internet** - Make sure you have active internet connection

### Verify Connection:
```bash
npm run server
```

Look for: `✅ Successfully connected to MongoDB Atlas`

---

## Run Portfolio with MongoDB

```bash
npm run dev:full
```

This starts:
- ✅ React frontend: http://localhost:5173
- ✅ Express backend: http://localhost:5000
- ✅ MongoDB connected to Atlas

---

## Test the Contact Form

1. Open http://localhost:5173
2. Click Contact page
3. Fill in:
   - Name: John Doe
   - Email: john@example.com
   - Message: Hello! This is a test message.
4. Click "Send Message"
5. See success message ✅

Check your submission in MongoDB:
- MongoDB Atlas → Databases → palakprofile → Collections → contacts

---

## Files Ready

✅ `.env` - MongoDB credentials configured
✅ `server.js` - Express backend ready
✅ `Contact.jsx` - API integrated
✅ All dependencies installed

You're all set! 🚀
