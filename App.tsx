
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AIChatBot from './components/AIChatBot';
import TrackingModal from './components/TrackingModal';
import SupportSection from './components/SupportSection';
import CheckoutView from './components/CheckoutView';
import WishlistView from './components/WishlistView';
import { Category, CartItem } from './types';

export type SupportTab = 'main' | 'faq' | 'warranty' | 'contact' | 'community';
type View = 'home' | 'category' | 'faq' | 'warranty' | 'contact' | 'community' | 'guide' | 'checkout' | 'wishlist';

const App: React.FC = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('home');
  const [activeSupportTab, setActiveSupportTab] = useState<SupportTab>('main');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Tất cả'>('Tất cả');
  const [toast, setToast] = useState<{message: string, type: 'info' | 'success'} | null>(null);

  useEffect(() => {
    const savedWish = localStorage.getItem('kace_wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));
    const savedCart = localStorage.getItem('kace_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const showToast = (message: string, type: 'info' | 'success' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isAdding = !prev.includes(productId);
      const next = isAdding ? [...prev, productId] : prev.filter(id => id !== productId);
      localStorage.setItem('kace_wishlist', JSON.stringify(next));
      showToast(isAdding ? "Đã thêm vào yêu thích ❤️" : "Đã xóa khỏi yêu thích 💔", 'info');
      return next;
    });
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const next = [...prev, item];
      localStorage.setItem('kace_cart', JSON.stringify(next));
      showToast(`Đã thêm vào giỏ hàng! 🛒`, 'success');
      return next;
    });
  };

  const handleDirectCheckout = (item: CartItem) => {
    setCart(prev => {
      const next = [...prev, item];
      localStorage.setItem('kace_cart', JSON.stringify(next));
      return next;
    });
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: View, data?: any) => {
    if (['faq', 'warranty', 'contact', 'community'].includes(view)) {
      setActiveView('home');
      setActiveSupportTab(view as SupportTab);
      setTimeout(() => {
        const el = document.getElementById('support');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    
    setActiveView(view);
    if (data && typeof data === 'string' && data !== 'Tất cả') {
       setSelectedCategory(data as any);
    } else if (view === 'category' && !data) {
       setSelectedCategory('Tất cả');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-blue-500/30 bg-[#050811]">
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[300] bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {toast.message}
        </div>
      )}

      <Header 
        onOpenTracking={() => setIsTrackingOpen(true)} 
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        onNavigate={handleNavigate}
        onOpenWishlist={() => handleNavigate('wishlist')}
        onOpenCart={() => handleNavigate('checkout')}
      />
      
      <main className="animate-in fade-in duration-1000">
        {activeView === 'home' ? (
          <>
            <Hero />
            <Stats />
            <ProductGrid 
              wishlist={wishlist} 
              onToggleWishlist={toggleWishlist} 
              onAddToCart={addToCart}
              onDirectCheckout={handleDirectCheckout}
              initialCategory="Tất cả"
            />
            <Features />
            <Testimonials />
            <SupportSection initialTab={activeSupportTab} />
          </>
        ) : activeView === 'checkout' ? (
          <CheckoutView cart={cart} onBack={() => handleNavigate('home')} onClear={() => setCart([])} />
        ) : activeView === 'wishlist' ? (
          <WishlistView 
            wishlistIds={wishlist} 
            onToggleWishlist={toggleWishlist} 
            onAddToCart={addToCart}
            onBack={() => handleNavigate('home')}
          />
        ) : (
          <div className="pt-32">
             <ProductGrid 
              wishlist={wishlist} 
              onToggleWishlist={toggleWishlist} 
              onAddToCart={addToCart}
              onDirectCheckout={handleDirectCheckout}
              initialCategory={selectedCategory}
            />
          </div>
        )}
      </main>
      
      <Footer onNavigate={handleNavigate} onShowToast={showToast} />
      <AIChatBot />
      <TrackingModal isOpen={isTrackingOpen} onClose={() => setIsTrackingOpen(false)} />
    </div>
  );
};

export default App;
