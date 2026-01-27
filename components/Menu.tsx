import React, { useState } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES, MENU_ITEMS, CURRENCY } from '../constants';
import { Button } from './Button';
import { Plus } from 'lucide-react';

interface MenuProps {
  onAddToCart: (product: Product) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="pb-24">
      {/* Category Filter */}
      <div className="sticky top-16 bg-white z-40 py-4 border-b border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-4 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat 
                  ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-3 shadow-md border border-gray-100 flex gap-4 hover:shadow-lg transition-shadow">
            <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-gray-100 relative">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
               {item.popular && (
                 <span className="absolute top-0 left-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg">
                   POPULAR
                 </span>
               )}
            </div>
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-bold text-gray-900 leading-tight mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-lg text-gray-900">{CURRENCY}{item.price.toLocaleString()}</span>
                <Button 
                  size="sm" 
                  onClick={() => onAddToCart(item)}
                  className="!px-3 !py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};