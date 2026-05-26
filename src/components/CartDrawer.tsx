/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from './ProductCard';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Calculation utilities
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryCost = subtotal > 5000000 ? 0 : 45000; // Free delivery above 5 million UZS
  const total = subtotal + deliveryCost;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Black backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer content panel */}
      <div className="relative w-full max-w-md bg-neutral-900 shadow-2xl flex flex-col h-full border-l border-white/10 z-10 animate-slide-in-from-right">
        {/* Header block */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-black text-white">Xarid savati</h2>
            <span className="bg-amber-500/10 text-amber-500 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-850 text-gray-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 px-4">
              <div className="w-16 h-16 bg-neutral-950 rounded-full flex items-center justify-center mb-6 border border-white/5">
                <ShoppingBag className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Sizning savatingiz hozircha bo'sh</h3>
              <p className="text-xs text-gray-400 max-w-xs mb-8">
                Asboblar, generatorlar va nasoslarimizni o'rganing va ularni bu yerga qo'shing.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-amber-500 text-neutral-950 font-black text-sm rounded-xl hover:bg-amber-450 transition-all cursor-pointer"
              >
                Xaridlarni boshlash
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.product.id}
                className="flex gap-4 p-4 bg-neutral-950/40 border border-white/5 rounded-2xl group transition-all duration-250 hover:border-amber-500/20"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 bg-neutral-950 rounded-lg shrink-0 overflow-hidden p-1 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-100 truncate mb-1">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2.5">
                    {item.product.categoryLabel}
                  </p>
                  
                  {/* Quantity managers */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-neutral-950 border border-white/5 rounded-lg">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                        className="p-1 hover:text-amber-500 text-gray-400 transition-colors cursor-pointer"
                        title="Kamaytirish"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold px-2 px-3 text-white select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                        className="p-1 hover:text-amber-500 text-gray-400 transition-colors cursor-pointer"
                        title="Ko'paytirish"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-black text-amber-500 text-right">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Trash delete button */}
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="p-1 text-gray-500 hover:text-red-500 self-start transition-colors cursor-pointer"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pricing Subtotal and Action block */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-neutral-950 border-t border-white/5 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Mahsulotlar summasi</span>
                <span className="font-bold text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400 pb-2 border-b border-white/5">
                <span>Yetkazib berish</span>
                <span className="font-bold text-white">
                  {deliveryCost === 0 ? 'Bepul' : formatPrice(deliveryCost)}
                </span>
              </div>
              {deliveryCost > 0 && (
                <p className="text-[10px] text-gray-500 italic pb-2">
                  * 5 000 000 UZS dan ortiq buyurtmalar uchun yetkazish barchaga BEPUL.
                </p>
              )}
              <div className="flex justify-between text-sm font-black pt-1">
                <span className="text-white">Jami to'lov:</span>
                <span className="text-amber-500 text-base">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Check guarantees */}
            <div className="flex items-center gap-2 text-[10px] text-gray-450 bg-neutral-900 p-2.5 rounded-lg border border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Sertifikatlangan asboblar va kafolatlangan xizmat ko'rsatish tizimi.</span>
            </div>

            {/* Checkout action button */}
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-amber-500 hover:bg-amber-450 text-neutral-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
            >
              <span>Rasmiylashtirishga o'tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
