
import React, { useState } from 'react';
import { Product, CartItem } from '../types';

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onDirectCheckout: (item: CartItem) => void;
}

const ProductDetailModal: React.FC<Props> = ({ product, onClose, onAddToCart, onDirectCheckout }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!product) return null;

  const currentOption = product.options[selectedIdx];
  const isOutOfStock = product.status === 'Hết hàng' || currentOption.price === 'Hết hàng';

  const cartItem: CartItem = {
    cartId: Date.now().toString(),
    productId: product.id,
    productName: product.name,
    image: product.image,
    optionLabel: currentOption.label,
    accountType: product.note || 'Premium',
    price: currentOption.priceNumeric
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050811]/95 backdrop-blur-2xl animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-6xl bg-[#0b0f19] rounded-[3.5rem] md:rounded-[5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-500 max-h-[95vh] reveal">
        
        {/* Visual Identity - High End Display */}
        <div className="w-full md:w-[45%] relative bg-[#070b14] p-8 md:p-16 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>
          
          {/* Main Product Image Container */}
          <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10 group">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
             <div className="absolute bottom-8 left-8 right-8">
                <div className="flex gap-2 mb-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-xl">Verified Product</span>
                  <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">Premium Quality</span>
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{product.name}</h3>
             </div>
          </div>
          
          {/* Support Badges */}
          <div className="mt-12 w-full grid grid-cols-2 gap-4 relative z-10 hidden md:grid">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04" /></svg>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">Bảo hành<br/>1 Đổi 1</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">Kích hoạt<br/>Tức thì</span>
            </div>
          </div>
        </div>

        {/* Configuration Area */}
        <div className="w-full md:w-[55%] p-10 md:p-16 overflow-y-auto no-scrollbar bg-[#0b0f19] border-l border-white/5 flex flex-col">
          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 text-slate-500 hover:text-white bg-white/5 p-4 rounded-3xl border border-white/5 transition-all z-20 active:scale-90"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="flex-grow space-y-12 pb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-blue-500"></span>
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em]">Product Configurator</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-8">
                {product.name}
              </h2>
              <div className="bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-50"></div>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed italic relative z-10">
                    "{product.description}"
                  </p>
              </div>
            </div>

            {/* Options Selection */}
            <div>
              <div className="flex items-center justify-between mb-8">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lựa chọn gói cước</h4>
                  <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{product.note}</span>
                  </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedIdx(i)}
                    className={`flex flex-col p-6 rounded-[2rem] border transition-all duration-500 text-left relative overflow-hidden group ${
                      selectedIdx === i 
                      ? 'bg-blue-600 border-blue-500 shadow-[0_20px_40px_rgba(37,99,235,0.25)]' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {selectedIdx === i && (
                      <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/20 rounded-full blur-xl"></div>
                    )}
                    <span className={`font-black text-[9px] uppercase tracking-widest mb-3 ${selectedIdx === i ? 'text-blue-100' : 'text-slate-500'}`}>Thời hạn sử dụng</span>
                    <span className={`font-black text-xl tracking-tight mb-1 ${selectedIdx === i ? 'text-white' : 'text-slate-300'}`}>{opt.label}</span>
                    <span className={`font-black text-2xl tracking-tighter ${selectedIdx === i ? 'text-white' : 'text-blue-400'}`}>{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT SPECIFIC FAQ SECTION */}
            {product.faqs && product.faqs.length > 0 && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Giải đáp nhanh</h4>
                  <div className="flex-grow h-px bg-white/5"></div>
                </div>
                <div className="space-y-4">
                  {product.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-3xl hover:bg-white/[0.07] transition-all">
                      <h5 className="text-white font-bold text-sm mb-2">{faq.question}</h5>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WARRANTY INFO SECTION */}
            {product.warrantyInfo && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                <div className="flex items-center gap-3">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cam kết bảo hành</h4>
                  <div className="flex-grow h-px bg-white/5"></div>
                </div>
                <div className="bg-blue-600/5 border border-blue-600/20 p-6 rounded-3xl flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04" /></svg>
                  </div>
                  <p className="text-slate-300 text-xs font-medium leading-relaxed">
                    {product.warrantyInfo}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-12 border-t border-white/5 space-y-6 mt-auto">
            <div className="flex flex-col md:flex-row gap-4">
                <button 
                  disabled={isOutOfStock}
                  onClick={() => onDirectCheckout(cartItem)}
                  className={`flex-grow h-20 md:h-24 rounded-[2.5rem] font-black text-lg uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 active:scale-95 group ${
                      isOutOfStock 
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_25px_50px_rgba(37,99,235,0.3)]'
                  }`}
                >
                  {isOutOfStock ? 'TẠM HẾT HÀNG' : 'THANH TOÁN NGAY'}
                  {!isOutOfStock && <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>}
                </button>
                <button 
                  disabled={isOutOfStock}
                  onClick={() => { onAddToCart(cartItem); onClose(); }}
                  className={`w-full md:w-24 h-20 md:h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-95 ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Thêm vào giỏ hàng"
                >
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </button>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Hỗ trợ kỹ thuật: Zalo 0916.88.22.78 (24/7)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
