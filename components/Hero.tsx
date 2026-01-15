
import React from 'react';

const Hero: React.FC = () => {
  const zaloLink = "https://zalo.me/0916882278";

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-40 md:pt-64 pb-20 md:pb-32 overflow-hidden text-center reveal">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-blue-600/5 rounded-full blur-[220px] -z-10 animate-pulse duration-[10s]"></div>
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[160px] -z-10"></div>
      
      <div className="container mx-auto px-6">
        {/* Main Title */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-[10px] md:text-xs font-black text-blue-500 tracking-[0.6em] mb-6 md:mb-10 uppercase opacity-80 animate-in slide-in-from-top-4 duration-700">DIGITAL PREMIUM MARKETPLACE</h2>
          <h1 className="text-4xl md:text-9xl font-black tracking-tighter leading-tight mb-6 md:mb-8 animate-in slide-in-from-bottom duration-1000">
            <span className="text-white block mb-1 md:mb-2 uppercase">KACE STORE</span>
            <span className="gradient-hero-text font-bold">Nâng tầm trải nghiệm số</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-4xl mx-auto text-slate-300 text-base md:text-3xl font-medium leading-relaxed mb-12 md:mb-24 opacity-95 animate-in fade-in duration-1000 delay-300">
          Sở hữu hệ sinh thái tài khoản <span className="text-white font-bold">Premium</span> & công cụ <span className="text-white font-bold">AI</span> chính chủ. 
          Bảo hành 1:1, hỗ trợ tận tâm 24/7.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 mb-24 md:mb-44 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
          <button 
            onClick={scrollToProducts}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl font-black text-sm md:text-lg transition-all duration-500 transform hover:scale-105 shadow-[0_20px_40px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 md:gap-4 group"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"/></svg>
            Sản phẩm Hot
          </button>
          <a 
            href={zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-3xl font-black text-sm md:text-lg transition-all duration-500 flex items-center justify-center gap-3 md:gap-4 group"
          >
            {/* Professional Zalo Icon */}
            <svg className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12.01 3c-4.971 0-9 3.358-9 7.5 0 2.316 1.258 4.385 3.235 5.748l-.735 2.752 2.57-1.428c1.06.416 2.493.67 4.001.67 4.97 0 9-3.358 9-7.5s-4.03-7.5-9-7.5z"/>
            </svg>
            Liên hệ Zalo
          </a>
        </div>

        {/* Showcase Visual - Optimized for zero overflow */}
        <div className="relative max-w-6xl mx-auto px-4 floating">
          <div className="relative aspect-[16/9] md:aspect-[2.8/1] rounded-[2rem] md:rounded-[4rem] overflow-hidden bg-slate-900 border border-white/10 shadow-[0_50px_120px_rgba(0,0,0,0.7)] group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 mix-blend-overlay"></div>
            <img 
              src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=2000&q=100" 
              alt="Digital Abstract Visual" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 md:p-10 text-center">
                <div className="px-4 md:px-6 py-1.5 md:py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-4 md:mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                    <span className="text-[7px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">Premium Quality Verified</span>
                </div>
                <h3 className="text-xl md:text-5xl font-black text-white tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-500 uppercase">Trusted by 10,000+ Users</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
