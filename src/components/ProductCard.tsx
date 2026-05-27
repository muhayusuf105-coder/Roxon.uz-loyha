/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ShoppingBag, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onViewDetails: (product: Product) => void;
}

// Global price formatter helper
export function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const hasDiscount = !!product.originalPrice;

  return (
    <div className="bg-neutral-900/40 border border-white/5 hover:border-amber-500 rounded-xl sm:rounded-2xl p-2 sm:p-4 flex flex-col group h-full transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1">
      {/* Product Image Frame */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-square rounded-lg sm:rounded-xl bg-neutral-950/70 overflow-hidden mb-2 sm:mb-4 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges Overlay */}
        {product.tag && (
          <span className={`absolute top-1 left-1 sm:top-3 sm:left-3 text-[7px] sm:text-[9px] uppercase font-black px-1.5 py-0.5 sm:px-2 py-0.5 rounded tracking-wider ${
            product.tag === 'YANGI' 
              ? 'bg-amber-500 text-neutral-950' 
              : product.tag.includes('%') || product.tag.includes('CHEGIRMA')
              ? 'bg-red-500 text-white' 
              : 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
          }`}>
            {product.tag}
          </span>
        )}

        {/* Quick View Hover Indicator */}
        <div className="absolute inset-0 bg-neutral-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-neutral-900 border border-white/10 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow-xl">
            <Eye className="w-3 h-3 text-amber-500" />
            Batafsil
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5 sm:mb-1">
            {product.categoryLabel}
          </span>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-[11px] sm:text-sm md:text-base font-bold text-gray-200 hover:text-amber-500 cursor-pointer transition-colors line-clamp-2 min-h-[2rem] sm:min-h-0 mb-1 sm:mb-2 leading-tight"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Ratings & Reviews Count */}
          <div className="flex items-center gap-1 mb-2 sm:mb-4">
            <div className="flex sm:hidden items-center gap-0.5">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-bold text-amber-500">{product.rating}</span>
            </div>
            <div className="hidden sm:flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-3 h-3 ${
                    index < product.rating
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-neutral-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-xs font-medium text-gray-500 ml-0.5 sm:ml-1">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        <div>
          {/* Price Layout */}
          <div className="flex flex-col mb-2 sm:mb-4">
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-black text-amber-500 whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
            </div>
            {hasDiscount && product.originalPrice && (
              <span className="text-[9px] sm:text-xs line-through text-gray-550 mt-0.5 block">
                {product.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UZS
              </span>
            )}
          </div>

          {/* Call To Actions */}
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="w-full py-1.5 sm:py-2.5 md:py-3 bg-neutral-800 hover:bg-amber-500 text-gray-200 hover:text-neutral-950 transition-all duration-300 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-1 hover:shadow-lg hover:shadow-amber-500/10 active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="w-3 h-3 sm:w-3.5 h-3.5" />
            <span>Sotib olish</span>
          </button>
        </div>
      </div>
    </div>
  );
}
