
import React, { useState, useRef, useEffect } from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const celebs = TESTIMONIALS.filter(t => t.isCelebrity);
  const others = TESTIMONIALS.filter(t => !t.isCelebrity);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (others.length <= visibleCount) return;
    setCurrentIndex(prev => {
      const next = prev + 1;
      return next >= others.length - (visibleCount - 1) ? 0 : next;
    });
  };

  const prevSlide = () => {
    if (others.length <= visibleCount) return;
    setCurrentIndex(prev => {
      const next = prev - 1;
      return next < 0 ? others.length - visibleCount : next;
    });
  };

  // Safe dots count to prevent RangeError
  const dotsLimit = 10; // Limit dots to 10 for better UI
  const possibleStarts = Math.max(0, others.length - (visibleCount - 1));
  const dotsCount = Math.min(dotsLimit, possibleStarts);

  return (
    <section id="testimonials" className="py-32 md:py-48 relative overflow-hidden bg-[#010409]/30">
      <div className="container mx-auto px-6">
        
        {/* Celebrity Section (VIP) */}
        <div className="mb-48">
          <div className="text-center mb-24 reveal">
            <h2 className="text-[10px] font-black text-blue-500 tracking-[0.5em] mb-6 uppercase">VIP Endorsements</h2>
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-none uppercase">
              Sự tin tưởng từ <br/> <span className="gradient-hero-text">Người nổi tiếng</span>
            </h3>
            <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-3xl mx-auto">Hợp tác cùng những nghệ sĩ hàng đầu Việt Nam để mang đến những giá trị tinh thần và trải nghiệm công nghệ cao cấp nhất.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {celebs.map((c) => (
              <div key={c.id} className="relative group reveal">
                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="glass p-10 md:p-12 rounded-[4rem] border-white/10 hover:border-blue-500/40 transition-all duration-700 flex flex-col items-center text-center relative z-10 h-full">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-[3.5rem] overflow-hidden mb-10 border-4 border-blue-600/30 p-2 bg-white/5 shadow-2xl transition-transform group-hover:scale-105 duration-500">
                        <img src={c.avatar} alt={c.name} className="w-full h-full object-cover rounded-[2.8rem] grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors uppercase">{c.name}</h4>
                    <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.3em] mb-10">{c.role}</p>
                    <div className="relative">
                        <svg className="absolute -top-6 -left-8 w-12 h-12 text-blue-500/20" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8v8H6v2a2 2 0 002 2h2v4H8a6 6 0 01-6-6v-8a2 2 0 012-2h6zm14 0v8h-4v2a2 2 0 002 2h2v4h-2a6 6 0 01-6-6v-8a2 2 0 012-2h6z"/></svg>
                        <p className="text-slate-300 italic text-lg md:text-xl leading-relaxed font-medium relative z-10">"{c.text}"</p>
                    </div>
                    
                    <div className="mt-auto pt-10">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Community (Slider) */}
        <div>
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
             <div className="max-w-2xl reveal">
                <h2 className="text-[10px] font-black text-blue-500 tracking-[0.5em] mb-4 uppercase">Global Impact</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Cộng đồng <span className="text-blue-500">Kace Store</span> toàn cầu</h3>
                <p className="text-slate-500 font-bold mt-4 uppercase tracking-widest text-xs">Hàng ngàn khách hàng từ Việt Nam đến khắp thế giới đã lựa chọn Kace Premium.</p>
             </div>
             
             {/* Slider Navigation Buttons */}
             {others.length > visibleCount && (
                <div className="flex gap-4">
                  <button 
                      onClick={prevSlide}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-90"
                  >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <button 
                      onClick={nextSlide}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-90"
                  >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
             )}
          </div>
          
          <div className="relative overflow-hidden px-1">
              <div 
                className="flex gap-6 md:gap-8 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
              >
                {others.map((u) => (
                  <div key={u.id} className={`shrink-0 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] reveal active`}>
                    <div className="bg-[#111827]/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/5 hover:bg-white/[0.05] hover:border-blue-500/20 transition-all duration-500 flex flex-col h-full group">
                        <div className="flex gap-1 mb-8">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                        </div>
                        <p className="text-slate-400 mb-10 leading-relaxed font-medium italic min-h-[90px]">"{u.text}"</p>
                        <div className="mt-auto flex items-center gap-5 pt-8 border-t border-white/5">
                        <img src={u.avatar} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform" alt="" />
                        <div>
                            <h5 className="font-bold text-white text-sm md:text-base leading-none mb-1 group-hover:text-blue-400 transition-colors">{u.name}</h5>
                            <p className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-widest">{u.role}</p>
                        </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          {/* Dots Indicator with safety */}
          {dotsCount > 1 && (
            <div className="mt-12 flex justify-center gap-2 md:gap-3">
              {[...Array(dotsCount)].map((_, i) => {
                  const isActive = currentIndex === Math.round(i * (possibleStarts / dotsCount));
                  return (
                    <button 
                        key={i}
                        onClick={() => setCurrentIndex(Math.round(i * (possibleStarts / dotsCount)))}
                        className={`h-1 md:h-1.5 transition-all duration-500 rounded-full ${isActive ? 'w-10 md:w-12 bg-blue-600' : 'w-2 md:w-3 bg-white/10'}`}
                    />
                  );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
