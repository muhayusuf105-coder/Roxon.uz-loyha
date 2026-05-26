/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, Star, Award, Compass } from 'lucide-react';

interface AboutUsProps {
  onLearnMore?: () => void;
}

export function AboutUs({ onLearnMore }: AboutUsProps) {
  return (
    <section id="about" className="py-24 bg-neutral-950/70 border-t border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="px-6 md:px-12 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left column: Visual Showcase photo */}
        <div className="relative">
          {/* Neon orange glow */}
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-amber-500/10 rounded-full blur-[80px]" />
          
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNAt2UsaWf0ItfGWZ43-Nq-f0w8k8e7v2fN6TObu81Yaxa9lWlvR8vT1_F8TzJwVhDXEVarg5d6ozCiI2d4Zyen2EBb0ky42oPRxd4crb3E-ujzpD18mqhq6BMEER0BGgI82T6RYqzYcOKe-RtbBKVK3aRZP4dAiaNDS4EceWiP52vokH_rAZCukrHgwZTXbwXq1KQ1mpVM7qMpQ0ZJgerzCIQA-6bPvZidEpmisGWnr_nwCYqHZqHqvDdN-7EOkl6Qeuo6wYIWxs"
            alt="ROXON Professional Engineer Inspecting Orange Generator"
            referrerPolicy="no-referrer"
            className="rounded-3xl relative z-10 shadow-2xl border border-white/10 w-full object-cover aspect-[4/3] md:aspect-auto"
          />

          {/* Floater Stats Box */}
          <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 bg-neutral-900/90 border border-white/10 backdrop-blur-xl p-6 rounded-2xl z-20 shadow-2xl animate-pulse">
            <div className="flex gap-8 md:gap-10">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-amber-500">15k+</p>
                <p className="text-[10px] font-black tracking-widest text-gray-450 uppercase mt-1">
                  Mijozlar
                </p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-amber-500">500+</p>
                <p className="text-[10px] font-black tracking-widest text-gray-450 uppercase mt-1">
                  Mahsulotlar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Texts descriptions and list bullet features */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-2">
              Kompaniya haqida
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Sifat va Ishonch <br />
              <span className="text-amber-500">Uyg'unligi</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            ROXON o'n yildan ortiq vaqt davomida O'zbekiston bozorida yuqori sifatli sanoat uskunalarini yetkazib bermoqda. Bizning mahsulotlarimiz eng og'ir qurilish va sanoat sharoitlarida ham benuqson ishlash uchun maxsus mo'ljallangan va xalqaro talablarga to'la javob beradi.
          </p>

          <p className="text-sm md:text-base text-gray-350 leading-relaxed">
            Har bir asbob va uskuna qattiq sinov laboratoriyalaridan o'tgach sotuvga chiqariladi. Toshkent va viloyatlardagi professional servis markazlarimiz esa sizga mutlaqo xavfsizlik taqdim etadi.
          </p>

          {/* List feature tags */}
          <ul className="space-y-3.5 pt-2">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-xs md:text-sm font-semibold text-white">Xalqaro ISO sifat sertifikatlari</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-xs md:text-sm font-semibold text-white">24 oylik to'liq kafolatlangan xizmat</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-xs md:text-sm font-semibold text-white">Ekspert darajasidagi professional servis xodimlari</span>
            </li>
          </ul>

          <div className="pt-4">
            <button
              onClick={onLearnMore}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-450 text-neutral-950 font-black text-sm rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 active:scale-98 cursor-pointer"
            >
              Batafsil bilish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
