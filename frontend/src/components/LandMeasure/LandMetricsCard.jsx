import React from 'react';
import { LuSave, LuMaximize2, LuRuler, LuCheck } from 'react-icons/lu';
import { formatNumberIN } from '../../utils/formatters';

export default function LandMetricsCard({ metrics, onSaveField, pointsCount }) {
  const { areaSqMeters, areaSqFeet, areaAcres, areaHectares, perimeterMeters, perimeterFeet } = metrics;

  return (
    <div className="bg-gradient-to-br from-farmer-900 to-farmer-800 text-white rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-farmer-300">
            Real-Time Measurement
          </span>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <span>📐 Calculated Field Area</span>
          </h3>
        </div>
        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-farmer-200">
          {pointsCount} Corners
        </div>
      </div>

      {/* Main High Highlighted Area Card: Acre */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center relative">
        <span className="text-xs font-bold text-farmer-200 uppercase tracking-wider block mb-1">
          Primary Agricultural Unit
        </span>
        <div className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight">
          {areaAcres} <span className="text-xl sm:text-2xl font-bold text-white">Acres</span>
        </div>
        <p className="text-xs text-farmer-200 mt-1 font-medium">
          ({areaHectares} Hectares)
        </p>
      </div>

      {/* Grid of Other Units */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        
        {/* Square Meters */}
        <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
          <p className="text-farmer-200 font-medium">Square Meters ($m^2$)</p>
          <p className="text-lg font-bold text-white mt-0.5">{formatNumberIN(areaSqMeters)} $m^2$</p>
        </div>

        {/* Square Feet */}
        <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
          <p className="text-farmer-200 font-medium">Square Feet ($ft^2$)</p>
          <p className="text-lg font-bold text-white mt-0.5">{formatNumberIN(areaSqFeet)} $ft^2$</p>
        </div>

        {/* Hectares */}
        <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
          <p className="text-farmer-200 font-medium">Hectare (ha)</p>
          <p className="text-lg font-bold text-white mt-0.5">{areaHectares} ha</p>
        </div>

        {/* Perimeter */}
        <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
          <p className="text-farmer-200 font-medium">Total Perimeter</p>
          <p className="text-lg font-bold text-white mt-0.5">{formatNumberIN(perimeterMeters)} m</p>
          <p className="text-[11px] text-farmer-300">({formatNumberIN(perimeterFeet)} ft)</p>
        </div>

      </div>

      {/* Save Button */}
      <button
        onClick={onSaveField}
        disabled={pointsCount < 3}
        className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-slate-900 font-black text-base shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <LuSave className="w-5 h-5 text-slate-900" />
        <span>Save Measured Field</span>
      </button>

    </div>
  );
}
