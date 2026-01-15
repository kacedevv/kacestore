
import { Category, Product, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  // AI VIDEO & EDIT
  {
    id: 'capcut-pro-ready',
    name: 'CapCut Pro (Cấp sẵn)',
    category: Category.AIVideo,
    description: 'Tài khoản cấp sẵn dùng được trên 2 thiết bị. Mở khóa toàn bộ hiệu ứng Pro, xuất video 4K không logo.',
    note: 'Cấp sẵn – 2 thiết bị',
    price: '15k – 400k',
    priceNumeric: 15000,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    icon: '🎬',
    status: 'Bán chạy',
    isHot: true,
    options: [
      { label: '7 Ngày', price: '15k', priceNumeric: 15000 },
      { label: '35 Ngày', price: '60k', priceNumeric: 60000 },
      { label: '6 Tháng', price: '400k', priceNumeric: 400000 }
    ],
    faqs: [
      { question: "Tài khoản có dùng được trên máy tính không?", answer: "Có, tài khoản CapCut Pro hỗ trợ đăng nhập và sử dụng đầy đủ tính năng trên cả Mobile và PC/Mac." },
      { question: "Dữ liệu đám mây của tôi có được bảo mật?", answer: "Vì là tài khoản cấp sẵn (dùng chung 2 thiết bị), chúng tôi khuyến cáo bạn không lưu các dự án nhạy cảm lên Cloud của tài khoản này." }
    ],
    warrantyInfo: "Bảo hành 1 đổi 1 suốt thời gian sử dụng. Nếu tài khoản bị lỗi hoặc mất Pro, shop sẽ cấp lại mã mới ngay lập tức."
  },
  {
    id: 'capcut-pro-owner',
    name: 'CapCut Pro (Chính chủ)',
    category: Category.AIVideo,
    description: 'Nâng cấp chính chủ trên email cá nhân qua hình thức add team.',
    note: 'Chính chủ – add team',
    price: 'Hết hàng',
    priceNumeric: 0,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    icon: '✂️',
    status: 'Hết hàng',
    options: [{ label: '12 Tháng', price: 'Hết hàng', priceNumeric: 0 }],
    faqs: [
      { question: "Tôi cần cung cấp thông tin gì?", answer: "Bạn chỉ cần gửi email tài khoản CapCut của bạn cho shop. Chúng tôi sẽ gửi lời mời tham gia team Pro." }
    ]
  },
  {
    id: 'veo-3-ultra',
    name: 'Veo 3 Ultra',
    category: Category.AIVideo,
    description: 'Trải nghiệm video AI thế hệ mới nhất. Acc riêng tư hoặc dùng chung ổn định.',
    note: 'Acc riêng / Acc chung',
    price: '50k',
    priceNumeric: 50000,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    icon: '📹',
    options: [
      { label: 'Acc chung 1T', price: '50k', priceNumeric: 50000 },
      { label: 'Acc riêng 1T', price: 'Hết hàng', priceNumeric: 0 }
    ],
    faqs: [
      { question: "Veo 3 Ultra có giới hạn lượt tạo không?", answer: "Tùy thuộc vào chính sách của hãng tại thời điểm đó, thông thường sẽ có giới hạn theo ngày hoặc theo tháng tùy gói." }
    ]
  },
  {
    id: 'veo-3-pro',
    name: 'Veo 3 Pro (Chính chủ)',
    category: Category.AIVideo,
    description: 'Gói Pro nâng cấp chính chủ cực kỳ ổn định, không lo fix.',
    note: 'Chính chủ',
    price: '50k – 450k',
    priceNumeric: 50000,
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
    icon: '💎',
    options: [
      { label: '1 Tháng', price: '50k', priceNumeric: 50000 },
      { label: '6 Tháng', price: '250k', priceNumeric: 250000 },
      { label: '12 Tháng', price: '450k', priceNumeric: 450000 }
    ],
    warrantyInfo: "Bảo hành chính chủ suốt thời gian đăng ký."
  },
  {
    id: 'runway-ml',
    name: 'Runway ML (Chính chủ)',
    category: Category.AIVideo,
    description: 'Công cụ sáng tạo video AI hàng đầu thế giới dành cho chuyên gia.',
    note: 'Chính chủ',
    price: '300k – 650k',
    priceNumeric: 300000,
    image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=600&q=80',
    icon: '🚀',
    options: [
      { label: 'Standard 1T', price: '300k', priceNumeric: 300000 },
      { label: 'Pro 1T', price: '650k', priceNumeric: 650000 }
    ],
    faqs: [
      { question: "Standard và Pro khác nhau gì?", answer: "Gói Pro cung cấp nhiều Credit hơn, hỗ trợ render độ phân giải cao hơn và các tính năng AI nâng cao độc quyền." }
    ]
  },
  {
    id: 'kling-ai',
    name: 'Kling AI',
    category: Category.AIVideo,
    description: 'Mô hình tạo video AI thực tế cực phẩm từ Trung Quốc.',
    note: 'Standard',
    price: '149k',
    priceNumeric: 149000,
    image: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&w=600&q=80',
    icon: '⚡',
    options: [{ label: 'Standard 1T', price: '149k', priceNumeric: 149000 }]
  },

  // AI CHAT & LÀM VIỆC
  {
    id: 'chatgpt-5-ready-chung',
    name: 'ChatGPT 5 (Cấp sẵn - Chung)',
    category: Category.AIChat,
    description: 'Tài khoản ChatGPT Plus dùng chung ổn định, tiết kiệm tối đa.',
    note: 'Cấp sẵn (chung)',
    price: '30k – 450k',
    priceNumeric: 30000,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
    icon: '🤖',
    status: 'Bán chạy',
    isHot: true,
    options: [
      { label: '15 Ngày', price: '30k', priceNumeric: 30000 },
      { label: '1 Tháng', price: '50k', priceNumeric: 50000 },
      { label: '6 Tháng', price: '250k', priceNumeric: 250000 },
      { label: '12 Tháng', price: '450k', priceNumeric: 450000 }
    ],
    faqs: [
      { question: "Tài khoản dùng chung có bị giới hạn tin nhắn?", answer: "Có, vì dùng chung nên giới hạn tin nhắn của gói Plus sẽ được chia sẻ cho các user trong team. Tuy nhiên shop luôn quản lý số lượng user để đảm bảo ổn định." },
      { question: "Tôi có được lưu lịch sử chat riêng?", answer: "Mọi người dùng chung tài khoản sẽ thấy lịch sử chat của nhau. Bạn nên xóa chat sau khi sử dụng nếu cần riêng tư." }
    ],
    warrantyInfo: "Bảo hành 1 đổi 1 trong suốt thời gian sử dụng."
  },
  {
    id: 'chatgpt-5-owner',
    name: 'ChatGPT 5 (Chính chủ)',
    category: Category.AIChat,
    description: 'Nâng cấp ChatGPT Plus trực tiếp trên email cá nhân của bạn.',
    note: 'Chính chủ',
    price: '250k – 899k',
    priceNumeric: 250000,
    image: 'https://images.unsplash.com/photo-1678382155781-30062e74e645?auto=format&fit=crop&w=600&q=80',
    icon: '✨',
    options: [
      { label: '1 Tháng', price: '250k', priceNumeric: 250000 },
      { label: '12 Tháng', price: '899k', priceNumeric: 899000 }
    ],
    faqs: [
      { question: "Link nâng cấp là gì?", answer: "Shop sẽ gửi một link thanh toán/gift từ OpenAI để bạn click và nâng cấp trực tiếp tài khoản cá nhân lên Plus." },
      { question: "Tài khoản có hỗ trợ DALL-E 3?", answer: "Có, gói Plus bao gồm đầy đủ tính năng GPT-4o, DALL-E 3, Browsing, và Data Analysis." }
    ],
    warrantyInfo: "Bảo hành chính chủ 100% thời hạn sử dụng."
  },

  // DESIGN & ĐỒ HỌA
  {
    id: 'canva-pro',
    name: 'Canva (Chính chủ)',
    category: Category.Design,
    description: 'Thiết kế đồ họa kéo thả với hàng triệu mẫu Pro bản quyền.',
    note: 'Chính chủ',
    price: '10k – 139k',
    priceNumeric: 10000,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    icon: '🎨',
    status: 'Giá tốt',
    isHot: true,
    options: [
      { label: '1 Tháng', price: '10k', priceNumeric: 10000 },
      { label: '1 Năm', price: '59k', priceNumeric: 59000 },
      { label: '2 Năm', price: '100k', priceNumeric: 100000 },
      { label: '3 Năm', price: '139k', priceNumeric: 139000 }
    ],
    faqs: [
      { question: "Thiết kế cũ của tôi có bị mất không?", answer: "Không, khi nâng cấp theo Team, các thiết kế cũ ở tài khoản cá nhân của bạn vẫn giữ nguyên. Bạn chỉ cần chuyển sang Team mới để dùng tính năng Pro." },
      { question: "Tại sao giá lại rẻ như vậy?", answer: "Kace Store cung cấp suất trong gói Canva cho Doanh nghiệp/Giáo dục chính hãng, giúp tối ưu chi phí cho người dùng lẻ." }
    ],
    warrantyInfo: "Bảo hành trọn thời gian mua. Lỗi out team sẽ được add lại ngay."
  },

  // GIẢI TRÍ
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    category: Category.Entertainment,
    description: 'Xem video không quảng cáo, nghe nhạc nền.',
    note: 'Chính chủ / Quét TV',
    price: '10k – 30k',
    priceNumeric: 10000,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
    icon: '🔴',
    status: 'Bán chạy',
    isHot: true,
    options: [
      { label: 'Quét TV 1T', price: '10k', priceNumeric: 10000 },
      { label: 'Chính chủ 1T', price: '30k', priceNumeric: 30000 }
    ],
    faqs: [
      { question: "Quét TV là gì?", answer: "Là hình thức đăng nhập nhanh lên Smart TV mà không cần tài khoản mật khẩu, phù hợp cho gia đình dùng chung." },
      { question: "Chính chủ nâng cấp thế nào?", answer: "Shop sẽ gửi lời mời gia nhập Gia đình YouTube vào email của bạn. Bạn chỉ cần chấp nhận là có Premium." }
    ]
  },
  {
    id: 'netflix-slot',
    name: 'Netflix (Slot)',
    category: Category.Entertainment,
    description: 'Thưởng thức phim 4K HDR trên 1 profile riêng tư.',
    note: '1 slot riêng tư',
    price: '65k',
    priceNumeric: 65000,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80',
    icon: '🍿',
    status: 'Bán chạy',
    options: [{ label: '1 Tháng', price: '65k', priceNumeric: 65000 }],
    faqs: [
      { question: "Tôi có được đổi mật khẩu không?", answer: "Không, vì đây là tài khoản dùng chung (chia slot), bạn tuyệt đối không được đổi mật khẩu hay thông tin tài khoản." },
      { question: "Xem được trên mấy thiết bị?", answer: "Gói slot chỉ xem được trên 01 thiết bị tại một thời điểm." }
    ],
    warrantyInfo: "Bảo hành 1 đổi 1 suốt thời gian sử dụng."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'c1',
    name: 'Trấn Thành',
    role: 'Nghệ sĩ / MC',
    text: 'Kace Store là địa chỉ tin cậy của Thành khi cần các công cụ AI hỗ trợ sáng tạo nội dung. Dịch vụ nhanh, bảo mật và cực kỳ ổn định.',
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    isCelebrity: true
  },
  {
    id: 'c2',
    name: 'Sơn Tùng M-TP',
    role: 'Nghệ sĩ / Founder',
    text: 'Sky luôn muốn những gì tốt nhất và Tùng cũng vậy. Kace Store mang đến giải pháp tài khoản Premium tối ưu cho công việc hàng ngày của Tùng.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    isCelebrity: true
  },
  {
    id: 'c3',
    name: 'Mark Zuckerberg',
    role: 'Founder & CEO of Meta',
    text: 'The digital transformation in Southeast Asia is remarkable. Kace Store is a great example of bringing high-end AI tools to everyone efficiently.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    isCelebrity: true
  },
  {
    id: 'us1',
    name: 'James Anderson',
    role: 'USA Client - Tech Lead',
    text: 'Truly a top-notch experience. Getting ChatGPT and Midjourney access was seamless. Best international service I have used.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    id: 'cn1',
    name: 'Li Wei',
    role: 'China Client - Creative Director',
    text: '这里的服务非常专业，账号稳定性很高。对于像 chúng tôi 这样 cần lượng lớn AI 辅助 thiết kế 团队来说，这是最佳选择。',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    id: 'kr1',
    name: 'Kim Min-jun',
    role: 'Korea Client - Digital Artist',
    text: '정말 빠른 처리 속도에 놀랐습니다. 넷플릭스와 유튜브 프리미엄을 여기서 저렴하게 이용하고 있어요. 감사합니다!',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    id: 'jp1',
    name: 'Sato Haruki',
    role: 'Japan Client - Editor',
    text: '素晴らしい！CapCut Pro のアカウントをすぐに受け取れました。信頼できるプラットフォームです。',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    id: 'de1',
    name: 'Hans Schmidt',
    role: 'Germany Client - Researcher',
    text: 'Exzellenter Service! Alles verlief reibungslos. Die Accounts sind stabil und der Support ist top.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    id: 'ru1',
    name: 'Ivan Petrov',
    role: 'Russia Client - Gamer',
    text: 'Отличный магазин! Spotify Premium работает идеально. Очень быстрая поддержка.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    id: 'vn1',
    name: 'Lê Nguyễn Thành Đạt',
    role: 'Fullstack Developer',
    text: 'Mua ChatGPT Plus ở đây rất yên tâm, kích hoạt chính chủ 100%. Bảo hành thì không phải bàn, hỗ trợ Zalo cực nhanh.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    rating: 5
  }
];
