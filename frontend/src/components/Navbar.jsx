import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LuCloudSun, 
  LuTrendingUp, 
  LuMapPin, 
  LuHouse, 
  LuInfo, 
  LuMail, 
  LuUser, 
  LuLogOut, 
  LuMenu, 
  LuX,
  LuWheat,
  LuBot,
  LuBell,
  LuChevronDown,
  LuSparkles
} from 'react-icons/lu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const { user, openAuthModal, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: LuHouse },
    { name: 'Weather', path: '/weather', icon: LuCloudSun },
    { name: 'Mandi Prices', path: '/mandi', icon: LuTrendingUp },
    { name: 'Measure Land', path: '/measure-land', icon: LuMapPin },
    { name: 'AI Copilot', path: '/ai-assistant', icon: LuBot, isBadge: true },
    { name: 'About', path: '/about', icon: LuInfo },
    { name: 'Contact', path: '/contact', icon: LuMail },
  ];

  const notifications = [
    { id: 1, title: '🌦️ Weather Alert', time: '10m ago', text: 'Rain probability is 25% today in Punjab/Ludhiana.' },
    { id: 2, title: '📈 Mandi Price Update', time: '1h ago', text: 'Wheat modal price reached ₹2,360/qtl in Khanna Mandi.' },
    { id: 3, title: '📐 Land Tip', time: '3h ago', text: 'Use Method 3 to track land perimeter using live GPS walk.' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-farmer-700 to-farmer-500 flex items-center justify-center text-white shadow-lg shadow-farmer-600/30 group-hover:scale-105 transition-transform duration-300">
              <LuWheat className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Kisan<span className="text-farmer-600">Sathi</span>
              </span>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-farmer-600 -mt-1">
                Kisan Ki Shaan
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all duration-200 ${
                    active
                      ? 'text-farmer-700 bg-farmer-50/90 shadow-xs ring-1 ring-farmer-200'
                      : 'text-slate-600 hover:text-farmer-700 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-farmer-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.isBadge && (
                    <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-wide uppercase shadow-2xs">
                      AI
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Notification Popover Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                className="p-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 relative transition-colors"
                aria-label="Notifications"
              >
                <LuBell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <LuBell className="w-4 h-4 text-farmer-600" /> Notifications
                    </h4>
                    <span className="text-[10px] font-bold text-farmer-700 bg-farmer-50 px-2 py-0.5 rounded-md">
                      3 New
                    </span>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Auth Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-farmer-50 border border-farmer-200 hover:bg-farmer-100/70 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-farmer-600 text-white font-black text-xs flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'K'}
                  </div>
                  <span className="font-bold text-xs text-farmer-900">{user.name.split(' ')[0]}</span>
                  <LuChevronDown className="w-3.5 h-3.5 text-farmer-700" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-fadeIn space-y-1 text-xs font-bold">
                    <div className="p-3 border-b border-slate-100 text-slate-700">
                      <p className="font-black text-sm text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 font-normal truncate">{user.email || user.phone}</p>
                    </div>
                    <Link
                      to="/ai-assistant"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-farmer-50 text-slate-700 hover:text-farmer-700"
                    >
                      <LuSparkles className="w-4 h-4 text-amber-500" /> AI Copilot
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 text-left"
                    >
                      <LuLogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-farmer-600 hover:bg-farmer-700 text-white font-extrabold text-xs shadow-md shadow-farmer-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <LuUser className="w-4 h-4" />
                <span>Farmer Login</span>
              </button>
            )}

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-farmer-50 hover:text-farmer-700 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold ${
                  active
                    ? 'bg-farmer-600 text-white shadow-md shadow-farmer-600/20'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500'}`} />
                  <span>{link.name}</span>
                </div>
                {link.isBadge && (
                  <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    AI
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-farmer-50 border border-farmer-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-farmer-600 text-white font-bold flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'K'}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-farmer-900">{user.name}</p>
                    <p className="text-xs text-farmer-600">{user.email || user.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-farmer-600 text-white font-extrabold text-sm shadow-lg shadow-farmer-600/30"
              >
                <LuUser className="w-5 h-5" />
                <span>Login / Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
