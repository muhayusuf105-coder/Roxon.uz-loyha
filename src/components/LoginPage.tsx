/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowLeft, Eye, EyeOff, ShieldCheck, ShoppingBag, MapPin, BadgeHelp, CheckCircle2, Truck, Archive, Edit2, Save, X } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onBackToStore: () => void;
  onLoginSuccess: (userName: string, email: string, phone: string, isAdmin?: boolean) => void;
  onLogout: () => void;
  onUpdateProfile?: (userName: string, email: string, phone: string) => void;
  currentUser?: {
    name: string;
    email: string;
    phone: string;
    isAdmin?: boolean;
  };
}

export function LoginPage({ onBackToStore, onLoginSuccess, onLogout, currentUser, onUpdateProfile }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [profileError, setProfileError] = useState('');

  React.useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name);
      setEditEmail(currentUser.email);
      setEditPhone(currentUser.phone);
    }
  }, [currentUser]);

  // Tab inside personal cabinet
  const [activeCabinetTab, setActiveCabinetTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setPhone(val);
  };

  const handleSaveProfile = () => {
    setProfileError('');
    if (!editName.trim() || editName.trim().length < 3) {
      setProfileError("Iltimos, ism va familiyangizni to'liq kiriting.");
      return;
    }
    if (!editEmail.trim().includes('@') || editEmail.trim().length < 5) {
      setProfileError("Elektron pochta manzili noto'g'ri shakllangan.");
      return;
    }
    if (editPhone.trim().length < 13) {
      setProfileError("Telefon raqami noto'g'ri. Namuna: +998 90 123 45 67");
      return;
    }
    
    if (onUpdateProfile) {
      onUpdateProfile(editName.trim(), editEmail.trim(), editPhone.trim());
    }
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    if (currentUser) {
      setEditName(currentUser.name);
      setEditEmail(currentUser.email);
      setEditPhone(currentUser.phone);
    }
    setProfileError('');
    setIsEditingProfile(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!fullName.trim() || fullName.length < 3) {
        setError("Iltimos, ism va familiyangizni to'liq kiriting.");
        return;
      }
      if (!email.includes('@') || email.length < 5) {
        setError("Elektron pochta manzili noto'g'ri shakllangan.");
        return;
      }
      if (phone.trim().length < 13) {
        setError("Telefon raqami noto'g'ri. Namuna: +998 90 123 45 67");
        return;
      }
      if (password.length < 6) {
        setError("Xavfsizlik uchun parol kamida 6 ta belgidan iborat bo'lsin.");
        return;
      }

      // Hidden admin check for signup
      const isUserAdmin = 
        email.trim().toLowerCase() === 'ybegimqulov01@gmail.com' || 
        email.trim().toLowerCase() === 'admin@roxon.uz';

      onLoginSuccess(fullName, email, phone, isUserAdmin);
    } else {
      // Sign in simulation
      if (!email.trim() || !password.trim()) {
        setError("Elektron pochta va parolni kiriting.");
        return;
      }
      if (password.length < 4) {
        setError("Parol juda qisqa.");
        return;
      }

      // Hidden admin check for login (allows instant login for specified emails)
      const isUserAdmin = 
        email.trim().toLowerCase() === 'ybegimqulov01@gmail.com' || 
        email.trim().toLowerCase() === 'admin@roxon.uz';

      const userName = isUserAdmin ? 'Administrator' : (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1));
      const userPhone = isUserAdmin 
        ? (email.trim().toLowerCase() === 'ybegimqulov01@gmail.com' ? '+998 33 204 11 06' : '+998 99 123 45 67')
        : (phone.trim().length > 5 ? phone : '+998 90 955 88 11');

      onLoginSuccess(
        userName || 'Hurmatli Mijoz',
        email,
        userPhone,
        isUserAdmin
      );
    }
  };

  // Mock historic orders inside Shaxsiy Kabinet
  const mockOrders = [
    {
      id: 'RX-99425',
      date: '18-May, 2026',
      total: '2 450 000 UZS',
      status: 'Yetkazilmoqda',
      statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      item: 'Roxon Ultra Drill X-200 Drel-shurup buragich',
      itemsCount: 1,
      step: 3 // Out for delivery
    },
    {
      id: 'RX-88410',
      date: '10-Aprel, 2026',
      total: '4 120 000 UZS',
      status: 'Yetkazib berilgan',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      item: 'Roxon FlowMaster P-30 Suv nasosi',
      itemsCount: 1,
      step: 4 // Delivered
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans" id="auth-view">
      {/* Top Header */}
      <div className="bg-neutral-900 border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <button
          onClick={onBackToStore}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 px-3.5 py-1.5 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Do'kon sahifasiga</span>
        </button>
        <span className="text-sm font-black tracking-widest text-amber-500">ROXON PORTAL</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.06),rgba(255,255,255,0))]">
        {currentUser ? (
          /* Profile Kabinet View */
          <div className="w-full max-w-4xl bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Kabinet Sidebar */}
            <div className="w-full md:w-64 bg-neutral-950 p-6 border-r border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 bg-amber-500 text-neutral-950 font-black rounded-2xl flex items-center justify-center text-lg">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-200">{currentUser.name}</h3>
                    <span className="text-[10px] text-amber-500 font-bold tracking-wider uppercase">ROXON VIP a'zosi</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => setActiveCabinetTab('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      activeCabinetTab === 'orders'
                        ? 'bg-amber-500 text-neutral-950 font-extrabold'
                        : 'text-gray-400 hover:bg-neutral-900 hover:text-gray-200'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Mening buyurtmalarim</span>
                  </button>

                  <button
                    onClick={() => setActiveCabinetTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      activeCabinetTab === 'profile'
                        ? 'bg-amber-500 text-neutral-950 font-extrabold'
                        : 'text-gray-400 hover:bg-neutral-900 hover:text-gray-200'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Profil ma'lumotlari</span>
                  </button>

                  <button
                    onClick={() => setActiveCabinetTab('addresses')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      activeCabinetTab === 'addresses'
                        ? 'bg-amber-500 text-neutral-950 font-extrabold'
                        : 'text-gray-400 hover:bg-neutral-900 hover:text-gray-200'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Yetkazish manzillari</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-3">
                <div className="p-3 bg-neutral-900 rounded-xl border border-white/5 text-[11px] text-gray-450 leading-relaxed">
                  <span className="font-bold text-amber-500 block mb-0.5">Sodiqlik tizimi:</span>
                  Xaridlaringiz summasidan 2% keshbek hisoblanmoqda.
                </div>
                
                <button
                  onClick={onLogout}
                  className="w-full text-center py-2.5 rounded-xl bg-red-500/10 border border-red-500/10 text-red-400 font-bold text-xs hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  Tizimdan chiqish
                </button>
              </div>
            </div>

            {/* Kabinet Content view */}
            <div className="flex-1 p-6 md:p-8">
              {activeCabinetTab === 'orders' && (
                <div>
                  <h2 className="text-lg font-black tracking-tight text-white mb-1">Xaridlar tarixi</h2>
                  <p className="text-xs text-gray-450 mb-6">Rasmiylashtirilgan barcha faol va yakunlangan buyurtmalar ro'yxati</p>

                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="bg-neutral-950/60 border border-white/5 p-5 rounded-2xl">
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div>
                            <span className="text-[10px] font-mono text-gray-500 tracking-wider">BUYURTMA RAQAMI</span>
                            <h4 className="text-sm font-bold text-gray-300">{order.id}</h4>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-right text-gray-500 block tracking-wider">SANA</span>
                            <span className="text-xs text-gray-450 block">{order.date}</span>
                          </div>
                          <div>
                            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-3.5 my-3 flex items-center justify-between text-xs">
                          <span className="text-gray-400">{order.item} ({order.itemsCount} dona)</span>
                          <span className="font-black text-amber-500">{order.total}</span>
                        </div>

                        {/* Delivery Status Progress timeline */}
                        <div className="mt-4 pt-3.5 border-t border-white/5">
                          <span className="text-[10px] text-gray-500 font-mono tracking-widest block mb-3 text-center">YETKAZISH BOSQIChLARI</span>
                          <div className="grid grid-cols-4 gap-1 relative text-[10px]">
                            <div className="flex flex-col items-center text-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${order.step >= 1 ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-gray-450'}`}>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                              <span className="mt-1 font-bold text-gray-400">Qabul qilindi</span>
                            </div>

                            <div className="flex flex-col items-center text-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${order.step >= 2 ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-gray-450'}`}>
                                <Archive className="w-3.5 h-3.5" />
                              </div>
                              <span className="mt-1 font-bold text-gray-400">Saralandi</span>
                            </div>

                            <div className="flex flex-col items-center text-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${order.step >= 3 ? 'bg-emerald-500 text-neutral-950 animate-pulse' : 'bg-neutral-800 text-gray-450'}`}>
                                <Truck className="w-3.5 h-3.5" />
                              </div>
                              <span className="mt-1 font-bold text-gray-400">Yo'lda</span>
                            </div>

                            <div className="flex flex-col items-center text-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${order.step >= 4 ? 'bg-emerald-500 text-neutral-950' : 'bg-neutral-800 text-gray-450'}`}>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                              <span className="mt-1 font-bold text-gray-400">Yetkazildi</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeCabinetTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-lg font-black tracking-tight text-white mb-1">Mening profilim</h2>
                      <p className="text-xs text-gray-450">Tizimdagi shaxsiy ro'yxatdan o'tish ma'lumotlaringiz</p>
                    </div>
                    {!isEditingProfile && (
                      <button
                        onClick={() => {
                          if (currentUser) {
                            setEditName(currentUser.name);
                            setEditEmail(currentUser.email);
                            setEditPhone(currentUser.phone);
                          }
                          setIsEditingProfile(true);
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Tahrirlash</span>
                      </button>
                    )}
                  </div>

                  <div className="bg-neutral-950/60 border border-white/5 rounded-2xl p-6 space-y-4">
                    {profileError && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3.5 rounded-xl font-medium">
                        {profileError}
                      </div>
                    )}

                    {isEditingProfile ? (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-amber-500/80 font-mono tracking-wider block font-bold">F.I.SH. (FOYDALANUVCHI NOMI)</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Ism va familiyangiz"
                            className="w-full bg-neutral-900 border border-white/10 focus:border-amber-500/40 rounded-xl py-2.5 px-3.5 text-xs font-medium text-gray-200 outline-none transition-all focus:ring-1 focus:ring-amber-500/20"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-amber-500/80 font-mono tracking-wider block font-bold">ELEKTRON POCHTA</label>
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            placeholder="Elektron pochta"
                            className="w-full bg-neutral-900 border border-white/10 focus:border-amber-500/40 rounded-xl py-2.5 px-3.5 text-xs font-medium text-gray-200 outline-none transition-all focus:ring-1 focus:ring-amber-500/20"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-amber-500/80 font-mono tracking-wider block font-bold">TELEFON RAQAM</label>
                          <input
                            type="text"
                            value={editPhone}
                            onChange={(e) => {
                              let val = e.target.value;
                              if (!val.startsWith('+998')) {
                                val = '+998 ';
                              }
                              setEditPhone(val);
                            }}
                            placeholder="+998"
                            className="w-full bg-neutral-900 border border-white/10 focus:border-amber-500/40 rounded-xl py-2.5 px-3.5 text-xs font-medium text-gray-200 outline-none transition-all focus:ring-1 focus:ring-amber-500/20"
                          />
                        </div>

                        <div className="flex items-center gap-3 pt-3.5 border-t border-white/5">
                          <button
                            type="button"
                            onClick={handleSaveProfile}
                            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors active:scale-95 shadow-md shadow-amber-500/5 cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Saqlash</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="flex items-center justify-center gap-2 bg-neutral-850 hover:bg-neutral-800 text-gray-300 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors active:scale-95 border border-white/5 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                            <span>Bekor qilish</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="text-[10px] text-gray-500 font-mono tracking-wider block mb-1">F.I.SH. (FOYDALANUVCHI NOMI)</label>
                          <p className="text-sm font-bold text-gray-200">{currentUser.name}</p>
                        </div>
                        <div className="border-t border-white/5 pt-3.5">
                          <label className="text-[10px] text-gray-500 font-mono tracking-wider block mb-1">ELEKTRON POCHTA</label>
                          <p className="text-sm font-bold text-gray-200">{currentUser.email}</p>
                        </div>
                        <div className="border-t border-white/5 pt-3.5">
                          <label className="text-[10px] text-gray-500 font-mono tracking-wider block mb-1">TELEFON RAQAM</label>
                          <p className="text-sm font-bold text-gray-200">{currentUser.phone}</p>
                        </div>
                        <div className="border-t border-white/5 pt-3.5">
                          <label className="text-[10px] text-gray-500 font-mono tracking-wider block mb-1">AVTORIZATSIYA STATUSI</label>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Xavfsiz va sertifikatlangan aloqa kanali</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeCabinetTab === 'addresses' && (
                <div>
                  <h2 className="text-lg font-black tracking-tight text-white mb-1">Yetkazish manzillari</h2>
                  <p className="text-xs text-gray-450 mb-6">Buyurtmani tezroq rasmiylashtirish uchun saqlangan manzillar</p>

                  <div className="space-y-3">
                    <div className="bg-neutral-950/60 border border-white/5 p-4 rounded-xl flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-200">Asosiy manzil (Toshkent shahri)</h4>
                        <p className="text-xs text-gray-505 mt-0.5">Yunusobod tumani, 19-kvartal, 14-uy, 42-xonadon</p>
                      </div>
                    </div>
                    <div className="p-4 border border-dashed border-white/10 rounded-xl flex items-center justify-center cursor-pointer text-xs text-gray-400 hover:text-amber-500 hover:border-amber-500/30 transition-all">
                      + Yangi yetkazib berish manzilini qo'shish
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Authentication Login / Register Form */
          <div className="w-full max-w-md bg-neutral-900 border border-white/5 rounded-3xl p-8 shadow-2xl relative">
            
            <div className="text-center mb-6">
              <h1 className="text-xl font-black text-gray-100 tracking-tight">
                {isSignUp ? "Roxon Portalda hisob yaratish" : "Tizimga kirish"}
              </h1>
              <p className="text-xs text-gray-450 mt-1.5 font-medium">
                {isSignUp 
                  ? "Xaridlar tarixi va VIP keshbek tizimidan foydalanish uchun ro'yxatdan o'ting" 
                  : "Roxon shaxsiy kabinetiga xavfsiz ulanish oynasi"
                }
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3.5 rounded-xl mb-5 font-medium leading-relaxed">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-medium pl-1">Ism va familiyangiz</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Masalan: Sardor Karimov"
                      className="w-full bg-neutral-950 border border-white/5 focus:border-amber-500/40 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-gray-200 outline-none transition-all focus:ring-1 focus:ring-amber-500/20"
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-medium pl-1">Elektron pochta</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masalan: sardor@example.com"
                    className="w-full bg-neutral-950 border border-white/5 focus:border-amber-500/40 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-gray-200 outline-none transition-all focus:ring-1 focus:ring-amber-500/20 font-mono"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-medium pl-1">Telefon raqamingiz</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+998 90 123 45 67"
                      className="w-full bg-neutral-950 border border-white/5 focus:border-amber-500/40 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-gray-200 outline-none transition-all focus:ring-1 focus:ring-amber-500/20 font-mono"
                    />
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className="flex justify-between pl-1">
                  <label className="text-xs text-gray-400 font-medium">Parol</label>
                  {!isSignUp && (
                    <a href="#reset" className="text-xs font-medium text-amber-500 hover:underline">Unutdingizmi?</a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignUp ? "Kamida 6 belgili" : "Parolingizni kiriting"}
                    className="w-full bg-neutral-950 border border-white/5 focus:border-amber-500/40 rounded-xl py-2.5 pl-10 pr-10 text-xs font-medium text-gray-200 outline-none transition-all focus:ring-1 focus:ring-amber-500/20"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-550 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 text-neutral-950 py-3 rounded-xl font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-amber-500/10 cursor-pointer mt-2"
              >
                {isSignUp ? "Hisob ochish" : "Tizimga xavfsiz kirish"}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs">
              <span className="text-gray-450 font-medium">
                {isSignUp ? "Roxonda hisobingiz bormi? " : "Roxonda hisobingiz yo'qmi? "}
              </span>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-amber-500 font-bold hover:underline"
              >
                {isSignUp ? "Kirish oynasiga o'tish" : "Ro'yxatdan o'tish"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
