# 🚀 BabyBliss Deployment Guide

This guide will help you deploy BabyBliss to production using **Vercel** (frontend) and **Render** (backend).

---

## 📋 Prerequisites

1. **GitHub Account** (for code hosting)
2. **Vercel Account** (free) - [Sign up here](https://vercel.com/signup)
3. **Render Account** (free) - [Sign up here](https://render.com/signup)
4. **MongoDB Atlas Account** (free) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)

---

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 Sandbox)
3. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Username: `babybliss_user`
   - Password: Generate a secure password (save it!)
4. Whitelist IP:
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (for demo) or add Render's IPs
5. Get connection string:
   - Go to **Database** → **Connect** → **Connect your application**
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<username>` and `<password>` with your actual credentials
   - Add database name: `mongodb+srv://...@cluster0.xxxxx.mongodb.net/babybliss_demo?retryWrites=true&w=majority`

---

## 🔧 Step 2: Deploy Backend (Render)

### 2.1 Push code to GitHub

```bash
# In your project root
git init
git add .
git commit -m "Initial commit: BabyBliss MERN stack"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/babybliss.git
git push -u origin main
```

### 2.2 Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `babybliss-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Any random secret string (e.g., `your_super_secret_jwt_key_123`)
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render sets this automatically, but include it)
6. Click **Create Web Service**
7. Wait for deployment (~2-3 minutes)
8. Copy your backend URL (e.g., `https://babybliss-api.onrender.com`)

---

## 🎨 Step 3: Deploy Frontend (Vercel)

### 3.1 Update Frontend API URL

Before deploying, update the frontend to use your Render backend URL:

1. In `client` folder, create `.env.production`:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   Replace `your-backend-url.onrender.com` with your actual Render URL.

### 3.2 Deploy on Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com`
6. Click **Deploy**
7. Wait for deployment (~1-2 minutes)
8. Your app will be live at `https://your-app.vercel.app`

**Option B: Via Vercel CLI**

```bash
cd client
npm i -g vercel
vercel
# Follow prompts:
# - Link to existing project? No
# - Project name: babybliss
# - Directory: ./
# - Override settings? No
vercel --prod
```

---

## ✅ Step 4: Verify Deployment

1. **Backend**: Visit `https://your-backend-url.onrender.com`
   - Should see: `{"message":"BabyBliss API running"}`

2. **Frontend**: Visit `https://your-app.vercel.app`
   - Should see BabyBliss homepage
   - Products should load from backend
   - Login should work (demo credentials)

---

## 🔄 Step 5: Update CORS (If Needed)

If you get CORS errors, update `server/server.js`:

```javascript
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

Then redeploy backend on Render.

---

## 📝 Environment Variables Summary

### Backend (Render)
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Random secret for JWT tokens
- `NODE_ENV` - `production`
- `PORT` - `10000` (auto-set by Render)

### Frontend (Vercel)
- `VITE_API_URL` - Your Render backend URL

---

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist includes Render IPs
- Verify connection string has correct username/password
- Ensure database name is in connection string

### Frontend can't reach backend
- Verify `VITE_API_URL` is set correctly in Vercel
- Check backend URL is accessible (visit it in browser)
- Check CORS settings in backend

### Products not loading
- Backend may be sleeping (free tier). First request takes ~30s to wake up
- Check browser console for errors
- Verify backend `/api/products` endpoint works

---

## 🎉 You're Done!

Your BabyBliss app is now live! Share your Vercel URL with others.

**Demo Credentials:**
- Email: `demo@babybliss.com`
- Password: `baby123`

---

## 📚 Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

