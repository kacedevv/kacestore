
import React, { useState, useEffect } from 'react';

type Section = 'main' | 'faq' | 'warranty' | 'contact' | 'community';

interface Props {
  initialTab?: Section;
}

const SupportSection: React.FC<Props> = ({ initialTab = 'main' }) => {
  const [activeTab, setActiveTab] = useState<Section>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const FAQS = [
    { cat: "GIAO DỊCH", q: "Làm sao để nhận tài khoản sau khi mua?", a: "Sau khi thanh toán thành công, hệ thống sẽ tự động gửi thông tin tài khoản qua Email và mục 'Đơn hàng' trên website trong vòng 5-15 phút." },
    { cat: "GIAO DỊCH", q: "Hỗ trợ những hình thức thanh toán nào?", a: "Chúng tôi hỗ trợ Chuyển khoản ngân hàng (VietQR), Ví MoMo, ZaloPay và thẻ cào điện thoại." },
    { cat: "BẢO HÀNH", q: "Chính sách bảo hành như thế nào?", a: "Kace Store cam kết bảo hành 1 đổi 1 trong suốt thời gian bạn sử dụng gói dịch vụ. Nếu có lỗi, chúng tôi sẽ cấp mới hoặc khắc phục ngay lập tức." },
    { cat: "KỸ THUẬT", q: "Tôi có thể gia hạn trên tài khoản cũ không?", a: "Đa số các dịch vụ như ChatGPT, Canva đều hỗ trợ gia hạn chính chủ trên email của bạn. Một số gói khác như Netflix Slot sẽ sử dụng tài khoản do shop cung cấp." },
    { cat: "BẢO MẬT", q: "Tài khoản của tôi có bị hack hay khóa không?", a: "Toàn bộ tài khoản tại Kace Store đều được đăng ký từ nguồn sạch, chính chủ hoặc đại lý ủy quyền. Chúng tôi cam kết bảo mật 100% dữ liệu người dùng." }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'faq':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <h3 className="text-4xl md:text-7xl font-black text-white mb-10 md:mb-16 tracking-tighter uppercase leading-tight">Câu hỏi <br/><span className="text-blue-500">Thường gặp</span></h3>
            <div className="space-y-4 md:space-y-6">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-[#0b0f19] border border-white/5 p-6 md:p-10 rounded-3xl md:rounded-[3rem] hover:border-blue-500/30 transition-all group reveal active">
                  <span className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-2 md:mb-4">{faq.cat}</span>
                  <h4 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-blue-400 transition-colors">{faq.q}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed text-sm md:text-base">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'warranty':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <h3 className="text-4xl md:text-7xl font-black text-white mb-10 md:mb-16 tracking-tighter uppercase leading-tight">Chính sách <br/><span className="text-green-500">Bảo hành</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="bg-[#0b0f19] p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 hover:border-green-500/30 transition-all shadow-2xl">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-6 md:mb-10 shadow-inner">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04" /></svg>
                </div>
                <h4 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 uppercase tracking-tight">Cam kết 1 đổi 1</h4>
                <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">Chúng tôi cam kết bảo hành suốt thời gian sử dụng gói cước. Bất kỳ lỗi phát sinh nào từ phía nhà cung cấp sẽ được Kace Store thay thế hoặc cấp tài khoản mới miễn phí ngay lập tức.</p>
              </div>
              <div className="bg-[#0b0f19] p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 hover:border-blue-500/30 transition-all shadow-2xl">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 md:mb-10 shadow-inner">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 uppercase tracking-tight">Xử lý siêu tốc</h4>
                <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">Mọi yêu cầu hỗ trợ bảo hành được bộ phận kỹ thuật tiếp nhận và giải quyết trong vòng 30 phút. Thời gian làm việc linh hoạt 24/7 kể cả ngày lễ và cuối tuần.</p>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <h3 className="text-4xl md:text-7xl font-black text-white mb-10 md:mb-16 tracking-tighter uppercase leading-tight">Liên hệ <br/><span className="text-blue-500">Hỗ trợ</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <a href="https://zalo.me/0916882278" target="_blank" className="bg-[#0068ff]/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-[#0068ff]/10 flex flex-col items-center text-center hover:bg-[#0068ff]/10 hover:border-[#0068ff]/30 transition-all group shadow-2xl">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#0068ff] rounded-3xl md:rounded-[2.5rem] flex items-center justify-center text-white mb-6 md:mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                  <span className="font-black text-xl md:text-2xl">Zalo</span>
                </div>
                <h4 className="text-xl md:text-2xl font-black text-white mb-2 uppercase">Zalo Support</h4>
                <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">Phản hồi trong 5 phút</p>
              </a>
              <a href="https://zalo.me/g/ywfbuq251" target="_blank" className="bg-emerald-500/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-emerald-500/10 flex flex-col items-center text-center hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group shadow-2xl">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-500 rounded-3xl md:rounded-[2.5rem] flex items-center justify-center text-white mb-6 md:mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                   <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                </div>
                <h4 className="text-xl md:text-2xl font-black text-white mb-2 uppercase">Zalo Group</h4>
                <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">Cộng đồng VIP</p>
              </a>
              <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 flex flex-col items-center text-center group shadow-2xl">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-3xl md:rounded-[2.5rem] flex items-center justify-center text-white mb-6 md:mb-8 shadow-2xl group-hover:bg-blue-600 transition-colors">
                   <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h4 className="text-xl md:text-2xl font-black text-white mb-2 uppercase">Email</h4>
                <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-widest leading-none">support@kacestore.com</p>
              </div>
            </div>
          </div>
        );
      case 'community':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <h3 className="text-4xl md:text-7xl font-black text-white mb-8 md:mb-10 tracking-tighter uppercase leading-tight">Cộng đồng <br/><span className="text-purple-500">Kace Store</span></h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div className="relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] h-[350px] md:h-[450px] shadow-2xl reveal active">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40" alt="" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 md:p-16 text-center bg-blue-900/40 backdrop-blur-sm">
                  <h4 className="text-3xl md:text-5xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter">Zalo VIP Group</h4>
                  <p className="text-white/80 font-bold mb-8 md:mb-10 text-sm md:text-lg uppercase tracking-widest">Chia sẻ & Hỗ trợ sử dụng AI</p>
                  <a href="https://zalo.me/g/ywfbuq251" target="_blank" className="bg-white text-black px-12 md:px-16 py-4 md:py-6 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-500 hover:text-white transition-all active:scale-95">Tham gia nhóm ngay</a>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] h-[350px] md:h-[450px] shadow-2xl reveal active">
                <img src="https://images.unsplash.com/photo-1515187081135-1814502057dc?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40" alt="" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 md:p-16 text-center bg-sky-900/40 backdrop-blur-sm">
                  <h4 className="text-3xl md:text-5xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter">Telegram Channel</h4>
                  <p className="text-white/80 font-bold mb-8 md:mb-10 text-sm md:text-lg uppercase tracking-widest">Cập nhật Stock & Promo</p>
                  <a href="https://t.me/kacestore" target="_blank" className="bg-sky-500 text-white px-12 md:px-16 py-4 md:py-6 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-2xl hover:bg-white hover:text-black transition-all active:scale-95 text-center">Theo dõi kênh</a>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 reveal">
            <div>
              <h2 className="text-[10px] font-black text-blue-500 tracking-[0.5em] mb-6 uppercase">Customer Support</h2>
              <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 md:mb-10 leading-tight">Giải đáp mọi <span className="gradient-hero-text">Thắc mắc</span></h3>
              <div className="space-y-4 md:space-y-6">
                {FAQS.slice(0, 3).map((faq, i) => (
                  <div key={i} onClick={() => setActiveTab('faq')} className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer shadow-xl">
                    <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                      {faq.q}
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
                    </h4>
                    <p className="text-slate-400 font-medium leading-relaxed text-sm md:text-base">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-[#0b0f19] border border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 relative overflow-hidden group shadow-2xl">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full group-hover:bg-blue-600/20 transition-all"></div>
                <h4 className="text-3xl md:text-4xl font-black text-white mb-6 md:mb-8 relative z-10 uppercase tracking-tighter">Cần hỗ trợ trực tiếp?</h4>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 relative z-10">
                  <a href="https://zalo.me/0916882278" target="_blank" className="bg-blue-600 text-white px-10 md:px-12 py-4 md:py-6 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl text-center">Chat qua Zalo</a>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="support" className="py-24 md:py-48 bg-[#050811] relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        {activeTab !== 'main' && (
          <button 
            onClick={() => setActiveTab('main')} 
            className="mb-10 md:mb-16 flex items-center gap-4 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-blue-500/50">
               <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
            </div>
            Quay lại
          </button>
        )}
        {renderContent()}
      </div>
    </section>
  );
};

export default SupportSection;
