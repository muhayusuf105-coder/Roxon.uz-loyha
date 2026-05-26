/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle, ArrowLeft, Heart, Filter, ThumbsUp, Search, Calendar } from 'lucide-react';
import { Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewsPageProps {
  onBackToStore: () => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'authorInitials'>) => void;
  userName?: string;
}

export function ReviewsPage({ onBackToStore, reviews, onAddReview, userName }: ReviewsPageProps) {
  // Navigation reviews list & review submission form
  const [author, setAuthor] = useState(userName || '');
  const [role, setRole] = useState('Sadoqatli mijoz');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Feedback filtering & search states
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Average Rating Calculator
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviewsCount).toFixed(1)
    : '5.0';

  // Stars ratio calculator
  const getRatingCount = (star: number) => reviews.filter(r => r.rating === star).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) {
      alert("Iltimos, ismingiz va sharh matnini to'liq kiriting!");
      return;
    }

    onAddReview({
      author: author.trim(),
      role: role.trim() || "Xaridor",
      rating,
      text: text.trim()
    });

    // Resetting states
    setAuthor(userName || '');
    setRole('Sadoqatli mijoz');
    setRating(5);
    setText('');
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedReviews[id]) {
      // Unlike
      setLikesState(prev => ({ ...prev, [id]: (prev[id] || 0) - 1 }));
      setLikedReviews(prev => ({ ...prev, [id]: false }));
    } else {
      // Like
      setLikesState(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setLikedReviews(prev => ({ ...prev, [id]: true }));
    }
  };

  // Filtered Reviews list
  const filteredReviews = reviews.filter(rev => {
    const matchesRating = ratingFilter === 'all' || rev.rating === ratingFilter;
    const matchesSearch = rev.author.toLowerCase().includes(feedbackSearch.toLowerCase()) ||
                          rev.text.toLowerCase().includes(feedbackSearch.toLowerCase()) ||
                          rev.role.toLowerCase().includes(feedbackSearch.toLowerCase());
    return matchesRating && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans" id="reviews-page-view">
      {/* Search Header Navigation Bar */}
      <div className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBackToStore}
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 px-3.5 py-2 rounded-xl transition-all active:scale-95"
          title="Bosh sahifaga qaytish"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifa</span>
        </button>

        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="text-sm font-black text-gray-250 tracking-wider">MIJOZLAR MINBARY</span>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Page title header banner */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-2">
            Ishonch va Hamkorlik
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            Sizning fikringiz – barcha muvaffaqiyatimiz asosi
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
            Biz ROXON uskunalari va xizmat ko'rsatish darajasi bo'yicha har bir mijozning fikrini diqqat bilan o'rganamiz. Fikringizni qoldiring va sifatni yanada takomillashtirishga hissa qo'shing.
          </p>
        </div>

        {/* Dynamic Interactive Analytics Dashboard and Bento Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Average Rating Bento Box */}
          <div className="bg-neutral-900 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">O'rtacha reyting</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-5xl font-black text-white">{averageRating}</span>
                <span className="text-lg text-gray-500">/ 5.0</span>
              </div>
              
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-5 h-5 ${
                      s <= Math.round(Number(averageRating)) ? 'text-amber-500 fill-amber-500' : 'text-neutral-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mt-6 pt-6 border-t border-white/5">
              Ushbu reyting ROXON professional asboblarini sotib olgan haqiqiy foydalanuvchilarning sharhlariga asoslangan.
            </p>
          </div>

          {/* Rating progression and stars breakdown */}
          <div className="bg-neutral-900 border border-white/5 rounded-3xl p-6 md:p-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">Baholash statistikasi</span>
            
            <div className="space-y-2.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = getRatingCount(star);
                const percent = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
                
                return (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span className="w-3 font-semibold text-gray-400">{star}</span>
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                    
                    <div className="flex-1 h-2 bg-neutral-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <span className="w-8 text-right text-gray-550 font-mono font-bold">{count} ta</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt card action for writing feedback */}
          <div className="bg-gradient-to-br from-amber-500/10 to-neutral-900 border border-amber-500/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 border border-amber-500/20 rounded-full font-bold uppercase tracking-wider inline-block mb-3">ROXON BONUS TIZIMI</span>
              <h3 className="text-base font-extrabold text-white mb-2">Samimiy fikr uchun sovg'a!</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Sizning fikringiz biz uchun juda ham qimmatli. Sharh qoldirgan har bir foydalanuvchiga keyingi buyurtmalarida bepul yetkazib berish hamda 300 000 so'm bonus beriladi.
              </p>
            </div>
            
            <a 
              href="#writing-form-anchor" 
              className="text-xs font-bold text-amber-500 hover:text-amber-400 cursor-pointer flex items-center gap-1.5 hover:underline"
            >
              Fikr qoldirish anketasiga o'tish →
            </a>
          </div>

        </div>

        {/* Content Layout Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: Feed reviews lists */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search filtering navigation */}
            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
              
              {/* Category Yulduz select buttons */}
              <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
                <button
                  onClick={() => setRatingFilter('all')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    ratingFilter === 'all' 
                      ? 'bg-amber-500 text-neutral-950 font-black' 
                      : 'bg-neutral-850 hover:bg-neutral-800 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  Hammasi ({totalReviewsCount})
                </button>
                {[5, 4, 3].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingFilter(star)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 ${
                      ratingFilter === star 
                        ? 'bg-amber-500 text-neutral-950 font-black' 
                        : 'bg-neutral-850 hover:bg-neutral-800 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{star}</span>
                    <Star className="w-3.5 h-3.5 fill-current shrink-0" />
                  </button>
                ))}
              </div>

              {/* Dynamic search inside review cards */}
              <div className="relative w-full sm:w-60">
                <input
                  type="text"
                  placeholder="Fikrni qidirish..."
                  value={feedbackSearch}
                  onChange={(e) => setFeedbackSearch(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/5 focus:border-amber-500/40 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-gray-200 outline-none transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

            </div>

            {/* List items rendering with animation */}
            {filteredReviews.length === 0 ? (
              <div className="py-20 text-center bg-neutral-900/20 border border-dashed border-white/5 rounded-3xl">
                <Filter className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-base font-bold text-gray-300">Sharhlar topilmadi</h3>
                <p className="text-xs text-gray-550 max-w-xs mx-auto mt-2">
                  Ushbu filter mezonlari yoki qidiruv so'zi bo'yicha hech qanday sharhlar munosib emas.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredReviews.map((rev) => {
                    const likesCount = likesState[rev.id] !== undefined ? likesState[rev.id] : Math.abs(getHashCode(rev.id) % 14) || 3;
                    const isLikedByMe = likedReviews[rev.id];

                    return (
                      <motion.div
                        key={rev.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-neutral-900 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300 shadow-xl"
                      >
                        <div>
                          <div className="flex items-center gap-3.5 mb-4">
                            <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-500 shrink-0 text-sm">
                              {rev.authorInitials}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-gray-200">{rev.author}</h4>
                              <p className="text-[10px] text-gray-500 font-medium">{rev.role}</p>
                            </div>
                          </div>

                          <p className="text-xs text-gray-300 italic leading-relaxed mb-4 font-medium select-text">
                            "{rev.text}"
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-3.5 border-t border-white/5 mt-2">
                          <div className="flex items-center gap-3">
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
                            
                            <button
                              onClick={(e) => handleLike(rev.id, e)}
                              className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full transition-all border ${
                                isLikedByMe
                                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                                  : 'bg-neutral-950 hover:bg-neutral-850 text-gray-400 border-white/5'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>Foydali ({likesCount})</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-1 text-[9px] text-gray-500 font-semibold font-mono">
                            <Calendar className="w-3 h-3" />
                            <span>{rev.date}</span>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

          </div>

          {/* RIGHT: High quality sticky input writing form */}
          <div className="bg-neutral-900 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative sticky top-24" id="writing-form-anchor">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-white/5">
              <MessageSquarePlus className="w-5.5 h-5.5 text-amber-500" />
              <div>
                <h3 className="text-sm md:text-base font-black text-white">Shaxsiy fikringiz</h3>
                <p className="text-[10px] text-gray-500">Shaklni to'ldirib xabar jo'nating</p>
              </div>
            </div>

            {success ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle className="w-7 h-7 text-emerald-500 animate-bounce" />
                </div>
                <h4 className="text-sm font-bold text-white">Fikringiz saqlandi!</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                  Sizning samimiy fikr-mulohazangiz ro'yxatga qo'shildi. Bonus paketingiz shaxsiy kabinetingizga biriktirildi. Sadoqatingiz uchun rahmat!
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 mt-2 bg-neutral-850 hover:bg-neutral-800 border border-white/5 text-xs text-gray-300 font-bold rounded-xl"
                >
                  Yana fikr qoldirish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Author Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Sizning ismingiz *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Masalan: Sardor Karimov"
                    className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-gray-600"
                  />
                </div>

                {/* Professional activity */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Mashg'ulotingiz / Kasbingiz</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Masalan: Uy egasi yoki Quruvchi"
                    className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-gray-600"
                  />
                </div>

                {/* Rating selection stars */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 block">Uskunalarga bahoingiz *</label>
                  <div className="flex gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-transform active:scale-90 hover:scale-110 cursor-pointer"
                        title={`${star} ball berish`}
                      >
                        <Star
                          className={`w-6.5 h-6.5 ${
                            star <= rating ? 'text-amber-500 fill-amber-500' : 'text-neutral-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text comment */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-300">Fikringiz batafsil *</label>
                  <textarea
                    rows={4}
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Sotib olgan uskunangizning kuchi, quvvati va foydalanish qulayligi haqida biror nima yozing..."
                    className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-gray-600 leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-450 text-neutral-950 text-xs font-black rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer mt-2"
                >
                  Fikrni muhrlash
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

// simple inline helper for fallback hashCode
function getHashCode(str: string): number {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}
