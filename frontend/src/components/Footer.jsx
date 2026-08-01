import React from 'react';
import { Link } from 'react-router-dom';
import { LuWheat, LuHeart, LuPhone, LuMail, LuMapPin } from 'react-icons/lu';

export default function Footer() {
  return (
    <footer className="bg-farmer-900 text-white border-t border-farmer-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-farmer-500 flex items-center justify-center text-farmer-900 font-bold">
                <LuWheat className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Kisan<span className="text-farmer-400">Sathi</span>
              </span>
            </Link>
            <p className="text-farmer-200 text-sm leading-relaxed">
              Empowering Indian farmers with accurate weather forecasts, live mandi market prices, and satellite land area measurement tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-farmer-300 mb-4">
              Quick Features
            </h3>
            <ul className="space-y-2.5 text-sm text-farmer-100 font-medium">
              <li>
                <Link to="/weather" className="hover:text-farmer-400 transition-colors">
                  ☀️ Live Weather Forecast
                </Link>
              </li>
              <li>
                <Link to="/mandi" className="hover:text-farmer-400 transition-colors">
                  📈 Mandi Crop Prices (AGMARKNET)
                </Link>
              </li>
              <li>
                <Link to="/measure-land" className="hover:text-farmer-400 transition-colors">
                  🗺️ Satellite Field Measurement
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-farmer-300 mb-4">
              Legal & Support
            </h3>
            <ul className="space-y-2.5 text-sm text-farmer-100 font-medium">
              <li>
                <Link to="/privacy" className="hover:text-farmer-400 transition-colors">
                  🔒 Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-farmer-400 transition-colors">
                  📋 Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-farmer-400 transition-colors">
                  🌾 About Kisan Sathi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-farmer-400 transition-colors">
                  📞 Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-farmer-300 mb-4">
              Farmer Helpline
            </h3>
            <div className="flex items-center gap-3 text-sm text-farmer-100">
              <LuPhone className="w-4 h-4 text-farmer-400 shrink-0" />
              <span>Toll Free: 1800-180-1551</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-farmer-100">
              <LuMail className="w-4 h-4 text-farmer-400 shrink-0" />
              <span>support@kisansathi.in</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-farmer-100">
              <LuMapPin className="w-4 h-4 text-farmer-400 shrink-0" />
              <span>New Delhi, India</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-farmer-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-farmer-300 gap-4">
          <p>© {new Date().getFullYear()} Kisan Sathi. Dedicated to Indian Farmers.</p>
          <p className="flex items-center gap-1">
            Built with <LuHeart className="w-4 h-4 text-red-500 fill-red-500" /> for Jai Jawan, Jai Kisan.
          </p>
        </div>
      </div>
    </footer>
  );
}
