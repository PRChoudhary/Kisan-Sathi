# 🚀 Railway & Vercel Production Deployment Guide - Kisan Sathi

This guide provides simplified step-by-step instructions for deploying **Kisan Sathi** using:
- **Backend & PostgreSQL Database**: **Railway** (All-in-One Backend + PostgreSQL)
- **Frontend**: **Vercel**

---

## 🚂 Step 1: Deploy Backend & PostgreSQL Database on Railway

Railway allows hosting both your Express Node.js Backend API and PostgreSQL Database in the exact same project workspace with zero external services required!

### 1.1 Create Railway Project & PostgreSQL Database
1. Go to [Railway.app](https://railway.app/) and log in with GitHub.
2. Click **New Project** -> **Provision PostgreSQL**.
3. Railway will spin up a managed PostgreSQL database container instantly.

### 1.2 Connect Express Backend API
1. Click **+ New** in the same Railway project canvas -> **GitHub Repo**.
2. Select your `Agri` / `Hotel--booking` repository.
3. In the service settings:
   - Set **Root Directory** to `/backend`.
4. Go to **Variables** tab for the backend service:
   - Click **Add Reference** -> Select `DATABASE_URL` from your Railway PostgreSQL service (Railway automatically links the connection variable `${{Postgres.DATABASE_URL}}`).
   - Add `JWT_SECRET`: A secure random secret key (e.g. `kisan_sathi_production_secret_2026`).
   - Add `NODE_ENV`: `production`.
5. Railway will automatically run:
   - `npm install`
   - `npm run postinstall` (Generates Prisma Client)
   - `npm start` (Runs `prisma db push` to push schema tables & starts Express server).

6. Go to **Settings** -> **Networking** -> Click **Generate Domain**.
   - Copy your live Railway Backend URL (e.g., `https://kisan-sathi-backend.up.railway.app`).

---

## ⚡ Step 2: Deploy Frontend on Vercel

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Set **Root Directory** to `frontend`.
5. Under **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: `https://kisan-sathi-backend.up.railway.app/api` (your Railway Backend URL from Step 1)
6. Click **Deploy**.

---

## 🧪 Step 3: Verification & Test Checklist

1. **Health Check**: Open `https://kisan-sathi-backend.up.railway.app/api/health` in browser. Expect `{"status": "OK"}`.
2. **Weather API**: Open Vercel app, test GPS weather detection or search for "Ludhiana" or "Jaipur".
3. **Mandi Prices API**: Test crop search ("Wheat", "Onion"), state filter, sorting, and pagination.
4. **Satellite Measure Land**: Tap corners on satellite map, verify area calculation in **Acres, Hectares, Sq Meters, Sq Feet**, and save field to Railway PostgreSQL database.
