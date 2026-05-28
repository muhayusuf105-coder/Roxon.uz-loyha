/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onLoginClick: () => void;
  userName?: string;
  onLogout: () => void;
  isAdmin?: boolean;
}

export function Header({
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange,
  activeSection,
  onNavigate,
  onLoginClick,
  userName,
  onLogout,
  isAdmin
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'products', label: 'Mahsulotlar' },
    { id: 'ai-chat', label: 'ROXON AI ✦' },
    { id: 'about', label: 'Biz haqimizda' },
    { id: 'reviews', label: 'Mijozlar fikri' },
    { id: 'contact', label: 'Bog\'lanish' }
  ];

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
  };  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 sm:h-20 max-w-7xl items-center justify-between px-2.5 sm:px-6 md:px-12">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-8">
          <a
            href="#home"
            onClick={(e) => handleLinkClick('home', e)}
            className="text-lg sm:text-2xl font-black tracking-tighter text-amber-500 hover:text-amber-400 transition-colors"
          >
            ROXON
          </a>
          
          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isAi = item.id === 'ai-chat';
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(item.id, e)}
                  className={`text-sm font-medium tracking-wide transition-all pb-1 duration-200 ${
                    isAi
                      ? isActive
                        ? 'text-amber-400 border-b-2 border-amber-400 font-extrabold drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                        : 'text-amber-500 hover:text-amber-400 font-bold flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20'
                      : isActive
                        ? 'text-amber-500 border-b-2 border-amber-500 font-semibold'
                        : 'text-gray-400 hover:text-amber-500'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Real-time Search Box */}
        <div className="flex flex-1 max-w-[140px] min-[360px]:max-w-[170px] sm:max-w-sm md:max-w-md mx-1.5 sm:mx-8">
          <div className="relative w-full group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-900 border-none rounded-full pl-7 sm:pl-11 pr-3 sm:pr-4 py-1 sm:py-2 text-[10px] sm:text-sm text-gray-200 placeholder-gray-550 focus:ring-1 sm:focus:ring-2 focus:ring-amber-500 transition-all outline-none"
              placeholder="Qidirish..."
            />
            <Search className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-550 pointer-events-none group-focus-within:text-amber-500 transition-colors" />
          </div>
        </div>

        {/* User Actions Buttons */}
        <div className="flex items-center gap-1 sm:gap-4">
          {/* Shopping Cart Button */}
          <button
            onClick={onCartClick}
            id="cart-trigger-btn"
            className="p-1.5 sm:p-2.5 hover:bg-neutral-900 rounded-full transition-all relative text-amber-500 hover:scale-105 active:scale-95"
            title="Savatni ko'rish"
          >
            <ShoppingCart className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-amber-500 text-neutral-950 text-[8px] sm:text-[10px] font-black w-3.5 h-3.5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User auth or register trigger */}
          {userName ? (
            <div className="hidden md:flex items-center gap-3">
              {isAdmin && (
                <button
                  onClick={() => onNavigate('admin-page-state')}
                  className="text-xs bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-400 px-3.5 py-1.5 rounded-full font-extrabold flex items-center gap-2 animate-pulse transition-all cursor-pointer"
                  title="Admin Panelga o'tish"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                  <span>Admin Panel</span>
                </button>
              )}
              <button
                onClick={onLoginClick}
                className="text-xs bg-neutral-900 border border-white/5 text-gray-300 px-3.5 py-1.5 rounded-full font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Shaxsiy kabinetga o'tish"
              >
                Salom, <span className="text-amber-500 font-bold">{userName}</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full font-medium transition-colors"
              >
                Chiqish
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="hidden md:flex items-center gap-2 bg-amber-500 text-neutral-950 px-5 py-2 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-all cursor-pointer shadow-md shadow-amber-500/10"
            >
              <User className="w-4 h-4" />
              <span>Kirish</span>
            </button>
          )}

          {/* Mobile responsive drawer toggle buttons */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 hover:bg-neutral-900 rounded-full transition-all lg:hidden text-gray-450"
            aria-label="Menuni ochish"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive mobile overlay navigation list */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-neutral-950 px-6 py-4 absolute top-20 left-0 w-full shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isAi = item.id === 'ai-chat';
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(item.id, e)}
                  className={`text-base py-2 font-medium tracking-wide border-b border-white/5 last:border-none flex items-center justify-between ${
                    isAi
                      ? 'text-amber-400 font-extrabold'
                      : isActive ? 'text-amber-500 font-bold' : 'text-gray-400'
                  }`}
                >
                  <span>{item.label}</span>
                  {isAi && <span className="text-[10px] bg-amber-500/20 text-text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">AI</span>}
                </a>
              );
            })}
            
            {userName ? (
              <div className="flex flex-col gap-2.5 py-2 border-t border-white/10 mt-2">
                {isAdmin && (
                  <button
                    onClick={() => {
                      onNavigate('admin-page-state');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 py-3 rounded-xl text-xs font-black cursor-pointer animate-pulse"
                  >
                    🛠️ Admin Panelga kirish
                  </button>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">
                    Salom, <span className="text-amber-500 font-bold">{userName}</span>
                  </span>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-[10px] bg-red-500/10 text-red-400 px-3 py-1 rounded-full font-medium"
                  >
                    Chiqish
                  </button>
                </div>
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-neutral-900 border border-white/5 text-gray-200 py-3 rounded-xl text-xs font-bold w-full"
                >
                  Shaxsiy kabinetga kirish
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-amber-500 text-neutral-950 w-full py-3 rounded-xl font-bold text-sm mt-2 shadow-lg"
              >
                <User className="w-4 h-4" />
                <span>Hisobga kirish</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
