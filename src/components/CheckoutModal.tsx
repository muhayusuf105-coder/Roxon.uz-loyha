/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle, ShoppingBag, Truck, CreditCard, ShieldAlert } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { formatPrice } from './ProductCard';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (orderId: string, details: OrderDetails) => void;
}

const REGIONS = [
  'Toshkent shahar',
  'Toshkent viloyati',
  'Samarqand',
  'Buxoro',
  'Andijon',
  'Farg\'ona',
  'Namangan',
  'Xorazm',
  'Qashqadaryo',
  'Surxondaryo',
  'Navoiy',
  'Jizzax',
  'Sirdaryo',
  'Qoraqalpog\'iston Respublikasi'
];

export function CheckoutModal({ isOpen, onClose, cartItems, onOrderSuccess }: CheckoutModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [region, setRegion] = useState(REGIONS[0]);
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'standart' | 'tezkor'>('standart');
  const [paymentMethod, setPaymentMethod] = useState<'naqd' | 'karta'>('naqd');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryBase = subtotal > 5000000 ? 0 : 45000;
  const deliveryCost = deliveryMethod === 'tezkor' ? deliveryBase + 60000 : deliveryBase;
  const total = subtotal + deliveryCost;

  // Mask simple phone helper
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ' + val.replace(/^\+?9?9?8?\s*/g, '');
    }
    setPhone(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || phone.trim().length < 9 || !address.trim()) {
      alert('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring.');
      return;
    }

    setLoading(true);
    // Simulate API delivery call
    setTimeout(() => {
      const orderId = 'RXN-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedOrderId(orderId);
      setLoading(false);
      setSuccess(true);
      onOrderSuccess(orderId, {
        fullName,
        phone,
        region,
        address,
        deliveryMethod,
        paymentMethod
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={success ? undefined : onClose} />

      <div className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-neutral-950">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-500" />
            {!success ? 'Buyurtmani rasmiylashtirish' : 'Muvaffaqiyatli topshirildi'}
          </h2>
          {!success && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-neutral-850 text-gray-400 hover:text-white rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Success Screen */}
        {success ? (
          <div className="p-10 text-center flex flex-col items-center justify-center overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 animate-bounce">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            
            <h3 className="text-xl font-black text-white mb-2">Rahmat! Buyurtmangiz qabul qilindi</h3>
            <p className="text-sm text-gray-400 max-w-sm mb-6">
              Buyurtma raqamingiz: <span className="text-amber-500 font-bold">{generatedOrderId}</span>. Operatorimiz tez orada siz bilan bog'lanadi.
            </p>

            {/* Receipt Summary Card */}
            <div className="w-full max-w-md bg-neutral-950 border border-white/5 rounded-xl p-5 text-left mb-8 space-y-3">
              <p className="text-xs text-gray-400 pb-2 border-b border-white/5 font-bold uppercase tracking-wider">
                Xarid chiptasi
              </p>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Mijoz:</span>
                <span className="font-bold text-white">{fullName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Telefon:</span>
                <span className="font-bold text-white">{phone}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Manzil:</span>
                <span className="font-bold text-white text-right">{region}, {address}</span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-white/5">
                <span className="text-gray-500">To'lov usuli:</span>
                <span className="font-bold text-white uppercase">{paymentMethod === 'naqd' ? "Naqd to'lov" : "Karta orqali"}</span>
              </div>
              <div className="flex justify-between text-sm font-black pt-2 text-amber-500 border-t border-dashed border-white/10">
                <span>Jami miqdor:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-amber-500 text-neutral-950 font-black rounded-xl hover:bg-amber-450 transition-all cursor-pointer"
            >
              Do'konga qaytish
            </button>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-6">
            {/* Informative Total Box */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-white/5 flex justify-between items-center text-xs">
              <div>
                <p className="text-gray-450">Sizning buyurtmangizda <span className="font-bold text-white">{cartItems.length} ta mahsulot</span> bor</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Tezkor yetkazish (+60 000 UZS) tanlansa jami miqdor o'zgaradi.</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400">Umumiy to'lov:</p>
                <p className="text-base font-black text-amber-500">{formatPrice(total)}</p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">Ism-familiyangiz *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Masalan: Aziz Abdullayev"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">Telefon raqamingiz *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="+998 (__) ___-__-__"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">Viloyat / Shahar *</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {REGIONS.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-300 block">Aniq shahar, ko'cha, uy manzili *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Yunusobod 4, 33-uy, 2-xonadon"
                />
              </div>
            </div>

            {/* Delivery Methods Panel */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 block">Yetkazib berish turi</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setDeliveryMethod('standart')}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    deliveryMethod === 'standart'
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-neutral-950 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-xs font-bold text-white">Standart yetkazish</p>
                      <p className="text-[10px] text-gray-400">24 soat ichida (bepul yoki 45K)</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-white">
                    {deliveryBase === 0 ? 'BEPUL' : formatPrice(deliveryBase)}
                  </span>
                </div>

                <div
                  onClick={() => setDeliveryMethod('tezkor')}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    deliveryMethod === 'tezkor'
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-neutral-950 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-red-500 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-white">Tezkor yetkazish</p>
                      <p className="text-[10px] text-gray-400">3 soat ichida yetkaziladi</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-500">
                    +{formatPrice(60000)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Options Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 block">To'lov turi</label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentMethod('naqd')}
                  className={`p-4 rounded-xl border cursor-pointer flex gap-3 items-center transition-all ${
                    paymentMethod === 'naqd'
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-neutral-950 border-white/5'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-500" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Naqd to'lov</h4>
                    <p className="text-[9px] text-gray-400">Eshik tagida naqd berish</p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('karta')}
                  className={`p-4 rounded-xl border cursor-pointer flex gap-3 items-center transition-all ${
                    paymentMethod === 'karta'
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-neutral-950 border-white/5'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-500" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Karta (Terminal)</h4>
                    <p className="text-[9px] text-gray-400">Kuryer terminal o'rnatadi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Checkout button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-4 bg-amber-500 text-neutral-950 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-amber-450 hover:shadow-lg hover:shadow-amber-500/20'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>Buyurtma topshirilmoqda...</span>
                </>
              ) : (
                <>
                  <span>Buyurtma berish ({formatPrice(total)})</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
