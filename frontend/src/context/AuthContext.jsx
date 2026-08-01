import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMeApi, loginApi, registerApi, googleLoginApi, phoneOtpLoginApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('kisan_sathi_token') || null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (token) {
        try {
          const res = await fetchMeApi();
          if (res.data?.success) {
            setUser(res.data.user);
          } else {
            logout();
          }
        } catch (err) {
          console.warn('Auth check failed, using cached session or guest mode');
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, [token]);

  const handleAuthSuccess = (data) => {
    if (data.token) {
      localStorage.setItem('kisan_sathi_token', data.token);
      setToken(data.token);
    }
    if (data.user) {
      setUser(data.user);
    }
    setIsAuthModalOpen(false);
  };

  const login = async (credentials) => {
    const res = await loginApi(credentials);
    if (res.data?.success) {
      handleAuthSuccess(res.data);
    }
    return res.data;
  };

  const register = async (userData) => {
    const res = await registerApi(userData);
    if (res.data?.success) {
      handleAuthSuccess(res.data);
    }
    return res.data;
  };

  const loginWithGoogle = async (email, name) => {
    const res = await googleLoginApi({ email, name });
    if (res.data?.success) {
      handleAuthSuccess(res.data);
    }
    return res.data;
  };

  const loginWithPhoneOtp = async (phone, name) => {
    const res = await phoneOtpLoginApi({ phone, name });
    if (res.data?.success) {
      handleAuthSuccess(res.data);
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('kisan_sathi_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        register,
        loginWithGoogle,
        loginWithPhoneOtp,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
