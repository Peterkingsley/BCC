import React from 'react';
import { Product } from '../types';
import { MENU_ITEMS, CURRENCY } from '../constants';
import { Button } from './Button';
import { Star } from 'lucide-react';

interface MenuProps {
  onAddToCart: (product: Product) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  return (
    <div className="container mx-auto px-4 max-w-7xl pb-16">
      
      {/* Jumia Style Header Bar */}
      <div className="bg-[#f68b1e] text-white px-4 py-3 rounded-t flex justify-between items-center mb-0 shadow-sm">
        <h2 className="font-bold text-lg md:text-xl">Limited Stock Deals | Up to 60% Off</h2>
        <span className="text-xs font-semibold uppercase cursor-pointer hover:underline flex items-center gap-1">
            See All <span className="text-lg">›</span>
        </span>
      </div>

      {/* Grid Background */}
      <div className="bg-white border border-gray-200 rounded-b p-2 md:p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
            {MENU_ITEMS.map((item) => {
              // Calculate discount percentage
              const discount = item.originalPrice 
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0;

              return (
                <div 
                  key={item.id} 
                  className="group bg-white rounded border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-200 p-2 relative flex flex-col"
                >
                    {/* Discount Tag */}
                    {discount > 0 && (
                        <div className="absolute top-2 right-2 bg-orange-100 text-[#f68b1e] text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded-sm z-10">
                            -{discount}%
                        </div>
                    )}

                    {/* Image Area */}
                    <div className="w-full aspect-square mb-2 overflow-hidden relative">
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1">
                        <h3 className="text-sm text-gray-700 truncate mb-1" title={item.name}>{item.name}</h3>
                        
                        {/* Price Section */}
                        <div className="mb-1">
                            <span className="text-base md:text-lg font-bold text-gray-900 block leading-tight">
                                {CURRENCY}{item.price.toLocaleString()}
                            </span>
                            {item.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                    {CURRENCY}{item.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Ratings */}
                        <div className="flex items-center gap-0.5 mb-3">
                            {[1,2,3,4,5].map(star => (
                                <Star 
                                    key={star} 
                                    className={`w-3 h-3 ${star <= (item.rating || 5) ? 'text-[#f68b1e] fill-[#f68b1e]' : 'text-gray-300'}`} 
                                />
                            ))}
                            <span className="text-[10px] text-gray-400 ml-1">({Math.floor(Math.random() * 50) + 10})</span>
                        </div>

                        {/* Add Button - Hidden on Desktop until hover (Jumia style) */}
                        <div className="mt-auto opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                             <Button 
                                onClick={() => onAddToCart(item)} 
                                fullWidth 
                                size="sm" 
                                className="uppercase text-xs md:text-sm font-bold shadow-none"
                             >
                                Add To Cart
                             </Button>
                        </div>
                    </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};