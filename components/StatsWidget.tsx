import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, ShoppingBag, Star } from 'lucide-react';

const data = [
  { name: 'T2', orders: 40 },
  { name: 'T3', orders: 30 },
  { name: 'T4', orders: 20 },
  { name: 'T5', orders: 27 },
  { name: 'T6', orders: 18 },
  { name: 'T7', orders: 23 },
  { name: 'CN', orders: 34 },
];

export const StatsWidget: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {/* Simple Stats Cards */}
        <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 shadow-lg shadow-indigo-500/5">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Users className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-400 text-sm font-medium">Khách hàng</p>
                <p className="text-2xl font-bold text-white tracking-tight">12.5k+</p>
            </div>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 shadow-lg shadow-indigo-500/5">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-400 text-sm font-medium">Đã bán</p>
                <p className="text-2xl font-bold text-white tracking-tight">45.2k+</p>
            </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 shadow-lg shadow-indigo-500/5">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Star className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-400 text-sm font-medium">Đánh giá</p>
                <p className="text-2xl font-bold text-white tracking-tight">4.9/5</p>
            </div>
        </div>

        {/* Chart */}
        <div className="bg-slate-800/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/50 md:col-span-1 h-32 md:h-auto flex flex-col justify-center shadow-lg shadow-indigo-500/5">
             <p className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider">Lượt mua tuần qua</p>
             <div className="h-20 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" hide />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{fill: 'transparent'}}
                        />
                        <Bar dataKey="orders" radius={[4, 4, 0, 0]} fill="url(#colorUv)">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fillOpacity={1} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
             </div>
        </div>
    </div>
  );
};