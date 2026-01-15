
import React, { useState, useEffect } from 'react';
import { Category } from '../types';

interface HeaderProps {
  onOpenTracking: () => void;
  wishlistCount: number;
  cartCount: number;
  onNavigate: (view: any, category?: Category | 'Tất cả') => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenTracking, wishlistCount, cartCount, onNavigate, onOpenWishlist, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen
      ? 'bg-[#0b0f19]/95 backdrop-blur-xl border-b border-white/5 py-3' 
      : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-all duration-500 shadow-lg overflow-hidden p-1.5">
            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors leading-none uppercase">KACE STORE</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8 font-bold text-[10px] uppercase tracking-[0.2em] text-slate-300">
          <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors relative group uppercase">Trang chủ</button>
          <button onClick={() => onNavigate('category', 'Tất cả')} className="hover:text-white transition-colors relative group uppercase">Sản phẩm</button>
          <button onClick={() => onNavigate('category', Category.AIChat)} className="hover:text-white transition-colors relative group uppercase">AI Tools</button>
          <button onClick={onOpenTracking} className="hover:text-white transition-colors relative group uppercase">Đơn hàng</button>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Wishlist Button */}
          <button 
            onClick={onOpenWishlist}
            className="relative p-2.5 text-slate-300 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5 hover:border-red-500/30 group"
          >
             <svg className={`w-5 h-5 ${wishlistCount > 0 ? 'text-red-500 fill-red-500/20' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
             {wishlistCount > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full font-black shadow-lg">{wishlistCount}</span>
             )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="relative p-2.5 text-slate-300 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 group"
          >
             <svg className={`w-5 h-5 ${cartCount > 0 ? 'text-blue-500 fill-blue-500/20' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
             {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[8px] flex items-center justify-center rounded-full font-black shadow-lg">{cartCount}</span>
             )}
          </button>
          
          <button 
            onClick={() => onNavigate('category', 'Tất cả')}
            className="hidden sm:block bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-xl active:scale-95"
          >
            Mua ngay
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10"
          >
            {isMobileMenuOpen 
              ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            }
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0b0f19] border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('home'); }} className="block w-full text-left text-sm font-black text-white uppercase tracking-widest">Trang chủ</button>
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('category', 'Tất cả'); }} className="block w-full text-left text-sm font-black text-white uppercase tracking-widest">Sản phẩm</button>
          <button onClick={() => { setIsMobileMenuOpen(false); onOpenCart(); }} className="block w-full text-left text-sm font-black text-white uppercase tracking-widest">Giỏ hàng ({cartCount})</button>
          <button onClick={() => { setIsMobileMenuOpen(false); onOpenWishlist(); }} className="block w-full text-left text-sm font-black text-white uppercase tracking-widest">Yêu thích ({wishlistCount})</button>
          <button onClick={() => { setIsMobileMenuOpen(false); onOpenTracking(); }} className="block w-full text-left text-sm font-black text-white uppercase tracking-widest">Đơn hàng</button>
        </div>
      )}
    </header>
  );
};

export default Header;
