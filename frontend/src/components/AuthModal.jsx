import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { LuX, LuMail, LuPhone, LuLock, LuUser, LuArrowRight } from 'react-icons/lu';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register, loginWithGoogle, loginWithPhoneOtp } = useAuth();
  const { showToast } = useApp();

  const [activeTab, setActiveTab] = useState('EMAIL'); // EMAIL, GOOGLE, PHONE
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegisterMode) {
        await register({ name: formData.name, email: formData.email, password: formData.password });
        showToast('Account registered successfully!', 'success');
      } else {
        await login({ email: formData.email, password: formData.password });
        showToast('Welcome back to Kisan Sathi!', 'success');
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setLoading(true);
    try {
      await loginWithGoogle('farmer.kisan@gmail.com', 'Ramesh Kumar (Kisan)');
      showToast('Logged in via Google!', 'success');
    } catch (error) {
      showToast('Google Sign-in failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSendOtp = (e) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setOtpSent(true);
    showToast('OTP sent to ' + formData.phone + ' (Use 123456 for demo)', 'info');
  };

  const handlePhoneVerifyOtp = async (e) => {
    e.preventDefault();
    if (formData.otp !== '123456' && formData.otp !== '999999') {
      showToast('Demo OTP is 123456', 'error');
      return;
    }
    setLoading(true);
    try {
      await loginWithPhoneOtp(formData.phone, formData.name || `Farmer ${formData.phone.slice(-4)}`);
      showToast('Mobile verification successful!', 'success');
    } catch (error) {
      showToast('Phone Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-farmer-100 max-w-md w-full overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-farmer-700 px-6 py-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <LuX className="w-5 h-5" />
          </button>
          <span className="inline-block px-3 py-1 bg-farmer-600/80 rounded-full text-xs font-semibold tracking-wide text-farmer-100 mb-2">
            Farmer Portal
          </span>
          <h2 className="text-2xl font-black">Welcome to Kisan Sathi</h2>
          <p className="text-farmer-200 text-xs mt-1">
            Log in to permanently save your fields, favorite crops, and weather locations.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 bg-slate-50">
          <button
            onClick={() => setActiveTab('EMAIL')}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'EMAIL'
                ? 'border-farmer-600 text-farmer-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Email Login
          </button>
          <button
            onClick={() => setActiveTab('GOOGLE')}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'GOOGLE'
                ? 'border-farmer-600 text-farmer-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Google Sign In
          </button>
          <button
            onClick={() => setActiveTab('PHONE')}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'PHONE'
                ? 'border-farmer-600 text-farmer-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Phone OTP
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {/* EMAIL TAB */}
          {activeTab === 'EMAIL' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <LuUser className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ramesh Singh"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <LuMail className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="farmer@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <LuLock className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-sm shadow-md shadow-farmer-600/30 flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Processing...' : isRegisterMode ? 'Create Account' : 'Sign In'}</span>
                <LuArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-xs text-farmer-700 font-bold hover:underline"
                >
                  {isRegisterMode ? 'Already have an account? Sign In' : 'New Farmer? Create an Account'}
                </button>
              </div>
            </form>
          )}

          {/* GOOGLE TAB */}
          {activeTab === 'GOOGLE' && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 font-black text-2xl flex items-center justify-center mx-auto shadow-inner border border-red-100">
                G
              </div>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Sign in instantly using your Google account. No password setup required.
              </p>
              <button
                onClick={handleGoogleSubmit}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-sm flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          )}

          {/* PHONE OTP TAB */}
          {activeTab === 'PHONE' && (
            <div>
              {!otpSent ? (
                <form onSubmit={handlePhoneSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                    <div className="relative">
                      <LuPhone className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm font-semibold tracking-wider"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-sm shadow-md shadow-farmer-600/30"
                  >
                    Send OTP SMS
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePhoneVerifyOtp} className="space-y-4">
                  <p className="text-xs text-farmer-700 font-bold bg-farmer-50 p-2.5 rounded-lg border border-farmer-200">
                    OTP sent to +91 {formData.phone}. Demo OTP: <span className="underline">123456</span>
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Enter 6-Digit OTP</label>
                    <input
                      type="text"
                      name="otp"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full text-center tracking-widest text-lg font-black py-2 rounded-xl border border-slate-300 focus:border-farmer-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-sm shadow-md shadow-farmer-600/30"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP & Login'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Guest option */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={closeAuthModal}
              className="text-xs text-slate-500 font-medium hover:text-slate-800 transition-colors"
            >
              Continue as Guest (No login required)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
