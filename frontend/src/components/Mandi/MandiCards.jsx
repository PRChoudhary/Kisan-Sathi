import React from 'react';
import { LuStar, LuMapPin, LuCalendar, LuTrendingUp } from 'react-icons/lu';
import { formatINR, formatDate } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';

export default function MandiCards({ items }) {
  const { isCropFavorite, toggleFavoriteCrop } = useApp();

  if (!items || items.length === 0) {
    return (
      <div className="md:hidden bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-xs space-y-2">
        <span className="text-4xl inline-block">🌾</span>
        <h3 className="text-base font-black text-slate-900">No Mandi Prices Found</h3>
        <p className="text-slate-500 text-xs">Try resetting your search query or dropdown filters.</p>
      </div>
    );
  }

  return (
    <div className="md:hidden space-y-4">
      {items.map((item, idx) => {
        const isFav = isCropFavorite(item.cropName);
        const trendType = idx % 3 === 0 ? 'up' : idx % 3 === 1 ? 'flat' : 'down';
        const trendText = trendType === 'up' ? '+₹60' : trendType === 'down' ? '-₹30' : '0';

        return (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 relative"
          >
            {/* Top Bar: Crop Name + Star + Trend Badge */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌾</span>
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {item.cropName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-farmer-800 bg-farmer-50 px-2 py-0.5 rounded-md border border-farmer-200">
                      {item.category || 'Commodity'}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        trendType === 'up'
                          ? 'bg-emerald-100 text-emerald-800'
                          : trendType === 'down'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {trendType === 'up' ? '↑ ' : trendType === 'down' ? '↓ ' : '→ '}
                      {trendText}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleFavoriteCrop(item)}
                className={`p-2.5 rounded-xl transition-all ${
                  isFav
                    ? 'text-amber-500 bg-amber-50 shadow-2xs'
                    : 'text-slate-300 hover:text-amber-500 bg-slate-50'
                }`}
                title={isFav ? 'Remove Favorite' : 'Mark as Favorite'}
              >
                <LuStar className={`w-6 h-6 ${isFav ? 'fill-amber-400' : ''}`} />
              </button>
            </div>

            {/* Location Details */}
            <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center justify-between text-xs border border-slate-100">
              <div className="flex items-center gap-2 font-extrabold text-slate-800">
                <LuMapPin className="w-4 h-4 text-farmer-600 shrink-0" />
                <span>{item.market} ({item.district}, {item.state})</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 font-medium">
                <LuCalendar className="w-3.5 h-3.5" />
                <span>{formatDate(item.arrivalDate)}</span>
              </div>
            </div>

            {/* Price Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              
              {/* Min */}
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Min Price</p>
                <p className="text-xs font-black text-slate-700 mt-0.5">{formatINR(item.minPrice)}</p>
              </div>

              {/* Modal (Avg) */}
              <div className="bg-farmer-600 text-white p-2.5 rounded-2xl shadow-md shadow-farmer-600/20">
                <p className="text-[10px] font-bold uppercase tracking-wider text-farmer-200">Modal Price</p>
                <p className="text-sm font-black mt-0.5">{formatINR(item.modalPrice)}</p>
              </div>

              {/* Max */}
              <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Max Price</p>
                <p className="text-xs font-black text-slate-700 mt-0.5">{formatINR(item.maxPrice)}</p>
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}
