import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CurrentWeatherCard from '../components/Weather/CurrentWeatherCard';
import ForecastCard from '../components/Weather/ForecastCard';
import LocationSearch from '../components/Weather/LocationSearch';
import { SkeletonWeatherCard } from '../components/UI/Skeleton';
import { fetchWeatherByCoords, searchWeatherCity } from '../services/api';
import { useApp } from '../context/AppContext';
import { LuRefreshCw, LuWifi } from 'react-icons/lu';

const FALLBACK = {
  location: 'New Delhi',
  latitude: 28.6139,
  longitude: 77.2090,
  current: {
    temperature: 29, feelsLike: 31, condition: 'Partly Cloudy', icon: '⛅',
    humidity: 62, windSpeed: 14, rainProbability: 25, uvIndex: 6,
    sunrise: '05:48', sunset: '19:12',
  },
  forecast: Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return {
      date: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      maxTemp: 32 - (i % 3), minTemp: 22 + (i % 2),
      condition: i % 2 === 0 ? 'Sunny' : 'Partly Cloudy',
      icon: i % 2 === 0 ? '☀️' : '⛅',
      rainProbability: 15 + i * 5, windSpeed: 12 + i,
    };
  }),
};

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavoriteLocation } = useApp();

  const fetchDefaultWeather = async () => {
    try {
      const res = await fetchWeatherByCoords(28.6139, 77.2090, 'New Delhi');
      if (res.data?.success) setWeatherData(res.data.data);
      else setWeatherData(FALLBACK);
    } catch {
      setWeatherData(FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  const loadWeatherGPS = () => {
    setLoading(true); setError(null);
    if (!('geolocation' in navigator)) { fetchDefaultWeather(); return; }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetchWeatherByCoords(coords.latitude, coords.longitude, 'My GPS Location');
          if (res.data?.success) setWeatherData(res.data.data);
          else fetchDefaultWeather();
        } catch { fetchDefaultWeather(); }
        finally { setLoading(false); }
      },
      () => fetchDefaultWeather(),
      { timeout: 10000 },
    );
  };

  const handleCitySearch = async (cityQuery) => {
    setLoading(true); setError(null);
    try {
      const res = await searchWeatherCity(cityQuery);
      if (res.data?.success) setWeatherData(res.data.data);
      else setError('City not found. Try another city or district.');
    } catch {
      setError('City not found or weather service error.');
    } finally { setLoading(false); }
  };

  useEffect(() => { loadWeatherGPS(); }, []);

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      >
        <span className="text-xs font-extrabold uppercase tracking-widest text-farmer-600 bg-farmer-50 px-3 py-1 rounded-full border border-farmer-200">
          Module 1
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-2">
          Farmer Weather Center
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Real-time hyper-local weather forecast, humidity, wind, and 7-day agricultural outlook.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
        <LocationSearch onSearch={handleCitySearch} onUseGPS={loadWeatherGPS} loading={loading} />
      </motion.div>

      {/* States */}
      {loading && <SkeletonWeatherCard />}

      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-2xl flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <LuWifi className="w-5 h-5 shrink-0 text-red-500" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
          <button
            onClick={loadWeatherGPS}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-sm hover:bg-red-700 transition-colors"
          >
            <LuRefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </motion.div>
      )}

      {!loading && weatherData && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <CurrentWeatherCard weather={weatherData} onFavoriteToggle={toggleFavoriteLocation} />
          <ForecastCard forecast={weatherData.forecast} />
        </motion.div>
      )}
    </div>
  );
}
