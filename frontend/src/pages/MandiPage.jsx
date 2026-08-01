import React, { useState, useEffect } from 'react';
import MandiFilters from '../components/Mandi/MandiFilters';
import MandiTable from '../components/Mandi/MandiTable';
import MandiCards from '../components/Mandi/MandiCards';
import Pagination from '../components/Mandi/Pagination';
import { fetchMandiPrices } from '../services/api';
import { useApp } from '../context/AppContext';
import { LuStar, LuWheat } from 'react-icons/lu';

export default function MandiPage() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    crop: '',
    state: '',
    district: '',
    market: '',
    sortBy: 'modalPrice',
    sortOrder: 'desc',
    page: 1,
    limit: 8
  });

  const [options, setOptions] = useState({ states: [], districts: [], crops: [], markets: [] });
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { favoriteCrops } = useApp();

  const loadPrices = async () => {
    setLoading(true);
    try {
      const res = await fetchMandiPrices(filters);
      if (res.data?.success) {
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalCount(res.data.totalCount);
        if (res.data.filters) {
          setOptions(res.data.filters);
        }
      }
    } catch (err) {
      console.error('Failed to load Mandi prices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to page 1 on filter change
    }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      crop: '',
      state: '',
      district: '',
      market: '',
      sortBy: 'modalPrice',
      sortOrder: 'desc',
      page: 1,
      limit: 8
    });
    setShowOnlyFavorites(false);
  };

  const displayedItems = showOnlyFavorites
    ? data.filter(item => favoriteCrops.some(f => f.cropName === item.cropName))
    : data;

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-farmer-600 bg-farmer-50 px-3 py-1 rounded-full border border-farmer-200">
            Module 2
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
            Live AGMARKNET Mandi Prices
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time daily market rates across Indian mandis. Showing {totalCount} commodities.
          </p>
        </div>

        {/* Favorite Filter Toggle */}
        <button
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`px-5 py-3 rounded-2xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all ${
            showOnlyFavorites
              ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-300'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <LuStar className={`w-5 h-5 ${showOnlyFavorites ? 'fill-slate-900' : 'text-amber-500'}`} />
          <span>{showOnlyFavorites ? 'Showing Bookmarked Crops' : `Bookmarked Crops (${favoriteCrops.length})`}</span>
        </button>
      </div>

      {/* Filter Component */}
      <MandiFilters
        filters={filters}
        options={options}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        loading={loading}
      />

      {/* Data Views */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm animate-pulse text-slate-400 font-bold">
          Updating Mandi Prices...
        </div>
      ) : (
        <>
          <MandiTable items={displayedItems} />
          <MandiCards items={displayedItems} />

          {!showOnlyFavorites && (
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={(p) => setFilters(prev => ({ ...prev, page: p }))}
            />
          )}
        </>
      )}

    </div>
  );
}
