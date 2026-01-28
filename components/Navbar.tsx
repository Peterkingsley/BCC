import React, { useState } from 'react';
import { ShoppingCart, Search, User, HelpCircle, ChevronDown, Menu, X, Star } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onBack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, currentView, onNavigate, onBack }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white sticky top-0 z-50 shadow-sm font-sans">
      {/* 1. Top Bar (Jumia style thin banner) */}
      <div className="bg-gray-100 py-1 hidden md:block">
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center text-xs text-gray-500">
           <div className="flex items-center gap-4">
              <span className="text-[#f68b1e] font-bold hover:underline cursor-pointer">Sell on BCC</span>
              <span className="hover:underline cursor-pointer">BCC Force</span>
           </div>
           <div className="flex items-center gap-4 font-medium">
              <span className="cursor-pointer hover:text-[#f68b1e]">Pay</span>
              <span className="cursor-pointer hover:text-[#f68b1e]">Track Order</span>
              <span className="cursor-pointer hover:text-[#f68b1e]">Help</span>
           </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="bg-white py-3 md:py-4">
        <div className="container mx-auto px-4 max-w-7xl flex items-center gap-4 md:gap-8">
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer flex items-center select-none"
          >
             <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-800 flex items-center">
               BCC<Star className="w-6 h-6 md:w-8 md:h-8 text-[#f68b1e] fill-[#f68b1e] ml-1" />
             </h1>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-2xl hidden md:flex relative group">
             <div className="relative w-full flex">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search products, brands and categories"
                  className="w-full h-11 pl-10 pr-4 rounded-l border border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 text-sm"
                />
                <button className="bg-[#f68b1e] text-white px-6 font-bold uppercase text-sm rounded-r shadow-sm hover:bg-[#e07e1b] transition-colors">
                  Search
                </button>
             </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6 ml-auto md:ml-0">
             
             {/* Account */}
             <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-[#f68b1e] group text-gray-700">
                <User className="w-6 h-6" />
                <span className="font-medium text-sm">Account</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
             </div>

             {/* Help */}
             <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-[#f68b1e] group text-gray-700">
                <HelpCircle className="w-6 h-6" />
                <span className="font-medium text-sm">Help</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
             </div>

             {/* Cart */}
             <div 
               onClick={() => onNavigate('cart')}
               className="flex items-center gap-2 cursor-pointer hover:text-[#f68b1e] text-gray-700 relative"
             >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-1 bg-[#f68b1e] text-white text-[10px] font-bold h-4 w-4 md:h-5 md:w-5 flex items-center justify-center rounded-full border border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="font-medium text-sm hidden md:block">Cart</span>
             </div>
          </div>
        </div>

        {/* Mobile Search Bar (Visible only on mobile) */}
        <div className="md:hidden px-4 mt-3">
           <div className="relative w-full flex shadow-sm">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="w-full h-10 pl-9 pr-4 rounded-l border border-gray-300 focus:outline-none text-sm"
                />
                <button className="bg-[#f68b1e] text-white px-4 font-bold text-xs rounded-r">
                  SEARCH
                </button>
             </div>
        </div>
      </div>
      
      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-xl p-4 md:hidden flex flex-col gap-4">
           <button onClick={() => {onNavigate('home'); setIsMobileMenuOpen(false)}} className="text-left font-medium">Home</button>
           <button onClick={() => {onNavigate('history'); setIsMobileMenuOpen(false)}} className="text-left font-medium">My Orders</button>
           <button onClick={() => {onNavigate('cart'); setIsMobileMenuOpen(false)}} className="text-left font-medium text-[#f68b1e]">Cart ({cartCount})</button>
        </div>
      )}
    </div>
  );
};