# Deploy to Vercel - Quick Guide

Your portfolio is now ready to deploy to Vercel! Follow these steps:

## Step 1: Push to GitHub

```bash
git add -A
git commit -m "Prepare for Vercel deployment: add serverless API routes and Vercel config"
git push
```

## Step 2: Create Vercel Account

1. Go to: **https://vercel.com/signup**
2. Sign up (you can use GitHub, Google, or email)

## Step 3: Import Project from GitHub

1. Go to: **https://vercel.com/new**
2. Click **Import Git Repository**
3. Paste your GitHub URL: `https://github.com/PranavXDragon/Palak-Protofilo`
4. Click **Import**

## Step 4: Configure Environment Variables

In the Vercel dashboard:

1. Click your project
2. Go to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://Palak:Palak2026@palakprofile.31s1llj.mongodb.net/?appName=PalakProfile`
   - Click **Add**

## Step 5: Deploy

1. Click **Deploy**
2. Wait for deployment to complete (2-3 minutes)
3. You'll get a domain like: `https://palak-protofilo.vercel.app`

## Step 6: Test

1. Open your Vercel URL
2. Go to Contact page
3. Submit the form
4. Should show: ✅ **Message sent successfully!**

---

## ✅ What Changed

- Created `/api/contact.js` - Serverless function for form submissions
- Created `/api/health.js` - Health check endpoint
- Created `vercel.json` - Vercel configuration
- Updated `Contact.jsx` - Uses relative API paths
- Contact form now uses `/api/contact` (works on localhost and Vercel)

## 🚀 After Deployment

- Frontend hosted on Vercel
- Backend API on Vercel serverless functions
- MongoDB Atlas connection from Vercel servers
- Custom domain support (optional)

## Local Testing

To test locally before deploying:

```bash
npm run dev:full
```

The contact form will still try `/api/contact` which works with Vite's proxy and also with Vercel!

---

## Troubleshooting

**Form not working on Vercel?**
- Check Environment Variables are set
- Verify MongoDB URI is correct
- Check Vercel logs: Project → Deployments → Logs

**Need to update MongoDB URI?**
- Go to Vercel Settings → Environment Variables
- Edit `MONGODB_URI`
- Redeploy

**Want custom domain?**
- Vercel Settings → Domains
- Add your domain (e.g., palak-portfolio.com)
- Follow DNS setup instructions
