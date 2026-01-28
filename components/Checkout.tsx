import React, { useState, useEffect } from 'react';
import { DeliveryDetails } from '../types';
import { CURRENCY, DISCOUNT_RATE, DELIVERY_FEE, NIGERIA_LOCATIONS } from '../constants';
import { Button } from './Button';
import { CreditCard, Truck, CheckCircle2, ShieldCheck, Banknote, MapPin, AlertTriangle } from 'lucide-react';

interface CheckoutProps {
  total: number;
  onProceed: (details: DeliveryDetails, paymentMethod: 'cod' | 'prepay') => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ total, onProceed }) => {
  const [method, setMethod] = useState<'cod' | 'prepay'>('prepay');
  const [details, setDetails] = useState<DeliveryDetails>({
    name: '',
    phone: '',
    address: '',
    instructions: ''
  });

  // Location State
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  // Derived state for validation
  const isLocationValid = selectedState === 'Akwa Ibom' && selectedLGA === 'Ikot Abasi';

  // Update the full address whenever parts change, but only if location is valid
  useEffect(() => {
    if (isLocationValid && streetAddress) {
      setDetails(prev => ({
        ...prev,
        address: `${streetAddress}, ${selectedLGA}, ${selectedState}`
      }));
    } else {
      // Clear address if location becomes invalid to prevent submission of bad data
      setDetails(prev => ({ ...prev, address: '' }));
    }
  }, [selectedState, selectedLGA, streetAddress, isLocationValid]);

  const discountAmount = Math.round(total * DISCOUNT_RATE);
  const finalTotal = method === 'prepay' ? total - discountAmount + DELIVERY_FEE : total + DELIVERY_FEE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.name || !details.phone || !isLocationValid || !streetAddress) return;
    onProceed(details, method);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedLGA(''); // Reset LGA when state changes
  };

  const currentLGAs = NIGERIA_LOCATIONS.find(s => s.state === selectedState)?.lgas || [];

  return (
    <div className="pb-32 px-4 pt-4 max-w-2xl mx-auto animate-in slide-in-from-right duration-300">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Delivery Details */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            {/* Brand Blue for logistics */}
            <Truck className="w-5 h-5 text-[#4285F4]" />
            <h3 className="font-bold text-gray-900">Delivery Details</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                // Brand Blue Focus Ring
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#4285F4] outline-none transition-all"
                value={details.name}
                onChange={e => setDetails({...details, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
              <input
                required
                type="tel"
                placeholder="e.g. 08012345678"
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#4285F4] outline-none transition-all"
                value={details.phone}
                onChange={e => setDetails({...details, phone: e.target.value})}
              />
            </div>
            
            {/* Location Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">State</label>
                <div className="relative">
                  <select 
                    value={selectedState}
                    onChange={handleStateChange}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#4285F4] outline-none transition-all appearance-none"
                    required
                  >
                    <option value="">Select State</option>
                    {NIGERIA_LOCATIONS.map(loc => (
                      <option key={loc.state} value={loc.state}>{loc.state}</option>
                    ))}
                  </select>
                  <MapPin className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">LGA</label>
                <div className="relative">
                  <select 
                    value={selectedLGA}
                    onChange={(e) => setSelectedLGA(e.target.value)}
                    disabled={!selectedState}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#4285F4] outline-none transition-all appearance-none disabled:opacity-50"
                    required
                  >
                    <option value="">Select LGA</option>
                    {currentLGAs.map(lga => (
                      <option key={lga} value={lga}>{lga}</option>
                    ))}
                  </select>
                  <MapPin className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Availability Warning */}
            {selectedLGA && !isLocationValid && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 p-3 rounded-xl animate-in fade-in zoom-in duration-300">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-700">Not Available Here</h4>
                  <p className="text-xs text-red-600 mt-1 leading-snug">
                    Sorry, we currently only deliver to <strong>Ikot Abasi, Akwa Ibom</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Address Input - Only shown if valid */}
            {isLocationValid && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Street Address / Landmark</label>
                <textarea
                  required
                  placeholder="e.g. 15 Marina Road, near UBA Bank"
                  rows={2}
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#4285F4] outline-none transition-all"
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Payment Selection */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
           <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-[#34A853]" />
            <h3 className="font-bold text-gray-900">Payment Method</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Prepay Option */}
            <div 
              onClick={() => setMethod('prepay')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all overflow-hidden ${
                method === 'prepay' 
                  ? 'border-[#34A853] bg-green-50' 
                  : 'border-gray-200 hover:border-green-200'
              }`}
            >
               {method === 'prepay' && (
                 <div className="absolute top-4 right-4 text-[#34A853]">
                   <CheckCircle2 className="w-6 h-6 fill-green-100" />
                 </div>
               )}
               <div className="flex items-center gap-3 mb-1">
                 <div className="p-2 bg-green-100 rounded-lg text-[#34A853]">
                    <CreditCard className="w-5 h-5" />
                 </div>
                 <div className="font-bold text-gray-900">Pay Now & Save</div>
               </div>
               <p className="text-sm text-gray-600 ml-12">
                 Get <span className="font-bold text-[#34A853]">{DISCOUNT_RATE * 100}% discount</span> via Bank Transfer.
               </p>
            </div>

            {/* COD Option */}
            <div 
              onClick={() => setMethod('cod')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                method === 'cod' 
                  ? 'border-gray-900 bg-gray-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
               {method === 'cod' && (
                 <div className="absolute top-4 right-4 text-gray-900">
                   <CheckCircle2 className="w-6 h-6" />
                 </div>
               )}
               <div className="flex items-center gap-3 mb-1">
                 <div className="p-2 bg-gray-200 rounded-lg text-gray-700">
                    <Banknote className="w-5 h-5" />
                 </div>
                 <div className="font-bold text-gray-900">Pay on Delivery</div>
               </div>
               <p className="text-sm text-gray-600 ml-12">
                 Pay cash or transfer when rider arrives. No discount.
               </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Subtotal</span>
            <span>{CURRENCY}{total.toLocaleString()}</span>
          </div>
          
          {/* Prominent Delivery Fee */}
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
               <Truck className="w-4 h-4 text-[#4285F4]" /> Delivery Fee
            </span>
            <span className="font-bold text-gray-900">{CURRENCY}{DELIVERY_FEE.toLocaleString()}</span>
          </div>
          
          {method === 'prepay' && (
            <div className="flex justify-between text-[#34A853] font-bold text-sm bg-green-50 p-2 rounded-lg">
              <span>Prepayment Discount (10%)</span>
              <span>-{CURRENCY}{discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between items-end border-t border-dashed border-gray-300 pt-4">
            <span className="font-bold text-xl text-gray-900">Total</span>
            <div className="text-right">
              {method === 'prepay' && (
                <div className="text-sm text-gray-400 line-through decoration-red-500">
                  {CURRENCY}{(total + DELIVERY_FEE).toLocaleString()}
                </div>
              )}
              <div className="font-extrabold text-2xl text-gray-900">
                {CURRENCY}{finalTotal.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          fullWidth 
          size="lg" 
          className="shadow-xl shadow-red-200 mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isLocationValid || !streetAddress}
        >
          {method === 'prepay' ? 'Proceed to Payment' : `Place Order (${CURRENCY}${finalTotal.toLocaleString()})`}
        </Button>
      </form>
    </div>
  );
};