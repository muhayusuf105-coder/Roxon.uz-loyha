/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, TrendingUp, ShoppingBag, Users, Search, 
  CheckCircle2, Clock, Truck, AlertTriangle, Trash2, Edit, ChevronDown, Package, CreditCard, Landmark, CircleDot
} from 'lucide-react';
import { AppOrder, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  onBackToStore: () => void;
  orders: AppOrder[];
  onUpdateOrderStatus: (orderId: string, newStatus: AppOrder['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  onLogoutAdmin: () => void;
}

export function AdminPanel({ onBackToStore, orders, onUpdateOrderStatus, onDeleteOrder, onLogoutAdmin }: AdminPanelProps) {
  const [statusFilter, setStatusFilter] = useState<AppOrder['status'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AppOrder | null>(null);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);

  // Formatting helper
  const formatPrice = (price: number): string => {
    return price.toLocaleString('uz-UZ') + " UZS";
  };

  // Analytics Computations
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'Tugallandi');
  const activeOrders = orders.filter(o => o.status === 'Yangi' || o.status === 'Yetkazilmoqda');
  
  const totalRevenue = completedOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const projectedRevenue = orders
    .filter(o => o.status !== 'Bekor qilindi')
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  // Products Purchased counter
  const totalProductsSold = orders
    .filter(o => o.status !== 'Bekor qilindi')
    .reduce((acc, order) => {
      return acc + order.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);

  // Filters application
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = 
      order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200 flex flex-col font-sans" id="admin-panel-viewport">
      {/* Dynamic Navigation Header */}
      <header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white bg-neutral-850 hover:bg-neutral-800 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
            title="Sotuv do'koniga qaytish"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Do'konga qaytish</span>
          </button>
          
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-1 rounded-md font-black tracking-widest font-mono">
              ROXON ADMIN PORTAL
            </span>
          </div>
        </div>

        {/* Admin profile and sign out */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-bold text-white">Administrator</span>
            <span className="text-[10px] text-gray-500 font-mono">info@roxon.uz</span>
          </div>
          <button
            onClick={onLogoutAdmin}
            className="text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-white/5 px-3 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            Chiqish
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-8">
        
        {/* Analytics bento cluster */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Revenue completed */}
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-amber-500/10 transition-all duration-300">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">Tugallangan tushum</span>
              <span className="text-lg font-black text-white block mt-0.5">{formatPrice(totalRevenue)}</span>
              <span className="text-[10px] text-gray-400">Jami rejadagisi: {formatPrice(projectedRevenue)}</span>
            </div>
          </div>

          {/* Card 2: Total Buyurtmalar */}
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-amber-500/10 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">Jami buyurtmalar</span>
              <span className="text-xl font-black text-white block mt-0.5">{totalOrders} ta</span>
              <span className="text-[10px] text-gray-400">{activeOrders.length} ta mustaqil faol buyurtma</span>
            </div>
          </div>

          {/* Card 3: Products sold count */}
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-amber-500/10 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">Sotilgan uskunalar</span>
              <span className="text-xl font-black text-white block mt-0.5">{totalProductsSold} dona</span>
              <span className="text-[10px] text-emerald-400">Bekor qilinmagan xaridlar</span>
            </div>
          </div>

          {/* Card 4: Safety & Security system info */}
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-amber-500/10 transition-all duration-300">
            <div className="w-12 h-12 bg-neutral-950 rounded-xl flex items-center justify-center text-gray-400 border border-white/10 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block">Xavfsizlik tizimi</span>
              <span className="text-xs font-bold text-emerald-400 block mt-0.5">Faol va himoyalangan</span>
              <span className="text-[9px] text-gray-500 font-mono">Ma'lumotlar shifrlangan</span>
            </div>
          </div>

        </section>

        {/* Main section containing operations */}
        <section className="bg-neutral-900 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
          
          {/* Header toolbar filtering and search */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between border-b border-white/5 pb-6">
            <div>
              <h2 className="text-lg font-black text-white">Buyurtmalar boshqaruvi</h2>
              <p className="text-xs text-gray-400">Xaridorlarning barcha buyurtma so'rovlari va yetkazish nazorati</p>
            </div>

            {/* Filter buttons and query input */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category buttons tab */}
              <div className="flex bg-neutral-950 p-1.5 rounded-xl border border-white/5 shrink-0">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === 'all'
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Hammasi ({orders.length})
                </button>
                <button
                  onClick={() => setStatusFilter('Yangi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === 'Yangi'
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Yangi ({orders.filter(o => o.status === 'Yangi').length})
                </button>
                <button
                  onClick={() => setStatusFilter('Yetkazilmoqda')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === 'Yetkazilmoqda'
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Yo'lda ({orders.filter(o => o.status === 'Yetkazilmoqda').length})
                </button>
                <button
                  onClick={() => setStatusFilter('Tugallandi')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === 'Tugallandi'
                      ? 'bg-amber-500 text-neutral-950 font-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Yopildi ({orders.filter(o => o.status === 'Tugallandi').length})
                </button>
              </div>

              {/* Input for name/phone */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Mijoz ismi, tel, raqam..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/5 focus:border-amber-500/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 outline-none transition-all"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Table display list */}
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-950 text-gray-400 border-b border-white/5 font-mono uppercase tracking-wider text-[10px]">
                  <th className="p-4 font-semibold">Buyurtma ID</th>
                  <th className="p-4 font-semibold">Sana</th>
                  <th className="p-4 font-semibold">Mijoz Ismi & Telefon</th>
                  <th className="p-4 font-semibold">Manzil / Region</th>
                  <th className="p-4 font-semibold">Sotib olinganlar</th>
                  <th className="p-4 font-semibold">Jami summa</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right text-gray-500">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-neutral-900/40">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-20 text-gray-500">
                      <div className="space-y-2">
                        <Package className="w-10 h-10 mx-auto text-neutral-800" />
                        <p className="font-bold text-gray-400">Hech qanday buyurtma so'rovlari mavjud emas</p>
                        <p className="text-[10px] text-gray-600">Qidiruv yorlig'ini yoki filterlarni o'zgartirib ko'ring.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const statusColors = {
                      'Yangi': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                      'Yetkazilmoqda': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                      'Tugallandi': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                      'Bekor qilindi': 'bg-red-500/10 text-red-500 border-red-500/10'
                    };

                    const itemsInline = order.items.map(i => `${i.product.name} (${i.quantity}x)`).join(', ');

                    return (
                      <tr 
                        key={order.id} 
                        className={`hover:bg-white/5 cursor-pointer transition-colors ${
                          selectedOrder?.id === order.id ? 'bg-amber-500/5' : ''
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        {/* ID */}
                        <td className="p-4 font-black text-amber-500 font-mono tracking-tight whitespace-nowrap">
                          {order.id}
                        </td>
                        {/* Date */}
                        <td className="p-4 whitespace-nowrap text-gray-400 font-mono font-medium">
                          {order.date}
                        </td>
                        {/* Customer */}
                        <td className="p-4">
                          <div className="font-bold text-white text-[13px]">{order.fullName}</div>
                          <div className="text-gray-500 font-medium font-mono text-[10px] mt-0.5">{order.phone}</div>
                        </td>
                        {/* Address */}
                        <td className="p-4 max-w-xs truncate">
                          <div className="font-bold text-gray-300">{order.region}</div>
                          <div className="text-gray-500 font-medium mt-0.5 truncate">{order.address}</div>
                        </td>
                        {/* Sotib olinganlar */}
                        <td className="p-4 max-w-sm" onClick={(e) => e.stopPropagation()}>
                          <div className="flex flex-col gap-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 bg-neutral-950/75 p-2 rounded-xl border border-white/5">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 object-contain bg-white rounded-lg shrink-0 p-1 border border-white/10"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="text-[11px] font-bold text-gray-150 truncate leading-snug" title={item.product.name}>
                                    {item.product.name}
                                  </p>
                                  <div className="flex justify-between items-center mt-0.5 text-[9px] font-semibold text-gray-400 font-mono">
                                    <span className="text-amber-500 font-black">{item.quantity} dona</span>
                                    <span>{formatPrice(item.product.price)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        {/* Total price */}
                        <td className="p-4 font-black text-white whitespace-nowrap font-mono">
                          {formatPrice(order.totalPrice)}
                        </td>
                        {/* Status badge with editing possibility */}
                        <td className="p-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          {editingStatusId === order.id ? (
                            <select
                              value={order.status}
                              onChange={(e) => {
                                onUpdateOrderStatus(order.id, e.target.value as AppOrder['status']);
                                setEditingStatusId(null);
                              }}
                              onBlur={() => setEditingStatusId(null)}
                              className="bg-neutral-950 border border-amber-500/40 text-white rounded-lg py-1 px-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none"
                              autoFocus
                            >
                              <option value="Yangi">Yangi</option>
                              <option value="Yetkazilmoqda">Yetkazilmoqda</option>
                              <option value="Tugallandi">Tugallandi</option>
                              <option value="Bekor qilindi">Bekor qilindi</option>
                            </select>
                          ) : (
                            <button
                              onClick={() => setEditingStatusId(order.id)}
                              className={`px-2.5 py-1 text-[10px] font-black tracking-wider uppercase rounded-full border flex items-center gap-1.5 transition-all outline-none hover:border-white/20 select-none ${
                                statusColors[order.status] || 'bg-gray-500/10 text-gray-400 border-white/5'
                              }`}
                            >
                              <span>{order.status}</span>
                              <ChevronDown className="w-3 h-3 text-current shrink-0" />
                            </button>
                          )}
                        </td>
                        {/* Action buttons */}
                        <td className="p-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-1 px-2.5 bg-neutral-850 hover:bg-neutral-800 border border-white/5 rounded-lg text-gray-300 hover:text-white transition-colors"
                              title="To'liq batafsil"
                            >
                              Batafsil
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Haqiqatdan ham ${order.id} raqamli buyurtmani tizimdan butunlay o'chirmoqchimisiz?`)) {
                                  onDeleteOrder(order.id);
                                  if (selectedOrder?.id === order.id) {
                                    setSelectedOrder(null);
                                  }
                                }
                              }}
                              className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                              title="O'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </section>

        {/* Selected order visual receipt modal pop up detail banner */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 relative"
            >
              {/* Close marker */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white bg-neutral-950 p-1.5 rounded-full border border-white/5 cursor-pointer"
              >
                Yopish ×
              </button>

              <div className="border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-amber-500 tracking-widest block uppercase font-mono mb-1">Buyurtma to'liq ma'lumoti</span>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  ID: <span className="text-amber-500 font-mono">{selectedOrder.id}</span>
                  <span className="text-xs bg-neutral-950 border border-white/5 text-gray-400 font-mono px-2.5 py-0.5 rounded-md font-semibold">
                    {selectedOrder.date}
                  </span>
                </h3>
              </div>

              {/* Main divided elements grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Visual side: ordered things */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-amber-500" />
                    <span>Sotib olingan uskunalar va miqdor</span>
                  </h4>

                  <div className="bg-neutral-950/60 border border-white/5 rounded-2xl p-4 divide-y divide-white/5">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex justify-between items-start gap-4">
                        <div className="flex items-start gap-3">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-contain bg-white rounded-lg shrink-0 p-1 border border-white/5" 
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-200">{item.product.name}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">Kafolat: {item.product.warrantyMonths} oy | Turkum: {item.product.categoryLabel}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-mono font-bold text-white">{formatPrice(item.product.price)}</p>
                          <p className="text-[10px] text-amber-500/85 font-bold font-mono">× {item.quantity} dona</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing billing summary */}
                  <div className="bg-neutral-950/60 border border-white/5 rounded-2xl p-4 space-y-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 font-medium">Yetkazib berish turi:</span>
                      <span className="font-bold text-gray-300 capitalize">
                        {selectedOrder.deliveryMethod === 'tezkor' ? "Tezkor parvoz (60k UZS)" : "Standart xizmat (Mavjud bo'lsa tekin)"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 font-medium font-semibold">To'lov yo'nalishi:</span>
                      <span className="font-bold text-gray-300 flex items-center gap-1">
                        {selectedOrder.paymentMethod === 'naqd' ? <Landmark className="w-3.5 h-3.5 text-amber-500 shrink-0" /> : <CreditCard className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        <span>{selectedOrder.paymentMethod === 'naqd' ? "Eshik tagida naqd to'lov" : "Click / Karta orqali"}</span>
                      </span>
                    </div>
                    
                    <div className="border-t border-dashed border-white/10 pt-2.5 flex justify-between items-baseline">
                      <span className="text-xs font-black text-white">UMUMIY SUMMA:</span>
                      <span className="text-lg font-black text-amber-500 font-mono">{formatPrice(selectedOrder.totalPrice)}</span>
                    </div>
                  </div>

                </div>

                {/* Patient side: user's exact address, phone, contact details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>Mijozning barcha aloqa ma'lumotlari</span>
                  </h4>

                  <div className="bg-neutral-955 border border-white/5 rounded-2xl p-5 space-y-4 text-xs">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block mb-1">Mijoz shaxsi (F.I.SH)</span>
                      <div className="text-sm font-bold text-white uppercase">{selectedOrder.fullName}</div>
                    </div>

                    <div className="border-t border-white/5 pt-3">
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block mb-1">Telefon raqami</span>
                      <div className="text-sm font-bold text-amber-500 font-mono select-all hover:underline">{selectedOrder.phone}</div>
                    </div>

                    <div className="border-t border-white/5 pt-3">
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block mb-1">Viloyat va shahar hududi</span>
                      <div className="text-xs font-bold text-gray-200">{selectedOrder.region}</div>
                    </div>

                    <div className="border-t border-white/5 pt-3">
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block mb-1">Aniq manzil (Ko'cha, xonadon)</span>
                      <div className="text-xs font-bold text-gray-300 bg-neutral-950 p-3 rounded-xl leading-relaxed select-all">
                        {selectedOrder.address}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-3.5 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block mb-0.5">Tizim holati</span>
                        <span className="text-[11px] font-bold text-gray-300">Ushbu buyurtma ma'lumotlari to'g'ri shakllangan</span>
                      </div>
                      
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => {
                          onUpdateOrderStatus(selectedOrder.id, e.target.value as AppOrder['status']);
                          setSelectedOrder(prev => prev ? { ...prev, status: e.target.value as AppOrder['status'] } : null);
                        }}
                        className="bg-neutral-950 border border-white/10 text-white rounded-xl py-1.5 px-3 text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none cursor-pointer"
                      >
                        <option value="Yangi">🔴 Yangi</option>
                        <option value="Yetkazilmoqda">🚚 Yetkazilmoqda</option>
                        <option value="Tugallandi">🟢 Tugallandi</option>
                        <option value="Bekor qilindi">❌ Bekor qilindi</option>
                      </select>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer system details */}
      <footer className="bg-neutral-900 border-t border-white/5 py-4 text-center text-xs text-gray-500 font-mono">
        <p>© 2026 ROXON Professional Hardware. Barcha huquqlar himoyalangan. SSL-Shifrlash xavfsizligi.</p>
      </footer>
    </div>
  );
}
