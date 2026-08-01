import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import FloatingAIChatWidget from './components/AI/FloatingAIChatWidget';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

import Home from './pages/Home';
import WeatherPage from './pages/WeatherPage';
import MandiPage from './pages/MandiPage';
import MeasureLandPage from './pages/MeasureLandPage';
import AIAssistantPage from './pages/AIAssistantPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans relative">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/mandi" element={<MandiPage />} />
                <Route path="/measure-land" element={<MeasureLandPage />} />
                <Route path="/ai-assistant" element={<AIAssistantPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
              </Routes>
            </main>
            <Footer />
            <AuthModal />
            <FloatingAIChatWidget />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}
