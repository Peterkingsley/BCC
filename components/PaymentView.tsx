import React, { useState } from 'react';
import { PaymentProof } from '../types';
import { CURRENCY, DISCOUNT_RATE, DELIVERY_FEE } from '../constants';
import { Button } from './Button';
import { Copy, CheckCircle2, AlertCircle, ArrowLeft, Banknote, ShieldCheck } from 'lucide-react';

interface PaymentViewProps {
  cartTotal: number; // Includes items + packaging, excludes delivery/discount
  onConfirmPayment: (proof: PaymentProof) => void;
  onBack: () => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({ cartTotal, onConfirmPayment, onBack }) => {
  const [proof, setProof] = useState<PaymentProof>({
    senderName: '',
    senderBank: '',
    accountNumber: ''
  });
  const [copied, setCopied] = useState(false);

  const discountAmount = Math.round(cartTotal * DISCOUNT_RATE);
  const totalToPay = cartTotal - discountAmount + DELIVERY_FEE;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proof.senderName || !proof.senderBank || !proof.accountNumber) {
        alert("Please fill in the account details used for the transfer.");
        return;
    }
    onConfirmPayment(proof);
  };

  return (
    <div className="pb-32 px-4 pt-4 max-w-2xl mx-auto animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="flex items-center text-gray-500 mb-6 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-1" /> Back to details
      </button>

      <h2 className="text-2xl font-bold mb-2">Complete Payment</h2>
      <p className="text-gray-500 mb-6 text-sm">Please transfer the exact amount to the account below.</p>

      {/* Amount Display */}
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl mb-8 text-center relative overflow-hidden">
        <div className="relative z-10">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Amount to Transfer</p>
            <h1 className="text-4xl font-extrabold text-white">{CURRENCY}{totalToPay.toLocaleString()}</h1>
            <div className="mt-2 inline-flex items-center gap-1 bg-[#34A853]/20 text-green-300 px-2 py-1 rounded text-xs font-medium">
                <CheckCircle2 className="w-3 h-3" /> Discount Applied
            </div>
        </div>
        {/* Decorative circles - Updated to Brand Red */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gray-800 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#EA4335] rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="space-y-6">
        {/* Bank Details Card */}
        <div className="bg-white p-5 rounded-2xl border-2 border-green-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5">
                <Banknote className="w-24 h-24" />
            </div>
            
            <p className="text-xs font-bold text-[#34A853] mb-4 uppercase tracking-wide flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Official Account Details
            </p>

            <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-500">Bank Name</span>
                    <span className="font-bold text-gray-900 text-lg">Opay</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-500">Account Name</span>
                    <span className="font-bold text-gray-900 text-right">Kingsley Peter Usoro</span>
                </div>
                <div>
                    <span className="text-sm text-gray-500 block mb-1">Account Number</span>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <span className="font-mono font-black text-2xl text-gray-900 tracking-widest">9024866449</span>
                        <button 
                            onClick={() => copyToClipboard('9024866449')}
                            className="p-2 bg-white shadow-sm border border-gray-200 rounded-lg hover:text-[#34A853] active:scale-95 transition-all"
                            title="Copy Account Number"
                        >
                            {copied ? (
                                <CheckCircle2 className="w-5 h-5 text-[#34A853] animate-in fade-in zoom-in" />
                            ) : (
                                <Copy className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Confirmation Form */}
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[#EA4335]" />
                <h3 className="font-bold text-gray-900">Confirm Your Transfer</h3>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Sender Name</label>
                    <input 
                        required
                        type="text" 
                        placeholder="Name on your bank account"
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#34A853] outline-none transition-all"
                        value={proof.senderName}
                        onChange={(e) => setProof({...proof, senderName: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Your Bank</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. GTBank"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#34A853] outline-none transition-all"
                            value={proof.senderBank}
                            onChange={(e) => setProof({...proof, senderBank: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Your Acct No.</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Last 4 digits ok"
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#34A853] outline-none transition-all"
                            value={proof.accountNumber}
                            onChange={(e) => setProof({...proof, accountNumber: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <Button type="submit" fullWidth size="lg" className="mt-6 bg-[#34A853] hover:bg-[#2d9147] shadow-green-200">
                I Have Sent the Money
            </Button>
        </form>
      </div>
    </div>
  );
};