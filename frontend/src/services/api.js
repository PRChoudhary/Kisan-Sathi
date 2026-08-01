import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kisan_sathi_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Weather APIs
export const fetchWeatherByCoords = (lat, lon, locationName) =>
  api.get('/weather', { params: { lat, lon, locationName } });

export const searchWeatherCity = (query) =>
  api.get('/weather/search', { params: { q: query } });

// Mandi APIs
export const fetchMandiPrices = (params) =>
  api.get('/mandi', { params });

// Land Field APIs
export const fetchSavedFields = () =>
  api.get('/fields');

export const saveNewField = (fieldData) =>
  api.post('/fields', fieldData);

export const updateFieldApi = (id, data) =>
  api.put(`/fields/${id}`, data);

export const deleteFieldApi = (id) =>
  api.delete(`/fields/${id}`);

// Auth APIs
export const loginApi = (credentials) =>
  api.post('/auth/login', credentials);

export const registerApi = (userData) =>
  api.post('/auth/register', userData);

export const googleLoginApi = (data) =>
  api.post('/auth/google', data);

export const phoneOtpLoginApi = (data) =>
  api.post('/auth/phone-otp', data);

export const fetchMeApi = () =>
  api.get('/auth/me');

// Favorites APIs
export const fetchFavoriteCrops = () =>
  api.get('/favorites/crops');

export const addFavoriteCropApi = (data) =>
  api.post('/favorites/crops', data);

export const removeFavoriteCropApi = (id) =>
  api.delete(`/favorites/crops/${id}`);

export const fetchFavoriteLocations = () =>
  api.get('/favorites/locations');

export const addFavoriteLocationApi = (data) =>
  api.post('/favorites/locations', data);

export const removeFavoriteLocationApi = (id) =>
  api.delete(`/favorites/locations/${id}`);

// AI Streaming Chat API
export const streamAIChat = async (messages, context, onChunk, onDone, onError) => {
  try {
    const token = localStorage.getItem('kisan_sathi_token');
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ messages, context })
    });

    if (!response.ok) {
      throw new Error(`AI Chat server error (${response.status})`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || ''; // Keep incomplete trailing line

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data: ')) {
          const dataStr = trimmed.replace('data: ', '').trim();
          if (dataStr === '[DONE]') {
            if (onDone) onDone();
            return;
          }
          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.content && onChunk) {
              onChunk(parsed.content);
            }
          } catch (e) {
            // Ignore parse errors on raw string chunks
          }
        }
      }
    }

    if (onDone) onDone();
  } catch (err) {
    console.error('Streaming AI error:', err);
    if (onError) onError(err);
  }
};

export default api;
