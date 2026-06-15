import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle, ChevronDown, RefreshCw } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I am **Aura**, your virtual assistant at **Markz Dental Clinic**. 🦷✨\n\nHow can I help you today? You can ask me about our specialized treatments (like microscopic RCT or implants), timings, our lead consultants, or how to book an appointment!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setErrorHeader(null);
    setInput('');
    
    // Add user message to UI
    const updatedMessages = [...messages, { role: 'user', content: trimmed } as Message];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          history: messages, // Send dialogue history
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error status');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err: any) {
      console.error('Failed to communicate with Aura:', err);
      setErrorHeader('Connection error. Please try again or call +91 9937866280 directly.');
      // Keep user's failed prompt in input to avoid losing it
      setInput(trimmed);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = [
    { label: "🕒 Opening Hours", text: "What are your clinic hours and timings?" },
    { label: "👨‍⚕️ Dr. Sudheer", text: "Tell me about Dr. Sudheer Krishna and his credentials." },
    { label: "🦷 Dental Implants", text: "Do you offer advanced dental implants services?" },
    { label: "📅 Book Spot", text: "How can I book an appointment at Markz Dental Clinic?" }
  ];

  return (
    <>
      {/* 1. Floating Action Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 left-6 md:bottom-6 md:left-6 bg-teal-500 hover:bg-teal-400 text-[#0a0f18] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center border border-teal-400/20 group cursor-pointer"
          title="Chat with virtual assistant Aura"
          id="aura-chatbot-trigger"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 group-hover:ml-2 font-sans font-bold text-xs uppercase tracking-widest whitespace-nowrap">
            Ask Aura AI
          </span>
          {/* Unread dot indicator */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border-2 border-[#0a0f18] animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border-2 border-[#0a0f18]" />
        </button>
      )}

      {/* 2. Slide-up Chat Container */}
      {isOpen && (
        <div 
          className="fixed bottom-20 left-4 right-4 md:bottom-24 md:left-6 md:right-auto md:w-96 h-[550px] max-h-[80vh] bg-[#0d1522] rounded-2xl border border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-250 font-sans"
          id="aura-chatbot-panel"
        >
          {/* Header */}
          <div className="p-4 bg-[#0a0f18] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-light text-sm text-white tracking-wide">Aura AI</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-bold tracking-wider uppercase rounded-full">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0"></span>
                    Online
                  </span>
                </div>
                <span className="text-[9px] text-[#D4AF37] tracking-wider uppercase font-semibold">Markz Dental Assistant</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              title="Minimize chat panel"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Connection Error Banner */}
          {errorHeader && (
            <div className="bg-rose-500/10 border-b border-rose-500/20 px-4 py-2 text-rose-300 text-xs flex items-start gap-2 animate-fade-in font-sans">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-grow">
                <span>{errorHeader}</span>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 bg-[#070b11] scrollbar-thin"
          >
            {messages.map((msg, index) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div 
                  key={index}
                  className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} animate-fade-in`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Bot avatar icon */}
                    {isAssistant && (
                      <div className="w-7 h-7 rounded-sm bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center shrink-0 self-end text-[10px] font-bold">
                        A
                      </div>
                    )}
                    
                    <div 
                      className={`p-3 rounded-2xl text-xs leading-relaxed font-sans ${
                        isAssistant 
                          ? 'bg-[#0d1522] text-gray-200 border border-white/5 rounded-bl-xs' 
                          : 'bg-teal-500 text-[#0a0f18] font-semibold rounded-br-xs'
                      }`}
                    >
                      {/* Simple custom safe Markdown parser for bolding/emojis */}
                      <p className="whitespace-pre-line text-balance text-pretty">
                        {renderMessageContent(msg.content)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Processing generator indicator */}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-7 h-7 rounded-sm bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center shrink-0 self-end">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="p-3 bg-[#0d1522] text-gray-400 border border-white/5 rounded-2xl rounded-bl-xs flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce delay-225" />
                    <span className="ml-1 text-[10px] text-gray-500">Aura is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick replies suggestion chips */}
          {messages.length < 3 && !isLoading && (
            <div className="px-3 py-2 bg-[#0a0f18]/60 border-t border-white/5 flex flex-wrap gap-1.5 overflow-x-auto select-none max-h-24">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply.text)}
                  className="px-2.5 py-1 text-[9px] font-sans font-bold uppercase tracking-wider text-teal-400 bg-teal-500/5 hover:bg-teal-500/10 border border-teal-500/20 hover:border-teal-400/40 rounded-full transition-all cursor-pointer whitespace-nowrap"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          {/* Chat Form Area */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-3 bg-[#0a0f18] border-t border-white/5 flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aura a question..."
              disabled={isLoading}
              className="flex-grow bg-[#070b11] border border-white/5 outline-none rounded-xl text-xs py-2.5 px-3.5 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-teal-500 hover:bg-teal-400 text-black rounded-xl transition-all cursor-pointer shadow-lg shadow-teal-500/10 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Send prompt to Aura AI"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

// Quick custom utility to render bold text correctly in chat window without heavy dependency
function renderMessageContent(content: string) {
  // Bold **text** logic
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-extrabold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
