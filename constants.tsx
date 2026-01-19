
import { Category, Product, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  // === AI VIDEO & EDIT ===
  {
    id: 'capcut-pro-ready',
    name: 'CapCut Pro (Cấp sẵn)',
    category: Category.AIVideo,
    description: 'Tài khoản cấp sẵn dùng được trên 2 thiết bị. Mở khóa toàn bộ hiệu ứng Pro, xuất video 4K không logo.',
    note: 'Cấp sẵn – 2 thiết bị',
    price: '15k – 400k',
    priceNumeric: 15000,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=100',
    icon: '🎬',
    status: 'Bán chạy',
    isHot: true,
    options: [
      { label: '7 Ngày', price: '15k', priceNumeric: 15000 },
      { label: '35 Ngày', price: '60k', priceNumeric: 60000 },
      { label: '6 Tháng', price: '400k', priceNumeric: 400000 }
    ],
    warrantyInfo: "Bảo hành 1 đổi 1 suốt thời gian sử dụng."
  },
  {
    id: 'capcut-pro-owner',
    name: 'CapCut Pro (Chính chủ)',
    category: Category.AIVideo,
    description: 'Nâng cấp chính chủ trên email cá nhân qua hình thức add team.',
    note: 'Chính chủ – add team',
    price: 'Hết hàng',
    priceNumeric: 0,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=100',
    icon: '✂️',
    status: 'Hết hàng',
    options: [{ label: '12 Tháng', price: 'Hết hàng', priceNumeric: 0 }]
  },
  {
    id: 'veo-3-ultra',
    name: 'Veo 3 Ultra',
    category: Category.AIVideo,
    description: 'Trải nghiệm video AI thế mới nhất.',
    note: 'Acc riêng / Acc chung',
    price: '50k',
    priceNumeric: 50000,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=100',
    icon: '📹',
    options: [
      { label: 'Acc chung 1T', price: '50k', priceNumeric: 50000 },
      { label: 'Acc riêng 1T', price: 'Hết hàng', priceNumeric: 0 }
    ]
  },
  {
    id: 'veo-3-pro',
    name: 'Veo 3 Pro (Chính chủ)',
    category: Category.AIVideo,
    description: 'Gói Pro nâng cấp chính chủ ổn định.',
    note: 'Chính chủ',
    price: '50k – 450k',
    priceNumeric: 50000,
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=100',
    icon: '💎',
    options: [
      { label: '1 Tháng', price: '50k', priceNumeric: 50000 },
      { label: '6 Tháng', price: '250k', priceNumeric: 250000 },
      { label: '12 Tháng', price: '450k', priceNumeric: 450000 }
    ]
  },
  {
    id: 'runway-ml',
    name: 'Runway ML (Chính chủ)',
    category: Category.AIVideo,
    description: 'Công cụ sáng tạo video AI hàng đầu thế giới.',
    note: 'Chính chủ',
    price: '300k – 650k',
    priceNumeric: 300000,
    image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=1200&q=100',
    icon: '🚀',
    options: [
      { label: 'Standard 1T', price: '300k', priceNumeric: 300000 },
      { label: 'Pro 1T', price: '650k', priceNumeric: 650000 }
    ]
  },
  {
    id: 'kling-ai',
    name: 'Kling AI',
    category: Category.AIVideo,
    description: 'Mô hình tạo video AI thực tế.',
    note: 'Standard',
    price: '149k',
    priceNumeric: 149000,
    image: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&w=1200&q=100',
    icon: '⚡',
    options: [{ label: 'Standard 1T', price: '149k', priceNumeric: 149000 }]
  },

  // === AI CHAT & LÀM VIỆC ===
  {
    id: 'chatgpt-5-chung',
    name: 'ChatGPT 5 (Cấp sẵn)',
    category: Category.AIChat,
    description: 'Tài khoản ChatGPT Plus dùng chung ổn định.',
    note: 'Cấp sẵn (chung)',
    price: '30k – 450k',
    priceNumeric: 30000,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=100',
    icon: '🤖',
    status: 'Bán chạy',
    isHot: true,
    options: [
      { label: '15 Ngày', price: '30k', priceNumeric: 30000 },
      { label: '1 Tháng', price: '50k', priceNumeric: 50000 },
      { label: '6 Tháng', price: '250k', priceNumeric: 250000 },
      { label: '12 Tháng', price: '450k', priceNumeric: 450000 }
    ]
  },
  {
    id: 'chatgpt-5-rieng',
    name: 'ChatGPT 5 (Cấp sẵn)',
    category: Category.AIChat,
    description: 'Tài khoản cấp sẵn dùng riêng tư.',
    note: 'Cấp sẵn (riêng)',
    price: '599k',
    priceNumeric: 599000,
    image: 'https://images.unsplash.com/photo-1684188157991-d52310bb22a5?auto=format&fit=crop&w=1200&q=100',
    icon: '👤',
    options: [{ label: '12 Tháng', price: '599k', priceNumeric: 599000 }]
  },
  {
    id: 'chatgpt-5-owner',
    name: 'ChatGPT 5 (Chính chủ)',
    category: Category.AIChat,
    description: 'Nâng cấp chính chủ email cá nhân.',
    note: 'Chính chủ',
    price: '250k – 899k',
    priceNumeric: 250000,
    image: 'https://images.unsplash.com/photo-1678382155781-30062e74e645?auto=format&fit=crop&w=1200&q=100',
    icon: '✨',
    options: [
      { label: '1 Tháng', price: '250k', priceNumeric: 250000 },
      { label: '12 Tháng', price: '899k', priceNumeric: 899000 }
    ]
  },
  {
    id: 'google-ai-pro',
    name: 'Google AI Pro (Chính chủ)',
    category: Category.AIChat,
    description: 'Hệ sinh thái AI Google.',
    note: 'Chính chủ',
    price: '50k – 450k',
    priceNumeric: 50000,
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=100',
    icon: '🌐',
    options: [
      { label: '1 Tháng', price: '50k', priceNumeric: 50000 },
      { label: '6 Tháng', price: '250k', priceNumeric: 250000 },
      { label: '12 Tháng', price: '450k', priceNumeric: 450000 }
    ]
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro (Chính chủ)',
    category: Category.AIChat,
    description: 'AI thông minh từ Anthropic.',
    note: 'Chính chủ',
    price: '450k',
    priceNumeric: 450000,
    image: 'https://images.unsplash.com/photo-1678382155781-30062e74e645?auto=format&fit=crop&w=1200&q=100',
    icon: '🧠',
    options: [{ label: '1 Tháng', price: '450k', priceNumeric: 450000 }]
  },
  {
    id: 'copilot-pro',
    name: 'Copilot Pro',
    category: Category.AIChat,
    description: 'AI tích hợp Office 365.',
    note: 'Chính chủ',
    price: '300k',
    priceNumeric: 300000,
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1200&q=100',
    icon: '🪁',
    options: [{ label: '1 Tháng', price: '300k', priceNumeric: 300000 }]
  },
  {
    id: 'perplexity-pro',
    name: 'Perplexity Pro',
    category: Category.AIChat,
    description: 'Search AI dẫn nguồn chính xác.',
    note: 'Tài khoản riêng',
    price: '650k',
    priceNumeric: 650000,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=100',
    icon: '🔍',
    options: [{ label: '12 Tháng', price: '650k', priceNumeric: 650000 }]
  },
  {
    id: 'grok-ai',
    name: 'Grok AI (Chính chủ)',
    category: Category.AIChat,
    description: 'AI từ X (Twitter).',
    note: 'Chính chủ',
    price: '400k',
    priceNumeric: 400000,
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=1200&q=100',
    icon: '𝕏',
    options: [{ label: '1 Tháng', price: '400k', priceNumeric: 400000 }]
  },

  // === DESIGN & ĐỒ HỌA ===
  {
    id: 'canva-pro',
    name: 'Canva (Chính chủ)',
    category: Category.Design,
    description: 'Thiết kế đồ họa Pro.',
    note: 'Chính chủ',
    price: '10k – 139k',
    priceNumeric: 10000,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=100',
    icon: '🎨',
    status: 'Giá tốt',
    isHot: true,
    options: [
      { label: '1 Tháng', price: '10k', priceNumeric: 10000 },
      { label: '1 Năm', price: '59k', priceNumeric: 59000 },
      { label: '2 Năm', price: '100k', priceNumeric: 100000 },
      { label: '3 Năm', price: '139k', priceNumeric: 139000 }
    ]
  },
  {
    id: 'adobe-all-apps',
    name: 'Adobe All Apps (EDU)',
    category: Category.Design,
    description: 'Trọn bộ 20+ app Adobe.',
    note: 'Chính chủ - EDU',
    price: '650k – 1.2tr',
    priceNumeric: 650000,
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&w=1200&q=100',
    icon: '🖌️',
    status: 'Bán chạy',
    options: [
      { label: '1 thiết bị / 1N', price: '650k', priceNumeric: 650000 },
      { label: '2 thiết bị / 1N', price: '1.2tr', priceNumeric: 1200000 }
    ]
  },
  {
    id: 'autodesk-all-apps',
    name: 'Autodesk All Apps',
    category: Category.Design,
    description: 'AutoCAD, Revit, 3ds Max.',
    note: 'Chính chủ',
    price: '500k',
    priceNumeric: 500000,
    image: 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&w=1200&q=100',
    icon: '🏗️',
    options: [{ label: '12 Tháng', price: '500k', priceNumeric: 500000 }]
  },
  {
    id: 'capture-one-pro',
    name: 'Capture One Pro',
    category: Category.Design,
    description: 'Edit ảnh RAW chuyên nghiệp.',
    note: 'Chính chủ',
    price: '250k',
    priceNumeric: 250000,
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=100',
    icon: '📸',
    options: [{ label: '1 Tháng', price: '250k', priceNumeric: 250000 }]
  },
  {
    id: 'design-pack',
    name: 'Lightroom / Picsart / Photoroom',
    category: Category.Design,
    description: 'Combo các ứng dụng chỉnh ảnh.',
    note: '1 Năm',
    price: '300k – 450k',
    priceNumeric: 300000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=100',
    icon: '🎞️',
    options: [{ label: 'Gói 1 Năm', price: '300k', priceNumeric: 300000 }]
  },

  // === OFFICE & CLOUD ===
  {
    id: 'office-365',
    name: 'Office 365 (Chính chủ)',
    category: Category.Office,
    description: 'Word, Excel, PPT & 1TB OneDrive.',
    note: 'Chính chủ – 1TB',
    price: '20k – 220k',
    priceNumeric: 20000,
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1200&q=100',
    icon: '📦',
    options: [
      { label: '1 Tháng', price: '20k', priceNumeric: 20000 },
      { label: '3 Tháng', price: '60k', priceNumeric: 60000 },
      { label: '6 Tháng', price: '120k', priceNumeric: 120000 },
      { label: '12 Tháng', price: '220k', priceNumeric: 220000 }
    ]
  },
  {
    id: 'google-drive',
    name: 'Google Drive (Chính chủ)',
    category: Category.Office,
    description: 'Nâng cấp Drive chính chủ.',
    note: 'Chính chủ',
    price: '150k – 950k',
    priceNumeric: 150000,
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=1200&q=100',
    icon: '☁️',
    options: [
      { label: '100GB', price: '150k', priceNumeric: 150000 },
      { label: '200GB', price: '200k', priceNumeric: 200000 },
      { label: '1TB', price: '300k', priceNumeric: 300000 },
      { label: '2TB', price: '450k', priceNumeric: 450000 },
      { label: '5TB', price: '950k', priceNumeric: 950000 }
    ]
  },

  // === HỌC TẬP ===
  {
    id: 'turnitin',
    name: 'Turnitin (Chính chủ)',
    category: Category.Education,
    description: 'Kiểm tra đạo văn.',
    note: 'Chính chủ',
    price: '75k – 310k',
    priceNumeric: 75000,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=100',
    icon: '🎓',
    options: [
      { label: '1 Tháng', price: '75k', priceNumeric: 75000 },
      { label: '3 Tháng', price: '145k', priceNumeric: 145000 },
      { label: '6 Tháng', price: '195k', priceNumeric: 195000 },
      { label: '12 Tháng', price: '310k', priceNumeric: 310000 }
    ]
  },
  {
    id: 'grammarly',
    name: 'Grammarly Premium',
    category: Category.Education,
    description: 'Sửa lỗi tiếng Anh.',
    note: 'Chính chủ/Slot',
    price: '30k – 300k',
    priceNumeric: 30000,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=100',
    icon: '📝',
    options: [
      { label: '7 Ngày', price: '30k', priceNumeric: 30000 },
      { label: '1 Năm', price: '300k', priceNumeric: 300000 }
    ]
  },
  {
    id: 'quillbot',
    name: 'Quillbot Premium',
    category: Category.Education,
    description: 'Paraphrase đỉnh cao.',
    note: 'Tài khoản riêng',
    price: '150k – 350k',
    priceNumeric: 150000,
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=1200&q=100',
    icon: '✒️',
    options: [
      { label: '6 Tháng', price: '150k', priceNumeric: 150000 },
      { label: '12 Tháng', price: '350k', priceNumeric: 350000 }
    ]
  },
  {
    id: 'edu-bundle-ultimate',
    name: 'Duolingo / Elsa / Quizlet / Kahoot / Zoom Pro',
    category: Category.Education,
    description: 'Gói học tập tổng hợp.',
    note: 'Nhiều gói',
    price: 'Giá linh hoạt',
    priceNumeric: 0,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=100',
    icon: '🏫',
    options: [{ label: 'Giá linh hoạt', price: 'Liên hệ', priceNumeric: 0 }]
  },

  // === GIẢI TRÍ ===
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    category: Category.Entertainment,
    description: 'Video không quảng cáo.',
    note: 'Chính chủ / Quét TV',
    price: '10k – 30k',
    priceNumeric: 10000,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=100',
    icon: '🔴',
    status: 'Bán chạy',
    isHot: true,
    options: [
      { label: 'Quét TV 1T', price: '10k', priceNumeric: 10000 },
      { label: 'Chính chủ 1T', price: '30k', priceNumeric: 30000 }
    ]
  },
  {
    id: 'netflix-slot',
    name: 'Netflix (Slot)',
    category: Category.Entertainment,
    description: 'Phim 4K HDR profile riêng.',
    note: '1 slot riêng tư',
    price: '65k',
    priceNumeric: 65000,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=100',
    icon: '🍿',
    status: 'Bán chạy',
    options: [{ label: '1 Tháng', price: '65k', priceNumeric: 65000 }]
  },
  {
    id: 'spotify',
    name: 'Spotify Premium (Chính chủ)',
    category: Category.Entertainment,
    description: 'Music Premium chính chủ.',
    note: 'Chính chủ',
    price: '300k – 500k',
    priceNumeric: 300000,
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=1200&q=100',
    icon: '🎵',
    options: [
      { label: '6 Tháng', price: '300k', priceNumeric: 300000 },
      { label: '12 Tháng', price: '500k', priceNumeric: 500000 }
    ]
  },
  {
    id: 'tv-pack-ultimate',
    name: 'K+ / Vieon / FPT Play',
    category: Category.Entertainment,
    description: 'Combo truyền hình trực tuyến.',
    note: '1T–12T',
    price: 'Giá tốt',
    priceNumeric: 0,
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=100',
    icon: '📺',
    options: [{ label: 'Tùy gói', price: 'Giá tốt', priceNumeric: 0 }]
  },

  // === VPN ===
  {
    id: 'hma-vpn',
    name: 'HMA VPN',
    category: Category.VPN,
    description: 'VPN ẩn danh cực mạnh.',
    note: 'Tài khoản lẻ',
    price: '15k',
    priceNumeric: 15000,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=100',
    icon: '🛡️',
    options: [{ label: '1 Tháng', price: '15k', priceNumeric: 15000 }]
  },
  {
    id: 'express-vpn',
    name: 'Express VPN',
    category: Category.VPN,
    description: 'VPN số 1 thế giới.',
    note: 'Tài khoản lẻ',
    price: '45k',
    priceNumeric: 45000,
    image: 'https://images.unsplash.com/photo-1633265486231-22983247fce5?auto=format&fit=crop&w=1200&q=100',
    icon: '⚡',
    options: [{ label: '1 Tháng', price: '45k', priceNumeric: 45000 }]
  },
  {
    id: 'vpn-bundle-all',
    name: 'Nord / Surfshark / PIA / TunnelBear / Vypr',
    category: Category.VPN,
    description: 'Hệ thống VPN cao cấp.',
    note: 'Chính chủ / 1N',
    price: '~180k',
    priceNumeric: 180000,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=100',
    icon: '🌐',
    options: [{ label: '1 Năm', price: '~180k', priceNumeric: 180000 }]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  // Celebs
  {
    id: 'celeb-1',
    name: 'Trấn Thành',
    role: 'Nghệ sĩ / MC',
    text: 'Kace Store là địa chỉ tin cậy của Thành khi cần các công cụ AI hỗ trợ sáng tạo nội dung. Dịch vụ nhanh, bảo mật và cực kỳ ổn định.',
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    isCelebrity: true
  },
  {
    id: 'celeb-2',
    name: 'Sơn Tùng M-TP',
    role: 'Ca sĩ / Producer',
    text: 'Âm nhạc và hình ảnh chất lượng cao là ưu tiên của Tùng. Cảm ơn Kace đã cung cấp những tài khoản Premium tuyệt vời.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    isCelebrity: true
  },
  {
    id: 'celeb-3',
    name: 'Mark Zuckerberg',
    role: 'CEO of Meta (Facebook)',
    text: 'Hệ thống hạ tầng cung cấp giải pháp AI của Kace Store thực sự ấn tượng và chuyên nghiệp. Một đối tác tuyệt vời cho kỷ nguyên công nghệ số.',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    isCelebrity: true
  },
  // Others - 30+ items multilingual
  { id: 'u1', name: 'Nguyễn Đạt', role: 'Developer', text: 'ChatGPT Plus kích hoạt cực nhanh, dùng rất ổn định.', avatar: 'https://i.pravatar.cc/150?u=u1', rating: 5 },
  { id: 'u2', name: 'James Wilson', role: 'Manager', text: 'Best service I have ever used for premium accounts. Fast delivery!', avatar: 'https://i.pravatar.cc/150?u=u2', rating: 5 },
  { id: 'u3', name: 'Sato Kenji', role: 'Designer', text: 'Adobe All Appsがこの価格で手に入るとは。素晴らしいです。', avatar: 'https://i.pravatar.cc/150?u=u3', rating: 5 },
  { id: 'u4', name: 'Kim Min-su', role: 'Student', text: '넷플릭스 계정 너무 잘 쓰고 있어요. 추천합니다!', avatar: 'https://i.pravatar.cc/150?u=u4', rating: 5 },
  { id: 'u5', name: 'Elena García', role: 'Creator', text: 'Canva Pro funciona perfecto. Muy buena atención al cliente.', avatar: 'https://i.pravatar.cc/150?u=u5', rating: 5 },
  { id: 'u6', name: 'Lê Thảo', role: 'Editor', text: 'CapCut Pro giá quá rẻ mà đầy đủ tính năng. Ưng ý!', avatar: 'https://i.pravatar.cc/150?u=u6', rating: 5 },
  { id: 'u7', name: 'Mark Thompson', role: 'Freelancer', text: 'Excellent value for money. Highly recommended for digital nomads.', avatar: 'https://i.pravatar.cc/150?u=u7', rating: 5 },
  { id: 'u8', name: 'Chen Wei', role: 'Analyst', text: '账户非常稳定，售后服务也非常到位。', avatar: 'https://i.pravatar.cc/150?u=u8', rating: 5 },
  { id: 'u9', name: 'Vũ Hoàng', role: 'Gamer', text: 'YouTube Premium xem không quảng cáo sướng thật sự.', avatar: 'https://i.pravatar.cc/150?u=u9', rating: 5 },
  { id: 'u10', name: 'Sofia Rossi', role: 'Architect', text: 'Servizio impeccabile e account AutoCAD attivato in pochi minuti.', avatar: 'https://i.pravatar.cc/150?u=u10', rating: 5 },
  { id: 'u11', name: 'Phạm Minh', role: 'Teacher', text: 'Turnitin giúp mình kiểm tra bài tập sinh viên rất hiệu quả.', avatar: 'https://i.pravatar.cc/150?u=u11', rating: 5 },
  { id: 'u12', name: 'Oliver Smith', role: 'Marketing', text: 'The Perplexity Pro account changed my research workflow completely.', avatar: 'https://i.pravatar.cc/150?u=u12', rating: 5 },
  { id: 'u13', name: '田中 美穂', role: 'Editor', text: 'Youtube Premiumを安く購入できて良かったです。', avatar: 'https://i.pravatar.cc/150?u=u13', rating: 5 },
  { id: 'u14', name: '박 지훈', role: 'Student', text: '그램멀리 덕분에 영어 과제 편하게 하고 있습니다.', avatar: 'https://i.pravatar.cc/150?u=u14', rating: 5 },
  { id: 'u15', name: 'Luc Dubois', role: 'Manager', text: 'Un service client très réactif et des produits fiables. Merci!', avatar: 'https://i.pravatar.cc/150?u=u15', rating: 5 },
  { id: 'u16', name: 'Trần Long', role: 'Cameraman', text: 'Runway ML cho phép tạo video AI quá đỉnh. Shop uy tín.', avatar: 'https://i.pravatar.cc/150?u=u16', rating: 5 },
  { id: 'u17', name: 'Emily White', role: 'Designer', text: 'Spotify Premium works globally. Great for my travels.', avatar: 'https://i.pravatar.cc/150?u=u17', rating: 5 },
  { id: 'u18', name: 'Ahmed Khan', role: 'Business Owner', text: 'Authentic accounts at an unbeatable price point.', avatar: 'https://i.pravatar.cc/150?u=u18', rating: 5 },
  { id: 'u19', name: 'Hoàng Yến', role: 'Content Creator', text: 'Mua Office 365 ở đây vừa rẻ vừa được hỗ trợ cài đặt.', avatar: 'https://i.pravatar.cc/150?u=u19', rating: 5 },
  { id: 'u20', name: 'Isabella Silva', role: 'Artist', text: 'A melhor loja para assinaturas premium digitais.', avatar: 'https://i.pravatar.cc/150?u=u20', rating: 5 },
  { id: 'u21', name: 'Đỗ Hùng', role: 'Tech Enthusiast', text: 'Grok AI và ChatGPT dùng song song quá ngon.', avatar: 'https://i.pravatar.cc/150?u=u21', rating: 5 },
  { id: 'u22', name: 'Lucas Meyer', role: 'Engineer', text: 'Super schneller Support, alles hat reibungslos geklappt.', avatar: 'https://i.pravatar.cc/150?u=u22', rating: 5 },
  { id: 'u23', name: 'Mai Anh', role: 'Student', text: 'Duolingo Super giúp mình học tiếng Pháp nhanh hơn.', avatar: 'https://i.pravatar.cc/150?u=u23', rating: 5 },
  { id: 'u24', name: 'Charlotte Brown', role: 'Consultant', text: 'Reliable accounts for business needs. Zero downtime.', avatar: 'https://i.pravatar.cc/150?u=u24', rating: 5 },
  { id: 'u25', name: 'Ngô Thanh', role: 'Vlogger', text: 'Netflix chất lượng 4K chuẩn, profile riêng tư.', avatar: 'https://i.pravatar.cc/150?u=u25', rating: 5 },
  { id: 'u26', name: 'Liam Wilson', role: 'DevOps', text: 'NordVPN works like a charm. Total privacy secured.', avatar: 'https://i.pravatar.cc/150?u=u26', rating: 5 },
  { id: 'u27', name: 'Phan Lâm', role: 'Accountant', text: 'Google Drive 2TB lưu trữ dữ liệu công ty rất tốt.', avatar: 'https://i.pravatar.cc/150?u=u27', rating: 5 },
  { id: 'u28', name: 'Zoe Clarke', role: 'Researcher', text: 'Fastest activation for ChatGPT Plus I have ever experienced.', avatar: 'https://i.pravatar.cc/150?u=u28', rating: 5 },
  { id: 'u29', name: 'Tô Quốc', role: 'Designer', text: 'Capture One Pro chính chủ dùng rất mượt.', avatar: 'https://i.pravatar.cc/150?u=u29', rating: 5 },
  { id: 'u30', name: 'Mia Andersson', role: 'Blogger', text: 'Fantastisk service och bra priser på alla AI-verktyg.', avatar: 'https://i.pravatar.cc/150?u=u30', rating: 5 },
  { id: 'u31', name: 'Đặng Quân', role: 'Student', text: 'Elsa Speak giúp mình phát âm chuẩn hơn hẳn.', avatar: 'https://i.pravatar.cc/150?u=u31', rating: 5 },
  { id: 'u32', name: 'Ivan Petrov', role: 'Developer', text: 'Отличный сервис, аккаунты работают без проблем.', avatar: 'https://i.pravatar.cc/150?u=u32', rating: 5 },
  { id: 'u33', name: 'Lê Nam', role: 'Video Editor', text: 'CapCut và Adobe là bộ đôi không thể thiếu, cảm ơn shop.', avatar: 'https://i.pravatar.cc/150?u=u33', rating: 5 }
];
