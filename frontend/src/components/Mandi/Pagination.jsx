import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm mt-6">
      <div className="text-xs font-bold text-slate-500">
        Page <span className="text-farmer-700 text-sm font-extrabold">{currentPage}</span> of <span className="text-slate-800">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 font-bold text-slate-700 transition-colors"
          title="Previous Page"
        >
          <LuChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 font-bold text-slate-700 transition-colors"
          title="Next Page"
        >
          <LuChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
