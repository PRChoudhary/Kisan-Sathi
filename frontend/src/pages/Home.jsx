import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LuCloudSun, LuTrendingUp, LuMapPin, LuArrowRight, LuCheck,
  LuSparkles, LuBot, LuDroplets, LuWind, LuLeaf, LuStar
} from 'react-icons/lu';
import { formatINR } from '../utils/formatters';
import { useApp } from '../context/AppContext';

// ── Static data (shown until live data loads) ──
const TOP_PRICES = [
  { crop: 'Wheat (Gehun)',   market: 'Khanna Mandi, Punjab',      price: 2360, change: '+₹50',  trend: 'up'   },
  { crop: 'Paddy Basmati',   market: 'Amritsar, Punjab',          price: 4050, change: '+₹120', trend: 'up'   },
  { crop: 'Cotton (Kapas)',  market: 'Gondal, Gujarat',           price: 7200, change: '-₹40',  trend: 'down' },
  { crop: 'Onion (Pyaz)',    market: 'Lasalgaon, Maharashtra',    price: 1850, change: '0',      trend: 'flat' },
];

const QUICK_ACTIONS = [
  { label: 'Weather',      sub: '7-Day Forecast',   to: '/weather',       icon: '🌤️', color: 'from-sky-500   to-cyan-400'    },
  { label: 'Mandi Rates',  sub: 'Live AGMARKNET',   to: '/mandi',         icon: '📈', color: 'from-farmer-700 to-farmer-500' },
  { label: 'Measure Land', sub: 'Satellite + GPS',  to: '/measure-land',  icon: '🗺️', color: 'from-amber-600  to-amber-400'  },
  { label: 'AI Copilot',   sub: 'Ask anything',     to: '/ai-assistant',  icon: '🤖', color: 'from-violet-600 to-purple-500' },
];

// ── Framer helpers ──
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const child = {
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getDate() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function Home() {
  const { favoriteCrops, savedFields, favoriteLocations } = useApp();

  const greeting = useMemo(() => getGreeting(), []);
  const dateStr  = useMemo(() => getDate(), []);

  return (
    <div className="space-y-10 py-6">

      {/* ══════════════════════════════════════
          HERO 
          ══════════════════════════════════════ */}
      <motion.section
        {...fadeUp(0)}
        className="relative overflow-hidden bg-gradient-to-br from-farmer-900 via-farmer-800 to-slate-900 text-white rounded-3xl p-8 md:p-14 shadow-2xl border border-farmer-700/50"
      >
        {/* Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-farmer-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-5 relative z-10">

          {/* Greeting */}
          <div className="space-y-1">
            <p className="text-farmer-300 text-sm font-semibold">{dateStr}</p>
            <h2 className="text-2xl font-black text-white/90">{greeting}, Kisan! 🌅</h2>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-extrabold tracking-wide text-amber-300">
            <LuSparkles className="w-4 h-4" />
            <span>Smart SaaS Platform for Indian Farmers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            Everything a Farmer Needs{' '}
            <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-farmer-300 via-emerald-200 to-amber-300">
              in One Digital Workspace
            </span>
          </h1>

          <p className="text-base text-farmer-100/90 font-medium leading-relaxed max-w-2xl">
            Access hyper-local weather, live AGMARKNET mandi rates, satellite land measurement, and your AI Copilot — all in one place.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
              <Link
                to="/measure-land"
                className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-sm shadow-xl shadow-amber-400/25 flex items-center gap-3 transition-colors"
              >
                <span>Measure Land Field</span>
                <LuArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <Link
              to="/ai-assistant"
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <LuBot className="w-5 h-5 text-amber-300" />
              <span>Ask AI Copilot</span>
            </Link>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 mt-10 border-t border-white/15 relative z-10 text-xs font-bold text-farmer-200">
          {[
            'Zero Sign-In Required for All Features',
            'Satellite & Geodesic Field Calculations',
            'Real-time AGMARKNET Mandi Integration',
          ].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <LuCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          QUICK ACTION GRID 
          ══════════════════════════════════════ */}
      <motion.section {...fadeUp(0.1)} className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">Quick Access</h2>
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {QUICK_ACTIONS.map((qa) => (
            <motion.div key={qa.to} variants={child} whileHover={{ y: -4 }}>
              <Link
                to={qa.to}
                className={`flex flex-col justify-between h-36 p-5 rounded-3xl bg-gradient-to-br ${qa.color} text-white shadow-xl hover:shadow-2xl transition-all relative overflow-hidden`}
              >
                <div className="absolute -bottom-4 -right-4 text-7xl opacity-20 select-none">{qa.icon}</div>
                <span className="text-3xl">{qa.icon}</span>
                <div>
                  <p className="text-sm font-black leading-tight">{qa.label}</p>
                  <p className="text-[11px] text-white/70 font-medium mt-0.5">{qa.sub}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════
          LIVE STATS ROW 
          ══════════════════════════════════════ */}
      <motion.section
        {...fadeUp(0.18)}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            label:   'Current Weather',
            value:   '29°C',
            sub:     'Partly Cloudy · Rain 25%',
            icon:    '⛅',
            accent:  'text-sky-600',
            bg:      'bg-sky-50',
          },
          {
            label:   'Top Mandi Crop',
            value:   '₹4,050',
            sub:     'Paddy Basmati / Quintal',
            icon:    '📈',
            accent:  'text-farmer-700',
            bg:      'bg-farmer-50',
          },
          {
            label:   'Saved Fields',
            value:   savedFields.length > 0 ? `${savedFields[0].areaAcres} ac` : '—',
            sub:     savedFields.length > 0 ? `${savedFields.length} field${savedFields.length !== 1 ? 's' : ''} saved` : 'No fields yet',
            icon:    '🗺️',
            accent:  'text-amber-700',
            bg:      'bg-amber-50',
          },
          {
            label:   'Bookmarked Crops',
            value:   favoriteCrops.length > 0 ? String(favoriteCrops.length) : '—',
            sub:     favoriteCrops.length > 0 ? favoriteCrops.slice(0, 2).map(c => c.cropName).join(', ') : 'None bookmarked yet',
            icon:    '⭐',
            accent:  'text-violet-700',
            bg:      'bg-violet-50',
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -3 }}
            className={`${stat.bg} rounded-2xl p-5 border border-white shadow-sm space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">{stat.label}</span>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className={`text-2xl font-black ${stat.accent}`}>{stat.value}</p>
            <p className="text-[11px] text-slate-500 font-medium truncate">{stat.sub}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ══════════════════════════════════════
          AI ADVISORY BANNER 
          ══════════════════════════════════════ */}
      <motion.section
        {...fadeUp(0.25)}
        className="bg-gradient-to-r from-amber-500/10 via-farmer-500/10 to-emerald-500/10 rounded-3xl p-6 border border-amber-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="p-3.5 rounded-2xl bg-amber-400 text-slate-900 shrink-0 shadow-md"
          >
            <LuBot className="w-6 h-6" />
          </motion.div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
              AI Agricultural Advisory
            </span>
            <p className="text-base font-black text-slate-900 dark:text-white mt-1">
              "Favorable dry conditions today for Wheat harvesting in Northern & Western regions."
            </p>
          </div>
        </div>
        <Link
          to="/ai-assistant"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shrink-0 flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
        >
          <span>Ask AI Assistant</span>
          <LuArrowRight className="w-4 h-4" />
        </Link>
      </motion.section>

      {/* ══════════════════════════════════════
          CORE MODULE CARDS 
          ══════════════════════════════════════ */}
      <motion.section {...fadeUp(0.3)} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Core Modules</h2>
            <p className="text-slate-500 text-xs mt-0.5">Real-time data and tools designed for high efficiency.</p>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Weather */}
          <motion.div variants={child} whileHover={{ y: -4 }}
            className="bg-white dark:bg-[#111] rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between card-hover"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <LuCloudSun className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Current Weather</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  GPS-based weather, 7-day forecasts, humidity, wind, and rain probability.
                </p>
              </div>
              <div className="bg-sky-50 p-3 rounded-2xl border border-sky-100 flex items-center justify-between text-xs font-bold text-sky-900">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌤️</span>
                  <span>29°C Partly Cloudy</span>
                </div>
                <span className="text-[11px] text-sky-700 flex items-center gap-1">
                  <LuDroplets className="w-3 h-3" /> 25%
                </span>
              </div>
            </div>
            <div className="pt-6">
              <Link to="/weather" className="w-full py-3 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors">
                Open Weather Forecast <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Mandi */}
          <motion.div variants={child} whileHover={{ y: -4 }}
            className="bg-white dark:bg-[#111] rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between card-hover"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-farmer-700 flex items-center justify-center">
                <LuTrendingUp className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Live Mandi Prices</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  AGMARKNET market crop rates, state filtering, trend badges, and bookmarks.
                </p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs font-bold text-farmer-900">
                <div>
                  <p className="text-[11px] text-farmer-600">Top Crop Today</p>
                  <p className="text-sm font-black">Wheat (Gehun)</p>
                </div>
                <span className="bg-farmer-600 text-white px-2.5 py-1 rounded-xl text-xs font-black">
                  ₹2,360/qtl
                </span>
              </div>
            </div>
            <div className="pt-6">
              <Link to="/mandi" className="w-full py-3 px-4 rounded-xl bg-farmer-50 hover:bg-farmer-100 text-farmer-800 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors">
                View Live Mandi Rates <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Measure Land */}
          <motion.div variants={child} whileHover={{ y: -4 }}
            className="bg-white dark:bg-[#111] rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between card-hover"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <LuMapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Measure Land Field</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Satellite mapping with 3 methods: Tap Points, Drag Nodes, or GPS Walk Track.
                </p>
              </div>
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 flex items-center justify-between text-xs font-bold text-amber-900">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🗺️</span>
                  <span>Instant Calculations</span>
                </div>
                <span className="text-[11px] font-black text-amber-800 uppercase">Acres / Hectares</span>
              </div>
            </div>
            <div className="pt-6">
              <Link to="/measure-land" className="w-full py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors">
                Start Field Measure <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════
          TOP MANDI PRICE WIDGET 
          ══════════════════════════════════════ */}
      <motion.section {...fadeUp(0.35)} className="bg-white dark:bg-[#111] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              📈 Today's Top Market Rates
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Live price indicators across major Indian APMC Mandis.</p>
          </div>
          <Link to="/mandi" className="text-xs font-extrabold text-farmer-700 hover:text-farmer-800 flex items-center gap-1 hover:underline">
            View All <LuArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2"
        >
          {TOP_PRICES.map((item, idx) => (
            <motion.div
              key={idx}
              variants={child}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4 border border-slate-200/60 dark:border-white/10 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 truncate pr-2">{item.market}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 ${
                  item.trend === 'up'   ? 'bg-emerald-100 text-emerald-800' :
                  item.trend === 'down' ? 'bg-red-100    text-red-800'     :
                                          'bg-slate-200  text-slate-700'
                }`}>
                  {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'} {item.change}
                </span>
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.crop}</h4>
              <p className="text-lg font-black text-farmer-700">
                {formatINR(item.price)} <span className="text-xs text-slate-400 font-normal">/ qtl</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

    </div>
  );
}
