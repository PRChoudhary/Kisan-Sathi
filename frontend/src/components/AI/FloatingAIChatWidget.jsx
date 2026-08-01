import React, { useState, useEffect, useRef } from 'react';
import { streamAIChat } from '../../services/api';
import ChatMessage from './ChatMessage';
import { useApp } from '../../context/AppContext';
import { 
  LuBot, 
  LuX, 
  LuSend, 
  LuTrash2, 
  LuSparkles, 
  LuCloudSun, 
  LuTrendingUp, 
  LuMapPin,
  LuRefreshCw
} from 'react-icons/lu';

const SUGGESTED_QUESTIONS = [
  "Should I irrigate my crops today?",
  "What is today's wheat price?",
  "Will it rain this week in my area?",
  "I have a 2-acre field. How much seed do I need?",
  "Which nearby mandi has the best crop prices?",
  "What government schemes are available for farmers?"
];

export default function FloatingAIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '• Weather & 7-day forecast advice\n• Live APMC Mandi crop prices\n• Field seed & input calculations\n\nWhich topic do you need help with?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const { savedFields, favoriteCrops, favoriteLocations } = useApp();
  const chatEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

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

    // Initial assistant empty message
    const assistantMessage = {
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, assistantMessage]);

    // Prepare dynamic context
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
      () => {
        setIsStreaming(false);
      },
      (error) => {
        setIsStreaming(false);
        setMessages(prev => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (updated[lastIdx]) {
            updated[lastIdx].content = '⚠️ Sorry, I could not complete the response. Please check your internet connection.';
          }
          return updated;
        });
      }
    );
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: '🌾 Chat history cleared! Ask me anything about weather, crop prices, or field seed estimates.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* FLOATING ACTION BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-farmer-600 hover:bg-farmer-700 text-white shadow-2xl shadow-farmer-600/40 transition-all hover:scale-110 active:scale-95 flex items-center gap-2 group border-2 border-white ring-4 ring-farmer-500/20"
        aria-label="Kisan AI Assistant"
      >
        <LuBot className="w-7 h-7 text-amber-300 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline-block font-extrabold text-sm pr-1">Kisan AI</span>
        <span className="flex h-3 w-3 relative -mt-3 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
        </span>
      </button>

      {/* SIDE DRAWER CHAT MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-50 w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-farmer-200">
            
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-farmer-800 to-farmer-700 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white/10 text-amber-300">
                  <LuBot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">Kisan AI Copilot</h3>
                    <span className="bg-amber-400 text-slate-900 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Online
                    </span>
                  </div>
                  <p className="text-xs text-farmer-200">Smart Farming Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Clear Chat History"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Live Context Indicators Bar */}
            <div className="bg-farmer-50 border-b border-farmer-200 px-4 py-2 flex items-center gap-3 overflow-x-auto text-[11px] font-bold text-farmer-800 shrink-0">
              <span className="flex items-center gap-1 shrink-0">
                <LuCloudSun className="w-3.5 h-3.5 text-farmer-600" />
                29°C Partly Cloudy
              </span>
              <span className="flex items-center gap-1 shrink-0">
                <LuTrendingUp className="w-3.5 h-3.5 text-farmer-600" />
                Wheat ₹2,360/qtl
              </span>
              {savedFields.length > 0 && (
                <span className="flex items-center gap-1 shrink-0">
                  <LuMapPin className="w-3.5 h-3.5 text-farmer-600" />
                  {savedFields[0].areaAcres} Acres Field
                </span>
              )}
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg}
                  isStreaming={isStreaming && index === messages.length - 1}
                />
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested Quick Questions */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0 space-y-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
                Suggested Questions:
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={isStreaming}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-farmer-50 hover:text-farmer-800 text-slate-700 text-xs font-semibold whitespace-nowrap border border-slate-200 transition-colors shrink-0 disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 pt-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Kisan AI anything about your crops..."
                  className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-farmer-600 text-sm font-medium bg-slate-50 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="p-3 rounded-2xl bg-farmer-600 hover:bg-farmer-700 disabled:opacity-50 text-white font-bold shadow-md shadow-farmer-600/30 transition-all shrink-0"
                >
                  <LuSend className="w-5 h-5" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
