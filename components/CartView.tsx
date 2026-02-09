import React, { useState } from 'react';
import { CartItem, PackagingOption } from '../types';
import { CURRENCY, PACKAGING_OPTIONS, MENU_ITEMS, DELIVERY_FEE } from '../constants';
import { Button } from './Button';
import { Minus, Plus, Trash2, Gift, PartyPopper, Truck } from 'lucide-react';

interface CartViewProps {
  items: CartItem[];
  selectedPackaging: PackagingOption | null;
  packagingMessage: string;
  onUpdateQuantity: (id: string, delta: number) => void;
  onSetPackaging: (pkg: PackagingOption | null) => void;
  onSetPackagingMessage: (msg: string) => void;
  onCheckout: () => void;
  onAddUpsell: (item: any) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  items,
  selectedPackaging,
  packagingMessage,
  onUpdateQuantity,
  onSetPackaging,
  onSetPackagingMessage,
  onCheckout,
  onAddUpsell
}) => {
  const [showPackaging, setShowPackaging] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const packagingCost = selectedPackaging ? selectedPackaging.price : 0;
  const total = subtotal + packagingCost + DELIVERY_FEE;

  // Simple logic to suggest upsells (Drinks/Sides) not in cart
  const upsellSuggestions = MENU_ITEMS
    .filter(i => (i.category === 'Drinks' || i.category === 'Sides') && !items.find(c => c.id === i.id))
    .slice(0, 5);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-6 text-center animate-pulse">
        {/* Brand Yellow for empty state highlight */}
        <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <PartyPopper className="w-10 h-10 text-[#FBBC05]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-[250px]">Looks like you haven't added any delicious food yet.</p>
      </div>
    );
  }

  return (
    <div className="pb-40 px-4 pt-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-900">Your Order</h2>

      {/* Cart Items */}
      <div className="space-y-6 mb-10">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Image */}
            <div className="w-24 h-24 rounded-xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Details */}
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">{item.name}</h3>
                  <span className="font-bold text-gray-900 text-lg whitespace-nowrap">
                    {CURRENCY}{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  {CURRENCY}{item.price.toLocaleString()} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-3">
                 <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1.5 border border-gray-100 shadow-inner">
                   <button 
                     onClick={() => onUpdateQuantity(item.id, -1)} 
                     className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-500 active:scale-90 transition-transform duration-100 border border-gray-100" aria-label={item.quantity === 1 ? "Remove item" : "Decrease quantity"}
                   >
                     {item.quantity === 1 ? <Trash2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                   </button>
                   
                   <span key={`qty-${item.quantity}`} className="font-bold text-gray-900 w-5 text-center text-sm">
                     {item.quantity}
                   </span>
                   
                   <button 
                     onClick={() => onUpdateQuantity(item.id, 1)} 
                     className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-[#34A853] active:scale-90 transition-transform duration-100 border border-gray-100" aria-label="Increase quantity"
                   >
                     <Plus className="w-4 h-4" />
                   </button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upsell Section */}
      {upsellSuggestions.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
             <h3 className="text-base font-bold text-gray-800">Complete Your Meal</h3>
             <span className="text-xs font-semibold text-[#EA4335] bg-red-50 px-2 py-1 rounded-full">Recommended</span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1">
            {upsellSuggestions.map(item => (
              <div key={item.id} className="shrink-0 w-36 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-3 flex flex-col items-center text-center relative group">
                <div className="w-20 h-20 rounded-full bg-gray-50 overflow-hidden mb-3 shadow-sm group-hover:scale-105 transition-transform duration-300 border-2 border-white">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs font-bold text-gray-900 mb-1 truncate w-full px-1">{item.name}</div>
                <div className="text-xs text-gray-500 font-medium mb-3">{CURRENCY}{item.price.toLocaleString()}</div>
                <button 
                  onClick={() => onAddUpsell(item)}
                  // Brand Red Add Button
                  className="w-full text-xs bg-[#EA4335] text-white font-bold px-3 py-2.5 rounded-xl shadow-lg shadow-red-200 hover:bg-[#d33426] active:scale-95 transition-all flex items-center justify-center gap-1.5" aria-label={`Add ${item.name} to cart`}
                >
                  Add <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Special Packaging Upsell */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-100 mb-8 shadow-sm">
        <div className="flex items-start gap-4 mb-5">
          <div className="p-3 bg-white rounded-2xl shadow-sm ring-4 ring-indigo-50">
            <Gift className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Make it Special? ✨</h3>
            <p className="text-sm text-gray-600">Add premium packaging for birthdays or surprises.</p>
          </div>
        </div>

        {!showPackaging && !selectedPackaging ? (
          <Button 
            variant="outline" 
            fullWidth 
            onClick={() => setShowPackaging(true)}
            className="bg-white border-indigo-200 text-indigo-600 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 py-3 rounded-xl"
          >
            Choose Special Packaging
          </Button>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
             <div className="grid grid-cols-1 gap-3">
               {PACKAGING_OPTIONS.map(opt => (
                 <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSetPackaging(opt.id === 'std' ? null : opt)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between w-full text-left ${
                    (selectedPackaging?.id === opt.id) || (opt.id === 'std' && !selectedPackaging)
                      ? 'border-indigo-500 bg-white shadow-md scale-[1.02]' 
                      : 'border-transparent bg-white/40 hover:bg-white/80'
                  }`}
                 >
                   <div className="flex items-center gap-4">
                     <span className="text-3xl filter drop-shadow-sm">{opt.icon}</span>
                     <div>
                       <div className="font-bold text-gray-900 text-sm">{opt.name}</div>
                       <div className="text-xs text-gray-500">{opt.description}</div>
                     </div>
                   </div>
                   <div className="font-bold text-sm bg-indigo-50 px-2 py-1 rounded text-indigo-700">
                     {opt.price === 0 ? 'Free' : `+${CURRENCY}${opt.price.toLocaleString()}`}
                   </div>
                 </button>
               ))}
             </div>
             {selectedPackaging && (
               <textarea
                placeholder="Add a custom message card note (optional)..."
                value={packagingMessage}
                onChange={(e) => onSetPackagingMessage(e.target.value)}
                className="w-full p-4 rounded-xl border border-indigo-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                rows={2}
               />
             )}
          </div>
        )}
      </div>

      {/* Sticky Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-8 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
           <div className="flex justify-between items-center text-sm px-1">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-semibold text-gray-900">{CURRENCY}{subtotal.toLocaleString()}</span>
           </div>
           
           {/* Added Delivery Fee Display with visual emphasis */}
           <div className="flex justify-between items-center text-sm px-1">
              <span className="flex items-center gap-1 text-gray-600 font-medium">
                <Truck className="w-4 h-4" /> Delivery Fee
              </span>
              <span className="font-semibold text-gray-900">{CURRENCY}{DELIVERY_FEE.toLocaleString()}</span>
           </div>

           {selectedPackaging && (
             <div className="flex justify-between items-center text-sm text-indigo-600 px-1">
                <span className="font-medium">Special Packaging</span>
                <span className="font-bold">+{CURRENCY}{packagingCost.toLocaleString()}</span>
             </div>
           )}
           <div className="flex justify-between items-center text-xl font-bold text-gray-900 border-t border-gray-100 pt-3 mt-1">
              <span>Total</span>
              <span>{CURRENCY}{total.toLocaleString()}</span>
           </div>
           <Button onClick={onCheckout} fullWidth size="lg" className="shadow-xl shadow-red-200 mt-2">
             Proceed to Checkout
           </Button>
        </div>
      </div>
    </div>
  );
};