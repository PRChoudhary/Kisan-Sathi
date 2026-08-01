import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from '../components/AI/ChatMessage';
import { streamAIChat } from '../services/api';
import { useApp } from '../context/AppContext';
import { 
  LuBot, LuSend, LuTrash2, LuSparkles, LuCloudSun, LuTrendingUp, LuMapPin,
  LuRefreshCw
} from 'react-icons/lu';

const QUICK_ACTIONS = [
  { label: 'Weather Advice',      icon: '🌤️', query: 'What is the weather forecast and irrigation advice for today?' },
  { label: 'Market Advice',       icon: '📈', query: 'Which crop has the highest market price right now?' },
  { label: 'Crop Suggestions',    icon: '🌱', query: 'What crops are most suitable for planting this season?' },
  { label: 'Rain Forecast',       icon: '🌧️', query: 'Will it rain this week in my field area?' },
  { label: 'Field Seed Estimate', icon: '📐', query: 'I have a 2-acre field. How much wheat seed will I need?' },
  { label: 'Gov Schemes',         icon: '🏛️', query: 'What government agricultural schemes can I apply for?' },
];

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }}
      className="flex items-center gap-2.5 px-4 py-3"
    >
      <div className="w-7 h-7 rounded-xl bg-farmer-600 flex items-center justify-center">
        <LuBot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-slate-100 dark:bg-white/10 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="typing-dot w-2 h-2 rounded-full bg-farmer-500 dark:bg-farmer-400"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "**Namaste! I'm Kisan AI** 🌾\n\nI can help you with:\n• Weather & rain forecast guidance\n• Real-time mandi price insights\n• Land area seed requirement estimates\n• Government scheme information\n\nHow can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput]         = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showTyping, setShowTyping]   = useState(false);

  const { savedFields, favoriteCrops, favoriteLocations } = useApp();
  const chatEndRef = useRef(null);
  const inputRef   = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showTyping]);

  const handleSend = async (userQuery) => {
    const text = (userQuery || input).trim();
    if (!text || isStreaming) return;

    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setIsStreaming(true);
    setShowTyping(true);

    const context = {
      location: favoriteLocations[0]?.locationName || 'India',
      weather:  { current: { temperature: 29, condition: 'Partly Cloudy', humidity: 62, rainProbability: 25 } },
      mandi:    favoriteCrops.map(c => ({ cropName: c.cropName, market: c.market || 'APMC Mandi', modalPrice: 2360 })),
      fields:   savedFields,
    };

    const assistantMsg = {
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Brief delay for typing indicator
    await new Promise(r => setTimeout(r, 400));
    setShowTyping(false);
    setMessages(prev => [...prev, assistantMsg]);

    await streamAIChat(
      history,
      context,
      (chunk) => {
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: last.content + chunk };
          }
          return updated;
        });
      },
      () => setIsStreaming(false),
      () => {
        setIsStreaming(false);
        setShowTyping(false);
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === 'assistant' && !last.content) {
            updated[updated.length - 1] = { ...last, content: '⚠️ Communication error. Please try again.' };
          }
          return updated;
        });
      },
    );
  };

  const handleRegenerate = () => {
    const lastUser = [...messages].reverse().find(m => m.role === 'user');
    if (lastUser && !isStreaming) {
      setMessages(prev => prev.slice(0, -1));
      setTimeout(() => handleSend(lastUser.content), 100);
    }
  };

  const handleClear = () => {
    setMessages([{
      role: 'assistant',
      content: '🌾 History cleared. How can I assist you with your farming decisions today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6 min-h-[85vh] flex flex-col">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        className="bg-gradient-to-r from-farmer-800 via-farmer-700 to-farmer-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-amber-300">
            <LuSparkles className="w-4 h-4" />
            <span>OpenAI Powered AI Copilot</span>
          </div>
          <h1 className="text-2xl font-black text-white">Kisan AI Assistant</h1>
          <p className="text-xs text-farmer-200">Context-aware farming intelligence tailored to your data.</p>
        </div>

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
      </motion.div>

      {/* Chat Window */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}
        className="bg-white dark:bg-[#111] rounded-3xl border border-slate-200 dark:border-white/10 shadow-md flex-1 flex flex-col overflow-hidden min-h-[500px]"
      >
        {/* Top bar */}
        <div className="bg-slate-50 dark:bg-white/5 px-6 py-3 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Conversation · {messages.length} messages
          </span>
          <div className="flex items-center gap-2">
            {messages.length > 1 && !isStreaming && (
              <button
                onClick={handleRegenerate}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                title="Regenerate last response"
              >
                <LuRefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Regenerate</span>
              </button>
            )}
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LuTrash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChatMessage
                  message={msg}
                  isStreaming={isStreaming && i === messages.length - 1}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {showTyping && <TypingIndicator />}
          </AnimatePresence>

          <div ref={chatEndRef} />
        </div>

        {/* Quick Actions + Input */}
        <div className="p-4 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {QUICK_ACTIONS.map((action, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleSend(action.query)}
                disabled={isStreaming}
                className="p-2.5 rounded-xl bg-white dark:bg-white/10 hover:bg-farmer-50 dark:hover:bg-farmer-900/20 hover:border-farmer-300 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 text-left transition-colors shadow-sm flex flex-col gap-1 group disabled:opacity-50"
              >
                <span className="text-lg">{action.icon}</span>
                <span className="truncate text-[11px]">{action.label}</span>
              </motion.button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Kisan AI anything… (Enter to send, Shift+Enter for new line)"
              rows={1}
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-farmer-600 dark:focus:border-farmer-500 focus:ring-2 focus:ring-farmer-500/20 resize-none overflow-hidden shadow-inner"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              disabled={!input.trim() || isStreaming}
              className="px-5 py-3 rounded-2xl bg-farmer-600 hover:bg-farmer-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-farmer-600/30 flex items-center gap-2 shrink-0 transition-colors"
            >
              <LuSend className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
