import React from 'react';
import { LuSearch, LuFilter, LuArrowUpDown, LuRefreshCw } from 'react-icons/lu';

export default function MandiFilters({
  filters,
  options,
  onFilterChange,
  onReset,
  loading,
  activeFilterCount = 0,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-4">
      
      {/* Top Search & Reset Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full sm:flex-1">
          <LuSearch className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search crop, state, market or district..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm font-medium"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors shrink-0"
        >
          <LuRefreshCw className="w-4 h-4 text-slate-500" />
          <span>Reset Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-farmer-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

      </div>

      {/* Dropdown Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        
        {/* Crop Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Crop / Commodity</label>
          <select
            value={filters.crop}
            onChange={(e) => onFilterChange('crop', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm font-semibold bg-white"
          >
            <option value="">All Crops</option>
            {options.crops.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">State</label>
          <select
            value={filters.state}
            onChange={(e) => onFilterChange('state', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm font-semibold bg-white"
          >
            <option value="">All States</option>
            {options.states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">District</label>
          <select
            value={filters.district}
            onChange={(e) => onFilterChange('district', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm font-semibold bg-white"
          >
            <option value="">All Districts</option>
            {options.districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Sort By</label>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              onFilterChange('sortBy', sortBy);
              onFilterChange('sortOrder', sortOrder);
            }}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm font-semibold bg-white"
          >
            <option value="modalPrice-desc">Price: High to Low</option>
            <option value="modalPrice-asc">Price: Low to High</option>
            <option value="cropName-asc">Crop Name: A to Z</option>
            <option value="market-asc">Market Name: A to Z</option>
          </select>
        </div>

      </div>

    </div>
  );
}
