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
    <section id="about" className="py-8 sm:py-24 bg-neutral-950/70 border-t border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="px-2.5 sm:px-6 md:px-12 w-full max-w-7xl mx-auto grid grid-cols-2 gap-3 sm:gap-16 items-center">
        {/* Left column: Visual Showcase photo */}
        <div className="relative">
          {/* Neon orange glow */}
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-amber-500/10 rounded-full blur-[80px]" />
          
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNAt2UsaWf0ItfGWZ43-Nq-f0w8k8e7v2fN6TObu81Yaxa9lWlvR8vT1_F8TzJwVhDXEVarg5d6ozCiI2d4Zyen2EBb0ky42oPRxd4crb3E-ujzpD18mqhq6BMEER0BGgI82T6RYqzYcOKe-RtbBKVK3aRZP4dAiaNDS4EceWiP52vokH_rAZCukrHgwZTXbwXq1KQ1mpVM7qMpQ0ZJgerzCIQA-6bPvZidEpmisGWnr_nwCYqHZqHqvDdN-7EOkl6Qeuo6wYIWxs"
            alt="NEXORA Professional Engineer Inspecting Orange Generator"
            referrerPolicy="no-referrer"
            className="rounded-lg sm:rounded-3xl relative z-10 shadow-2xl border border-white/10 w-full object-cover aspect-[4/3] sm:aspect-auto"
          />

          {/* Floater Stats Box */}
          <div className="absolute -bottom-1.5 -right-1 sm:-bottom-8 sm:-right-6 bg-neutral-900/95 border border-white/10 backdrop-blur-xl p-1 sm:p-5 rounded-lg sm:rounded-2xl z-20 shadow-2xl">
            <div className="flex gap-1.5 sm:gap-6">
              <div className="text-center">
                <p className="text-[10px] min-[370px]:text-xs sm:text-3xl md:text-4xl font-black text-amber-500">15k+</p>
                <p className="text-[6px] sm:text-[10px] font-black tracking-wider text-gray-400 uppercase">
                  Mijozlar
                </p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-[10px] min-[370px]:text-xs sm:text-3xl md:text-4xl font-black text-amber-500">500+</p>
                <p className="text-[6px] sm:text-[10px] font-black tracking-wider text-gray-400 uppercase">
                  Modellar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Texts descriptions and list bullet features */}
        <div className="space-y-1.5 sm:space-y-6 mt-0">
          <div>
            <span className="text-[7.5px] min-[370px]:text-[9px] sm:text-xs font-black text-amber-500 uppercase tracking-widest block mb-0.5">
              Kompaniya
            </span>
            <h2 className="text-[11px] min-[370px]:text-sm sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Sifat va <span className="text-amber-500">Ishonch</span>
            </h2>
          </div>

          <p className="text-[8.5px] min-[370px]:text-[10.5px] sm:text-sm md:text-base text-gray-300 leading-normal sm:leading-relaxed">
            <span className="inline sm:hidden">Uzun yillik tajribaga ega yetakchi sanoat uskunalari brendi.</span>
            <span className="hidden sm:inline">NEXORA o'n yildan ortiq vaqt davomida O'zbekiston bozorida yuqori sifatli sanoat uskunalarini yetkazib bermoqda. Bizning mahsulotlarimiz eng og'ir qurilish sharoitlarida ham benuqson ishlash uchun maxsus mo'ljallangan va xalqaro talablarga javob beradi.</span>
          </p>

          <p className="text-[8.5px] min-[370px]:text-[10.5px] sm:text-sm md:text-base text-gray-450 leading-normal sm:leading-relaxed hidden sm:block">
            Har bir asbob va uskuna laboratoriyadan o'tgach sotuvga chiqariladi. Servis markazlarimiz esa mutlaqo xavfsizlik taqdim etadi.
          </p>

          {/* List feature tags with space-saving labels on mobile */}
          <ul className="space-y-0.5 sm:space-y-1 pt-0.5">
            <li className="flex items-center gap-1 sm:gap-2">
              <CheckCircle2 className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
              <span className="text-[8px] min-[370px]:text-[9px] sm:text-sm font-semibold text-gray-300">
                <span className="inline sm:hidden">ISO sertifikati</span>
                <span className="hidden sm:inline">Xalqaro ISO sertifikatlari</span>
              </span>
            </li>
            <li className="flex items-center gap-1 sm:gap-2">
              <CheckCircle2 className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
              <span className="text-[8px] min-[370px]:text-[9px] sm:text-sm font-semibold text-gray-300">
                <span className="inline sm:hidden">2 yillik kafolat</span>
                <span className="hidden sm:inline">24 oylik to'liq kafolatlangan xizmat</span>
              </span>
            </li>
            <li className="flex items-center gap-1 sm:gap-2">
              <CheckCircle2 className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
              <span className="text-[8px] min-[370px]:text-[9px] sm:text-sm font-semibold text-gray-300">
                <span className="inline sm:hidden">Professional servis</span>
                <span className="hidden sm:inline">Ekspert professional xodimlar</span>
              </span>
            </li>
          </ul>

          <div className="pt-1">
            <button
              onClick={onLearnMore}
              className="px-2.5 py-1 sm:px-8 sm:py-3.5 bg-amber-500 hover:bg-amber-450 text-neutral-950 font-black text-[8px] min-[370px]:text-[10px] sm:text-sm rounded sm:rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 active:scale-95 cursor-pointer"
            >
              Batafsil
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
