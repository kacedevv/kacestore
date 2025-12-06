import { Product, FAQ, Review, Feature, BankAccount } from './types';

export const PRODUCTS: Product[] = [
  // --- CHRISTMAS SPECIALS ---
  {
    id: 'noel1',
    name: 'Combo Noel Siêu Cấp',
    description: 'Netflix 4K + Spotify + Canva Pro. Tặng kèm YouTube Premium 1 tháng. Giáng sinh ấm áp!',
    price: 99000,
    originalPrice: 350000,
    category: 'Combo',
    duration: '1M',
    usage: 'Mixed',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop',
    rating: 5.0,
    soldCount: 999,
    tags: ['Sale Sốc', 'Hot Trend', 'Noel']
  },

  // --- AI TOOLS (HOT TREND) ---
  {
    id: 'ai1',
    name: 'ChatGPT Plus / Team',
    description: 'GPT-4 mới nhất, duyệt web, DALL-E 3, phân tích dữ liệu nâng cao.',
    price: 99000,
    originalPrice: 500000,
    category: 'AI',
    duration: '1M',
    usage: 'Shared',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    rating: 5.0,
    soldCount: 8500,
    tags: ['Best Seller', 'Hot Trend']
  },
  {
    id: 'ai2',
    name: 'Gemini Advanced',
    description: 'Mô hình AI mạnh nhất Google, tích hợp Google Workspace, xử lý đa phương thức.',
    price: 120000,
    originalPrice: 490000,
    category: 'AI',
    duration: '1M',
    usage: 'Private',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
    rating: 4.9,
    soldCount: 3200,
    tags: ['Hot Trend']
  },
  {
    id: 'ai3',
    name: 'Midjourney Pro',
    description: 'Tạo ảnh AI nghệ thuật chất lượng cao nhất hiện nay. Tài khoản dùng chung.',
    price: 150000,
    originalPrice: 750000,
    category: 'AI',
    duration: '1M',
    usage: 'Shared',
    image: 'https://foxfio.com/wp-content/uploads/2023/05/Midjourney_Emblem.png',
    rating: 4.8,
    soldCount: 2100,
    tags: []
  },
  {
    id: 'ai4',
    name: 'ElevenLabs Starter',
    description: 'Tạo giọng đọc AI giống người thật nhất. Hỗ trợ tiếng Việt mượt mà.',
    price: 190000,
    originalPrice: 550000,
    category: 'AI',
    duration: '1M',
    usage: 'Private',
    image: 'https://original.fontsinuse.com/fontsinuse.com/use-images/N229/229981/229981.jpeg', // Placeholder
    rating: 4.7,
    soldCount: 500,
    tags: []
  },

  // --- GAME & ENTERTAINMENT ---
  {
    id: 'g1',
    name: 'Xbox Game Pass Ultimate',
    description: 'Chơi hàng trăm game đỉnh cao trên PC & Xbox. Bao gồm EA Play.',
    price: 89000,
    originalPrice: 350000,
    category: 'Game',
    duration: '1M',
    usage: 'Private',
    image: 'https://s.yimg.com/ny/api/res/1.2/PlY47Qr4W1mB.SYwxa7dCw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTk2MA--/https://media.zenfs.com/en/windows_central_293/92258d67f10bd948050f356bd7d3faa1',
    rating: 4.9,
    soldCount: 4100,
    tags: ['Best Seller']
  },
  {
    id: 'g2',
    name: 'Steam Wallet Code 100k',
    description: 'Nạp tiền trực tiếp vào tài khoản Steam. Mua game bản quyền an toàn.',
    price: 95000,
    originalPrice: 100000,
    category: 'Game',
    duration: 'Lifetime',
    usage: 'Key',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
    rating: 5.0,
    soldCount: 1500,
    tags: []
  },
  {
    id: 'e1',
    name: 'Netflix Premium 4K',
    description: 'Xem phim không giới hạn, chất lượng 4K UHD. Bảo hành trọn đời gói.',
    price: 69000,
    originalPrice: 260000,
    category: 'Entertainment',
    duration: '1M',
    usage: 'Shared',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    rating: 4.9,
    soldCount: 12050,
    tags: ['Best Seller', 'Hot']
  },
  {
    id: 'e2',
    name: 'YouTube Premium',
    description: 'Không quảng cáo, nghe nhạc tắt màn hình. Nâng cấp chính chủ.',
    price: 25000,
    originalPrice: 79000,
    category: 'Entertainment',
    duration: '1M',
    usage: 'Upgrade',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/YouTube_Premium_logo.svg',
    rating: 5.0,
    soldCount: 34000,
    tags: ['Best Seller']
  },
  {
    id: 'e3',
    name: 'Spotify Premium',
    description: 'Nghe nhạc chất lượng cao, không quảng cáo. Nâng cấp chính chủ.',
    price: 19000,
    originalPrice: 59000,
    category: 'Entertainment',
    duration: '1M',
    usage: 'Upgrade',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    rating: 4.8,
    soldCount: 8900,
    tags: []
  },

  // --- DESIGN ---
  {
    id: 'd1',
    name: 'Canva Pro',
    description: 'Mở khóa toàn bộ tính năng Pro, kho ảnh, font chữ. Nâng cấp chính chủ.',
    price: 99000,
    originalPrice: 1200000,
    category: 'Design',
    duration: '1Y',
    usage: 'Upgrade',
    image: 'https://adshopkeys.com/wp-content/uploads/2024/07/Canva-Pro.png',
    rating: 5.0,
    soldCount: 56000,
    tags: ['Best Seller', 'Education']
  },
  {
    id: 'd2',
    name: 'CapCut Pro',
    description: 'Full tính năng chỉnh sửa video chuyên nghiệp, xóa logo, Cloud Space.',
    price: 150000,
    originalPrice: 450000,
    category: 'Design',
    duration: '1Y',
    usage: 'Upgrade',
    image: 'https://gshare.vn/wp-content/uploads/2025/05/capcut-pro.jpg',
    rating: 4.7,
    soldCount: 4300,
    tags: ['New']
  },
  {
    id: 'd3',
    name: 'Adobe All Apps',
    description: 'Full bộ Adobe: Photoshop, Illustrator, Premiere... Cloud 100GB.',
    price: 350000,
    originalPrice: 1800000,
    category: 'Design',
    duration: '1M',
    usage: 'Private',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png',
    rating: 4.9,
    soldCount: 200,
    tags: []
  },

  // --- CLOUD STORAGE ---
  {
    id: 'cl1',
    name: 'Google Drive 2TB',
    description: 'Lưu trữ dữ liệu an toàn bảo mật, add vào mail chính chủ.',
    price: 299000,
    originalPrice: 2250000,
    category: 'Cloud',
    duration: 'Lifetime',
    usage: 'Upgrade',
    image: 'https://taphoammo.net/img/google-one-google-drive-google-photo-nang-cap-dung-luong-chinh-chu-bao-hanh-tron-oi_566846.png',
    rating: 5.0,
    soldCount: 1200,
    tags: ['Hot Trend']
  },
  {
    id: 'cl2',
    name: 'Google One 100GB',
    description: 'Gói cơ bản cho nhu cầu lưu trữ ảnh và tài liệu cá nhân.',
    price: 150000,
    originalPrice: 450000,
    category: 'Cloud',
    duration: '1Y',
    usage: 'Upgrade',
    image: 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/122576/Originals/Doi-net-ve-google-one-tuong-lai-moi-cua-google-drive-4.jpg',
    rating: 4.8,
    soldCount: 800,
    tags: []
  },

  // --- LEARNING & WORK ---
  {
    id: 'w1',
    name: 'Microsoft 365 Personal',
    description: 'Word, Excel, PowerPoint, 1TB OneDrive. Tài khoản chính chủ.',
    price: 290000,
    originalPrice: 1290000,
    category: 'Learning',
    duration: '1Y',
    usage: 'Private',
    image: 'https://cdn.ankhang.vn/media/product/28580_phan_mem_microsoft_365_personal_english_subscr_1yr_apac_em_medialess_emerging_market_p10_qq2_01896.jpg',
    rating: 4.9,
    soldCount: 2100,
    tags: []
  },
  {
    id: 'w2',
    name: 'Grammarly Premium',
    description: 'Kiểm tra ngữ pháp, đạo văn tiếng Anh chuyên sâu.',
    price: 150000,
    originalPrice: 2500000,
    category: 'Learning',
    duration: '6M',
    usage: 'Shared',
    image: 'https://getnhanh.net/wp-content/uploads/2021/10/Tai-Khoan-Grammarly-Premium.jpg',
    rating: 4.8,
    soldCount: 1500,
    tags: []
  },
  
  // --- DEV & SEO (SUPER PROFIT) ---
  {
    id: 'dev1',
    name: 'GitHub Copilot',
    description: 'Trợ lý lập trình AI, code nhanh hơn, thông minh hơn.',
    price: 120000,
    originalPrice: 250000,
    category: 'Dev',
    duration: '1M',
    usage: 'Private',
    image: 'https://images.ctfassets.net/wfutmusr1t3h/47hzFdXO0PLAEO1cZXXDJK/847afb2e4e0c514524f41604d55dc687/512x160-GitHub-Copilot_Logo-Dark__1_.png',
    rating: 5.0,
    soldCount: 300,
    tags: ['Hot']
  },
  {
    id: 'seo1',
    name: 'Grok AI',
    description: 'Chatbot nổi loạn của xAI. Cập nhật tin tức thời gian thực từ X. Hài hước, châm biếm và không ngán trả lời bất cứ điều gì.',
    price: 250000,
    originalPrice: 4500000,
    category: 'SEO',
    duration: '1M',
    usage: 'Shared',
    image: 'https://diplo-media.s3.eu-central-1.amazonaws.com/2025/04/grok-xAI-Elon-Musk-Memory-1024x576.png',
    rating: 4.7,
    soldCount: 150,
    tags: []
  },

  // --- COMBOS ---
  {
    id: 'c1',
    name: 'Combo Creator',
    description: 'YouTube Premium + CapCut Pro + Canva Pro (1 Năm)',
    price: 499000,
    originalPrice: 1500000,
    category: 'Combo',
    duration: '1Y',
    usage: 'Upgrade',
    image: 'https://i.imgur.com/example_combo1.png', // Placeholder
    rating: 5.0,
    soldCount: 900,
    tags: ['Sale Sốc']
  },
  {
    id: 'c2',
    name: 'Combo Học Tập AI',
    description: 'Canva Pro + Grammarly + Notion AI (6 Tháng)',
    price: 350000,
    originalPrice: 1200000,
    category: 'Combo',
    duration: '6M',
    usage: 'Mixed',
    image: 'https://i.imgur.com/example_combo2.png', // Placeholder
    rating: 4.9,
    soldCount: 450,
    tags: ['Sale Sốc']
  }
];

export const FAQS: FAQ[] = [
  {
    question: "Tài khoản dùng riêng hay dùng chung?",
    answer: "Chúng tôi cung cấp cả hai loại. Loại 'Private'/'Upgrade' là tài khoản riêng chính chủ. Loại 'Shared' là dùng chung profile để tiết kiệm chi phí."
  },
  {
    question: "Chế độ bảo hành như thế nào?",
    answer: "Bảo hành 1 đổi 1 trong suốt thời gian sử dụng nếu lỗi do hệ thống. Hỗ trợ kỹ thuật 24/7."
  },
  {
    question: "Cách thức thanh toán và nhận tài khoản?",
    answer: "Bạn chuyển khoản qua QR Code, sau đó hệ thống sẽ xử lý và gửi tài khoản qua Email/Zalo trong 5-15 phút."
  },
  {
    question: "Nâng cấp chính chủ có an toàn không?",
    answer: "Hoàn toàn an toàn. Chúng tôi chỉ join Family hoặc add license vào email của bạn, không can thiệp mật khẩu."
  }
];

// Generates 50 mock reviews for the carousel
export const REVIEWS: Review[] = Array.from({ length: 50 }, (_, i) => ({
  id: `r${i}`,
  user: ['Minh Tuấn', 'Thảo Nhi', 'Hoàng Long', 'Thu Hà', 'Văn Hùng', 'Bảo Ngọc', 'Đức Anh', 'Hương Ly'][i % 8],
  avatar: `https://i.pravatar.cc/150?u=${i + 100}`,
  comment: [
      'Shop hỗ trợ rất nhiệt tình, tài khoản dùng mượt.',
      'Mua Netflix gói 1 năm giá quá hời, xem 4K nét căng.',
      'YouTube Premium nâng chính chủ nhanh gọn lẹ.',
      'Uy tín, chất lượng, sẽ ủng hộ dài dài.',
      'Giá rẻ nhất thị trường mà support lại nhanh.',
      'Canva Pro dùng thích lắm, kho ảnh xịn xò.',
      'Tài khoản ổn định, không bị out bao giờ.',
      'Tuyệt vời, 10 điểm cho chất lượng phục vụ.'
  ][i % 8],
  rating: 5,
  productName: ['Canva Pro', 'Netflix Premium', 'YouTube Premium', 'Spotify', 'ChatGPT Plus'][i % 5]
}));

export const FEATURES: Feature[] = [
  {
    id: 'f1',
    title: '100% Chính Hãng',
    description: 'Tài khoản sạch, nguồn gốc rõ ràng, nói không với hàng scan/hack.',
    icon: 'ShieldCheck'
  },
  {
    id: 'f2',
    title: 'Bảo Hành Trọn Đời',
    description: 'Lỗi là đổi mới ngay lập tức trong suốt quá trình sử dụng.',
    icon: 'Zap'
  },
  {
    id: 'f3',
    title: 'Giá Rẻ Nhất',
    description: 'Cam kết giá tốt nhất thị trường, tiết kiệm chi phí tối đa.',
    icon: 'BadgeCheck'
  },
  {
    id: 'f4',
    title: 'Hỗ Trợ Nhanh',
    description: 'Phản hồi tin nhắn cực nhanh, hỗ trợ cài đặt qua UltraView/TeamViewer.',
    icon: 'Headphones'
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  'BestSeller': 'Top Bán Chạy',
  'AI': 'AI Tools',
  'Entertainment': 'Giải trí',
  'Learning': 'Học tập',
  'Design': 'Thiết kế',
  'Game': 'Game',
  'Cloud': 'Cloud',
  'Dev': 'Dev & IT',
  'SEO': 'Marketing',
  'Combo': 'Combo Hot'
};

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    bankName: "MB Bank",
    owner: "NGUYEN VAN A",
    stk: "0333666999",
    qrUrl: ""
  },
  {
    bankName: "Momo",
    owner: "NGUYEN VAN A",
    stk: "0987654321",
    qrUrl: ""
  }
];
