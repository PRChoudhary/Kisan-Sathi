import React from 'react';

const variants = {
  success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  warning: 'bg-amber-100  text-amber-800  border-amber-200',
  error:   'bg-red-100    text-red-800    border-red-200',
  info:    'bg-sky-100    text-sky-800    border-sky-200',
  default: 'bg-slate-100  text-slate-700  border-slate-200',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
}
