# MongoDB Connection Troubleshooting Guide

## Current Issue: querySrv ECONNREFUSED

The error you're seeing means the server **cannot resolve the MongoDB connection string**.

### What This Means:
```
querySrv ECONNREFUSED _mongodb._tcp.palakprofile.31s1llj.mongodb.net
```

This happens when:
1. ❌ MongoDB Atlas cluster is **PAUSED** (not running)
2. ❌ Your IP is **NOT whitelisted** in Network Access
3. ❌ Your **internet connection** is having DNS issues
4. ❌ The **cluster is provisioning** (taking too long to start)

---

## Quick Fix Checklist

### ✅ Step 1: Start Your MongoDB Cluster (MOST COMMON ISSUE)

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Log in with your MongoDB account
3. Click **Databases** in the left sidebar
4. Look for **palakprofile** cluster
5. If it says **PAUSED** → Click the ▶️ **Play Button** to start it
6. Wait until it shows **RUNNING** (usually 2-5 minutes)

**Screenshot hint:** You should see a green "RUNNING" badge next to your cluster

---

### ✅ Step 2: Verify Network Access

1. Click on your **palakprofile** cluster
2. Go to **Security** → **Network Access**
3. Look for your IP address in the list
4. If you don't see **0.0.0.0/0 (Allow Access from Anywhere)**, add it:
   - Click **Add IP Address**
   - Click **Allow Access from Anywhere**
   - Click **Confirm**

**Note:** "Allow from Anywhere" is fine for development. For production, whitelist specific IPs.

---

### ✅ Step 3: Verify Your Credentials

1. Go to **Security** → **Database Access**
2. Look for user **Palak**
3. Verify the password is **Palak2026**
4. If unsure, you can reset the password or create a new user

---

### ✅ Step 4: Restart Your Servers

Stop the server (Ctrl+C in terminal), then:

```bash
npm run dev:full
```

Or if running separately:
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server
```

---

## How to Know It's Working

### ✅ Success Indicators (look for these in console):

**Backend Console:**
```
✅ Successfully connected to MongoDB Atlas
🚀 Server running on http://localhost:5000
```

**Contact Form:**
- No error message shown
- Form can be submitted
- Shows "✅ Message sent successfully!"
- Message appears in MongoDB Atlas → Collections

---

## Testing the Connection

### Test 1: Check Server Health
Open this in browser while servers are running:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "healthy",
  "database": {
    "connected": true,
    "state": 1,
    "uri": "configured"
  }
}
```

If database shows `connected: false`, then MongoDB isn't reachable.

---

### Test 2: Try the Contact Form
1. Open http://localhost:5173
2. Go to Contact page
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message (must be 10+ characters)
4. Click "Send Message"
5. Wait 2-3 seconds for response

**Expected Success Response:**
```
✅ Message sent successfully! Thank you for reaching out.
```

**Expected Error (if DB not connected):**
```
❌ Database connection unavailable. Please try again in a moment.
ℹ️ MongoDB cluster may not be running. Check your cluster status in MongoDB Atlas.
```

---

## Verify Message Was Saved

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **Databases**
3. Click your **palakprofile** cluster
4. Click **Collections** tab
5. Find the **palak-portfolio** database
6. Click **contacts** collection
7. You should see your submitted message!

---

## Common Issues & Solutions

### Issue: "Server error: 500"

**Cause:** Usually means MongoDB connection failed or there's an unhandled error

**Solution:**
1. Check cluster is RUNNING (not paused)
2. Check server console for specific error message
3. Make sure your IP is whitelisted
4. Try again after 1-2 minutes if cluster is provisioning

---

### Issue: "Server error: 503"

**Cause:** Database is temporarily unavailable

**Solution:**
1. Confirm cluster is running
2. Wait 30 seconds and try again
3. Restart backend server: Stop (Ctrl+C) and `npm run server`

---

### Issue: Form doesn't respond at all

**Cause:** Backend server not running

**Solution:**
```bash
npm run dev:full
```
You should see both ports start:
- Frontend: 5173
- Backend: 5000

---

### Issue: "Connection refused" in browser

**Cause:** Backend server isn't running

**Solution:**
```bash
# Check if server is running
npm run server

# You should see:
# 🚀 Server running on http://localhost:5000
```

---

## Environment Variables Verification

Your `.env` file should have:
```
MONGODB_URI=mongodb+srv://Palak:Palak2026@palakprofile.31s1llj.mongodb.net/?appName=PalakProfile
PORT=5000
NODE_ENV=development
```

❌ **DO NOT** commit this file (it's in `.gitignore`)

---

## Advanced: Check MongoDB Connection Directly

From terminal (requires MongoDB CLI tools):
```bash
# Test connection
mongo "mongodb+srv://Palak:Palak2026@palakprofile.31s1llj.mongodb.net/?appName=PalakProfile"
```

---

## Still Having Issues?

1. **Check MongoDB Status Page:** https://cloud.mongodb.com/status
2. **Verify credentials** are exactly: Palak / Palak2026
3. **Check cluster name** in connection string: palakprofile
4. **Wait for cluster to provision** - first cluster can take 10+ minutes
5. **Check your internet** - DNS resolution might be blocked
6. **Try from incognito/private browser** to rule out caching

---

## Server Logs Explained

**✅ Good:**
```
✅ Successfully connected to MongoDB Atlas
🚀 Server running on http://localhost:5000
```

**⚠️ Warning (but OK):**
```
❌ MongoDB connection error: querySrv ECONNREFUSED
⚠️ Server will continue running, but database operations will fail
```

**🔴 Bad:**
```
Cannot find module 'express'
```
→ Run `npm install`

---

## Next Steps After Connection Works

1. Test form submission from Contact page
2. Verify message in MongoDB Collections
3. Optionally add email notifications
4. Plan production deployment
5. Consider adding more fields to the form

---

## Summary

| Issue | Solution |
|-------|----------|
| querySrv ECONNREFUSED | Start MongoDB cluster (click play button) |
| Server error: 500 | Check cluster is running + network access |
| Server error: 503 | Database temporarily down, wait and retry |
| Form doesn't respond | Start backend: `npm run server` |
| Can't find message in DB | Check Collections → palak-portfolio → contacts |

**Most Common Fix:** Start your MongoDB cluster from the dashboard! 🚀
