import React from 'react';
import { LuWheat, LuShield, LuHeart, LuUsers, LuCheck } from 'react-icons/lu';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      
      <div className="text-center space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-farmer-100 text-farmer-800 font-extrabold text-xs tracking-wider uppercase">
          Empowering Indian Agriculture
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900">
          About Kisan Sathi
        </h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
          Kisan Sathi is built with a singular mission: providing Indian farmers with simple, high-technology digital tools to make informed agricultural decisions.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-farmer-100 text-farmer-700 flex items-center justify-center font-bold">
            <LuWheat className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Eliminating technical barriers for farmers by combining satellite technology, weather forecasting, and live crop price aggregation into one clean, accessible platform.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <LuShield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Data Integrity</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Integrating directly with Open-Meteo weather models and AGMARKNET agricultural market listings ensures accurate, transparent daily rates and forecasts.
          </p>
        </div>
      </div>

      {/* Values List */}
      <div className="bg-farmer-800 text-white rounded-3xl p-8 space-y-6">
        <h3 className="text-2xl font-black">Key Principles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-farmer-100">
          <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl">
            <LuCheck className="w-5 h-5 text-amber-300 shrink-0" />
            <span>Zero Mandatory Login (Guest Friendly)</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl">
            <LuCheck className="w-5 h-5 text-amber-300 shrink-0" />
            <span>High Contrast Farmer Friendly UI</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl">
            <LuCheck className="w-5 h-5 text-amber-300 shrink-0" />
            <span>Free Access to All Features</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl">
            <LuCheck className="w-5 h-5 text-amber-300 shrink-0" />
            <span>Mobile, Tablet & Desktop Support</span>
          </div>
        </div>
      </div>

    </div>
  );
}
