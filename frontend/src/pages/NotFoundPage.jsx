import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuHouse, LuArrowLeft } from 'react-icons/lu';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 space-y-8">
      
      {/* Animated 404 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative"
      >
        <div className="text-[120px] sm:text-[160px] font-black text-slate-100 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          🌾
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-3 max-w-md"
      >
        <h1 className="text-3xl font-black text-slate-900">Page Not Found</h1>
        <p className="text-slate-500 text-base leading-relaxed">
          This page seems to have wandered off into the fields. Let's get you back to Kisan Sathi.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-sm shadow-lg shadow-farmer-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <LuHouse className="w-4 h-4" />
          <span>Go to Dashboard</span>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all"
        >
          <LuArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </motion.div>

    </div>
  );
}
