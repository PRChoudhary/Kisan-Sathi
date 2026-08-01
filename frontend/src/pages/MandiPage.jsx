import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MandiFilters from '../components/Mandi/MandiFilters';
import MandiTable from '../components/Mandi/MandiTable';
import MandiCards from '../components/Mandi/MandiCards';
import Pagination from '../components/Mandi/Pagination';
import { SkeletonMandiRow } from '../components/UI/Skeleton';
import EmptyState from '../components/UI/EmptyState';
import { fetchMandiPrices } from '../services/api';
import { useApp } from '../context/AppContext';
import { LuStar, LuClock } from 'react-icons/lu';

export default function MandiPage() {
  const [data, setData]             = useState([]);
  const [filters, setFilters]       = useState({
    search: '', crop: '', state: '', district: '', market: '',
    sortBy: 'modalPrice', sortOrder: 'desc', page: 1, limit: 8,
  });
  const [options, setOptions]       = useState({ states: [], districts: [], crops: [], markets: [] });
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading]       = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
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
        if (res.data.filters) setOptions(res.data.filters);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (err) {
      console.error('Mandi fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPrices(); }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleReset = () => {
    setFilters({ search: '', crop: '', state: '', district: '', market: '', sortBy: 'modalPrice', sortOrder: 'desc', page: 1, limit: 8 });
    setShowOnlyFavorites(false);
  };

  const displayedItems = showOnlyFavorites
    ? data.filter(item => favoriteCrops.some(f => f.cropName === item.cropName))
    : data;

  const activeFilterCount = [filters.crop, filters.state, filters.district, filters.search].filter(Boolean).length;

  return (
    <div className="space-y-8 py-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-farmer-600 bg-farmer-50 px-3 py-1 rounded-full border border-farmer-200">
            Module 2
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-2">
            Live AGMARKNET Mandi Prices
          </h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Showing {totalCount} commodities
            </p>
            {lastUpdated && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                <LuClock className="w-3 h-3" /> Updated {lastUpdated}
              </span>
            )}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowOnlyFavorites(p => !p)}
          className={`px-5 py-3 rounded-2xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all ${
            showOnlyFavorites
              ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-300'
              : 'bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-50'
          }`}
        >
          <LuStar className={`w-5 h-5 ${showOnlyFavorites ? 'fill-slate-900' : 'text-amber-500'}`} />
          <span>
            {showOnlyFavorites ? 'Bookmarked Crops' : `Bookmarks (${favoriteCrops.length})`}
          </span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
        <MandiFilters
          filters={filters}
          options={options}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          loading={loading}
          activeFilterCount={activeFilterCount}
        />
      </motion.div>

      {/* Data */}
      {loading ? (
        <div className="bg-white dark:bg-[#111] rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden">
          {Array(6).fill(0).map((_, i) => <SkeletonMandiRow key={i} />)}
        </div>
      ) : displayedItems.length === 0 ? (
        <EmptyState
          icon="🌾"
          title="No Mandi Prices Found"
          description="No data matches your current filters. Try clearing some filters or searching a different commodity."
          actionLabel="Reset Filters"
          onAction={handleReset}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
        >
          <MandiTable items={displayedItems} />
          <MandiCards items={displayedItems} />
          {!showOnlyFavorites && (
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={(p) => setFilters(prev => ({ ...prev, page: p }))}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
