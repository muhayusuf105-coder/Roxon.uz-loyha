/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { CategoryId } from '../types';

interface FooterProps {
  onCategoryFilter: (cat: CategoryId) => void;
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onCategoryFilter, onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      alert("Iltimos, to'g'ri email manzilini kiriting!");
      return;
    }
    setSubbed(true);
    setEmail('');
    setTimeout(() => {
      setSubbed(false);
    }, 5000);
  };

  return (
    <footer className="bg-neutral-950 border-t border-white/5 text-gray-400 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-8 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
        
        {/* Brand Block */}
        <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="text-xl sm:text-2xl font-black text-amber-500 hover:text-amber-400 transition-colors tracking-tighter"
          >
            ROXON
          </a>
          <p className="text-xs sm:text-sm text-gray-450 leading-relaxed">
            O'zbekistondagi yetakchi industrial uskunalar va elektr asboblar do'koni. Sifat, mutlaq ishonch va professionallik kafolati.
          </p>
        </div>

        {/* Product links */}
        <div className="col-span-1 space-y-3 sm:space-y-4">
          <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Mahsulotlar</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-sm">
            <li>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryFilter('tools');
                }}
                className="hover:text-amber-500 transition-colors"
              >
                Elektr instrumentlar
              </a>
            </li>
            <li>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryFilter('generators');
                }}
                className="hover:text-amber-500 transition-colors"
              >
                Energiya (Generatorlar)
              </a>
            </li>
            <li>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryFilter('pumps');
                }}
                className="hover:text-amber-500 transition-colors"
              >
                Suv nasoslari tizimi
              </a>
            </li>
            <li>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryFilter('machinery');
                }}
                className="hover:text-amber-500 transition-colors"
              >
                Qurilish texnikalari
              </a>
            </li>
          </ul>
        </div>

        {/* Info Directory */}
        <div className="col-span-1 space-y-3 sm:space-y-4">
          <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Ma'lumotlar</h4>
          <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-sm">
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="hover:text-amber-500 transition-colors"
              >
                Biz haqimizda
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="hover:text-amber-500 transition-colors"
              >
                Yetkazib berish shartlari
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="hover:text-amber-500 transition-colors"
              >
                Kafolat va servis xizmati
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('reviews');
                }}
                className="hover:text-amber-500 transition-colors"
              >
                Mijozlarimiz sharhlari
              </a>
            </li>
          </ul>
        </div>

        {/* Dynamic Mailing newsletter list */}
        <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4 border-t border-white/5 pt-4 md:border-t-0 md:pt-0">
          <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">Xabardor bo'ling</h4>
          <p className="text-[11px] sm:text-xs text-gray-450 leading-relaxed">
            Yangi chegirmalar, aksiyalar va mahsulotlar haqida uyingizdan chiqmay birinchilardan bo'lib biling.
          </p>

          {subbed ? (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Siz muvaffaqiyatli obuna bo'ldingiz!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Emailingiz..."
                  className="w-full bg-neutral-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 pl-9"
                />
                <Mail className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="p-3 bg-amber-500 hover:bg-amber-450 text-neutral-950 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer"
                title="Obuna bo'lish"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Copyright notes */}
      <div className="border-t border-white/5 py-8 text-center px-6">
        <p className="text-xs text-gray-550 leading-loose">
          © 2024 ROXON.uz Industrial Solutions. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
