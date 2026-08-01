import React from 'react';
import { LuPencil, LuMove, LuCheck, LuRotateCcw } from 'react-icons/lu';

export default function ManualDrawControls({
  pointsCount,
  isEditing,
  onToggleEdit,
  onClear
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-amber-200 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-amber-100 text-amber-800">
          <LuPencil className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-black text-slate-900">Method 2: Manual Polygon & Drag Nodes</h4>
          <p className="text-xs text-slate-500">
            Tap corners on the map, then enable "Drag Nodes" mode to adjust boundaries with precision.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
        <span>Boundary Drag Mode:</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${isEditing ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-600 text-white'}`}>
          {isEditing ? '✋ Dragging Active' : 'Tap to Add Points'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onToggleEdit}
          disabled={pointsCount < 3}
          className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            isEditing
              ? 'bg-farmer-600 hover:bg-farmer-700 text-white shadow-md'
              : 'bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-50'
          }`}
        >
          {isEditing ? <LuCheck className="w-4 h-4" /> : <LuMove className="w-4 h-4" />}
          <span>{isEditing ? 'Done Editing' : 'Enable Drag Node Mode'}</span>
        </button>

        <button
          onClick={onClear}
          disabled={pointsCount === 0}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <LuRotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
