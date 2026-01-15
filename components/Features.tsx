
import React from 'react';

const FEATURES = [
  {
    title: 'Bảo mật tối ưu',
    desc: 'Hệ thống thanh toán bảo mật 256-bit, đảm bảo an toàn tuyệt đối thông tin khách hàng.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.355r-1.158-8.66'
  },
  {
    title: 'Giao hàng tức thì',
    desc: 'Tự động kích hoạt tài khoản ngay sau khi thanh toán thành công chỉ từ 5-10 phút.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'Giá cả cạnh tranh',
    desc: 'Tiết kiệm tới 70% so với giá gốc khi mua tại hệ thống Kace Store chính hãng.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Hỗ trợ 24/7',
    desc: 'Đội ngũ kỹ thuật viên chuyên nghiệp luôn sẵn sàng giải đáp mọi thắc mắc của bạn.',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Tại sao chọn <span className="gradient-hero-text">KACE STORE?</span></h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Chúng tôi cam kết mang lại giá trị tốt nhất thông qua sản phẩm chất lượng cao và dịch vụ hậu mãi uy tín hàng đầu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 hover:border-blue-500/20 transition-all hover:bg-white/5 group">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-base font-semibold">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
