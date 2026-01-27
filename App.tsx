import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { CartView } from './components/CartView';
import { Checkout } from './components/Checkout';
import { PaymentView } from './components/PaymentView';
import { OrderSuccess } from './components/OrderSuccess';
import { OrderHistory } from './components/OrderHistory';
import { ViewState, Product, CartItem, OrderState, PackagingOption, DeliveryDetails, PaymentProof } from './types';
import { submitOrderToGoogleSheet } from './services/sheets';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState<PackagingOption | null>(null);
  const [packagingMessage, setPackagingMessage] = useState('');
  
  // Temporary Checkout State (to hold data while on Payment screen)
  const [tempDeliveryDetails, setTempDeliveryDetails] = useState<DeliveryDetails | null>(null);

  // History State
  const [orderHistory, setOrderHistory] = useState<OrderState[]>([]);

  // Final Order State for Success Page
  const [finalOrder, setFinalOrder] = useState<OrderState | null>(null);

  // Load History on Mount
  useEffect(() => {
    const saved = localStorage.getItem('bcc_order_history');
    if (saved) {
      try {
        setOrderHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse order history");
      }
    }
  }, []);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Totals
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const packagingCost = selectedPackaging ? selectedPackaging.price : 0;
  const cartTotal = cartSubtotal + packagingCost;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Step 1: Handle Initial Checkout Submit
  const handleCheckoutProceed = (details: DeliveryDetails, paymentMethod: 'cod' | 'prepay') => {
    setTempDeliveryDetails(details);
    
    if (paymentMethod === 'cod') {
      // Direct placement for COD
      finalizeOrder(details, 'cod');
    } else {
      // Go to Payment Screen for Prepay
      setView('payment');
    }
  };

  // Step 2: Finalize Order (used by COD directly, or PaymentView after confirmation)
  const finalizeOrder = (details: DeliveryDetails, paymentMethod: 'cod' | 'prepay', paymentProof?: PaymentProof) => {
    const newOrderId = Math.floor(100000 + Math.random() * 900000).toString(); 
    const newOrder: OrderState = {
      id: newOrderId,
      date: new Date().toISOString(),
      items: cartItems,
      packaging: selectedPackaging,
      packagingMessage,
      deliveryDetails: details,
      paymentMethod,
      paymentProof
    };

    // Update History
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem('bcc_order_history', JSON.stringify(updatedHistory));

    // Send to Google Sheets (Fire and forget)
    submitOrderToGoogleSheet(newOrder);

    setFinalOrder(newOrder);
    setView('success');
    
    // Reset cart and temp states
    setCartItems([]);
    setSelectedPackaging(null);
    setPackagingMessage('');
    setTempDeliveryDetails(null);
  };

  // View Navigation Helpers
  const goBack = () => {
    if (view === 'checkout') setView('cart');
    else if (view === 'payment') setView('checkout');
    else if (view === 'cart') setView('menu');
    else if (view === 'menu') setView('home');
    else if (view === 'history') setView('home');
    else setView('home');
  };

  // Auto-scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Main Render Switch
  const renderView = () => {
    switch(view) {
      case 'home':
        return (
          <>
            <Hero onOrderNow={() => setView('menu')} />
            <div className="bg-white py-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Our Customer Favorites</h2>
                </div>
                <Menu onAddToCart={(p) => { addToCart(p); setView('cart'); }} /> 
            </div>
          </>
        );
      case 'menu':
        return <Menu onAddToCart={addToCart} />;
      case 'cart':
        return (
          <CartView 
            items={cartItems}
            selectedPackaging={selectedPackaging}
            packagingMessage={packagingMessage}
            onUpdateQuantity={updateQuantity}
            onSetPackaging={setSelectedPackaging}
            onSetPackagingMessage={setPackagingMessage}
            onCheckout={() => setView('checkout')}
            onAddUpsell={addToCart}
          />
        );
      case 'checkout':
        return (
          <Checkout 
            total={cartTotal} 
            onProceed={handleCheckoutProceed} 
          />
        );
      case 'payment':
        return tempDeliveryDetails ? (
            <PaymentView 
                cartTotal={cartTotal}
                onConfirmPayment={(proof) => finalizeOrder(tempDeliveryDetails, 'prepay', proof)}
                onBack={() => setView('checkout')}
            />
        ) : (
            // Fallback if state is lost
            <div className="p-10 text-center">Something went wrong. <button onClick={() => setView('cart')} className="underline">Go to Cart</button></div>
        );
      case 'history':
        return (
          <OrderHistory 
            orders={orderHistory} 
            onStartOrder={() => setView('menu')} 
          />
        );
      case 'success':
        return finalOrder ? <OrderSuccess order={finalOrder} onHome={() => setView('home')} /> : null;
      default:
        return null;
    }
  };

  if (view === 'success') {
    return renderView();
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-safe">
      <Navbar 
        cartCount={cartCount} 
        currentView={view} 
        onNavigate={setView}
        onBack={goBack}
      />
      
      <main className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {renderView()}
      </main>
      
      {/* Sticky Cart Button for Home/Menu/History views if items exist */}
      {(view === 'home' || view === 'menu' || view === 'history') && cartCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-40 flex justify-center">
            <button 
                onClick={() => setView('cart')}
                className="bg-gray-900 text-white shadow-xl shadow-gray-400/50 rounded-full px-6 py-3 flex items-center gap-3 animate-bounce"
            >
                <span className="font-bold">{cartCount} items</span>
                <span className="w-px h-4 bg-gray-600"></span>
                <span className="font-bold">View Cart</span>
            </button>
        </div>
      )}
    </div>
  );
}