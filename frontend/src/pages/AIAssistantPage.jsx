import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from '../components/AI/ChatMessage';
import { streamAIChat } from '../services/api';
import { useApp } from '../context/AppContext';
import { 
  LuBot, 
  LuSend, 
  LuTrash2, 
  LuSparkles, 
  LuCloudSun, 
  LuTrendingUp, 
  LuMapPin,
  LuCompass,
  LuShieldCheck
} from 'react-icons/lu';

const QUICK_ACTIONS = [
  { label: "Weather Advice", icon: "🌤️", query: "What is the weather forecast and irrigation advice for today?" },
  { label: "Market Advice", icon: "📈", query: "Which crop has the highest market price right now?" },
  { label: "Crop Suggestions", icon: "🌱", query: "What crops are most suitable for planting this season?" },
  { label: "Rain Forecast", icon: "🌧️", query: "Will it rain this week in my field area?" },
  { label: "Field Seed Estimate", icon: "📐", query: "I have a 2-acre field. How much wheat seed will I need?" },
  { label: "Government Schemes", icon: "🏛️", query: "What government agricultural schemes can I apply for?" }
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '• Weather & rain forecast guidance\n• Real-time mandi price insights\n• Land area seed requirement estimates\n\nHow can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const { savedFields, favoriteCrops, favoriteLocations } = useApp();
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (userQuery) => {
    const text = userQuery || input.trim();
    if (!text || isStreaming) return;

    const userMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);

    const assistantMessage = {
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, assistantMessage]);

    const context = {
      location: favoriteLocations[0]?.locationName || 'India',
      weather: { current: { temperature: 29, condition: 'Partly Cloudy', humidity: 62, rainProbability: 25 } },
      mandi: favoriteCrops.map(c => ({ cropName: c.cropName, market: c.market || 'APMC Mandi', modalPrice: 2360 })),
      fields: savedFields
    };

    await streamAIChat(
      newMessages,
      context,
      (chunk) => {
        setMessages(prev => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (updated[lastIdx]?.role === 'assistant') {
            updated[lastIdx] = {
              ...updated[lastIdx],
              content: updated[lastIdx].content + chunk
            };
          }
          return updated;
        });
      },
      () => setIsStreaming(false),
      (error) => {
        setIsStreaming(false);
        setMessages(prev => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (updated[lastIdx]) {
            updated[lastIdx].content = '⚠️ Communication error. Please try again.';
          }
          return updated;
        });
      }
    );
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        content: '🌾 History cleared. How can I assist you with your farming decisions today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6 min-h-[85vh] flex flex-col">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-farmer-800 via-farmer-700 to-farmer-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-amber-300">
            <LuSparkles className="w-4 h-4" />
            <span>OpenAI Powered AI Copilot</span>
          </div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <span>Kisan AI Assistant</span>
          </h1>
          <p className="text-xs text-farmer-200">
            Context-aware farming intelligence tailored to your weather, land area, and mandi rates.
          </p>
        </div>

        {/* Live Context Indicators */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5">
            <LuCloudSun className="w-4 h-4 text-amber-300" />
            <span>29°C Partly Cloudy</span>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5">
            <LuTrendingUp className="w-4 h-4 text-emerald-300" />
            <span>Wheat ₹2,360</span>
          </div>
          {savedFields.length > 0 && (
            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5">
              <LuMapPin className="w-4 h-4 text-sky-300" />
              <span>{savedFields[0].areaAcres} Acres</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md flex-1 flex flex-col overflow-hidden min-h-[500px]">
        
        {/* Top Action Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Conversation Stream
          </span>
          <button
            onClick={handleClear}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
          >
            <LuTrash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        </div>

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              isStreaming={isStreaming && index === messages.length - 1}
            />
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Actions Grid */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {QUICK_ACTIONS.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(action.query)}
                disabled={isStreaming}
                className="p-2.5 rounded-xl bg-white hover:bg-farmer-50 hover:border-farmer-300 border border-slate-200 text-xs font-bold text-slate-700 text-left transition-all shadow-2xs flex flex-col justify-between gap-1 group disabled:opacity-50"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">{action.icon}</span>
                <span className="truncate">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3 pt-1"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Kisan AI anything about weather, irrigation, crops, or market rates..."
              className="flex-1 px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm font-semibold bg-white shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="px-6 py-3.5 rounded-2xl bg-farmer-600 hover:bg-farmer-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-farmer-600/30 flex items-center gap-2"
            >
              <LuSend className="w-5 h-5" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
