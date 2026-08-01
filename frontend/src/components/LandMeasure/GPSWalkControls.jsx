import React from 'react';
import { LuPlay, LuPause, LuSquare, LuFootprints, LuRadio, LuZap } from 'react-icons/lu';

export default function GPSWalkControls({
  isTracking,
  isPaused,
  pointCount,
  onStart,
  onPause,
  onResume,
  onStop,
  onSimulateWalk
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-sky-200 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-sky-100 text-sky-800">
          <LuFootprints className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-black text-slate-900">Method 3: Walk Around Field (GPS Live Tracker)</h4>
          <p className="text-xs text-slate-500">
            Turn on GPS and walk around your land boundary. Coordinates are tracked live to build the field polygon.
          </p>
        </div>
      </div>

      {/* Tracking Status Indicator */}
      <div className="flex items-center justify-between bg-sky-50 p-3.5 rounded-xl border border-sky-200 text-xs font-bold text-sky-900">
        <div className="flex items-center gap-2">
          {isTracking && !isPaused ? (
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          ) : (
            <LuRadio className="w-4 h-4 text-slate-400" />
          )}
          <span>
            {isTracking
              ? isPaused
                ? 'Tracking Paused'
                : 'Recording Live Coordinates...'
              : 'Ready to Start GPS Track'}
          </span>
        </div>
        <span className="bg-sky-600 text-white px-3 py-0.5 rounded-full font-extrabold text-xs">
          {pointCount} GPS Points
        </span>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        
        {/* Start / Resume */}
        {!isTracking ? (
          <button
            onClick={onStart}
            className="px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2"
          >
            <LuPlay className="w-4 h-4 fill-white" />
            <span>Start Tracking</span>
          </button>
        ) : isPaused ? (
          <button
            onClick={onResume}
            className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <LuPlay className="w-4 h-4 fill-white" />
            <span>Resume</span>
          </button>
        ) : (
          <button
            onClick={onPause}
            className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <LuPause className="w-4 h-4 fill-white" />
            <span>Pause</span>
          </button>
        )}

        {/* Stop Button */}
        <button
          onClick={onStop}
          disabled={!isTracking && pointCount === 0}
          className="px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-extrabold text-xs shadow-md shadow-red-600/20 flex items-center justify-center gap-2"
        >
          <LuSquare className="w-4 h-4 fill-white" />
          <span>Stop & Close</span>
        </button>

        {/* Demo Simulator button */}
        <button
          onClick={onSimulateWalk}
          className="col-span-2 sm:col-span-2 px-4 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          title="Generates a sample field polygon walking simulation for testing"
        >
          <LuZap className="w-4 h-4 text-purple-600" />
          <span>Simulate GPS Walk (Demo Mode)</span>
        </button>

      </div>
    </div>
  );
}
