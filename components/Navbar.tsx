import React from 'react';
import { ShoppingBag, ChevronLeft, History, Cake } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onBack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, currentView, onNavigate, onBack }) => {
  const isHome = currentView === 'home';
  const showBack = currentView !== 'home' && currentView !== 'success';

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 h-[72px] flex items-center justify-between px-4 lg:px-8 shadow-sm">
      <div className="flex items-center gap-2">
        {showBack && (
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <div 
          onClick={() => onNavigate('home')} 
          className="cursor-pointer flex flex-col justify-center select-none"
        >
          {/* Logo Main Text */}
          <div className="flex items-baseline gap-[2px] font-black text-xl lg:text-2xl leading-none tracking-tight">
            <span className="text-[#4285F4]">Ben’s</span>
            <span className="w-1"></span>
            <div className="flex relative">
                <span className="text-[#EA4335]">C</span>
                <span className="text-[#34A853]">r</span>
                <span className="text-[#FBBC05]">e</span>
                <span className="text-[#4285F4]">a</span>
                <span className="text-[#34A853]">m</span>
                <span className="text-[#EA4335]">y</span>
                {/* Decorative Icon */}
                <Cake className="absolute -top-3 -right-2 w-4 h-4 text-[#EA4335] rotate-12" strokeWidth={2.5} />
            </div>
            <span className="w-1"></span>
            <div className="flex">
                <span className="text-[#4285F4]">C</span>
                <span className="text-[#EA4335]">r</span>
                <span className="text-[#FBBC05]">e</span>
                <span className="text-[#4285F4]">a</span>
                <span className="text-[#34A853]">t</span>
                <span className="text-[#EA4335]">i</span>
                <span className="text-[#4285F4]">o</span>
                <span className="text-[#EA4335]">n</span>
            </div>
          </div>
          {/* Slogan */}
          <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1 text-center sm:text-left">
            Artisan Desserts & More
          </span>
        </div>
      </div>

      {currentView !== 'success' && (
        <div className="flex items-center gap-1 sm:gap-2">
           <button 
            onClick={() => onNavigate('history')} 
            // Updated to Brand Blue Theme
            className={`p-2 rounded-full transition-colors ${currentView === 'history' ? 'bg-blue-50 text-[#4285F4]' : 'hover:bg-gray-100 text-gray-600'}`}
            title="Order History"
          >
            <History className="w-6 h-6" />
          </button>

          <button 
            onClick={() => onNavigate('cart')} 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingBag className="w-6 h-6 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#EA4335] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};