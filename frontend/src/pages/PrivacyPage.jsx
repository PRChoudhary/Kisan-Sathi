import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8">
      <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
      <p className="text-slate-600 text-sm leading-relaxed">
        Kisan Sathi values your privacy and data security.
      </p>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-sm text-slate-700">
        <h3 className="font-bold text-slate-900">1. Data Collection</h3>
        <p>
          We do not collect or track user location data unless actively performing GPS weather checks or live field walk measurements. GPS location is processed locally on your device.
        </p>

        <h3 className="font-bold text-slate-900">2. Saved Field & Preference Persistence</h3>
        <p>
          Guest users store fields locally in their browser session. Registered users have their saved field polygons, bookmarked crops, and weather locations saved securely to PostgreSQL database.
        </p>

        <h3 className="font-bold text-slate-900">3. Third Party Services</h3>
        <p>
          Weather information is retrieved from Open-Meteo API. Mandi rates are retrieved from public AGMARKNET repositories.
        </p>
      </div>
    </div>
  );
}
