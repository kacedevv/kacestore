
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
      <div className="absolute inset-0 bg-[#050811]/90 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}></div>
      
      <div className="relative w-full max-w-6xl bg-[#0b0f19] rounded-[3.5rem] md:rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] reveal">
        
        {/* Visual Identity */}
        <div className="w-full md:w-[45%] relative bg-[#070b14] p-8 md:p-12 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-purple-600/15"></div>
          
          <div className="relative z-10 w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
             <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">{product.name}</h3>
             </div>
          </div>
          
          <div className="mt-8 w-full grid grid-cols-2 gap-3 relative z-10 hidden md:grid">
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
        <div className="w-full md:w-[55%] p-10 md:p-14 overflow-y-auto no-scrollbar bg-[#0b0f19] border-l border-white/5 flex flex-col">
          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 text-slate-500 hover:text-white bg-white/5 p-4 rounded-3xl border border-white/5 transition-all z-20 active:scale-90"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="flex-grow space-y-10 pb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-blue-500"></span>
                <span className="text-blue-500 font-black text-[9px] uppercase tracking-[0.4em]">Configurator</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">
                {product.name}
              </h2>
              <div className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
                  <p className="text-slate-400 text-base font-medium leading-relaxed italic">
                    "{product.description}"
                  </p>
              </div>
            </div>

            {/* Options */}
            <div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Gói cước / {product.note}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedIdx(i)}
                    className={`flex flex-col p-5 rounded-[1.5rem] border transition-all duration-300 text-left relative overflow-hidden group ${
                      selectedIdx === i 
                      ? 'bg-blue-600 border-blue-500 shadow-xl' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className={`font-black text-[8px] uppercase tracking-widest mb-2 ${selectedIdx === i ? 'text-blue-100' : 'text-slate-500'}`}>Thời hạn</span>
                    <span className={`font-black text-lg tracking-tight ${selectedIdx === i ? 'text-white' : 'text-slate-300'}`}>{opt.label}</span>
                    <span className={`font-black text-xl tracking-tighter ${selectedIdx === i ? 'text-white' : 'text-blue-400'}`}>{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Faster FAQ Animations */}
            {product.faqs && product.faqs.length > 0 && (
              <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">FAQs</h4>
                <div className="space-y-3">
                  {product.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-5 rounded-2xl">
                      <h5 className="text-white font-bold text-sm mb-2">{faq.question}</h5>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-10 border-t border-white/5 space-y-4 mt-auto">
            <div className="flex flex-col md:flex-row gap-3">
                <button 
                  disabled={isOutOfStock}
                  onClick={() => onDirectCheckout(cartItem)}
                  className={`flex-grow h-16 md:h-20 rounded-[2rem] font-black text-base uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 group ${
                      isOutOfStock 
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl'
                  }`}
                >
                  {isOutOfStock ? 'HẾT HÀNG' : 'MUA NGAY'}
                </button>
                <button 
                  disabled={isOutOfStock}
                  onClick={() => { onAddToCart(cartItem); onClose(); }}
                  className={`w-full md:w-20 h-16 md:h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-95 ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
