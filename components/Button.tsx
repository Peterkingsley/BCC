import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wide";
  
  const variants = {
    // Jumia Orange #f68b1e
    primary: "bg-[#f68b1e] hover:bg-[#d67613] text-white focus:ring-[#f68b1e] border border-[#f68b1e]",
    secondary: "bg-gray-900 hover:bg-gray-800 text-white shadow-lg focus:ring-gray-900",
    outline: "border border-[#f68b1e] text-[#f68b1e] hover:bg-orange-50 bg-white",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};