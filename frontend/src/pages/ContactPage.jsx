import React, { useState } from 'react';
import { LuPhone, LuMail, LuMapPin, LuSend, LuCheck } from 'react-icons/lu';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Thank you! Your message has been sent to our farmer support team.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900">
          Farmer Helpline & Support
        </h1>
        <p className="text-slate-600 text-sm">
          Have questions or need assistance with land measurement or mandi prices? Reach out to us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-farmer-100 text-farmer-700">
              <LuPhone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Kisan Helpline</p>
              <p className="text-sm font-black text-slate-900">1800-180-1551</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sky-100 text-sky-700">
              <LuMail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Email Support</p>
              <p className="text-sm font-black text-slate-900">support@kisansathi.in</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-800">
              <LuMapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Headquarters</p>
              <p className="text-sm font-black text-slate-900">Krishi Bhawan, New Delhi</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <LuCheck className="w-16 h-16 text-farmer-600 mx-auto" />
              <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
              <p className="text-slate-600 text-sm">
                Our support executive will get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', message: '' });
                }}
                className="px-6 py-2.5 rounded-xl bg-farmer-600 text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-black text-slate-900 mb-2">Send us a Message</h3>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-farmer-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-farmer-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message / Query</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ask any question about weather, mandi prices, or field measurement..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-farmer-600 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <LuSend className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
