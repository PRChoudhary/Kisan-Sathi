import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';

export default function EmptyState({
  icon = '🌾',
  title = 'Nothing to show',
  description = 'There is no data available right now.',
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 px-8 text-center space-y-5"
    >
      {/* Illustration */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-5xl shadow-inner">
          {icon}
        </div>
        <div className="absolute inset-0 rounded-full bg-farmer-500/5 scale-125 blur-xl" />
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="text-xl font-black text-slate-900">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>

      {(actionLabel && (actionTo || onAction)) && (
        actionTo ? (
          <Link
            to={actionTo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-sm shadow-lg shadow-farmer-600/20 transition-all hover:scale-[1.02]"
          >
            <span>{actionLabel}</span>
            <LuArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-sm shadow-lg shadow-farmer-600/20 transition-all hover:scale-[1.02]"
          >
            <span>{actionLabel}</span>
          </button>
        )
      )}
    </motion.div>
  );
}
