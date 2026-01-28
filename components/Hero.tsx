import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ArrowRight, Phone, ShieldCheck, Truck } from 'lucide-react';
import { CATEGORIES } from '../constants';

const BACKGROUND_IMAGES = [
  "https://shawerman.ae/wp-content/uploads/2024/04/Reasons-for-the-Popularity-of-Shawarma-in-the-UAE.jpg",
  "https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/ca348784-c2ac-48e5-8d36-a56244c4b7a3.jpg"
];

interface HeroProps {
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-7xl mt-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left Sidebar (Desktop Only) */}
        <div className="hidden md:block md:col-span-2 bg-white rounded shadow-sm border border-gray-100 p-2 h-[350px]">
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => (
              <li 
                key={cat} 
                className="px-2 py-2 text-xs text-gray-600 hover:text-[#f68b1e] hover:font-bold cursor-pointer transition-colors flex items-center gap-2"
                onClick={onOrderNow}
              >
                {/* Mock Icons */}
                <span className="text-lg opacity-50">›</span> {cat}
              </li>
            ))}
            <li className="px-2 py-2 text-xs text-gray-600 flex items-center gap-2 border-t mt-2 pt-2">
              <span className="text-lg opacity-50">●</span> More Categories
            </li>
          </ul>
        </div>

        {/* Center Carousel */}
        <div className="col-span-1 md:col-span-8 h-[200px] md:h-[350px] relative rounded-lg overflow-hidden group">
          {BACKGROUND_IMAGES.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={img} 
                alt="Banner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-8 left-8 text-white max-w-md">
                 <h2 className="text-3xl md:text-5xl font-black mb-2 leading-tight">BCC FOOD<br/>FESTIVAL</h2>
                 <p className="mb-4 font-medium">Get 10% off when you prepay!</p>
                 <Button onClick={onOrderNow} size="sm" className="shadow-lg">SHOP NOW</Button>
              </div>
            </div>
          ))}
          
          {/* Slider Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
             {BACKGROUND_IMAGES.map((_, idx) => (
               <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-[#f68b1e]' : 'bg-white/50'}`}
               />
             ))}
          </div>
        </div>

        {/* Right Column (Desktop Only) */}
        <div className="hidden md:flex md:col-span-2 flex-col gap-4 h-[350px]">
           {/* Top Box */}
           <div className="bg-white p-4 rounded shadow-sm border border-gray-100 flex-1 flex flex-col items-start justify-center gap-3">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-orange-100 rounded-full text-[#f68b1e]">
                    <Phone className="w-5 h-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 uppercase">Call to Order</span>
                    <span className="text-xs text-gray-500">0913-793-0575</span>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-orange-100 rounded-full text-[#f68b1e]">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 uppercase">Quality</span>
                    <span className="text-xs text-gray-500">100% Guaranteed</span>
                 </div>
              </div>
           </div>

           {/* Bottom Box (Ad style) */}
           <div className="bg-orange-500 p-4 rounded shadow-sm flex-1 flex flex-col justify-center items-center text-center text-white bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <Truck className="w-8 h-8 mb-2 animate-bounce" />
              <span className="font-black text-lg leading-tight uppercase">BCC<br/>FORCE</span>
              <span className="text-xs mt-1 opacity-90">Fast Delivery</span>
           </div>
        </div>
      </div>
    </div>
  );
};