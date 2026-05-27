/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Star, 
  SlidersHorizontal, 
  X, 
  RotateCcw,
  Wrench,
  Zap,
  Droplet,
  Hammer,
  Layers,
  Compass,
  Check,
  Package,
  ArrowUpDown
} from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

interface ProductsPageProps {
  onBackToStore: () => void;
  products: Product[];
  categories: Category[];
  initialCategory: string;
  initialSearchQuery: string;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onViewDetails: (product: Product) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

export function ProductsPage({
  onBackToStore,
  products,
  categories,
  initialCategory,
  initialSearchQuery,
  onAddToCart,
  onViewDetails
}: ProductsPageProps) {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery || '');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Map Category Icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Droplet': return <Droplet className="w-4 h-4" />;
      case 'Hammer': return <Hammer className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      default: return <Compass className="w-4 h-4" />;
    }
  };

  // Filter & Sort core engine
  const processedProducts = useMemo(() => {
    let list = [...products];

    // 1. Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // 2. Search query filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.specs.some(s => s.value.toLowerCase().includes(q) || s.label.toLowerCase().includes(q))
      );
    }

    // 3. Price Range filter
    if (minPrice !== '') {
      list = list.filter(p => p.price >= minPrice);
    }
    if (maxPrice !== '') {
      list = list.filter(p => p.price <= maxPrice);
    }

    // 4. Availability check
    if (onlyAvailable) {
      list = list.filter(p => p.isAvailable);
    }

    // 5. Sorting application
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortOption, minPrice, maxPrice, onlyAvailable]);

  // Recalculate match counts for pills dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    categories.forEach(c => {
      if (c.id !== 'all') {
        counts[c.id] = products.filter(p => p.category === c.id).length;
      }
    });
    return counts;
  }, [products, categories]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortOption('default');
    setMinPrice('');
    setMaxPrice('');
    setOnlyAvailable(false);
  };

  return (
    <div className="w-full bg-neutral-950 text-gray-200 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      <div className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4 sm:py-8 flex flex-col gap-4 sm:gap-8 animate-fade-in">
        
        {/* Banner with counter and descriptions */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-white/5 pb-4 sm:pb-6 gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-black text-amber-500 uppercase tracking-widest block mb-1">
              Professional Asboblar Ombori
            </span>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Barcha Mahsulotlarimiz
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2 max-w-2xl leading-relaxed">
              O'zbekistondagi eng chidamli va kafolatlangan elektr asboblari, generatorlar va nasoslar. Maxsus qidiruv va filtrlar yordamida kerakli modelni bir necha soniyada toping.
            </p>
          </div>
          <div className="bg-neutral-900 border border-white/10 px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl self-start md:self-auto flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-3xl font-black text-amber-500 font-mono">
              {processedProducts.length}      
            </span>
            <div className="text-left">
              <span className="text-[8px] sm:text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Topilgan modellar</span>
              <span className="text-[10px] sm:text-xs text-gray-500">jami {products.length} tadan</span>
            </div>
          </div>
        </div>

        {/* Categories Carousel / Badges Pill - Full Width Scrolling */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-gray-400 tracking-wider block">Turkumlar bo'yicha filter:</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-neutral-950 border-amber-500 font-black shadow-lg shadow-amber-500/10'
                      : 'bg-neutral-900 border-white/5 hover:border-white/15 text-gray-450 hover:text-white'
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-neutral-950 text-amber-500' : 'bg-neutral-950 text-gray-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Filters Panel */}
        <div className="bg-neutral-900/55 border border-white/5 rounded-3xl p-5 md:p-6 flex flex-col gap-5">
          
          {/* Main search input bar paired with sorting & Advanced toggles */}
          <div className="flex flex-col lg:flex-row items-center gap-4">
            
            {/* Live Search Control */}
            <div className="relative w-full flex-1 group">
              <input
                type="text"
                placeholder="Nomi, xususiyati yoki tavsifi bo'yicha kalit so'zni kiriting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-white/5 focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 rounded-2xl pl-11 pr-10 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-amber-500 transition-colors" />
              {searchQuery.length > 0 && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-450 hover:text-white p-0.5 rounded-full hover:bg-neutral-900"
                  title="Qidiruvni tozalash"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sorting trigger widget */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="w-full lg:w-56 bg-neutral-950 border border-white/5 text-xs font-bold text-gray-300 rounded-2xl px-4 py-3.5 pr-8 appearance-none focus:border-amber-500/40 outline-none cursor-pointer"
                >
                  <option value="default">Tartiblash (Birlamchi)</option>
                  <option value="price-asc">Arzonroqdan qimmatroqqa</option>
                  <option value="price-desc">Qimmatroqdan arzonroqqa</option>
                  <option value="rating-desc">Baholanishi (Eng yuqori)</option>
                  <option value="name-asc">Nomi bo'yicha (A - Z)</option>
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
              </div>

              {/* Show Filters toggle button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold border flex items-center gap-2 cursor-pointer transition-colors ${
                  showFilters || minPrice !== '' || maxPrice !== '' || onlyAvailable
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                    : 'bg-neutral-950 border-white/5 hover:border-white/10 text-gray-300'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Qo'shimcha filtrlar</span>
              </button>
            </div>

          </div>

          {/* Conditional Deep Filtering parameters */}
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-white/5 pt-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
            >
              
              {/* Price bracket bounds min and max */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400">Narx oralig'i (Uzs)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Minimal"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/5 focus:border-amber-500/40 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-650 font-mono outline-none"
                  />
                  <span className="text-gray-600">-</span>
                  <input
                    type="number"
                    placeholder="Maksimal"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/5 focus:border-amber-500/40 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-650 font-mono outline-none"
                  />
                </div>
              </div>

              {/* Checkbox only show available products */}
              <div className="flex items-center h-full pb-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={onlyAvailable}
                      onChange={(e) => setOnlyAvailable(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                      onlyAvailable 
                        ? 'bg-amber-500 border-amber-500 text-neutral-950' 
                        : 'bg-neutral-950 border-white/10 group-hover:border-white/20'
                    }`}>
                      {onlyAvailable && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-350 select-none group-hover:text-white transition-colors">
                    Faqat omborda mavjudlarini ko'rsatish
                  </span>
                </label>
              </div>

              {/* Reset filter controllers */}
              <div className="flex items-center justify-end">
                <button
                  onClick={handleResetFilters}
                  className="w-full md:w-auto px-4 py-2.5 border border-dashed border-white/5 hover:border-red-500/30 text-gray-400 hover:text-red-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Filtrlarni tozalash</span>
                </button>
              </div>

            </motion.div>
          )}

        </div>

        {/* Core Products Grid list - "tagma tag" aka grid view */}
        <div id="products-catalog-grid" className="scroll-mt-24">
          <AnimatePresence mode="wait">
            {processedProducts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="py-24 text-center bg-neutral-900/10 border border-dashed border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center"
              >
                <SlidersHorizontal className="w-12 h-12 text-gray-650 mb-4 animate-pulse" />
                <h3 className="text-lg font-black text-white mb-2">Qidiruv bo'yicha mahsulot topilmadi</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6 leading-relaxed">
                  Afsuski, kiritilgan parametrlar yoki qidiruv so'ziga mos keluvchi professional uskunalar aniqlanmadi. Iltimos filtrlarni o'zgartiring.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-amber-500 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Hammasini ko'rsatish (50 ta)
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 min-[375px]:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1.5 sm:gap-6"
              >
                {processedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={(prod, e) => onAddToCart(prod, e)}
                      onViewDetails={(prod) => onViewDetails(prod)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
