# 🔧 Vercel Deployment Fix Guide

## Common Issues & Solutions

### ✅ Fixed Issues:

1. **Removed hardcoded proxy URL** from `vite.config.mts`
   - Proxy only works in dev mode, not in production builds
   - Production uses `VITE_API_URL` environment variable

2. **Updated `vercel.json`** with proper headers for PWA files
   - Added cache headers for service worker
   - Added manifest.json content-type header

3. **Build configuration** added to `vite.config.mts`
   - Explicit output directory: `dist`
   - Assets directory: `assets`

---

## 🚀 Deployment Steps:

### 1. Set Environment Variable in Vercel

**Important:** You MUST set the `VITE_API_URL` environment variable in Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (your Render backend URL)
   - **Environment**: Production, Preview, Development (select all)
4. **Redeploy** after adding the variable

### 2. Vercel Project Settings

In Vercel dashboard → **Settings** → **General**:

- **Framework Preset**: Vite
- **Root Directory**: `client` (if deploying from monorepo)
- **Build Command**: `npm run build` (should auto-detect)
- **Output Directory**: `dist` (should auto-detect)
- **Install Command**: `npm install` (should auto-detect)

### 3. Common Build Errors & Fixes

#### Error: "Cannot find module 'react-hot-toast'"
**Fix**: Make sure `package.json` includes `react-hot-toast` in dependencies (already fixed ✅)

#### Error: "Failed to resolve import"
**Fix**: 
- Check all imports use correct paths (`.jsx` extensions)
- Ensure all dependencies are in `package.json`

#### Error: "Build output not found"
**Fix**:
- Verify `outputDirectory` in `vercel.json` is `dist`
- Check that `vite.config.mts` has `build.outDir: 'dist'`

#### Error: "Environment variable not found"
**Fix**:
- Set `VITE_API_URL` in Vercel environment variables
- **Important**: Vite env vars must start with `VITE_`
- Redeploy after adding env vars

#### Error: "Service worker registration failed"
**Fix**:
- This is normal in dev, but check that `service-worker.js` is in the root of `client/` folder
- Vercel should serve it from the root

---

## 📋 Pre-Deployment Checklist:

- [ ] `VITE_API_URL` environment variable set in Vercel
- [ ] All dependencies in `package.json`
- [ ] `vercel.json` exists and is correct
- [ ] `vite.config.mts` has build config
- [ ] `service-worker.js` is in `client/` root
- [ ] `manifest.json` is in `client/` root
- [ ] No hardcoded localhost URLs in production code
- [ ] All API calls use `import.meta.env.VITE_API_URL`

---

## 🧪 Test Build Locally:

Before deploying, test the build:

```bash
cd client
npm run build
npm run preview
```

Visit `http://localhost:4173` and check:
- ✅ App loads
- ✅ Products fetch from API (check Network tab)
- ✅ No console errors
- ✅ Service worker registers (check Application tab)

---

## 🔍 Debugging Deployment:

### Check Build Logs:
1. Go to Vercel dashboard → **Deployments**
2. Click on failed deployment
3. Check **Build Logs** tab for errors

### Common Log Errors:

**"Module not found"**
- Missing dependency → Add to `package.json` and redeploy

**"Cannot read property of undefined"**
- Check environment variables are set
- Check API URL is correct

**"Build timeout"**
- Free tier has 45s limit
- Check for slow dependencies or large files

---

## 📞 Still Having Issues?

1. **Check Vercel Build Logs** - Most errors are shown there
2. **Verify Environment Variables** - Must be set in Vercel dashboard
3. **Test Local Build** - `npm run build` should work locally
4. **Check File Structure** - Ensure all files are in correct locations

---

## ✅ Expected Result:

After successful deployment:
- ✅ App loads at `https://your-app.vercel.app`
- ✅ Products load from backend API
- ✅ Login works (demo credentials)
- ✅ Cart persists (localStorage)
- ✅ PWA installable (on supported browsers)

