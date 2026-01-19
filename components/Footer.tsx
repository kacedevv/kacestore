import React, { useState } from 'react';
import { Category } from '../types';

interface FooterProps {
  onNavigate: (view: any, data?: any) => void;
  onShowToast?: (message: string, type?: 'info' | 'success') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const logoUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png";

  const handleSupportLink = (target: string) => {
    onNavigate(target); 
  };

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes('@')) {
      if (onShowToast) onShowToast("Vui lòng nhập email hợp lệ! 📧", "info");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      if (onShowToast) onShowToast("Đăng ký nhận ưu đãi thành công! 🎉", "success");
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="pt-24 md:pt-48 pb-20 border-t border-white/5 bg-[#0b0f19]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-24 md:mb-32">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 mb-8 group cursor-pointer text-left">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-blue-500 transition-all shadow-xl overflow-hidden p-2">
                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors uppercase">KACE STORE</span>
            </button>
            <p className="text-slate-500 leading-relaxed text-sm md:text-base font-bold">
              Nền tảng cung cấp tài khoản số Premium & giải pháp AI hàng đầu Việt Nam. Chất lượng tối thượng, đồng hành bền vững cùng bạn.
            </p>
          </div>

          {/* Product Col */}
          <div className="col-span-1">
            <h4 className="font-black mb-8 text-white text-[10px] uppercase tracking-[0.4em] opacity-30">Hệ sinh thái</h4>
            <ul className="space-y-4 text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest">
              <li><button onClick={() => onNavigate('category', Category.AIChat)} className="hover:text-blue-400 transition-all text-left">Tài khoản AI</button></li>
              <li><button onClick={() => onNavigate('category', Category.Entertainment)} className="hover:text-blue-400 transition-all text-left">Giải trí 4K</button></li>
              <li><button onClick={() => onNavigate('category', Category.Design)} className="hover:text-blue-400 transition-all text-left">Công cụ Design</button></li>
              <li><button onClick={() => onNavigate('category', Category.Office)} className="hover:text-blue-400 transition-all text-left">Work & Productivity</button></li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="col-span-1">
            <h4 className="font-black mb-8 text-white text-[10px] uppercase tracking-[0.4em] opacity-30">Chăm sóc</h4>
            <ul className="space-y-4 text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest">
              <li><button onClick={() => handleSupportLink('faq')} className="hover:text-blue-400 transition-all text-left">FAQs</button></li>
              <li><button onClick={() => handleSupportLink('warranty')} className="hover:text-blue-400 transition-all text-left">Bảo hành</button></li>
              <li><button onClick={() => handleSupportLink('contact')} className="hover:text-blue-400 transition-all text-left">Contact</button></li>
              <li><button onClick={() => handleSupportLink('community')} className="hover:text-blue-400 transition-all text-left">Community</button></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-black mb-8 text-white text-[10px] uppercase tracking-[0.4em] opacity-30">Exclusive Deals</h4>
            <p className="text-xs text-slate-500 mb-6 font-bold">Đăng ký để không bỏ lỡ đợt Sale-off tài khoản Premium lớn nhất.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                placeholder="Email..." 
                className="bg-[#1a2333] border border-white/5 rounded-xl px-4 py-3 text-xs w-full focus:outline-none focus:border-blue-500 text-white placeholder:text-slate-700 font-bold"
                disabled={isSubmitting}
              />
              <button 
                onClick={handleSubscribe}
                disabled={isSubmitting}
                className="bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Gửi"}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] text-center md:text-left">
          <div className="space-y-2">
             <p>© 2024 Kace Store Digital Marketplace. All Rights Reserved.</p>
             <p className="opacity-40">Crafted with precision for high-end digital experiences.</p>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="https://zalo.me/0916882278" target="_blank" className="group transition-all duration-500 transform hover:scale-125">
              <span className="text-slate-600 group-hover:text-emerald-400 transition-all text-[12px]">Zalo</span>
            </a>
            <a href="https://t.me/kacestore" target="_blank" className="group transition-all duration-500 transform hover:scale-125">
               <span className="text-slate-600 group-hover:text-sky-400 transition-all text-[12px]">Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;