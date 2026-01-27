import { Product, PackagingOption } from './types';

export const CURRENCY = '₦';
export const DISCOUNT_RATE = 0.10; // 10% discount for prepayment
export const DELIVERY_FEE = 1000;

// BUSINESS CONTACT
export const WHATSAPP_NUMBER = '2349137930575'; // Format: CountryCode+Number (no plus sign)

// Google Apps Script Web App URL
// IMPORTANT: This URL must come from the "Deploy > Web App" step in your Google Sheet Script.
// Ensure your Sheet has these headers: OrderId, Date, Name, Phone, Address, Items, Packaging, Note, TotalAmount, PaymentMethod, SenderName, SenderBank, AccountNumber
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJO20vVPLHjMyM2Py-0KmcWuN3DlfFoeElRZlyuMmR5qKpmWRIumRcUBCLAq4anav3/exec'; 

export const CATEGORIES = ['All', 'Shawarma', 'Platters', 'Sides', 'Drinks'];

export const MENU_ITEMS: Product[] = [
  {
    id: '1',
    name: 'Chicken Shawarma (Classic)',
    description: 'Juicy grilled chicken, creamy sauce, fresh veggies wrapped in warm pita.',
    price: 3500,
    category: 'Shawarma',
    image: 'https://shawerman.ae/wp-content/uploads/2024/04/Reasons-for-the-Popularity-of-Shawarma-in-the-UAE.jpg',
    popular: true,
  },
  {
    id: '2',
    name: 'Beef Shawarma Special',
    description: 'Tender spiced beef strips with extra cheese and sausages.',
    price: 4000,
    category: 'Shawarma',
    image: 'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/ca348784-c2ac-48e5-8d36-a56244c4b7a3.jpg',
  },
  {
    id: '3',
    name: 'Mixed Grill Platter',
    description: 'Chicken wings, beef suya, fries, and coleslaw. Feeds 2.',
    price: 8500,
    category: 'Platters',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: '4',
    name: 'Spicy Chicken Wings (6pcs)',
    description: 'Crispy fried wings tossed in our secret spicy BBQ sauce.',
    price: 4500,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Loaded Fries',
    description: 'Crispy fries topped with melted cheese, minced beef and jalapeños.',
    price: 3000,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    name: 'Cold Coke (50cl)',
    description: 'Ice cold Coca-Cola plastic bottle.',
    price: 500,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    name: 'Fresh Lemonade',
    description: 'Homemade refreshing lemonade with mint.',
    price: 1200,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  },
];

export const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: 'std',
    name: 'Standard Packaging',
    price: 0,
    description: 'Safe and secure eco-friendly box.',
    icon: '📦'
  },
  {
    id: 'bday',
    name: 'Birthday Special 🎉',
    price: 2000,
    description: 'Colorful ribbons, confetti, and a handwritten birthday card.',
    icon: '🎂'
  },
  {
    id: 'love',
    name: 'Romantic Surprise ❤️',
    price: 2500,
    description: 'Red rose petals, heart stickers, and a premium gift note.',
    icon: '🌹'
  },
  {
    id: 'gift',
    name: 'Mystery Gift Box 🎁',
    price: 1500,
    description: 'Premium gold wrapping with a surprise sweet treat inside.',
    icon: '🎁'
  },
];