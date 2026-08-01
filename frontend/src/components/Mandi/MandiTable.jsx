import React from 'react';
import { LuStar, LuMapPin, LuCalendar, LuTrendingUp } from 'react-icons/lu';
import { formatINR, formatDate } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';

export default function MandiTable({ items }) {
  const { isCropFavorite, toggleFavoriteCrop } = useApp();

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
        <span className="text-4xl inline-block">🌾</span>
        <h3 className="text-lg font-black text-slate-900">No Mandi Prices Match Your Query</h3>
        <p className="text-slate-500 text-xs">Try clearing search filters or checking another commodity or state.</p>
      </div>
    );
  }

  return (
    <div className="hidden md:block bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-farmer-800 to-farmer-900 text-white text-xs uppercase font-black tracking-wider">
              <th className="py-4 px-6">Fav</th>
              <th className="py-4 px-6">Crop / Commodity</th>
              <th className="py-4 px-6">Market & Location</th>
              <th className="py-4 px-6 text-right">Min Price</th>
              <th className="py-4 px-6 text-right">Max Price</th>
              <th className="py-4 px-6 text-right">Modal Price (Avg)</th>
              <th className="py-4 px-6 text-center">Price Trend</th>
              <th className="py-4 px-6">Arrival Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-medium">
            {items.map((item, idx) => {
              const isFav = isCropFavorite(item.cropName);
              // Deterministic trend indicator simulation based on item ID
              const trendType = idx % 3 === 0 ? 'up' : idx % 3 === 1 ? 'flat' : 'down';
              const trendText = trendType === 'up' ? '+₹60' : trendType === 'down' ? '-₹30' : '0';

              return (
                <tr key={item.id} className="hover:bg-farmer-50/50 transition-colors group">
                  
                  {/* Bookmark Star */}
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleFavoriteCrop(item)}
                      className={`p-2 rounded-xl transition-all ${
                        isFav
                          ? 'text-amber-500 bg-amber-50 shadow-2xs'
                          : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                      }`}
                      title={isFav ? 'Remove Favorite' : 'Mark as Favorite'}
                    >
                      <LuStar className={`w-5 h-5 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </td>

                  {/* Crop Name */}
                  <td className="py-4 px-6 font-extrabold text-slate-900 group-hover:text-farmer-800">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🌾</span>
                      <div>
                        <span className="text-base">{item.cropName}</span>
                        <span className="block text-[11px] font-semibold text-slate-400">{item.category || 'Commodity'}</span>
                      </div>
                    </div>
                  </td>

                  {/* Market & Location */}
                  <td className="py-4 px-6 text-slate-700">
                    <div className="font-extrabold text-farmer-900 flex items-center gap-1.5">
                      <LuMapPin className="w-4 h-4 text-farmer-600 shrink-0" />
                      <span>{item.market}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium pl-5">
                      {item.district}, {item.state}
                    </div>
                  </td>

                  {/* Min Price */}
                  <td className="py-4 px-6 text-right font-bold text-slate-600">
                    {formatINR(item.minPrice)} <span className="text-[11px] text-slate-400 font-normal">/ {item.unit || 'Quintal'}</span>
                  </td>

                  {/* Max Price */}
                  <td className="py-4 px-6 text-right font-bold text-slate-600">
                    {formatINR(item.maxPrice)} <span className="text-[11px] text-slate-400 font-normal">/ {item.unit || 'Quintal'}</span>
                  </td>

                  {/* Modal Price (Avg) */}
                  <td className="py-4 px-6 text-right font-black text-farmer-800 text-base">
                    <span className="bg-farmer-100/90 text-farmer-900 px-3.5 py-1.5 rounded-xl border border-farmer-200/80 inline-block shadow-2xs">
                      {formatINR(item.modalPrice)}
                    </span>
                  </td>

                  {/* Trend Indicator */}
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black ${
                        trendType === 'up'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : trendType === 'down'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {trendType === 'up' ? '↑ ' : trendType === 'down' ? '↓ ' : '→ '}
                      {trendText}
                    </span>
                  </td>

                  {/* Arrival Date */}
                  <td className="py-4 px-6 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <LuCalendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(item.arrivalDate)}</span>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
