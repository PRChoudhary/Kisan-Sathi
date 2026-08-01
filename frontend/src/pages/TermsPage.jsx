import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8">
      <h1 className="text-3xl font-black text-slate-900">Terms of Service</h1>
      <p className="text-slate-600 text-sm leading-relaxed">
        By accessing Kisan Sathi, you agree to these Terms of Service.
      </p>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-sm text-slate-700">
        <h3 className="font-bold text-slate-900">1. Free Agricultural Tool</h3>
        <p>
          Kisan Sathi is provided free of charge for Indian farmers for decision support, land measurement estimation, and price checking.
        </p>

        <h3 className="font-bold text-slate-900">2. Land Measurement Accuracy</h3>
        <p>
          Satellite area estimates are calculated using geodesic Earth formulas ($m^2$, sq ft, Acres, Hectares). While accurate for agricultural planning, official legal boundaries require certified revenue surveyor measurement.
        </p>

        <h3 className="font-bold text-slate-900">3. Mandi Market Prices</h3>
        <p>
          Mandi rates reflect daily APMC arrival reports and market indicators. Actual transaction prices may vary based on crop quality and moisture content.
        </p>
      </div>
    </div>
  );
}
