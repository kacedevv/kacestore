
export type CategoryType = 'All' | 'BestSeller' | 'Entertainment' | 'Learning' | 'Design' | 'Game' | 'Combo' | 'AI' | 'Cloud' | 'Dev' | 'SEO';
export type DurationType = '1M' | '3M' | '6M' | '1Y' | 'Lifetime';
export type UsageType = 'Private' | 'Shared' | 'Key' | 'Upgrade' | 'Mixed';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: Exclude<CategoryType, 'All' | 'BestSeller'>;
  duration: DurationType;
  usage: UsageType;
  image: string;
  rating: number;
  soldCount: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
  // Customizations
  selectedDuration?: string;
  selectedType?: 'Upgrade' | 'Provided';
  accountCredentials?: {
    email?: string;
    password?: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  comment: string;
  rating: number;
  productName: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface OrderInfo {
  customerName: string;
  contactMethod: string; // Zalo or Email
  accountToUpgrade?: string; // Optional, only if needed
  total: number;
  items: string[];
  status: 'pending' | 'paid';
}

export interface BankAccount {
  bankName: string;
  owner: string;
  stk: string;
  qrUrl?: string;
}

export interface PaymentOrder {
  productName?: string;
  duration?: string;
  amount?: number;
}
