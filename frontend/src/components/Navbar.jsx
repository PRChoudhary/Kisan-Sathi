import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  LuCloudSun, LuTrendingUp, LuMapPin, LuHouse, LuInfo, LuMail, 
  LuUser, LuLogOut, LuMenu, LuX, LuWheat, LuBot, LuBell,
  LuChevronDown, LuSparkles, LuMoon, LuSun
} from 'react-icons/lu';

const navLinks = [
  { name: 'Home',         path: '/',              icon: LuHouse },
  { name: 'Weather',      path: '/weather',       icon: LuCloudSun },
  { name: 'Mandi Prices', path: '/mandi',         icon: LuTrendingUp },
  { name: 'Measure Land', path: '/measure-land',  icon: LuMapPin },
  { name: 'AI Copilot',   path: '/ai-assistant',  icon: LuBot, badge: 'AI' },
  { name: 'About',        path: '/about',         icon: LuInfo },
  { name: 'Contact',      path: '/contact',       icon: LuMail },
];

const notifications = [
  { id: 1, icon: '🌦️', title: 'Weather Alert',      time: '10m', text: 'Rain probability 25% today in Punjab.' },
  { id: 2, icon: '📈', title: 'Mandi Update',       time: '1h',  text: 'Wheat reached ₹2,360/qtl at Khanna Mandi.' },
  { id: 3, icon: '📐', title: 'Field Tip',          time: '3h',  text: 'Use GPS Walk to track your field perimeter.' },
];

export default function Navbar() {
  const [mobileOpen,       setMobileOpen]       = useState(false);
  const [profileOpen,      setProfileOpen]      = useState(false);
  const [notiOpen,         setNotiOpen]         = useState(false);
  const [darkMode,         setDarkMode]         = useState(() => document.documentElement.classList.contains('dark'));
  const [scrolled,         setScrolled]         = useState(false);
  const { user, openAuthModal, logout }         = useAuth();
  const location                                = useLocation();

  // Close popups on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setNotiOpen(false);
  }, [location.pathname]);

  // Keyboard escape handler
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') { setProfileOpen(false); setNotiOpen(false); } };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
  };

  const isActive = (path) => path === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(path);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b transition-all duration-200 ${
        scrolled ? 'border-slate-200 shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-farmer-700 to-farmer-500 flex items-center justify-center text-white shadow-md shadow-farmer-600/25"
            >
              <LuWheat className="w-5 h-5" />
            </motion.div>
            <div className="leading-none">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Kisan<span className="text-farmer-600">Sathi</span>
              </span>
              <p className="text-[9px] font-extrabold uppercase tracking-widest text-farmer-600 mt-px">
                Kisan Ki Shaan
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const Icon   = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    active
                      ? 'text-farmer-700 dark:text-farmer-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-farmer-50 dark:bg-farmer-900/30"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${active ? 'text-farmer-600' : 'text-slate-400'}`} />
                  <span className="relative z-10">{link.name}</span>
                  {link.badge && (
                    <span className="relative z-10 bg-amber-400 text-slate-900 text-[9px] font-black px-1 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="hidden md:flex items-center gap-2">

            {/* Dark mode toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDark}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <LuSun className="w-4 h-4" /> : <LuMoon className="w-4 h-4" />}
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => { setNotiOpen(p => !p); setProfileOpen(false); }}
                className="relative p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                aria-label="Notifications"
              >
                <LuBell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
              </motion.button>

              <AnimatePresence>
                {notiOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0,  scale: 1 }}
                    exit={{   opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-3 z-50 space-y-2"
                  >
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-2 pb-1 border-b border-slate-100 dark:border-white/10">
                      Notifications
                    </p>
                    {notifications.map((n) => (
                      <div key={n.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <span className="text-xl mt-0.5 shrink-0">{n.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{n.title}</p>
                            <span className="text-[10px] text-slate-400 shrink-0">{n.time} ago</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{n.text}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile / Login */}
            {user ? (
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setProfileOpen(p => !p); setNotiOpen(false); }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-farmer-50 dark:bg-farmer-900/30 border border-farmer-200 dark:border-farmer-800 hover:bg-farmer-100 dark:hover:bg-farmer-900/50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-farmer-600 text-white text-xs font-black flex items-center justify-center">
                    {user.name?.charAt(0).toUpperCase() || 'K'}
                  </div>
                  <span className="text-xs font-bold text-farmer-900 dark:text-farmer-300">{user.name?.split(' ')[0]}</span>
                  <LuChevronDown className="w-3 h-3 text-farmer-600" />
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0,  scale: 1 }}
                      exit={{   opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 p-2 z-50 space-y-0.5"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-white/10 mb-1">
                        <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email || user.phone}</p>
                      </div>
                      <Link to="/ai-assistant" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-farmer-50 dark:hover:bg-farmer-900/20 hover:text-farmer-700 transition-colors">
                        <LuSparkles className="w-3.5 h-3.5 text-amber-500" /> AI Copilot
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                      >
                        <LuLogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={openAuthModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-xs shadow-md shadow-farmer-600/20 transition-colors"
              >
                <LuUser className="w-3.5 h-3.5" />
                <span>Login</span>
              </motion.button>
            )}
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen(p => !p)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300"
            aria-label="Menu"
          >
            {mobileOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden border-t border-slate-100 dark:border-white/10 bg-white dark:bg-[#0a0a0a]"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const Icon   = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-farmer-600 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <button onClick={toggleDark} className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5">
                    {darkMode ? <LuSun className="w-4 h-4" /> : <LuMoon className="w-4 h-4" />}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  {user ? (
                    <button onClick={logout} className="text-xs font-bold text-red-600 px-3 py-2 rounded-xl bg-red-50">
                      Logout
                    </button>
                  ) : (
                    <button onClick={openAuthModal} className="text-xs font-bold text-white bg-farmer-600 px-4 py-2 rounded-xl">
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
