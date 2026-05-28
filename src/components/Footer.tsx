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
      <div className="mx-auto max-w-7xl px-2 sm:px-6 md:px-12 py-4 sm:py-16 grid grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-12">
        
        {/* Brand Block */}
        <div className="col-span-1 space-y-1 sm:space-y-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="text-[10px] min-[370px]:text-xs sm:text-2xl font-black text-amber-500 hover:text-amber-400 transition-colors tracking-tighter"
          >
            ROXON
          </a>
          <p className="text-[7px] min-[370px]:text-[8.5px] sm:text-sm text-gray-500 leading-normal">
            Industrial uskunalar va elektr asboblar do'koni. Sifat va ishonch.
          </p>
        </div>

        {/* Turlar Block (Product categories) */}
        <div className="col-span-1 space-y-1 sm:space-y-4">
          <h4 className="text-[7.5px] min-[370px]:text-[9px] sm:text-sm font-black text-white uppercase tracking-wider">Turlar</h4>
          <ul className="space-y-1 text-[7px] min-[370px]:text-[8.5px] sm:text-sm">
            <li>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryFilter('tools');
                }}
                className="hover:text-amber-500 transition-colors block truncate"
              >
                Instrumentlar
              </a>
            </li>
            <li>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryFilter('generators');
                }}
                className="hover:text-amber-500 transition-colors block truncate"
              >
                Generatorlar
              </a>
            </li>
            <li>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryFilter('pumps');
                }}
                className="hover:text-amber-500 transition-colors block truncate"
              >
                Suv nasoslari
              </a>
            </li>
            <li>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryFilter('machinery');
                }}
                className="hover:text-amber-500 transition-colors block truncate"
              >
                Qurilish
              </a>
            </li>
          </ul>
        </div>

        {/* Info Directory */}
        <div className="col-span-1 space-y-1 sm:space-y-4">
          <h4 className="text-[7.5px] min-[370px]:text-[9px] sm:text-sm font-black text-white uppercase tracking-wider">Menyu</h4>
          <ul className="space-y-1 text-[7px] min-[370px]:text-[8.5px] sm:text-sm">
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="hover:text-amber-500 transition-colors block truncate"
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
                className="hover:text-amber-500 transition-colors block truncate"
              >
                Yetkazib berish
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="hover:text-amber-500 transition-colors block truncate"
              >
                Kafolat & servis
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('reviews');
                }}
                className="hover:text-amber-500 transition-colors block truncate"
              >
                Sharhlar
              </a>
            </li>
          </ul>
        </div>

        {/* Dynamic Mailing newsletter list - Hidden on mobile / Visible on desktop */}
        <div className="hidden sm:block col-span-1 space-y-1 sm:space-y-4">
          <h4 className="text-[7.5px] min-[370px]:text-[9px] sm:text-sm font-black text-white uppercase tracking-wider">Obuna</h4>
          <p className="text-[7px] min-[370px]:text-[8px] sm:text-xs text-gray-500 leading-normal">
            Chegirmalar haqida xabar oling.
          </p>

          {subbed ? (
            <div className="text-[7px] min-[370px]:text-[8px] text-emerald-400 bg-emerald-500/5 p-1 rounded border border-emerald-500/10">
              Obuna bo'lindi!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-1">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="@"
                  className="w-full bg-neutral-900 border border-white/5 rounded px-1 min-[370px]:px-1.5 py-1 text-[7px] min-[370px]:text-[8px] sm:text-xs text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="p-1 sm:p-2 bg-amber-500 hover:bg-amber-450 text-neutral-950 rounded transition-all flex items-center justify-center shrink-0 cursor-pointer"
                title="Obuna"
              >
                <Send className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
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
