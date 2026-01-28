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
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    // Updated to Brand Red #EA4335
    primary: "bg-[#EA4335] hover:bg-[#d33426] text-white shadow-lg shadow-red-200 focus:ring-[#EA4335]",
    secondary: "bg-gray-900 hover:bg-gray-800 text-white shadow-lg focus:ring-gray-900",
    // Outline updated to hover Red
    outline: "border-2 border-gray-200 hover:border-[#EA4335] hover:text-[#EA4335] text-gray-700 bg-transparent",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-5 py-3",
    lg: "text-lg px-8 py-4",
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