/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle } from 'lucide-react';
import { Review } from '../types';

interface TestimonialsProps {
  reviews: Review[];
  onWriteReviewClick?: () => void;
}

export function Testimonials({ reviews, onWriteReviewClick }: TestimonialsProps) {
  return (
    <section id="reviews" className="py-24 bg-neutral-950/40 relative">
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-1">
            Fikr-mulohazalar
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Mijozlarimiz fikri
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Mijozlarimizning samimiy fikrlari bizning sifatimiz va xizmat darajamizning eng yaxshi isbotidir.
          </p>
          {onWriteReviewClick && (
            <button
              onClick={onWriteReviewClick}
              className="mt-6 bg-gradient-to-r from-amber-500/10 to-amber-500/20 hover:from-amber-500/15 hover:to-amber-500/25 border border-amber-500/35 text-amber-400 hover:text-amber-300 text-xs font-extrabold px-6 py-3 rounded-full transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Alohida sahifada fikr qoldirish / barcha sharhlar</span>
            </button>
          )}
        </div>

        <div className="w-full">
          {/* Reviews List Grid updated to full width layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-neutral-900/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    {/* Avatar initials badge */}
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-500 shrink-0">
                      {rev.authorInitials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                      <p className="text-[10px] text-gray-550">{rev.role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-350 italic leading-relaxed mb-4">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
