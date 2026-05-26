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
    <div className="bg-neutral-900/40 border border-white/5 hover:border-amber-550 rounded-2xl p-4 flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1.5">
      {/* Product Image Frame */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-square rounded-xl bg-neutral-950/70 overflow-hidden mb-4 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges Overlay */}
        {product.tag && (
          <span className={`absolute top-4 left-4 text-[10px] uppercase font-black px-2.5 py-1 rounded tracking-widest ${
            product.tag === 'YANGI' 
              ? 'bg-amber-500 text-neutral-950' 
              : product.tag.includes('%') 
              ? 'bg-red-500 text-white' 
              : 'bg-indigo-600 text-white'
          }`}>
            {product.tag}
          </span>
        )}

        {/* Quick View Hover Indicator */}
        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-neutral-900 border border-white/10 px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-xl">
            <Eye className="w-3.5 h-3.5 text-amber-500" />
            Batafsil ko'rish
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
            {product.categoryLabel}
          </span>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-base font-bold text-white mb-2 line-clamp-1 hover:text-amber-500 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Ratings & Reviews Count */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-3.5 h-3.5 ${
                  index < product.rating
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-neutral-700'
                }`}
              />
            ))}
            <span className="text-xs font-medium text-gray-550 ml-1.5">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        <div>
          {/* Price Layout */}
          <div className="flex flex-col mb-5">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-amber-500">
                {formatPrice(product.price)}
              </span>
            </div>
            {hasDiscount && product.originalPrice && (
              <span className="text-xs line-through text-gray-500 mt-0.5">
                {product.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UZS
              </span>
            )}
          </div>

          {/* Call To Actions */}
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="w-full py-3.5 bg-neutral-800 hover:bg-amber-500 text-gray-200 hover:text-neutral-950 transition-all duration-300 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/10 active:scale-98 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            Sotib olish
          </button>
        </div>
      </div>
    </div>
  );
}
