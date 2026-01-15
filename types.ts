
export enum Category {
  AIVideo = '🎬 AI Video & Edit',
  AIChat = '🤖 AI Chat & Làm việc',
  Design = '🎨 Design & Đồ họa',
  Office = '📂 Office & Cloud',
  Education = '🎓 Học tập',
  Entertainment = '🎮 Giải trí',
  VPN = '🌐 VPN'
}

export interface PricingOption {
  label: string;
  price: string;
  priceNumeric: number;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  shortDesc?: string;
  description: string;
  price: string; // Hiển thị dải giá hoặc giá khởi điểm
  priceNumeric: number;
  image: string;
  icon?: string; // Emoji hoặc SVG path
  status?: 'Bán chạy' | 'Hết hàng' | 'Giá tốt' | 'New';
  note?: string; 
  options: PricingOption[];
  isHot?: boolean;
  faqs?: ProductFAQ[];
  warrantyInfo?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
  isCelebrity?: boolean;
}

export interface CartItem {
  cartId: string;
  productId: string;
  productName: string;
  image: string;
  optionLabel: string;
  accountType: string;
  price: number;
}
