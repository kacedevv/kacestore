
import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import { Category, Product, CartItem } from '../types';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';

interface Props {
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  initialCategory?: Category | 'Tất cả';
  onAddToCart: (item: CartItem) => void;
  onDirectCheckout: (item: CartItem) => void;
}

const categories = ['Tất cả', ...Object.values(Category)];
const INITIAL_DISPLAY_COUNT = 16;

const ProductGrid: React.FC<Props> = ({ wishlist, onToggleWishlist, onAddToCart, onDirectCheckout, initialCategory = 'Tất cả' }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

  useEffect(() => {
    setActiveCategory(initialCategory);
    setDisplayCount(INITIAL_DISPLAY_COUNT);
  }, [initialCategory]);

  const hotProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.isHot && p.status === 'Bán chạy').slice(0, 4);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'Tất cả' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'Tất cả' && !searchQuery) {
      return filteredProducts.slice(0, displayCount);
    }
    return filteredProducts;
  }, [filteredProducts, displayCount, activeCategory, searchQuery]);

  return (
    <section id="products" className="py-16 md:py-32 bg-[#050811] relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Best Sellers Section */}
        {activeCategory === 'Tất cả' && !searchQuery && (
            <div className="mb-24 reveal">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-500/20">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/></svg>
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none">Sản phẩm <span className="text-orange-500">Bán chạy</span></h3>
                            <p className="text-slate-600 font-bold uppercase tracking-widest text-[8px] mt-1">Được săn đón nhiều nhất</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {hotProducts.map(p => (
                        <ProductCard 
                            key={`hot-${p.id}`} 
                            product={p} 
                            isWishlisted={wishlist.includes(p.id)}
                            onToggleWishlist={onToggleWishlist}
                            onShowDetails={setSelectedProduct}
                        />
                    ))}
                </div>
            </div>
        )}

        {/* Search & Filter Compact */}
        <div className="bg-[#111827]/30 backdrop-blur-2xl border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] mb-12 shadow-2xl">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm dịch vụ cao cấp... (vd: ChatGPT, Netflix, Adobe...)"
                value={searchQuery}
                onChange={(e) => {
                   setSearchQuery(e.target.value);
                   setDisplayCount(INITIAL_DISPLAY_COUNT);
                }}
                className="w-full bg-[#050811] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-700 text-sm"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                 <span className="hidden md:block text-[9px] font-black text-slate-700 uppercase tracking-widest">{filteredProducts.length} KẾT QUẢ</span>
                 <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                     setActiveCategory(cat as any);
                     setDisplayCount(INITIAL_DISPLAY_COUNT);
                  }}
                  className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 font-black text-[9px] uppercase tracking-[0.1em] border-2 ${
                    activeCategory === cat 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        {visibleProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {visibleProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onShowDetails={setSelectedProduct}
                />
              ))}
            </div>
            {activeCategory === 'Tất cả' && !searchQuery && displayCount < filteredProducts.length && (
              <div className="mt-16 flex justify-center">
                <button onClick={() => setDisplayCount(prev => prev + 16)} className="group px-12 py-5 bg-white/5 border border-white/10 hover:border-blue-500 rounded-[1.5rem] text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all">
                  Xem thêm sản phẩm
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-24 text-center glass rounded-[3rem] border-dashed border-white/10">
            <h3 className="text-xl font-black text-slate-500 uppercase tracking-widest leading-none">Không tìm thấy sản phẩm...</h3>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('Tất cả'); }} className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-blue-500 font-black hover:text-white transition-all uppercase text-[9px] tracking-widest">Thiết lập lại</button>
          </div>
        )}

        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={onAddToCart}
          onDirectCheckout={(item) => {
            onDirectCheckout(item);
            setSelectedProduct(null);
          }}
        />
      </div>
    </section>
  );
};

export default ProductGrid;
