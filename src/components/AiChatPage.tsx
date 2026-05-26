/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, RefreshCw, Trash2, ArrowLeft, Lightbulb, Check, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AiChatPageProps {
  onBackToStore: () => void;
  userName?: string;
}

export function AiChatPage({ onBackToStore, userName }: AiChatPageProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('roxon_ai_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Assalomu alaykum${userName ? `, ${userName}` : ''}! 🛠️\n\nMen **ROXON** kompaniyasining professional sun'iy intellekt maslahatchisiman. Sizga sanoat elektr asboblari, generator quvvatini hisoblash, suv nasoslari yoki qurilish texnikasi bo'yicha qanday amaliy va foydali maslahat kerak?\n\nMenga quyidagicha savollar berishingiz mumkin:\n- *"Menga generator kVt quvvatini hisoblab bering."*\n- *"FlowMaster P-30 nasosi qanday quvvatga ega?"*\n- *"Drel Ultra Drill X-200 kafolati qancha?"*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save chat to local storage
  useEffect(() => {
    localStorage.setItem('roxon_ai_chat', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    if (!textToSend) {
      setInputMessage('');
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Map message history to payload expected by server.ts
      const apiMessages = updatedMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server xatosi: ${res.status}`);
      }

      const data = await res.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `⚠️ **Xatolik yuz berdi:** ${err.message || 'Server qatlamiga ulana olmadik. Tarmoq aloqasini tekshiring yoki sozlamalardan API kalitini kiritganingizni tasdiqlang.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Rostdan ham sabahtlar tarixini tozalashni xohlaysizmi?")) {
      const resetMsg: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `Suhbat tozalab yuborildi. Menga sanoat dagerasida elektr sohasidagi va ROXON uskunalaridagi har qanday qiziqtirgan texnik savolingizni berishingiz mumkin!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([resetMsg]);
    }
  };

  const starterQuestions = [
    {
      title: "⚡ Generator hisoblash",
      prompt: "Menga generator quvvatini professional tarzda hisoblab ber, uyda muzlatgich, televizor va konditsioner bor.",
      description: "Yuklanishni o'lchash"
    },
    {
      title: "💧 Nasos tanlash",
      prompt: "Quduqdan 20 metr chuqurlikdan suv tortish uchun qaysi model mos keladi va uning sarfi qanday?",
      description: "Tavsiyalarni ko'rish"
    },
    {
      title: "🛠️ Kafolat va Servis",
      prompt: "Roxon uskunalariga necha oy kafolat beriladi va sotuvdan keyingi servis tizimi qanday ishlaydi?",
      description: "Qoidalar bilan tanishish"
    },
    {
      title: "📦 Tavsiyalar olish",
      prompt: "ROXON Ultra Drill X-200 professional drelining qanday ustunlik jihatlari bor va narxi qancha?",
      description: "Drel xususiyatlari"
    }
  ];

  // A light helper function to parse markdown features: lists, bold text, new lines, tables
  const renderParsedMarkdown = (rawText: string) => {
    if (!rawText) return null;

    const paragraphs = rawText.split('\n');

    return paragraphs.map((para, index) => {
      const trimmed = para.trim();

      // Check for table row (e.g. starts with | and is closed with |)
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        // If it's the header separator line containing dashes, ignore it
        if (trimmed.includes('---')) {
          return null;
        }

        const cols = trimmed.split('|').filter(c => c.trim() !== '').map(c => c.trim());
        const isHeader = index === 0 || (paragraphs[index - 1] && paragraphs[index - 1].trim() === '');
        
        return (
          <div key={index} className="overflow-x-auto my-2 rounded-lg border border-white/5 bg-neutral-900/60 p-2">
            <table className="min-w-full text-xs text-left text-gray-300">
              <tbody>
                <tr className="hover:bg-white/5 transition-colors">
                  {cols.map((col, cIdx) => (
                    <td key={cIdx} className={`px-3 py-1.5 border border-white/10 ${isHeader ? 'font-bold text-amber-500 bg-neutral-950/40' : ''}`}>
                      {parseInlineFormatting(col)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      }

      // Check for list item
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const itemContent = trimmed.slice(1).trim();
        return (
          <ul key={index} className="list-disc list-outside pl-5 space-y-1 my-1 text-sm text-gray-300">
            <li>{parseInlineFormatting(itemContent)}</li>
          </ul>
        );
      }

      // Check for numbered item
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <ol key={index} className="list-decimal list-outside pl-5 space-y-1 my-1 text-sm text-gray-300">
            <li value={parseInt(numMatch[1], 10)}>{parseInlineFormatting(numMatch[2])}</li>
          </ol>
        );
      }

      // Default paragraph
      return (
        <p key={index} className="leading-relaxed text-sm mb-2 text-gray-300 min-h-[1.25rem]">
          {parseInlineFormatting(para)}
        </p>
      );
    });
  };

  // Parses inline `**bold**` and `*italic*` and backticks for short code
  const parseInlineFormatting = (text: string) => {
    if (!text) return '';

    // Split by ** for bold
    const boldParts = text.split(/\*\*([\s\S]*?)\*\*/g);
    return boldParts.map((part, idx) => {
      // Every odd index is content inside **...**
      if (idx % 2 === 1) {
        return <strong key={idx} className="font-extrabold text-amber-500">{part}</strong>;
      }

      // Inside normal part, split by backticks `...` for inline code
      const codeParts = part.split(/`([\s\S]*?)`/g);
      return codeParts.map((subPart, subIdx) => {
        if (subIdx % 2 === 1) {
          return <code key={subIdx} className="bg-neutral-850 px-1.5 py-0.5 rounded font-mono text-xs text-amber-300 border border-white/5">{subPart}</code>;
        }
        return subPart;
      });
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans" id="ai-chat-view">
      {/* Top Bar Navigation */}
      <div className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 px-3.5 py-2 rounded-xl transition-all active:scale-95"
            title="Sotuv do'koniga qaytish"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Do'kon</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-500 relative">
              <Bot className="w-5.5 h-5.5" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-neutral-950 animate-pulse"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-black tracking-wide text-gray-100">ROXON AI</h1>
                <span className="text-[10px] bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border border-amber-500/10">EXPERT</span>
              </div>
              <p className="text-[11px] text-gray-450">Aqlli maslahatchi va texnik yordamchi</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 1 && (
            <button
              onClick={handleClearChat}
              className="p-2.5 bg-neutral-850 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors text-gray-400"
              title="Suhbatni tozalash"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main chat layout */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 h-[calc(100vh-130px)]">
        
        {/* Left side sidebar: Information & Starter Prompts */}
        <div className="w-full md:w-80 flex flex-col gap-4 hidden md:flex shrink-0">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-amber-500 flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4" />
              Qanday yordam bera olaman?
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              ROXON AI yordamida elektr asboblari, yuklanish kVt miqdorlari va suv nasoslarini hisoblang. Mahsulotlarimiz bo'sh katakda to'liq tushuntirib beriladi.
            </p>
            
            <div className="mt-4 pt-4 border-t border-white/5 space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>To'g'ri generator tanlash</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Texnik parametrlarni taqqoslash</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Servis va qo'llab-quvvatlash masalalari</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Mashhur so'rovlar</h3>
              <div className="space-y-2">
                {starterQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q.prompt)}
                    className="w-full text-left p-3 rounded-xl bg-neutral-850 hover:bg-neutral-800 transition-all border border-white/5 hover:border-amber-500/25 group"
                  >
                    <div className="text-xs font-bold text-gray-200 group-hover:text-amber-400 transition-colors mb-0.5">{q.title}</div>
                    <div className="text-[10px] text-gray-500">{q.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-neutral-950 rounded-xl border border-white/5 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="text-[10px] text-gray-500 leading-tight">Gemini sun'iy intellekti hisoblashlarda tavsiyaviy xarakterga ega.</p>
            </div>
          </div>
        </div>

        {/* Right side/Center: Messages list & input box */}
        <div className="flex-1 flex flex-col bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {/* Scrollable messages panel */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 shadow-inner">
            <AnimatePresence initial={false}>
              {messages.map((msgRef) => (
                <motion.div
                  key={msgRef.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3.5 max-w-[85%] ${msgRef.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 border ${
                    msgRef.role === 'user'
                      ? 'bg-amber-500 text-neutral-950 border-amber-400 font-extrabold'
                      : 'bg-neutral-800 text-amber-500 border-white/5'
                  }`}>
                    {msgRef.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1 flex flex-col">
                    <div className={`p-4 rounded-3xl ${
                      msgRef.role === 'user'
                        ? 'bg-amber-500 text-neutral-950 rounded-tr-none font-medium selection:bg-neutral-900 selection:text-white'
                        : 'bg-neutral-850 border border-white/5 rounded-tl-none text-gray-200 selection:bg-amber-500 selection:text-neutral-950'
                    }`}>
                      {msgRef.role === 'user' ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msgRef.content}</p>
                      ) : (
                        <div className="space-y-1">
                          {renderParsedMarkdown(msgRef.content)}
                        </div>
                      )}
                    </div>
                    <span className={`text-[9px] px-1 text-gray-500 ${msgRef.role === 'user' ? 'text-right' : ''}`}>
                      {msgRef.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <div className="flex gap-3.5 max-w-[80%]">
                <div className="w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 bg-neutral-800 text-amber-500 border border-white/5 animate-spin">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-3xl rounded-tl-none bg-neutral-850 border border-white/5 flex items-center gap-2">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">ROXON AI javob qaytarmoqda...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt cards on ultra-small screens/mobile */}
          <div className="md:hidden px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto bg-neutral-950/60 shrink-0">
            {starterQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.prompt)}
                className="whitespace-nowrap px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/5 text-xs text-gray-300 font-medium shrink-0 active:scale-95"
              >
                {q.title}
              </button>
            ))}
          </div>

          {/* Form message inputs bar */}
          <div className="p-4 bg-neutral-950 border-t border-white/5 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center bg-neutral-900 rounded-2xl border border-white/5 focus-within:border-amber-500/40 p-2 pl-4 transition-all"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Savolingizni bu yerga yozing..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500 text-gray-200 pr-12 focus:ring-0"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className={`p-3 rounded-xl transition-all ${
                  inputMessage.trim() && !isLoading
                    ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400 active:scale-95 hover:scale-105'
                    : 'bg-neutral-800 text-gray-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-gray-600 mt-2">
              Maslahatchi bilan savob-javoblar shaxsiy hisoblanadi va xavfsiz kanallar orqali himoyalangan.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
