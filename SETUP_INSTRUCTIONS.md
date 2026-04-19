SETUP_INSTRUCTIONS.md

# React Portfolio Setup Instructions

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Copy Assets
The image assets from the original `assets/images/` folder need to be available to the React app.

### Option A: Copy images to public folder
Copy all files from `assets/images/` to `public/` folder:
- Copy all `.png` files (avatars, my-avatar)
- Copy all `.jpg` and `.jpg` files (projects, blogs)
- Copy all `.svg` files (icons)
- Copy `logo.ico`

So your public folder should look like:
```
public/
├── avatar-1.png
├── avatar-2.png
├── avatar-3.png
├── avatar-4.png
├── blog-1.jpg
├── blog-2.jpg
├── ...
├── icon-design.svg
├── icon-dev.svg
├── icon-app.svg
├── icon-photo.svg
├── icon-quote.svg
├── logo-1-color.png
├── logo-2-color.png
├── ...
├── my-avatar.png
├── project-1.jpg
├── project-2.png
├── ...
└── logo.ico
```

### Option B: Use Vite's asset import (recommended)
Alternatively, keep images in `src/assets/` and import them directly in components. This is more optimal for production builds.

## Step 3: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Step 4: Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## Customization

### Update Portfolio Information
Edit the data in the components:
- `src/components/Sidebar.jsx` - Your personal info
- `src/components/pages/About.jsx` - Services and testimonials
- `src/components/pages/Resume.jsx` - Education, experience, skills
- `src/components/pages/Portfolio.jsx` - Project list
- `src/components/pages/Blog.jsx` - Blog posts
- `src/components/pages/Contact.jsx` - Contact info

### Change Styling
Edit `src/styles/style.css` to customize colors, fonts, and layout.

### Update Social Links
Edit the social links in `src/components/Sidebar.jsx`:
```jsx
<a href="https://facebook.com/yourprofile" className="social-link">
  <ion-icon name="logo-facebook"></ion-icon>
</a>
```

## Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Vercel automatically detects Vite and deploys

### Deploy to Netlify
1. Build locally: `npm run build`
2. Connect `dist` folder to Netlify
3. Or use Netlify CLI: `netlify deploy`

### Deploy to GitHub Pages
```bash
npm run build
# Push dist folder contents to gh-pages branch
```

## Troubleshooting

### Images not showing?
- Ensure images are in the `public/` folder
- Check image paths in components (should start with `/`)
- Verify file names match exactly (case-sensitive)

### Styling not applying?
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server: Stop and run `npm run dev` again

### Port 5173 already in use?
- Kill the process or run: `npm run dev -- --port 3000`

## Next Steps

1. Copy your image assets to public folder
2. Run `npm install`
3. Run `npm run dev`
4. Start customizing your portfolio!

