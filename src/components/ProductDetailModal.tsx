/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Shield, Truck, Star, ShoppingCart, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card content */}
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-neutral-950/80 hover:bg-amber-500 hover:text-neutral-950 rounded-full text-gray-400 transition-colors cursor-pointer"
          title="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left column: Visual Product Photo */}
        <div className="w-full md:w-1/2 bg-neutral-950 p-8 flex items-center justify-center relative min-h-[300px]">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="max-h-[380px] object-contain transition-transform duration-300 hover:scale-105"
          />
          {product.tag && (
            <span className="absolute top-6 left-6 bg-amber-500 text-neutral-950 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded">
              {product.tag}
            </span>
          )}
        </div>

        {/* Right column: Specs list, Cart operations */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto max-h-[90vh] md:max-h-[600px] lg:max-h-[700px]">
          <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-1">
            {product.categoryLabel}
          </span>
          <h2 className="text-2xl font-black text-white mb-3">
            {product.name}
          </h2>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-4 h-4 ${
                    idx < product.rating ? 'text-amber-500 fill-amber-500' : 'text-neutral-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-400">
              {product.rating}.0 ({product.reviewsCount} ta sharh)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-black text-amber-500">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm line-through text-gray-500">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Specifications Table */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">
              Texnik xususiyatlari:
            </h4>
            <div className="space-y-2 border-t border-white/5 pt-3">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center text-xs pb-2 border-b border-white/5 last:border-none">
                  <span className="text-gray-450">{spec.label}</span>
                  <span className="font-bold text-white text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Badges */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="flex items-center gap-3 p-3 bg-neutral-950/50 border border-white/5 rounded-xl">
              <Shield className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Rasmiy Kafolat</p>
                <p className="text-[10px] text-gray-500">{product.warrantyMonths} oylik ishonch</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-neutral-950/50 border border-white/5 rounded-xl">
              <Truck className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Tezkor Yetkazish</p>
                <p className="text-[10px] text-gray-500">O'zbekiston bo'ylab 24soat</p>
              </div>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full py-4 bg-amber-500 hover:bg-amber-450 text-neutral-950 font-black rounded-xl text-base flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/10 cursor-pointer hover:shadow-amber-500/20 active:scale-98 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Savatga qo'shish</span>
          </button>
        </div>
      </div>
    </div>
  );
}
