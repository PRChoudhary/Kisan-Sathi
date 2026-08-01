import React from 'react';
import { LuCloudRain, LuWind } from 'react-icons/lu';

export default function ForecastCard({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>📅 7-Day Agricultural Forecast</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {forecast.map((day, idx) => (
          <div
            key={day.date || idx}
            className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
              idx === 0
                ? 'bg-farmer-700 text-white border-farmer-800 shadow-xl shadow-farmer-700/20 ring-2 ring-farmer-500 scale-[1.02]'
                : 'bg-white text-slate-800 border-slate-200/80 hover:border-farmer-300 hover:shadow-md'
            }`}
          >
            <div>
              <p className={`text-xs font-black uppercase tracking-wider ${idx === 0 ? 'text-amber-300' : 'text-slate-500'}`}>
                {idx === 0 ? 'Today' : day.day}
              </p>
              <p className={`text-[10px] ${idx === 0 ? 'text-farmer-200' : 'text-slate-400'}`}>
                {day.date}
              </p>
            </div>

            <div className="my-3 text-center">
              <span className="text-4xl inline-block mb-1">{day.icon}</span>
              <p className="text-xs font-extrabold truncate">{day.condition}</p>
            </div>

            <div className={`pt-3 border-t text-xs space-y-1.5 ${idx === 0 ? 'border-farmer-600 text-farmer-100' : 'border-slate-100 text-slate-600'}`}>
              <div className="flex items-center justify-between font-black text-sm">
                <span>{Math.round(day.maxTemp)}°</span>
                <span className={idx === 0 ? 'text-farmer-300 font-normal' : 'text-slate-400 font-normal'}>
                  {Math.round(day.minTemp)}°
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 font-bold text-sky-400">
                  <LuCloudRain className="w-3 h-3" />
                  {day.rainProbability}%
                </span>
                <span className="flex items-center gap-1">
                  <LuWind className="w-3 h-3 text-slate-400" />
                  {Math.round(day.windSpeed)}k/h
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
