
import React from 'react';

const Stats: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-24 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Stat 1 */}
        <div className="bg-white/[0.03] backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500/30 transition-all duration-500 group flex items-center gap-8 shadow-xl">
          <div className="w-20 h-20 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500 font-black uppercase tracking-[0.25em] mb-2">Clients</p>
            <h3 className="text-4xl font-black text-white tracking-tighter">12.5k+</h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white/[0.03] backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500/30 transition-all duration-500 group flex items-center gap-8 shadow-xl">
          <div className="w-20 h-20 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500 font-black uppercase tracking-[0.25em] mb-2">Orders</p>
            <h3 className="text-4xl font-black text-white tracking-tighter">45.2k+</h3>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white/[0.03] backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500/30 transition-all duration-500 group flex items-center gap-8 shadow-xl">
          <div className="w-20 h-20 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500 font-black uppercase tracking-[0.25em] mb-2">Rating</p>
            <h3 className="text-4xl font-black text-white tracking-tighter">4.9/5</h3>
          </div>
        </div>

        {/* Stat 4 - Weekly Chart */}
        <div className="bg-white/[0.03] backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500/30 transition-all duration-500 group flex flex-col justify-between shadow-xl">
          <div className="relative z-10 text-left">
            <p className="text-xs text-blue-400 font-black uppercase tracking-[0.2em] mb-6">Sales Activity</p>
            <div className="flex items-end gap-3 h-16">
               <div className="w-3 h-[40%] bg-blue-500/20 rounded-full group-hover:h-[60%] transition-all duration-700"></div>
               <div className="w-3 h-[70%] bg-blue-500/30 rounded-full group-hover:h-[85%] transition-all duration-700 delay-75"></div>
               <div className="w-3 h-[30%] bg-blue-500/20 rounded-full group-hover:h-[50%] transition-all duration-700 delay-150"></div>
               <div className="w-3 h-[85%] bg-blue-500/50 rounded-full group-hover:h-[95%] transition-all duration-700 delay-225 shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
               <div className="w-3 h-[25%] bg-blue-500/20 rounded-full group-hover:h-[40%] transition-all duration-700 delay-300"></div>
               <div className="w-3 h-[60%] bg-blue-500/30 rounded-full group-hover:h-[70%] transition-all duration-700 delay-375"></div>
               <div className="w-3 h-[90%] bg-blue-600 rounded-full shadow-[0_0_25px_rgba(37,99,235,0.5)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
