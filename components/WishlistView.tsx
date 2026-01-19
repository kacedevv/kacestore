
import React from 'react';
import { PRODUCTS } from '../constants';
import { Product, CartItem } from '../types';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';

interface Props {
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (item: CartItem) => void;
  onBack: () => void;
}

const WishlistView: React.FC<Props> = ({ wishlistIds, onToggleWishlist, onAddToCart, onBack }) => {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const favoriteProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="pt-40 pb-32 container mx-auto px-6">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-[10px] font-black text-red-500 tracking-[0.5em] mb-4 uppercase">Your Collection</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Sản phẩm <span className="text-red-500">Yêu thích</span></h3>
        </div>
        <button onClick={onBack} className="text-slate-500 font-bold hover:text-white transition-all uppercase text-[10px] tracking-widest flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg> Quay lại
        </button>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favoriteProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              onShowDetails={setSelectedProduct}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center glass rounded-[4rem] border-dashed border-white/5">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
             <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </div>
          <h4 className="text-2xl font-bold text-slate-400 mb-6">Bạn chưa có sản phẩm yêu thích nào</h4>
          <button onClick={onBack} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl">Tiếp tục khám phá</button>
        </div>
      )}

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={onAddToCart}
        onDirectCheckout={(item) => {
          onAddToCart(item);
          onBack(); // Simple way to redirect in this context
        }}
      />
    </div>
  );
};

export default WishlistView;
