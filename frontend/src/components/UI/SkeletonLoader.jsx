import React from 'react';

export default function SkeletonLoader({ className = 'h-24 w-full rounded-2xl' }) {
  return <div className={`shimmer-skeleton ${className}`} />;
}
