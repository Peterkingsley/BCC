import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ArrowRight, Flame, Clock, Award } from 'lucide-react';

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
    <div className="pb-10">
      <div className="relative bg-gray-900 text-white overflow-hidden rounded-b-[2.5rem] shadow-2xl h-[500px] sm:h-auto">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          {BACKGROUND_IMAGES.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-50' : 'opacity-0'
              }`}
            >
              <img 
                src={img} 
                alt="Delicious Shawarma" 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-0" />

        <div className="relative z-10 px-6 py-20 flex flex-col items-center text-center max-w-2xl mx-auto min-h-[450px] justify-center">
          {/* Brand Blue for Information/Trust */}
          <div className="bg-[#4285F4]/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider backdrop-blur-sm shadow-lg animate-pulse border border-blue-400/30">
            Currently delivering to your area
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Fresh Shawarma <br />
            {/* Brand Red for 'Hot' / Action */}
            <span className="text-[#EA4335]">Delivered Hot.</span>
          </h1>
          <p className="text-gray-200 mb-8 text-lg max-w-md mx-auto font-medium drop-shadow-md">
            Order mouth-watering grills & platters. Prepay online and get <span className="text-white font-bold bg-[#34A853] px-2 rounded mx-1 shadow-sm">10% OFF</span> your entire order!
          </p>
          <Button onClick={onOrderNow} size="lg" className="gap-2 group shadow-red-900/50">
            Order Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-3 gap-2 px-4 -mt-10 relative z-20 max-w-4xl mx-auto">
        {[
          { icon: Clock, text: "30-45 Mins Delivery" },
          { icon: Flame, text: "Hot & Fresh Guarantee" },
          { icon: Award, text: "1000+ Happy Clients" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center text-center gap-2 border border-gray-100">
            {/* Icons in Brand Red */}
            <item.icon className="w-6 h-6 text-[#EA4335]" />
            <span className="text-xs font-semibold text-gray-700 leading-tight">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};