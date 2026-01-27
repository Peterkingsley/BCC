import { OrderState } from '../types';
import { GOOGLE_SCRIPT_URL, DISCOUNT_RATE, DELIVERY_FEE } from '../constants';

export const submitOrderToGoogleSheet = async (order: OrderState) => {
  const scriptUrl = GOOGLE_SCRIPT_URL.trim();
  if (!scriptUrl) {
    console.warn("Google Sheet Script URL is not configured.");
    return;
  }

  try {
    const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const pkgCost = order.packaging ? order.packaging.price : 0;
    const baseTotal = subtotal + pkgCost;
    const discount = order.paymentMethod === 'prepay' ? Math.round(baseTotal * DISCOUNT_RATE) : 0;
    const finalTotal = baseTotal - discount + DELIVERY_FEE;

    // We use a flat object structure for Form Data
    const payload: Record<string, string | number> = {
        OrderId: order.id || 'N/A',
        Date: new Date().toLocaleString(),
        Name: order.deliveryDetails.name,
        Phone: order.deliveryDetails.phone,
        Address: order.deliveryDetails.address,
        Items: order.items.map(i => `${i.quantity}x ${i.name}`).join(', '),
        Packaging: order.packaging ? order.packaging.name : 'Standard',
        Note: order.packagingMessage || '',
        TotalAmount: finalTotal,
        PaymentMethod: order.paymentMethod,
        SenderName: order.paymentProof?.senderName || '-',
        SenderBank: order.paymentProof?.senderBank || '-',
        AccountNumber: order.paymentProof?.accountNumber || '-'
    };

    // Convert to URLSearchParams (Form Data)
    // This is much more reliable than JSON for Google Apps Script Web Apps
    // as it avoids strict CORS preflight checks and body stripping.
    const formData = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    console.log("Sending order to Google Sheets...", payload);

    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });
    
    console.log("Order sent to Google Sheet successfully");
  } catch (e) {
    console.error("Failed to sync with Google Sheets", e);
  }
}