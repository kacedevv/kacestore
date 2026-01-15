
import React, { useState } from 'react';
import { Product } from '../types';

interface Props {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onShowDetails: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, isWishlisted, onToggleWishlist, onShowDetails }) => {
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareData = {
      title: `Kace Store - ${product.name}`,
      text: `${product.description} - Giá chỉ từ ${product.price}`,
      url: `${window.location.origin}${window.location.pathname}?product=${product.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 2000);
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.url}`);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 2000);
      } catch (clipErr) {
        console.error("Could not copy or share", clipErr);
      }
    }
  };

  const isOutOfStock = product.status === 'Hết hàng' || product.price === 'Hết hàng' || product.options.every(o => o.price === 'Hết hàng');

  return (
    <div 
      onClick={() => onShowDetails(product)}
      className="bg-[#111827]/60 backdrop-blur-3xl group rounded-[2rem] md:rounded-[2.5rem] border border-white/5 hover:border-blue-500/40 transition-all duration-500 flex flex-col h-full shadow-xl relative overflow-hidden reveal cursor-pointer hover:-translate-y-2 md:hover:-translate-y-4 hover:scale-[1.01] md:hover:scale-[1.03] hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.35)]"
    >
      
      {/* Toast Share */}
      {showShareSuccess && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl animate-in fade-in slide-in-from-top-4">
          Đã Copy Link!
        </div>
      )}

      {/* Featured Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60"></div>
        
        {/* Floating Icon - Smaller as requested */}
        <div className="absolute top-4 md:top-5 left-4 md:left-5 w-8 h-8 md:w-10 md:h-10 bg-white/5 backdrop-blur-md rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl border border-white/10 group-hover:scale-110 transition-transform shadow-xl">
           {product.icon || '💎'}
        </div>

        {/* Wishlist Action Overlay */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <button 
                onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                className={`w-10 h-10 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all duration-300 shadow-lg active:scale-90 ${
                    isWishlisted ? 'bg-red-500 border-red-500 text-white' : 'bg-black/40 border-white/10 text-white hover:bg-red-500'
                }`}
                title="Yêu thích"
            >
                <svg className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </button>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Dynamic Badges */}
        <div className="flex gap-2 mb-4">
            {isOutOfStock ? (
                <span className="bg-red-500/20 text-red-500 border border-red-500/30 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    Hết hàng
                </span>
            ) : (
                <>
                    {product.status && (
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                            product.status === 'Bán chạy' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' :
                            product.status === 'Giá tốt' ? 'bg-green-500/20 text-green-500 border border-green-500/30' :
                            'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              product.status === 'Bán chạy' ? 'bg-orange-500' :
                              product.status === 'Giá tốt' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`}></span>
                            {product.status}
                        </span>
                    )}
                    {product.isHot && (
                        <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                            HOT 🔥
                        </span>
                    )}
                </>
            )}
        </div>

        <div className="flex-grow space-y-3 md:space-y-4 mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tighter group-hover:text-blue-400 transition-colors uppercase">
            {product.name}
            </h3>
            
            <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5">
                <div className="flex flex-wrap gap-x-2 md:gap-x-3 gap-y-2 text-[8px] md:text-[10px] font-bold text-slate-400">
                    {product.options.map((opt, i) => (
                        <span key={i} className="whitespace-nowrap flex items-center">
                            {opt.label} / <span className="text-blue-400 ml-1">{opt.price}</span>
                            {i < product.options.length - 1 && <span className="ml-2 md:ml-3 text-slate-800">|</span>}
                        </span>
                    ))}
                </div>
            </div>

            <p className="text-slate-500 text-[10px] md:text-xs font-medium leading-relaxed">
            {product.description.length > 85 ? product.description.substring(0, 85) + '...' : product.description}
            </p>
        </div>

        <div className="pt-4 md:pt-6 border-t border-white/5 mt-auto">
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex flex-col">
                    <span className="text-[8px] md:text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Giá chỉ từ</span>
                    <span className="text-xl md:text-2xl font-black text-white tracking-tighter">{isOutOfStock ? "Tạm hết" : product.price.split('–')[0]}</span>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1.5 md:gap-2 justify-end mb-1">
                        <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-blue-500 rounded-full"></span>
                        <span className="text-[8px] md:text-[9px] font-black text-slate-500 uppercase tracking-widest">Bảo hành 1:1</span>
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black text-blue-400 uppercase tracking-widest">{product.note || "Tài khoản Premium"}</span>
                </div>
            </div>

            <div className="flex gap-2 md:gap-3">
                <button 
                disabled={isOutOfStock}
                onClick={(e) => { e.stopPropagation(); onShowDetails(product); }}
                className={`flex-grow h-12 md:h-16 rounded-xl md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 md:gap-3 active:scale-95 ${
                    isOutOfStock 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl'
                }`}
                >
                {isOutOfStock ? "HẾT HÀNG" : "MUA NGAY"}
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={handleShare}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all active:scale-95"
                    title="Chia sẻ sản phẩm"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                  </button>
                  <a 
                    href="https://zalo.me/0916882278" 
                    target="_blank" 
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-95"
                    title="Liên hệ Zalo"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" /></svg>
                  </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
