import React from 'react';
import { LuDroplets, LuWind, LuCloudRain, LuSunrise, LuSunset, LuBookmark, LuBookmarkCheck, LuNavigation } from 'react-icons/lu';
import { useApp } from '../../context/AppContext';

export default function CurrentWeatherCard({ weather, onFavoriteToggle }) {
  const { isLocationFavorite } = useApp();
  if (!weather || !weather.current) return null;

  const { current, location, latitude, longitude } = weather;
  const isFav = isLocationFavorite(location);

  return (
    <div className="bg-gradient-to-br from-farmer-900 via-farmer-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden border border-farmer-700/60">
      
      {/* Background Radial Glow */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-start justify-between relative z-10 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-black text-amber-300 tracking-wide uppercase mb-1.5 shadow-2xs">
            <LuNavigation className="w-3.5 h-3.5" />
            <span>Live Weather Location</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{location}</h2>
          <p className="text-xs text-farmer-200 mt-1 font-medium">
            GPS Coordinates: {latitude.toFixed(2)}°N, {longitude.toFixed(2)}°E
          </p>
        </div>

        <button
          onClick={() => onFavoriteToggle(weather)}
          className={`p-3 rounded-2xl transition-all ${
            isFav
              ? 'bg-amber-400 text-slate-900 font-black shadow-lg shadow-amber-400/30 scale-105'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
          }`}
          title={isFav ? 'Remove Location Bookmark' : 'Save Location Bookmark'}
        >
          {isFav ? <LuBookmarkCheck className="w-6 h-6" /> : <LuBookmark className="w-6 h-6" />}
        </button>
      </div>

      {/* Primary Temperature Highlight */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 my-6 relative z-10">
        <div className="flex items-center gap-5">
          <span className="text-6xl sm:text-7xl font-black tracking-tight">
            {current.temperature}°C
          </span>
          <div className="border-l border-white/20 pl-5 py-1 space-y-1">
            <div className="text-4xl inline-block animate-pulse">{current.icon}</div>
            <p className="text-xl font-extrabold text-farmer-100">{current.condition}</p>
            <p className="text-xs text-farmer-300 font-medium">Feels like {current.feelsLike}°C</p>
          </div>
        </div>
      </div>

      {/* 5-Metric SaaS Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-6 border-t border-white/15 relative z-10 text-xs">
        
        {/* Humidity */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-sky-300 font-bold">
            <LuDroplets className="w-4 h-4" />
            <span>Humidity</span>
          </div>
          <p className="text-lg font-black text-white">{current.humidity}%</p>
        </div>

        {/* Wind Speed */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-teal-300 font-bold">
            <LuWind className="w-4 h-4" />
            <span>Wind Speed</span>
          </div>
          <p className="text-lg font-black text-white">{current.windSpeed} km/h</p>
        </div>

        {/* Rain Probability */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-blue-300 font-bold">
            <LuCloudRain className="w-4 h-4" />
            <span>Rain Chance</span>
          </div>
          <p className="text-lg font-black text-white">{current.rainProbability}%</p>
        </div>

        {/* Sunrise */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <LuSunrise className="w-4 h-4" />
            <span>Sunrise</span>
          </div>
          <p className="text-lg font-black text-white">{current.sunrise}</p>
        </div>

        {/* Sunset */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 text-orange-300 font-bold">
            <LuSunset className="w-4 h-4" />
            <span>Sunset</span>
          </div>
          <p className="text-lg font-black text-white">{current.sunset}</p>
        </div>

      </div>

    </div>
  );
}
