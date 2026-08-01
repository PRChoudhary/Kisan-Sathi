import React from 'react';
import { motion } from 'framer-motion';
import { LuLoader } from 'react-icons/lu';

const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-farmer-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const sizes = {
  sm:  'px-3 py-1.5 text-xs',
  md:  'px-5 py-2.5 text-sm',
  lg:  'px-7 py-3.5 text-sm',
  xl:  'px-8 py-4 text-base',
};

const variants = {
  primary:   'bg-farmer-600 hover:bg-farmer-700 text-white shadow-md shadow-farmer-600/20',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800',
  outline:   'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700',
  danger:    'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20',
  ghost:     'bg-transparent hover:bg-slate-100 text-slate-700',
  amber:     'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-md shadow-amber-400/25',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <LuLoader className="w-4 h-4 animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
    </motion.button>
  );
}
