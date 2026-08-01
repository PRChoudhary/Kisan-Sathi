import React from 'react';
import { LuUndo, LuTrash2, LuCheck, LuMousePointerClick } from 'react-icons/lu';

export default function PointTapControls({
  pointsCount,
  onUndo,
  onClear,
  onFinish
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-farmer-200 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-farmer-100 text-farmer-700">
          <LuMousePointerClick className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-black text-slate-900">Method 1: Tap Points on Satellite Map</h4>
          <p className="text-xs text-slate-500">
            Tap at each corner boundary of your land. Points automatically form a polygon.
          </p>
        </div>
      </div>

      {/* Points counter badge */}
      <div className="flex items-center justify-between bg-farmer-50 p-3 rounded-xl border border-farmer-200 text-xs font-bold text-farmer-900">
        <span>Corners Marked:</span>
        <span className="text-sm font-black bg-farmer-600 text-white px-3 py-0.5 rounded-full">
          {pointsCount} Points
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          onClick={onUndo}
          disabled={pointsCount === 0}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <LuUndo className="w-4 h-4" />
          <span>Undo Point</span>
        </button>

        <button
          onClick={onClear}
          disabled={pointsCount === 0}
          className="flex-1 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 disabled:opacity-40 text-red-700 font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <LuTrash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>

        <button
          onClick={onFinish}
          disabled={pointsCount < 3}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-farmer-600 hover:bg-farmer-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-farmer-600/30 flex items-center justify-center gap-2"
        >
          <LuCheck className="w-4 h-4" />
          <span>Complete Polygon ({pointsCount >= 3 ? 'Ready' : 'Need 3+ points'})</span>
        </button>
      </div>
    </div>
  );
}
