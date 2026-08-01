import React from 'react';

export default function Skeleton({ className = 'h-10 w-full rounded-xl' }) {
  return <div className={`shimmer ${className}`} aria-hidden="true" />;
}

export function SkeletonWeatherCard() {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 space-y-6 border border-slate-800">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-9 w-48 rounded-xl" />
          <Skeleton className="h-3 w-36 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-12 rounded-2xl" />
      </div>
      <div className="flex items-center gap-6">
        <Skeleton className="h-16 w-32 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-16 rounded-xl" />
          <Skeleton className="h-4 w-24 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonMandiRow() {
  return (
    <div className="flex gap-4 items-center py-4 px-6 border-b border-slate-100">
      <Skeleton className="h-8 w-8 rounded-xl shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-36 rounded-lg" />
        <Skeleton className="h-3 w-24 rounded-md" />
      </div>
      <Skeleton className="h-7 w-24 rounded-xl" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
      <Skeleton className="h-14 w-14 rounded-2xl" />
      <Skeleton className="h-6 w-40 rounded-xl" />
      <Skeleton className="h-4 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4 rounded-lg" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}
