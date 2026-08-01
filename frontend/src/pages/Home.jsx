import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LuCloudSun, 
  LuTrendingUp, 
  LuMapPin, 
  LuArrowRight, 
  LuShieldCheck, 
  LuCheck, 
  LuSparkles,
  LuBot,
  LuCompass,
  LuDroplets,
  LuWind
} from 'react-icons/lu';
import { formatINR } from '../utils/formatters';

export default function Home() {
  const topMandiHighlights = [
    { crop: 'Wheat (Gehun)', market: 'Khanna Mandi, Punjab', price: 2360, change: '+₹50', trend: 'up' },
    { crop: 'Paddy Basmati', market: 'Amritsar, Punjab', price: 4050, change: '+₹120', trend: 'up' },
    { crop: 'Cotton (Kapas)', market: 'Gondal, Gujarat', price: 7200, change: '-₹40', trend: 'down' },
    { crop: 'Onion (Pyaz)', market: 'Lasalgaon, Maharashtra', price: 1850, change: '0', trend: 'flat' }
  ];

  return (
    <div className="space-y-12 py-6">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-farmer-900 via-farmer-800 to-slate-900 text-white rounded-3xl p-8 md:p-14 shadow-2xl border border-farmer-700/50">
        
        {/* Subtle Background Glow Spheres */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-farmer-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-extrabold tracking-wide text-amber-300 shadow-xs">
            <LuSparkles className="w-4 h-4" />
            <span>Smart SaaS Platform for Indian Farmers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            Everything a Farmer Needs <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-farmer-300 via-emerald-200 to-amber-300">
              in One Digital Workspace
            </span>
          </h1>

          <p className="text-base sm:text-lg text-farmer-100/90 font-medium leading-relaxed max-w-2xl">
            Access hyper-local weather predictions, live AGMARKNET mandi rates with trend indicators, satellite land measurement, and our AI Copilot.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/measure-land"
              className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-sm shadow-xl shadow-amber-400/25 flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Measure Land Field</span>
              <LuArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/ai-assistant"
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <LuBot className="w-5 h-5 text-amber-300" />
              <span>Ask AI Copilot</span>
            </Link>
          </div>
        </div>

        {/* Highlighted Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 mt-10 border-t border-white/15 relative z-10 text-xs font-bold text-farmer-200">
          <div className="flex items-center gap-2">
            <LuCheck className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Zero Sign-In Required for All Features</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCheck className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Satellite & Geodesic Field Calculations</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCheck className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Real-time AGMARKNET Mandi Integration</span>
          </div>
        </div>

      </section>

      {/* AI RECOMMENDATION BANNER */}
      <section className="bg-gradient-to-r from-amber-500/10 via-farmer-500/10 to-emerald-500/10 rounded-3xl p-6 border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-900 font-bold shrink-0 shadow-md">
            <LuBot className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
              AI Agricultural Advisory
            </span>
            <h3 className="text-base font-black text-slate-900 mt-1">
              "Favorable dry conditions today for Wheat harvesting in Northern & Western regions."
            </h3>
          </div>
        </div>

        <Link
          to="/ai-assistant"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shrink-0 flex items-center gap-2 shadow-sm"
        >
          <span>Ask AI Assistant</span>
          <LuArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* THREE CORE SERVICE MODULE CARDS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Core Modules</h2>
            <p className="text-slate-500 text-xs mt-0.5">Explore real-time data and tools designed for high efficiency.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Weather Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                <LuCloudSun className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Current Weather</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  GPS location weather, 7-day forecasts, humidity, wind, and rain probability.
                </p>
              </div>

              {/* Quick Weather Live Pill */}
              <div className="bg-sky-50 p-3 rounded-2xl border border-sky-100 flex items-center justify-between text-xs font-bold text-sky-900">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌤️</span>
                  <span>29°C Partly Cloudy</span>
                </div>
                <span className="text-[11px] text-sky-700">Rain: 25%</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/weather"
                className="w-full py-3 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Open Weather Forecast</span>
                <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mandi Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-farmer-700 flex items-center justify-center font-bold">
                <LuTrendingUp className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Live Mandi Prices</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  AGMARKNET market crop rates, district filtering, price trend badges, and bookmarks.
                </p>
              </div>

              {/* Top Crop Price Snippet */}
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
              <Link
                to="/mandi"
                className="w-full py-3 px-4 rounded-xl bg-farmer-50 hover:bg-farmer-100 text-farmer-800 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Live Mandi Rates</span>
                <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Measure Land Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm card-hover flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <LuMapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Measure Land Field</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Satellite mapping with 3 methods: Tap Points, Drag Nodes, or GPS Walk Track.
                </p>
              </div>

              {/* Measurement Pill */}
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 flex items-center justify-between text-xs font-bold text-amber-900">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🗺️</span>
                  <span>Instant Calculations</span>
                </div>
                <span className="text-[11px] font-black text-amber-800 uppercase">Acres / Hectares</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/measure-land"
                className="w-full py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Start Field Measure</span>
                <LuArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* TOP MANDI HIGHLIGHTS WIDGET WITH TREND INDICATORS */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>📈 Today's Top Market Rates & Price Trends</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Live price indicators across major Indian APMC Mandis.</p>
          </div>
          <Link
            to="/mandi"
            className="text-xs font-extrabold text-farmer-700 hover:text-farmer-800 flex items-center gap-1 hover:underline"
          >
            <span>View All</span>
            <LuArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {topMandiHighlights.map((item, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{item.market}</span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                    item.trend === 'up'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.trend === 'down'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.trend === 'up' ? '↑ ' : item.trend === 'down' ? '↓ ' : '→ '}
                  {item.change}
                </span>
              </div>
              <h4 className="font-extrabold text-base text-slate-900">{item.crop}</h4>
              <p className="text-lg font-black text-farmer-700">
                {formatINR(item.price)} <span className="text-xs text-slate-400 font-normal">/ qtl</span>
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
