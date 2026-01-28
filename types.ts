export type Category = 'All' | 'Shawarma' | 'Platters' | 'Sides' | 'Drinks';

export type ViewState = 'home' | 'menu' | 'cart' | 'checkout' | 'payment' | 'history' | 'success';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Added for discount calculation
  rating?: number;       // Added for star display
  image: string;
  category: Category;
  popular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PackagingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export interface DeliveryDetails {
  name: string;
  phone: string;
  address: string;
  instructions?: string;
}

export interface PaymentProof {
  senderName: string;
  senderBank: string;
  accountNumber: string;
}

export interface OrderState {
  id?: string;
  date?: string;
  items: CartItem[];
  packaging: PackagingOption | null;
  packagingMessage: string;
  deliveryDetails: DeliveryDetails;
  paymentMethod: 'cod' | 'prepay';
  paymentProof?: PaymentProof;
  // Snapshot of financials at time of order
  totalAmount: number;
  deliveryFee: number;
  discount: number;
}