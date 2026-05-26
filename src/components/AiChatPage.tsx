/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, User, RefreshCw, Trash2, ArrowLeft, Lightbulb, Check, ShieldAlert, Plus, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

interface StarterQuestion {
  title: string;
  prompt: string;
  description: string;
}

interface AiChatPageProps {
  onBackToStore: () => void;
  userName?: string;
}

export function AiChatPage({ onBackToStore, userName }: AiChatPageProps) {
  // 1. Multiple Chat Sessions from LocalStorage (Maximum 10)
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('roxon_ai_sessions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // Fallback below
      }
    }
    return [
      {
        id: 'session_default',
        title: 'Boshlang\'ich chat',
        messages: [
          {
            id: 'welcome',
            role: 'assistant',
            content: `Assalomu alaykum${userName ? `, ${userName}` : ''}! 🛠️\n\nMen **ROXON** kompaniyasining professional sun'iy intellekt maslahatchisiman. Sizga sanoat elektr asboblari, generator quvvatini hisoblash, suv nasoslari yoki qurilish texnikasi bo'yicha qanday amaliy va foydali maslahat kerak?\n\nMenga quyidagicha savollar berishingiz mumkin:\n- *"Menga generator kVt quvvatini hisoblab bering."*\n- *"FlowMaster P-30 nasosi qanday quvvatga ega?"*\n- *"Drel Ultra Drill X-200 kafolati qancha?"*`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ],
        createdAt: new Date().toISOString()
      }
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    const savedActive = localStorage.getItem('roxon_ai_active_session_id');
    if (savedActive) {
      return savedActive;
    }
    return 'session_default';
  });

  // 2. Starter Prompts from LocalStorage (Customizable)
  const [starters, setStarters] = useState<StarterQuestion[]>(() => {
    const saved = localStorage.getItem('roxon_ai_starters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [
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
  });

  // Adding Custom Prompts State
  const [isAddingStarter, setIsAddingStarter] = useState(false);
  const [newStarterTitle, setNewStarterTitle] = useState('');
  const [newStarterPrompt, setNewStarterPrompt] = useState('');
  const [newStarterDesc, setNewStarterDesc] = useState('');

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync to Storage
  useEffect(() => {
    localStorage.setItem('roxon_ai_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('roxon_ai_active_session_id', activeSessionId);
  }, [activeSessionId]);

  useEffect(() => {
    localStorage.setItem('roxon_ai_starters', JSON.stringify(starters));
  }, [starters]);

  // Find currently active session and fallback
  const currentSession = sessions.find(s => s.id === activeSessionId) || sessions[0] || {
    id: 'session_default',
    title: 'Boshlang\'ich chat',
    messages: []
  };
  const messages = currentSession.messages;

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Multiple session handler: create action
  const handleCreateSession = () => {
    if (sessions.length >= 10) {
      alert("⚠️ Maksimal suhbatlar limiti (10) ga yetdingiz. Yangisini ochish uchun eskisini o'chiring!");
      return;
    }

    const newSessionId = 'session_' + Date.now();
    const newSessionName = `Suhbat #${sessions.length + 1}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: newSessionName,
      messages: [
        {
          id: 'welcome_' + Date.now(),
          role: 'assistant',
          content: `Assalomu alaykum! Yangi suhbatga xush kelibsiz. Sanoat asboblari va ROXON mahsulotlari haqida so'rang yoki mavzulardan birini tanlang.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      createdAt: new Date().toISOString()
    };

    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newSessionId);
  };

  // Multiple session handler: delete single session
  const handleDeleteSession = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (sessions.length <= 1) {
      // Clear the single remaining session
      const resetMsg: Message = {
        id: 'welcome_' + Date.now(),
        role: 'assistant',
        content: `Suhbat tozalab yuborildi. Menga sanoat doirasidagi elektr sohasidagi va ROXON uskunalaridagi har qanday qiziqtirgan texnik savolingizni berishingiz mumkin!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions([{
        id: 'session_default',
        title: 'Boshlang\'ich chat',
        messages: [resetMsg],
        createdAt: new Date().toISOString()
      }]);
      setActiveSessionId('session_default');
      return;
    }

    const remaining = sessions.filter(s => s.id !== idToDelete);
    setSessions(remaining);

    if (activeSessionId === idToDelete) {
      setActiveSessionId(remaining[0].id);
    }
  };

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

    // Auto rename active session's title if generic based on the user's first prompt
    let updatedTitle = currentSession.title;
    if (currentSession.title.startsWith('Yangi chat') || currentSession.title.startsWith('Suhbat #') || currentSession.title === 'Boshlang\'ich chat') {
      updatedTitle = text.length > 25 ? text.slice(0, 22) + '...' : text;
    }

    const updatedMessages = [...messages, newMessage];

    // Optimistically update state
    setSessions(prev => prev.map(s => {
      if (s.id === currentSession.id) {
        return {
          ...s,
          title: updatedTitle,
          messages: updatedMessages
        };
      }
      return s;
    }));

    setIsLoading(true);

    try {
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
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => {
        if (s.id === currentSession.id) {
          return {
            ...s,
            messages: [...updatedMessages, assistantMessage]
          };
        }
        return s;
      }));
    } catch (err: any) {
      console.error(err);
      
      const rawErrorMsg = err.message || 'Server qatlamiga ulana olmadik. Vercel loyihangizda GEMINI_API_KEY kaliti mavjudligini tasdiqlang.';
      const cleanErrorMsg = rawErrorMsg.startsWith('⚠️') 
        ? rawErrorMsg 
        : `⚠️ **Xatolik yuz berdi:** ${rawErrorMsg}`;

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanErrorMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => {
        if (s.id === currentSession.id) {
          return {
            ...s,
            messages: [...updatedMessages, errorMessage]
          };
        }
        return s;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCurrentChat = () => {
    if (window.confirm("Rostdan ham ushbu suhbat tarixini tozalashni xohlaysizmi?")) {
      const resetMsg: Message = {
        id: 'welcome_' + Date.now(),
        role: 'assistant',
        content: `Suhbat tozalab yuborildi. Sanoat asboblari va ROXON mahsulotlari haqida so'rang!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => prev.map(s => {
        if (s.id === currentSession.id) {
          return {
            ...s,
            messages: [resetMsg]
          };
        }
        return s;
      }));
    }
  };

  // Markdown parsing engines
  const renderParsedMarkdown = (rawText: string) => {
    if (!rawText) return null;

    const paragraphs = rawText.split('\n');

    return paragraphs.map((para, index) => {
      const trimmed = para.trim();

      // Check table rows
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
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

      // Check bullet items
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const itemContent = trimmed.slice(1).trim();
        return (
          <ul key={index} className="list-disc list-outside pl-5 space-y-1 my-1 text-sm text-gray-300">
            <li>{parseInlineFormatting(itemContent)}</li>
          </ul>
        );
      }

      // Numbered items
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <ol key={index} className="list-decimal list-outside pl-5 space-y-1 my-1 text-sm text-gray-300">
            <li value={parseInt(numMatch[1], 10)}>{parseInlineFormatting(numMatch[2])}</li>
          </ol>
        );
      }

      return (
        <p key={index} className="leading-relaxed text-sm mb-2 text-gray-300 min-h-[1.25rem]">
          {parseInlineFormatting(para)}
        </p>
      );
    });
  };

  const parseInlineFormatting = (text: string) => {
    if (!text) return '';

    const boldParts = text.split(/\*\*([\s\S]*?)\*\*/g);
    return boldParts.map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} className="font-extrabold text-amber-500">{part}</strong>;
      }

      const codeParts = part.split(/`([\s\S]*?)`/g);
      return codeParts.map((subPart, subIdx) => {
        if (subIdx % 2 === 1) {
          return <code key={subIdx} className="bg-neutral-850 px-1.5 py-0.5 rounded font-mono text-xs text-amber-300 border border-white/5">{subPart}</code>;
        }
        return subPart;
      });
    });
  };

  const isLimitReached = sessions.length >= 10;

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col font-sans overflow-hidden" id="ai-chat-view">
      
      {/* 1. Header Navigation */}
      <div className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 px-3 py-2 rounded-xl transition-all active:scale-95 shrink-0"
            title="Sotuv do'koniga qaytish"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Do'kon</span>
          </button>
          
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl sm:rounded-2xl flex items-center justify-center text-amber-500 relative shrink-0">
              <Bot className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full border-2 border-neutral-950 animate-pulse"></span>
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs sm:text-sm font-black tracking-wide text-gray-100 truncate">ROXON AI</h1>
                <span className="text-[9px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-amber-500/10 shrink-0">EXPERT</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 truncate hidden sm:block">Sanoat va texnik yordamchi AI</p>
            </div>
          </div>
        </div>

        {/* Header Action Buttons (Create Session & Clear current) */}
        <div className="flex items-center gap-2">
          {/* Create chat button with dynamic visual status & limit protection */}
          <button
            onClick={handleCreateSession}
            disabled={isLimitReached}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all active:scale-95 ${
              isLimitReached 
                ? 'bg-neutral-900 border-white/5 text-gray-500 cursor-not-allowed opacity-50' 
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/25'
            }`}
            title={isLimitReached ? "Maksimal suhbatlar soniga yetildi" : "Yangi suhbat ochish (Max 10)"}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Yangi suhbat</span>
          </button>

          {messages.length > 1 && (
            <button
              onClick={handleClearCurrentChat}
              className="p-2 bg-neutral-850 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors text-gray-400"
              title="Ushbu suhbatni tozalash"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Layout (Three Columns / Nested Sections) */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 flex flex-col lg:flex-row gap-5 overflow-hidden h-full">
        
        {/* LEFT SIDEBAR: Active Chats list (LocalStorage with limit display) */}
        <div className="w-full lg:w-64 flex flex-col gap-4 hidden lg:flex shrink-0 overflow-y-auto pr-1">
          
          {/* Active Chats sessions Box (Maximum 10 limit) */}
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-4 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                Suhbatlaringiz
              </h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLimitReached ? 'bg-amber-500/20 text-amber-400' : 'bg-neutral-800 text-gray-400'}`}>
                {sessions.length} / 10
              </span>
            </div>

            {/* Warning banner if max reached */}
            {isLimitReached && (
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 leading-normal rounded-xl">
                Maksimal limit (10) ga yetdingiz. Yangisini ochish uchun eskisini o'chiring.
              </div>
            )}

            {/* List of active sessions */}
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {sessions.map((session) => {
                const isActive = session.id === activeSessionId;
                return (
                  <div
                    key={session.id}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`group/sess flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                        : 'bg-neutral-850 border-transparent hover:border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-500' : 'text-gray-500'}`} />
                      <span className="truncate">{session.title}</span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      className="p-1 text-gray-500 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all opacity-0 group-hover/sess:opacity-100"
                      title="Suhbatni o'chirish"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Informational block */}
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-4 shrink-0">
            <h2 className="text-xs font-bold text-amber-500 flex items-center gap-1.5 mb-2">
              <Lightbulb className="w-3.5 h-3.5" />
              Yordamchi Qo'llanma
            </h2>
            <p className="text-[11px] text-gray-450 leading-relaxed">
              Yangi suhbatlarni ochishingiz mumkin, tarixingiz qurilmangizda saqlanadi. Maksimal 10 tagacha chat ochishga ruxsat bor.
            </p>
          </div>
        </div>

        {/* MID COLUMN: Editable Starter recommendation prompts (CRUD) */}
        <div className="w-full lg:w-72 flex flex-col gap-4 hidden lg:flex shrink-0 overflow-y-auto pr-1">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-4 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Sizning So'rovlaringiz
                </h3>
              </div>

              {/* Dynamic scrollable starters list with deletion support */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {starters.length === 0 ? (
                  <div className="p-4 text-center border border-dashed border-white/5 rounded-xl text-gray-500 text-[11px] leading-relaxed">
                    Tavsiya so'rovlar o'chirildi. O'zingiz qidiradigan yangi mavzu yozib qo'shing.
                  </div>
                ) : (
                  starters.map((q, idx) => (
                    <div key={idx} className="group/starter relative flex items-stretch gap-1.5">
                      <button
                        onClick={() => handleSendMessage(q.prompt)}
                        className="flex-1 text-left p-3 rounded-xl bg-neutral-850 hover:bg-neutral-800 transition-all border border-white/5 hover:border-amber-500/25 group/btn"
                      >
                        <div className="text-xs font-bold text-gray-200 group-hover/btn:text-amber-400 transition-colors mb-0.5">{q.title}</div>
                        <div className="text-[10px] text-gray-500 line-clamp-1">{q.description}</div>
                      </button>
                      
                      {/* Real Deletion capability matches user intent to delete/add starter prompts */}
                      <button
                        onClick={() => {
                          setStarters(prev => prev.filter((_, i) => i !== idx));
                        }}
                        className="p-2 leading-none bg-neutral-850 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all text-gray-500 hover:border-red-500/10 border border-white/5 flex items-center justify-center.5 group-hover/starter:opacity-100 opacity-80"
                        title="Ushbu so'rovni o'chirib tashlash"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add starter custom prompt form (CRUD creator) */}
              <div className="mt-4 pt-3 border-t border-white/5">
                {!isAddingStarter ? (
                  <button
                    type="button"
                    onClick={() => setIsAddingStarter(true)}
                    className="w-full py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-gray-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-500" />
                    <span>Yangi so'rov qo'shish</span>
                  </button>
                ) : (
                  <div className="mt-2 bg-neutral-950 p-3 rounded-xl border border-white/5 space-y-2.5">
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold block mb-1">So'rov sarlavhasi (Masalan: Suv tortish)</label>
                      <input
                        type="text"
                        value={newStarterTitle}
                        onChange={(e) => setNewStarterTitle(e.target.value)}
                        placeholder="Sarlavha..."
                        className="w-full text-xs bg-neutral-900 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-amber-500/40"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold block mb-1">To'liq beriladigan savol (Prompt)</label>
                      <textarea
                        value={newStarterPrompt}
                        onChange={(e) => setNewStarterPrompt(e.target.value)}
                        placeholder="Quvvat o'lchovlari..."
                        rows={2}
                        className="w-full text-xs bg-neutral-900 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-amber-500/40 resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold block mb-1">Kichik tavsif (Description)</label>
                      <input
                        type="text"
                        value={newStarterDesc}
                        onChange={(e) => setNewStarterDesc(e.target.value)}
                        placeholder="Tafsilotlar..."
                        className="w-full text-xs bg-neutral-900 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-amber-500/40"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingStarter(false);
                          setNewStarterTitle('');
                          setNewStarterPrompt('');
                          setNewStarterDesc('');
                        }}
                        className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-gray-400 text-[10px] font-semibold transition-colors"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newStarterTitle.trim() || !newStarterPrompt.trim()) {
                            alert("Sarlavha va savol matni to'ldirilishi shart!");
                            return;
                          }
                          setStarters(prev => [
                            ...prev,
                            {
                              title: newStarterTitle.trim(),
                              prompt: newStarterPrompt.trim(),
                              description: newStarterDesc.trim() || "Tavsiyalarni ko'rish"
                            }
                          ]);
                          setIsAddingStarter(false);
                          setNewStarterTitle('');
                          setNewStarterPrompt('');
                          setNewStarterDesc('');
                        }}
                        className="px-2 py-1 rounded bg-amber-500 text-neutral-950 hover:bg-amber-400 text-[10px] font-bold transition-all"
                      >
                        Qo'shish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 p-3 bg-neutral-950 rounded-xl border border-white/5 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <p className="text-[10px] text-gray-550 leading-tight">Hisoblashlar taklif xarakteriga ega.</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE / CONSOLE VIEW: Scrollable Messages List & Inputs */}
        <div className="flex-1 flex flex-col bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl h-full">
          
          {/* Mobile responsive active session switcher */}
          <div className="block lg:hidden px-4 py-2 border-b border-white/5 bg-neutral-950/40 flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-gray-400">Suhbat (Sessions):</span>
            <select
              value={activeSessionId}
              onChange={(e) => setActiveSessionId(e.target.value)}
              className="bg-neutral-800 border border-white/10 rounded-lg text-xs font-semibold text-white px-2 py-1 focus:outline-none focus:border-amber-500/40"
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.messages.length} xabar)
                </option>
              ))}
            </select>
          </div>

          {/* Messages pane: dynamically scales, stretches nicely without double scrolls */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 shadow-inner">
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500 space-y-2">
                  <Bot className="w-12 h-12 text-neutral-750 animate-pulse" />
                  <p className="text-sm font-medium">Bu suhbat bo'sh. Savol matnini pastdan yo'llab muloqotni boshlang.</p>
                </div>
              ) : (
                messages.map((msgRef) => (
                  <motion.div
                    key={msgRef.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    // Increased maximum width to max-w-[92%] as requested for natural elegant spacious tagma-tag layouts
                    className={`flex gap-3.5 max-w-[92%] sm:max-w-[88%] lg:max-w-[92%] ${msgRef.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 border mt-1 ${
                      msgRef.role === 'user'
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 font-extrabold shadow-md'
                        : 'bg-neutral-800 text-amber-500 border-white/5'
                    }`}>
                      {msgRef.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1 flex flex-col min-w-0 flex-1">
                      <div className={`p-4 rounded-3xl shrink-0 ${
                        msgRef.role === 'user'
                          ? 'bg-amber-500 text-neutral-950 rounded-tr-none font-medium selection:bg-neutral-900 selection:text-white'
                          : 'bg-neutral-850 border border-white/5 rounded-tl-none text-gray-200 selection:bg-amber-500 selection:text-neutral-950'
                      }`}>
                        {msgRef.role === 'user' ? (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msgRef.content}</p>
                        ) : (
                          <div className="space-y-1 overflow-x-auto">
                            {renderParsedMarkdown(msgRef.content)}
                          </div>
                        )}
                      </div>
                      <span className={`text-[9px] px-1 text-gray-500 ${msgRef.role === 'user' ? 'text-right' : ''}`}>
                        {msgRef.timestamp}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {isLoading && (
              <div className="flex gap-3.5 max-w-[80%]">
                <div className="w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 bg-neutral-800 text-amber-500 border border-white/5 animate-spin">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-3xl rounded-tl-none bg-neutral-850 border border-white/5 flex items-center gap-2 shadow-sm">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">ROXON AI javob bermoqda...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick preset cards on mobile devices */}
          {starters.length > 0 && (
            <div className="lg:hidden px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto bg-neutral-950/60 shrink-0">
              {starters.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q.prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-neutral-900 border border-white/5 text-xs text-gray-300 font-medium shrink-0 active:scale-95"
                >
                  {q.title}
                </button>
              ))}
            </div>
          )}

          {/* Primary Form Input Box */}
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
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500 text-gray-205 pr-12 focus:ring-0 focus:outline-none"
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
            <p className="text-[10px] text-center text-gray-550 mt-2">
              Maslahatchi bilan savob-javoblar shaxsiy hisoblanadi va xavfsiz kanallar orqali himoyalangan.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
