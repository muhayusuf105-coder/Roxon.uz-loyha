/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Drill, Award } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onAboutClick: () => void;
}

export function Hero({ onExploreProducts, onAboutClick }: HeroProps) {
  return (
    <section id="hero-section" className="relative h-[650px] md:h-[750px] flex items-center overflow-hidden bg-neutral-950">
      {/* Absolute image background with gradient overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30 z-10" />
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyCoWv4rYMQmOOvtbR4AcUEqCeLV5uezlUty7yFKbgBCWxnIuiab7yyr9VHio7s0ioUyAVCgS9sejY0W9-hjm8_YwiQakF_rH5Y-w-C4ceLlhgKTSnhEAdh0inpx10eAt5zYzoqPq7am2THK8JauQyoMiSWg-K2NDcFSObVzKmHsLCdbH2n5Z08nnDz8UOrJqK2QBtZRK0z0L0AAzkblLG6M8msj2kk0i87USgPg-ofN5GM6ky1ioVEJPNV50cANzo-E-cGrFO5cM"
          alt="Roxon Industrial Tools and Generators Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-20 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="max-w-xl md:max-w-2xl">
          {/* SANOAT STANDARTI tag */}
          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-xs font-bold tracking-wider mb-6">
            <Award className="w-4 h-4" />
            <span>SANOAT STANDARTI</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Roxon – Kuchli <br />
            <span className="text-amber-500 relative inline-block">
              texnikalar
              <span className="absolute bottom-1 left-0 w-full h-1 bg-amber-500/30 rounded" />
            </span>{' '}
            markazi
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10 max-w-lg">
            Sanoat darajasidagi elektro instrumentlar va generatorlar. Har bir detalda yuqori aniqlik, chidamlilik va mutlaq kafolat.
          </p>

          {/* Buttons CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onExploreProducts}
              className="group bg-amber-500 hover:bg-amber-400 text-neutral-950 px-8 py-4.5 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Mahsulotlarni ko'rish</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={onAboutClick}
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 hover:border-white/20 px-8 py-4.5 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              Biz haqimizda
            </button>
          </div>
        </div>
      </div>

      {/* Decorative light overlay element */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_20%,rgba(245,158,11,0.06)_0%,transparent_50%)]" />
    </section>
  );
}
