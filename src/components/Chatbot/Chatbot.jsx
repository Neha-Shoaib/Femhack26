import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Sparkles, 
  Send, 
  Trash2, 
  Minimize2 
} from 'lucide-react';

// Paste your public URL generated from Google Colab here:
const API_URL = "https://frilly-javon-unvitiating.ngrok-free.dev/api/chat";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm CVCraft AI. How can I assist you with your resume, bullet points, or ATS optimization today?"
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

const handleSend = async (e) => {
  e?.preventDefault();
  if (!input.trim() || loading) return;

  const userMessage = { role: 'user', content: input.trim() };
  const updatedMessages = [...messages, userMessage];

  setMessages(updatedMessages);
  setInput('');
  setLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' // Bypass ngrok warning page
      },
      body: JSON.stringify({
        messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP Status: ${response.status}`, errorText);
      throw new Error(`Server returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
  } catch (err) {
    console.error('Chat error details:', err);
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: `Error connecting: ${err.message || 'Please check Colab logs'}`
      }
    ]);
  } finally {
    setLoading(false);
  }
};
  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared. What resume questions do you have?"
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center ring-2 ring-white/20"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[500px] rounded-2xl bg-[#0b111e] border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100">
          {/* Header */}
          <div className="px-4 py-3 bg-[#0e1626] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">CVCraft AI</h3>
                <p className="text-[10px] text-slate-400">Resume Consultant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="px-3 py-2 bg-slate-950/40 border-b border-slate-800/50 flex gap-2 overflow-x-auto text-[11px]">
            <button
              onClick={() => setInput("How do I make my resume ATS-friendly?")}
              className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-blue-500/40 whitespace-nowrap"
            >
              🎯 ATS Tips
            </button>
            <button
              onClick={() => setInput("Rewrite this bullet point to show quantifiable impact: ")}
              className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-blue-500/40 whitespace-nowrap"
            >
              ✍️ Improve Bullet
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="h-6 w-6 rounded bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl max-w-[80%] leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="h-6 w-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs">
                <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse" />
                <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse delay-150" />
                <span className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse delay-300" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <form onSubmit={handleSend} className="p-3 bg-[#0e1626] border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about resumes, bullet points..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}