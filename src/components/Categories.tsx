/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wrench, Zap, Droplet, Hammer, Layers, Compass } from 'lucide-react';
import { Category, CategoryId } from '../types';

interface CategoriesProps {
  categories: Category[];
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export function Categories({ categories, selectedCategory, onSelectCategory }: CategoriesProps) {
  // Safe helper to render Lucide icons based on standard strings
  const renderIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 sm:w-9 sm:h-9 text-amber-500 group-hover:scale-110 transition-transform duration-300";
    switch (iconName) {
      case 'Wrench':
        return <Wrench className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'Droplet':
        return <Droplet className={iconClass} />;
      case 'Hammer':
        return <Hammer className={iconClass} />;
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'Compass':
      default:
        return <Compass className={iconClass} />;
    }
  };

  return (
    <section className="py-4 sm:py-12 px-2 sm:px-6 md:px-12 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-4">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`group p-2.5 sm:p-6 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 border ${
                isSelected
                  ? 'bg-neutral-900 border-amber-500 shadow-lg shadow-amber-500/5 -translate-y-1 sm:-translate-y-2'
                  : 'bg-neutral-900/40 border-white/5 hover:border-amber-500/40 hover:-translate-y-1 hover:bg-neutral-900/60'
              }`}
            >
              <div className={`w-9 h-9 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-1.5 sm:mb-4 transition-colors ${
                isSelected ? 'bg-amber-500/20' : 'bg-amber-500/10 group-hover:bg-amber-500/15'
              }`}>
                {renderIcon(category.icon)}
              </div>
              <h3 className={`text-[9px] sm:text-xs md:text-sm font-bold leading-tight select-none transition-colors ${
                isSelected ? 'text-amber-500' : 'text-gray-350 group-hover:text-amber-500'
              }`}>
                {category.name}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
