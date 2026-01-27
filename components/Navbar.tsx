import React from 'react';
import { ShoppingBag, ChevronLeft, History } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}
        <div 
          onClick={() => onNavigate('home')} 
          className="font-bold text-xl tracking-tight text-gray-900 cursor-pointer flex flex-col justify-center"
        >
          <div className="flex items-center gap-1">
            <span className="text-orange-600 text-2xl">BCC</span>
          </div>
          <span className="text-[10px] text-gray-500 font-medium leading-none">Ben's Creamy Creation</span>
        </div>
      </div>

      {currentView !== 'success' && (
        <div className="flex items-center gap-2">
           <button 
            onClick={() => onNavigate('history')} 
            className={`p-2 rounded-full transition-colors ${currentView === 'history' ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100 text-gray-600'}`}
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
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};