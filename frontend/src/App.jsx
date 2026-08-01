import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import FloatingAIChatWidget from './components/AI/FloatingAIChatWidget';
import PageTransition from './components/UI/PageTransition';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Skeleton from './components/UI/Skeleton';

// Lazy load all pages for code splitting
const Home            = lazy(() => import('./pages/Home'));
const WeatherPage     = lazy(() => import('./pages/WeatherPage'));
const MandiPage       = lazy(() => import('./pages/MandiPage'));
const MeasureLandPage = lazy(() => import('./pages/MeasureLandPage'));
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage'));
const AboutPage       = lazy(() => import('./pages/AboutPage'));
const ContactPage     = lazy(() => import('./pages/ContactPage'));
const PrivacyPage     = lazy(() => import('./pages/PrivacyPage'));
const TermsPage       = lazy(() => import('./pages/TermsPage'));
const NotFoundPage    = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <Skeleton className="h-10 w-64 rounded-2xl" />
      <Skeleton className="h-4  w-40 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0,1,2].map(i => <Skeleton key={i} className="h-48 rounded-3xl" />)}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#fafafa] text-slate-900 font-sans relative">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <Routes>
                    <Route path="/"              element={<Home />} />
                    <Route path="/weather"       element={<WeatherPage />} />
                    <Route path="/mandi"         element={<MandiPage />} />
                    <Route path="/measure-land"  element={<MeasureLandPage />} />
                    <Route path="/ai-assistant"  element={<AIAssistantPage />} />
                    <Route path="/about"         element={<AboutPage />} />
                    <Route path="/contact"       element={<ContactPage />} />
                    <Route path="/privacy"       element={<PrivacyPage />} />
                    <Route path="/terms"         element={<TermsPage />} />
                    <Route path="*"              element={<NotFoundPage />} />
                  </Routes>
                </PageTransition>
              </Suspense>
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
