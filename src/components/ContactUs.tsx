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
    <section id="contact" className="relative min-h-[650px] flex items-center overflow-hidden py-16">
      {/* Background with blur map */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-8PpZm42F3fco_OyCTw51L9McDwQ7sRfsR3Jr4KTD0sPJp_45VJz7P02qA2eLRl_lBGy_P1iXZtNYdt75I4RTARndwipqSIgd7zxOaU8t4lf5RMfuTfMTDse9Cerld_ISg4R5zlXwnnh-pbkW-6ojyV4sYy3g57ZuW0M5TI-jMmM62VIiV0UIDGghVAaTRRETuCersuC8ieuZUCzevtMo8__A1_a-cB1Ya3t6pLUGe2jcQzSmlftRg_uNVnv75zKtU3ks0_bm4bM"
          alt="ROXON Tashkent Office Location Map Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter grayscale opacity-25 scale-102 transition-all duration-1000 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-12 w-full max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Glass Contacts Information Box */}
          <div className="lg:col-span-5 bg-neutral-900/80 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-3xl space-y-8 animate-in fade-in slide-in-from-left duration-500">
            <div>
              <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-1">
                Bog'lanish
              </span>
              <h2 className="text-2xl font-black text-white">Bizning kontaktlarimiz</h2>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 shrink-0">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">Rasmiy manzil</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Toshkent sh., Yunusobod tumani, 4-mavze, 22-uy
                  </p>
                </div>
              </div>

              {/* Call Center Details */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 shrink-0">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">Mijozlarni qo'llash liniyalari</p>
                  <a href="tel:+998712000000" className="text-base font-extrabold text-white block hover:text-amber-500 transition-colors">
                    +998 (71) 200-00-00
                  </a>
                  <a href="tel:+998901234567" className="text-xs text-gray-400 hover:text-amber-500 transition-colors">
                    +998 (90) 123-45-67 (Servis markazi)
                  </a>
                </div>
              </div>

              {/* Telegram bot */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 shrink-0">
                  <Send className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">Telegram qo'llab-quvvatlash</p>
                  <a href="#about" className="text-xs font-bold text-amber-500 hover:underline">
                    @roxon_uz_support
                  </a>
                </div>
              </div>
            </div>

            {/* Social listings */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-3">
                Biz ijtimoiy tarmoqlarda
              </p>
              <div className="flex gap-3">
                <a href="#about" className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-amber-500 hover:text-neutral-950 text-gray-400 transition-all" title="Veb-sayt">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#about" className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-amber-500 hover:text-neutral-950 text-gray-400 transition-all" title="Telegram">
                  <Send className="w-4 h-4" />
                </a>
                <a href="#about" className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-amber-500 hover:text-neutral-950 text-gray-450 transition-all" title="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Consultation Call request Form */}
          <div className="lg:col-span-7 bg-neutral-900/60 border border-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              <h3 className="text-xl font-bold text-white">Mutaxassis maslahati kerakmi?</h3>
            </div>
            <p className="text-xs text-gray-400 mb-6 max-w-md leading-relaxed">
              Ismingiz va telefon raqamingizni qoldiring. Ekspert maslahatchilarimiz 10 daqiqa ichida siz bilan bog'lanib, kerakli uskunani tanlashda yordam beradi.
            </p>

            {success ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckSquare className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="text-base font-bold text-white">So'rov qabul qilindi!</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                  Mutaxassislarimiz tez orada sizga qo'ng'iroq qilishadi. Roxon markaziga bo'lgan ishonchingiz uchun rahmat!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Ismingiz *</label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Masalan: Sardor"
                      className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300">Telefon raqamingiz *</label>
                    <input
                      type="text"
                      required
                      value={userPhone}
                      onChange={handlePhoneChange}
                      placeholder="+998 (__) ___-__-__"
                      className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-450 disabled:opacity-75 text-neutral-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/10"
                >
                  {loading ? 'Yuborilmoqda...' : 'Konsultatsiya so\'rash'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
