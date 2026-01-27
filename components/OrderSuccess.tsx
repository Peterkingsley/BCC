import React, { useState } from 'react';
import { OrderState } from '../types';
import { CURRENCY, DISCOUNT_RATE, DELIVERY_FEE, WHATSAPP_NUMBER } from '../constants';
import { Button } from './Button';
import { Check, MessageCircle, Copy, CheckCircle2 } from 'lucide-react';

interface OrderSuccessProps {
  order: OrderState;
  onHome: () => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ order, onHome }) => {
  const [copied, setCopied] = useState(false);

  // Construct WhatsApp Message
  const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const pkgCost = order.packaging ? order.packaging.price : 0;
  const total = subtotal + pkgCost;
  const discount = order.paymentMethod === 'prepay' ? Math.round(total * DISCOUNT_RATE) : 0;
  const finalTotal = total - discount + DELIVERY_FEE;

  const itemsList = order.items.map(i => `- ${i.quantity}x ${i.name} (${CURRENCY}${i.price})`).join('\n');
  const pkgText = order.packaging ? `\n🎁 Packaging: ${order.packaging.name} (${order.packagingMessage})` : '';
  
  // Payment Proof String
  let paymentText = order.paymentMethod === 'prepay' ? 'Prepay (Discounted)' : 'Pay on Delivery';
  if (order.paymentMethod === 'prepay' && order.paymentProof) {
    paymentText += `\n\n*Payment Proof (Transfer):*\nSender: ${order.paymentProof.senderName}\nBank: ${order.paymentProof.senderBank}\nAcct: ${order.paymentProof.accountNumber}`;
  }

  const waMessage = `
*New Order from BCC!* 🌮
*Order ID:* #${order.id}
---------------------------
*Customer:* ${order.deliveryDetails.name}
*Phone:* ${order.deliveryDetails.phone}
*Address:* ${order.deliveryDetails.address}
*Payment Method:* ${paymentText}

*Order Details:*
${itemsList}
${pkgText}

*Summary:*
Subtotal: ${CURRENCY}${total}
Delivery: ${CURRENCY}${DELIVERY_FEE}
Discount: -${CURRENCY}${discount}
*TOTAL TO PAY: ${CURRENCY}${finalTotal}*
---------------------------
Please confirm my order!
`.trim();

  // Use the centralized constant
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(waMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100 relative">
        <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
        <div className="absolute -bottom-2 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
          SENT
        </div>
      </div>
      
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Received!</h1>
      <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm">
        We have received your order details. Please verify via WhatsApp to start preparation immediately.
      </p>

      {/* Order Info Card */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 w-full max-w-sm mb-6 text-left">
        <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
            <span className="text-xs text-gray-500 font-bold uppercase">Order ID</span>
            <span className="text-sm font-mono font-bold">#{order.id}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-bold uppercase">Status</span>
            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                {order.paymentMethod === 'prepay' ? 'Verifying Payment' : 'Pending Confirmation'}
            </span>
        </div>
      </div>

      <div className="space-y-3 w-full max-w-sm">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="block w-full">
          <Button fullWidth size="lg" className="bg-[#25D366] hover:bg-[#128C7E] shadow-green-200 text-white gap-2">
            <MessageCircle className="w-5 h-5" /> Send Order via WhatsApp
          </Button>
        </a>

        <Button 
            variant="outline" 
            fullWidth 
            onClick={handleCopy}
            className="gap-2 border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied to Clipboard' : 'Copy Order Text'}
        </Button>
        
        <Button variant="ghost" fullWidth onClick={onHome} className="mt-2 text-gray-400 hover:text-gray-600">
          Back to Home
        </Button>
      </div>
    </div>
  );
};