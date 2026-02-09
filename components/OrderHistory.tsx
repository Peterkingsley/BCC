import React from 'react';
import { OrderState } from '../types';
import { CURRENCY, DISCOUNT_RATE, DELIVERY_FEE } from '../constants';
import { Button } from './Button';
import { Clock, Package } from 'lucide-react';

interface OrderHistoryProps {
  orders: OrderState[];
  onStartOrder: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onStartOrder }) => {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-6 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Clock className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Past Orders</h2>
        <p className="text-gray-500 mb-8">You haven't placed any orders with us yet.</p>
        <Button onClick={onStartOrder}>Start Ordering</Button>
      </div>
    );
  }

  // Helper to fallback for old orders that might not have the 'totalAmount' field saved
  const getOrderTotal = (order: OrderState) => {
    if (order.totalAmount !== undefined) {
      return order.totalAmount;
    }
    // Fallback calculation for backward compatibility
    const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const pkgCost = order.packaging ? order.packaging.price : 0;
    const total = subtotal + pkgCost;
    const discount = order.paymentMethod === 'prepay' ? Math.round(total * DISCOUNT_RATE) : 0;
    return total - discount + DELIVERY_FEE;
  };

  return (
    <div className="pb-24 px-4 pt-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 p-3 flex justify-between items-center border-b border-gray-100">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-500 uppercase">Order ID</span>
                <span className="font-mono font-bold text-gray-900">#{order.id}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-500 uppercase block">Date</span>
                <span className="text-xs text-gray-700">{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">
                      <span className="font-bold text-gray-900">{item.quantity}x</span> {item.name}
                    </span>
                    <span className="text-gray-500">{CURRENCY}{item.price.toLocaleString()}</span>
                  </div>
                ))}
                {order.packaging && (
                  <div className="flex justify-between items-center text-sm text-indigo-600 mt-2 pt-2 border-t border-dashed border-gray-200">
                    <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {order.packaging.name}</span>
                    <span>+{CURRENCY}{order.packaging.price}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex flex-col">
                   <span className="text-xs text-gray-500">Total Paid</span>
                   <span className="font-bold text-lg text-[#EA4335]">{CURRENCY}{getOrderTotal(order).toLocaleString()}</span>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  {order.paymentMethod === 'prepay' ? 'Prepaid' : 'COD'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
