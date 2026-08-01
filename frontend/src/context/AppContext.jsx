import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  fetchSavedFields,
  fetchFavoriteCrops,
  fetchFavoriteLocations,
  addFavoriteCropApi,
  removeFavoriteCropApi,
  addFavoriteLocationApi,
  removeFavoriteLocationApi
} from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [savedFields, setSavedFields] = useState([]);
  const [favoriteCrops, setFavoriteCrops] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Load Saved Fields
  const loadSavedFields = async () => {
    try {
      const res = await fetchSavedFields();
      if (res.data?.success) {
        setSavedFields(res.data.data);
      }
    } catch (err) {
      console.warn('Could not fetch saved fields:', err.message);
    }
  };

  // Load Favorites
  const loadFavorites = async () => {
    try {
      const cropsRes = await fetchFavoriteCrops();
      if (cropsRes.data?.success) {
        setFavoriteCrops(cropsRes.data.data);
      }
      const locsRes = await fetchFavoriteLocations();
      if (locsRes.data?.success) {
        setFavoriteLocations(locsRes.data.data);
      }
    } catch (err) {
      console.warn('Could not fetch favorites:', err.message);
    }
  };

  useEffect(() => {
    loadSavedFields();
    loadFavorites();
  }, [user]);

  // Crop Favorites logic
  const toggleFavoriteCrop = async (cropItem) => {
    const existing = favoriteCrops.find(c => c.cropName === cropItem.cropName);
    if (existing) {
      try {
        await removeFavoriteCropApi(existing.id);
        setFavoriteCrops(prev => prev.filter(c => c.id !== existing.id));
        showToast(`Removed ${cropItem.cropName} from favorites`, 'info');
      } catch (err) {
        showToast('Failed to remove favorite', 'error');
      }
    } else {
      try {
        const res = await addFavoriteCropApi({
          cropName: cropItem.cropName,
          state: cropItem.state,
          district: cropItem.district,
          market: cropItem.market
        });
        if (res.data?.success) {
          setFavoriteCrops(prev => [...prev, res.data.data]);
          showToast(`Added ${cropItem.cropName} to favorite crops!`, 'success');
        }
      } catch (err) {
        showToast('Failed to add favorite crop', 'error');
      }
    }
  };

  const isCropFavorite = (cropName) => {
    return favoriteCrops.some(c => c.cropName === cropName);
  };

  // Location Favorites logic
  const toggleFavoriteLocation = async (locationItem) => {
    const existing = favoriteLocations.find(l => l.locationName === locationItem.locationName);
    if (existing) {
      try {
        await removeFavoriteLocationApi(existing.id);
        setFavoriteLocations(prev => prev.filter(l => l.id !== existing.id));
        showToast(`Removed ${locationItem.locationName} from saved locations`, 'info');
      } catch (err) {
        showToast('Failed to remove location', 'error');
      }
    } else {
      try {
        const res = await addFavoriteLocationApi({
          locationName: locationItem.locationName,
          latitude: locationItem.latitude,
          longitude: locationItem.longitude,
          state: locationItem.state
        });
        if (res.data?.success) {
          setFavoriteLocations(prev => [...prev, res.data.data]);
          showToast(`Saved ${locationItem.locationName} to favorite locations!`, 'success');
        }
      } catch (err) {
        showToast('Failed to save location', 'error');
      }
    }
  };

  const isLocationFavorite = (locationName) => {
    return favoriteLocations.some(l => l.locationName === locationName);
  };

  return (
    <AppContext.Provider
      value={{
        savedFields,
        setSavedFields,
        loadSavedFields,
        favoriteCrops,
        toggleFavoriteCrop,
        isCropFavorite,
        favoriteLocations,
        toggleFavoriteLocation,
        isLocationFavorite,
        showToast
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-5 py-3 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 ${
              toastMessage.type === 'error'
                ? 'bg-red-600'
                : toastMessage.type === 'info'
                ? 'bg-blue-600'
                : 'bg-farmer-600'
            }`}
          >
            <span>{toastMessage.type === 'error' ? '⚠️' : '✅'}</span>
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
