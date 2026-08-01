import React, { useState } from 'react';
import { LuCopy, LuCheck, LuBot, LuUser } from 'react-icons/lu';

// Simple Markdown Renderer
function SimpleMarkdown({ content }) {
  if (!content) return null;

  // Split into lines
  const lines = content.split('\n');

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        let trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header 3 or bold header
        if (trimmed.startsWith('###') || trimmed.startsWith('**') && trimmed.endsWith('**')) {
          const headerText = trimmed.replace(/^[#*]+\s*/, '').replace(/\*+$/, '');
          return (
            <h4 key={idx} className="font-black text-slate-900 text-base mt-2 mb-1">
              {headerText}
            </h4>
          );
        }

        // Bullet point
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletText = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-farmer-600 font-bold text-base leading-none">•</span>
              <span>{parseInlineBold(bulletText)}</span>
            </div>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
          const numText = trimmed.replace(/^\d+\.\s/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-farmer-700 font-extrabold text-xs">{trimmed.match(/^\d+/)[0]}.</span>
              <span>{parseInlineBold(numText)}</span>
            </div>
          );
        }

        return <p key={idx}>{parseInlineBold(line)}</p>;
      })}
    </div>
  );
}

// Inline bold parser
function parseInlineBold(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-extrabold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function ChatMessage({ message, isStreaming }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 my-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 font-bold text-sm shadow-md ${
          isUser ? 'bg-slate-800' : 'bg-farmer-600 shadow-farmer-600/30'
        }`}
      >
        {isUser ? <LuUser className="w-5 h-5" /> : <LuBot className="w-5 h-5 text-amber-300" />}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-sm relative group ${
          isUser
            ? 'bg-slate-900 text-white rounded-tr-none'
            : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
        }`}
      >
        {!isUser && message.content && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all"
            title="Copy response"
          >
            {copied ? <LuCheck className="w-4 h-4 text-emerald-600" /> : <LuCopy className="w-4 h-4" />}
          </button>
        )}

        {isUser ? (
          <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div>
            <SimpleMarkdown content={message.content} />
            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-farmer-600 animate-pulse ml-1 align-middle" />
            )}
          </div>
        )}

        {/* Timestamp */}
        <span
          className={`block text-[10px] mt-2 font-medium text-right ${
            isUser ? 'text-slate-400' : 'text-slate-400'
          }`}
        >
          {message.timestamp || 'Just now'}
        </span>
      </div>

    </div>
  );
}
