import React, { useState, useEffect } from 'react';
import CurrentWeatherCard from '../components/Weather/CurrentWeatherCard';
import ForecastCard from '../components/Weather/ForecastCard';
import LocationSearch from '../components/Weather/LocationSearch';
import { fetchWeatherByCoords, searchWeatherCity } from '../services/api';
import { useApp } from '../context/AppContext';

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavoriteLocation } = useApp();

  const loadWeatherGPS = () => {
    setLoading(true);
    setError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetchWeatherByCoords(latitude, longitude, 'My GPS Location');
            if (res.data?.success) {
              setWeatherData(res.data.data);
            }
          } catch (err) {
            setError('Could not fetch weather data for your GPS location.');
          } finally {
            setLoading(false);
          }
        },
        async (err) => {
          console.warn('GPS position error or denied, loading default location (New Delhi):', err.message);
          fetchDefaultWeather();
        },
        { timeout: 10000 }
      );
    } else {
      fetchDefaultWeather();
    }
  };

  const fetchDefaultWeather = async () => {
    try {
      const res = await fetchWeatherByCoords(28.6139, 77.2090, 'New Delhi');
      if (res.data?.success) {
        setWeatherData(res.data.data);
      }
    } catch (err) {
      setError('Weather service unavailable. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (cityQuery) => {
    setLoading(true);
    setError(null);
    try {
      const res = await searchWeatherCity(cityQuery);
      if (res.data?.success) {
        setWeatherData(res.data.data);
      } else {
        setError('City not found. Try searching another city or district.');
      }
    } catch (err) {
      setError('City not found or weather service error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherGPS();
  }, []);

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-farmer-600 bg-farmer-50 px-3 py-1 rounded-full border border-farmer-200">
          Module 1
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
          Farmer Weather Center
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Real-time hyper-local weather forecast, humidity, wind, and 7-day agricultural outlook.
        </p>
      </div>

      {/* Location Search Bar */}
      <LocationSearch
        onSearch={handleCitySearch}
        onUseGPS={loadWeatherGPS}
        loading={loading}
      />

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-slate-200 animate-pulse rounded-3xl h-64 w-full flex items-center justify-center text-slate-400 font-bold">
          Fetching Live Weather Forecast...
        </div>
      )}

      {/* Error Banner */}
      {error && !loading && (
        <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-200 font-medium text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={loadWeatherGPS}
            className="px-3 py-1 rounded-lg bg-red-600 text-white font-bold text-xs"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Weather Card */}
      {!loading && weatherData && (
        <div className="space-y-8">
          <CurrentWeatherCard
            weather={weatherData}
            onFavoriteToggle={toggleFavoriteLocation}
          />

          <ForecastCard forecast={weatherData.forecast} />
        </div>
      )}

    </div>
  );
}
