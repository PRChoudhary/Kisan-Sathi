# 🌾 Kisan Sathi (किसान साथी) - Production Ready Farmer Web Application

**Kisan Sathi** is a modern, responsive, farmer-friendly full-stack web application designed for Indian farmers. It equips farmers with three essential modules:

1. **☀️ Live Weather & 7-Day Forecast** (GPS auto-location, Open-Meteo API, humidity, wind, rain probability, sunrise/sunset, city search, favorite locations).
2. **📈 Live Mandi Market Prices** (AGMARKNET data, search by crop/state/district/market, sorting, filtering, pagination, desktop table, mobile cards, favorite crops bookmarking).
3. **🗺️ Satellite Land Field Measurement** (React Leaflet satellite imagery, 3 methods: Tap Points, Manual Polygon Draw with Node Dragging, & Live GPS Walk Tracking, real-time conversion to **Square Meters, Square Feet, Acre, & Hectare**, save/rename/delete field boundaries).

---

## 🛠️ Technology Stack

* **Frontend**: React.js (Vite), JavaScript (ES6), Tailwind CSS, React Router DOM, Axios, React Hook Form, React Leaflet, React Icons
* **Backend**: Node.js, Express.js, JavaScript
* **Database & ORM**: PostgreSQL, Prisma ORM
* **Deployment Readiness**: Vercel (Frontend), Railway (All-in-One Node.js Backend API + PostgreSQL Database)

---

## 📂 Project Structure

```text
c:\Users\Owner\OneDrive\Documents\web development\Agri\
├── backend/
│   ├── config/
│   │   └── db.js                    # Prisma DB client instance
│   ├── controllers/
│   │   ├── authController.js        # Email, Google, Phone OTP auth logic
│   │   ├── weatherController.js     # Weather & Open-Meteo Geocoding API
│   │   ├── mandiController.js       # Mandi search, filtering, pagination
│   │   ├── fieldsController.js      # Saved field CRUD operations
│   │   └── favoritesController.js   # Favorite crops & locations
│   ├── data/
│   │   └── mandiData.js             # AGMARKNET Indian market dataset
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT protect & optional guest auth
│   │   └── errorMiddleware.js       # Centralized error handler
│   ├── prisma/
│   │   └── schema.prisma            # PostgreSQL Prisma schema (users, saved_fields, etc.)
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth routes
│   │   ├── weatherRoutes.js         # /api/weather routes
│   │   ├── mandiRoutes.js           # /api/mandi routes
│   │   ├── fieldsRoutes.js          # /api/fields routes
│   │   └── favoritesRoutes.js       # /api/favorites routes
│   ├── .env.example
│   ├── package.json
│   └── server.js                    # Express app entrypoint
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Top nav with mobile responsive drawer
    │   │   ├── Footer.jsx           # Footer with links & helpline
    │   │   ├── AuthModal.jsx        # Login/Register modal (Email, Google, Phone)
    │   │   ├── Weather/             # Current weather, 7-day forecast & city search
    │   │   ├── Mandi/               # Filters, desktop table, mobile cards, pagination
    │   │   └── LandMeasure/         # Satellite map, 3 methods, metrics, saved fields
    │   ├── context/
    │   │   ├── AuthContext.jsx      # Global authentication state
    │   │   └── AppContext.jsx       # Global favorites & saved fields state
    │   ├── pages/                   # Home, Weather, Mandi, Measure Land, About, Contact
    │   ├── services/
    │   │   └── api.js               # Axios API client
    │   ├── utils/
    │   │   ├── geoCalcs.js          # Geodesic area & perimeter formulas
    │   │   └── formatters.js        # INR formatting & date helpers
    │   ├── App.jsx
    │   ├── index.css                # Tailwind CSS + Leaflet overrides
    │   └── main.jsx
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## ⚡ Quick Start & Local Setup Guide

### 1. Prerequisites
* Node.js (v18 or higher recommended)
* npm or yarn
* PostgreSQL (Optional for local DB, fallback in-memory store works out-of-the-box!)

### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma Client (if DB URL is configured)
npx prisma generate

# Run Backend Server
npm run dev
# Server starts at http://localhost:5000
```

### 3. Frontend Setup
```bash
# Open a new terminal window
cd frontend
npm install

# Copy environment variables
cp .env.example .env

# Run Frontend Development Server
npm run dev
# App starts at http://localhost:3000
```

---

## 🌐 REST API Endpoints

### Weather
* `GET /api/weather?lat=28.6139&lon=77.2090` - Get weather by GPS coordinates
* `GET /api/weather/search?q=Ludhiana` - Search weather by city name

### Mandi Prices
* `GET /api/mandi` - List mandi prices with search, state, district, crop, market filters, sort, & pagination
* `GET /api/mandi/search` - Search mandi prices

### Land Fields
* `POST /api/fields` - Save a measured field polygon & area metrics
* `GET /api/fields` - List user's saved fields
* `PUT /api/fields/:id` - Rename or update saved field polygon
* `DELETE /api/fields/:id` - Delete a saved field

### Authentication & Favorites
* `POST /api/auth/register` - Email/Password registration
* `POST /api/auth/login` - Email/Password login
* `POST /api/auth/google` - Google authentication
* `POST /api/auth/phone-otp` - Phone OTP authentication
* `GET /api/favorites/crops` - Get user favorite crops
* `POST /api/favorites/crops` - Bookmark a crop
* `DELETE /api/favorites/crops/:id` - Remove crop bookmark

---

## 🚀 Deployment Guide

### Database (Supabase PostgreSQL)
1. Create a project on [Supabase](https://supabase.com/).
2. Copy the PostgreSQL connection URI from Database Settings.
3. In `backend/.env`, set `DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?schema=public"`.
4. Run `npx prisma db push` to push the schema tables.

### Backend Deployment (Railway)
1. Link your Git repository to [Railway](https://railway.app/).
2. Set Root Directory to `backend/`.
3. Add environment variables: `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`.
4. Build command: `npm install && npx prisma generate`.
5. Start command: `npm start`.

### Frontend Deployment (Vercel)
1. Link your Git repository to [Vercel](https://vercel.com/).
2. Set Framework Preset to **Vite**.
3. Set Root Directory to `frontend/`.
4. Add Environment Variable: `VITE_API_URL=https://your-railway-backend-url.up.railway.app/api`.
5. Click **Deploy**.

---

## 📄 License
Dedicated to the welfare of Indian Farmers. MIT License.
