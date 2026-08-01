import React, { useState } from 'react';
import { LuSearch, LuMapPin, LuNavigation, LuBookmark } from 'react-icons/lu';
import { useApp } from '../../context/AppContext';

export default function LocationSearch({ onSearch, onUseGPS, loading }) {
  const [query, setQuery] = useState('');
  const { favoriteLocations } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 space-y-3">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <LuSearch className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, district, or village (e.g. Ludhiana, Nashik, Jaipur, Patna)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200/80 focus:outline-none focus:border-farmer-600 focus:ring-2 focus:ring-farmer-500/20 text-sm font-semibold bg-slate-50/50 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-farmer-600 hover:bg-farmer-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-farmer-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <LuSearch className="w-4 h-4" />
            <span>Search</span>
          </button>

          <button
            type="button"
            onClick={onUseGPS}
            disabled={loading}
            className="px-4 py-3 rounded-2xl bg-farmer-50 hover:bg-farmer-100 text-farmer-800 font-extrabold text-sm border border-farmer-200 flex items-center justify-center gap-2 transition-colors"
            title="Use current GPS Location"
          >
            <LuNavigation className="w-4 h-4 text-farmer-600" />
            <span className="hidden md:inline">Use GPS</span>
          </button>
        </div>
      </form>

      {/* Saved Favorite Locations Chips */}
      {favoriteLocations && favoriteLocations.length > 0 && (
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
          <span className="font-extrabold text-slate-500 flex items-center gap-1">
            <LuBookmark className="w-3.5 h-3.5 text-amber-500" /> Bookmarks:
          </span>
          {favoriteLocations.map((loc) => (
            <button
              key={loc.id || loc.locationName}
              onClick={() => onSearch(loc.locationName)}
              className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <LuMapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>{loc.locationName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
