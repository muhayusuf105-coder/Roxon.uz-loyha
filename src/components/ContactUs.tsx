/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Send, CheckSquare, Sparkles, Globe, Mail } from 'lucide-react';

export function ContactUs() {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+998 ');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || userPhone.trim().length < 9) {
      alert("Iltimos, ismingiz va telefoningizni to'g'ri kiriting.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setUserName('');
      setUserPhone('+998 ');
      
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1200);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ' + val.replace(/^\+?9?9?8?\s*/g, '');
    }
    setUserPhone(val);
  };

  return (
    <section id="contact" className="relative flex items-center overflow-hidden py-6 sm:py-12 border-b border-white/5">
      {/* Background with blur map */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-8PpZm42F3fco_OyCTw51L9McDwQ7sRfsR3Jr4KTD0sPJp_45VJz7P02qA2eLRl_lBGy_P1iXZtNYdt75I4RTARndwipqSIgd7zxOaU8t4lf5RMfuTfMTDse9Cerld_ISg4R5zlXwnnh-pbkW-6ojyV4sYy3g57ZuW0M5TI-jMmM62VIiV0UIDGghVAaTRRETuCersuC8ieuZUCzevtMo8__A1_a-cB1Ya3t6pLUGe2jcQzSmlftRg_uNVnv75zKtU3ks0_bm4bM"
          alt="ROXON Tashkent Office Location Map Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter grayscale opacity-25 scale-102 transition-all duration-1000 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950" />
      </div>

      <div className="relative z-10 px-2.5 sm:px-6 md:px-12 w-full max-w-7xl mx-auto py-2 sm:py-6">
        <div className="w-full bg-neutral-900/85 border border-white/10 backdrop-blur-xl p-3 sm:p-8 rounded-2xl shadow-3xl flex flex-col gap-4 sm:gap-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
          <div className="text-center sm:text-left">
            <span className="text-[10px] sm:text-xs font-black text-amber-500 uppercase tracking-widest block mb-0.5 sm:mb-1">
              Bog'lanish
            </span>
            <h2 className="text-sm sm:text-2xl font-black text-white">Bizning kontaktlarimiz</h2>
          </div>

          <div className="grid grid-cols-3 gap-1 sm:gap-6">
            {/* Address */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-4 bg-neutral-950/40 border border-white/5 p-1.5 sm:p-4 rounded-lg sm:rounded-xl">
              <div className="p-1 sm:p-3 bg-amber-500/10 rounded-md sm:rounded-xl border border-amber-500/20 shrink-0">
                <MapPin className="w-3 h-3 sm:w-5 sm:h-5 text-amber-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] sm:text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wider">Manzil</p>
                <p className="text-[8px] sm:text-xs text-white leading-tight font-medium truncate sm:whitespace-normal">
                  Yunusobod, 4-mavze, 22-uy
                </p>
              </div>
            </div>

            {/* Call Center Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-4 bg-neutral-950/40 border border-white/5 p-1.5 sm:p-4 rounded-lg sm:rounded-xl">
              <div className="p-1 sm:p-3 bg-amber-500/10 rounded-md sm:rounded-xl border border-amber-500/20 shrink-0">
                <Phone className="w-3 h-3 sm:w-5 sm:h-5 text-amber-500" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[8px] sm:text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wider">Telefon</p>
                <a href="tel:+998712000000" className="text-[8px] sm:text-xs md:text-sm font-extrabold text-amber-500 hover:text-amber-400 transition-colors block truncate">
                  +998 (71) 200-00-00
                </a>
              </div>
            </div>

            {/* Telegram bot */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-4 bg-neutral-950/40 border border-white/5 p-1.5 sm:p-4 rounded-lg sm:rounded-xl">
              <div className="p-1 sm:p-3 bg-amber-500/10 rounded-md sm:rounded-xl border border-amber-500/20 shrink-0">
                <Send className="w-3 h-3 sm:w-5 sm:h-5 text-amber-500" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-[8px] sm:text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wider">Telegram</p>
                <a href="https://t.me/roxon_uz_support" target="_blank" rel="noopener noreferrer" className="text-[8px] sm:text-xs md:text-sm font-bold text-amber-500 hover:underline block truncate">
                  @support
                </a>
              </div>
            </div>
          </div>

          {/* Social listings */}
          <div className="pt-2 sm:pt-6 border-t border-white/5 flex items-center justify-between">
            <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-black mb-0">
              Biz ijtimoiy tarmoqlarda:
            </p>
            <div className="flex gap-1.5 sm:gap-3">
              <a href="#about" className="p-1 sm:p-2 rounded-full bg-white/5 border border-white/5 hover:bg-amber-500 hover:text-neutral-950 text-gray-400 transition-all" title="Veb-sayt">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a href="#about" className="p-1 sm:p-2 rounded-full bg-white/5 border border-white/5 hover:bg-amber-500 hover:text-neutral-950 text-gray-400 transition-all" title="Telegram">
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a href="#about" className="p-1 sm:p-2 rounded-full bg-white/5 border border-white/5 hover:bg-amber-500 hover:text-neutral-950 text-gray-450 transition-all" title="Email">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
