
import React, { useState } from 'react';

interface OrderItem {
  productName: string;
  optionLabel: string;
  price: number;
}

interface SavedOrder {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'Đang xử lý' | 'Hoàn tất';
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TrackingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SavedOrder | null>(null);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleTrack = () => {
    setLoading(true);
    setError(false);
    setResult(null);

    // Simulate network delay
    setTimeout(() => {
      const savedOrdersRaw = localStorage.getItem('kace_orders');
      if (savedOrdersRaw) {
        const orders: SavedOrder[] = JSON.parse(savedOrdersRaw);
        const found = orders.find(o => o.id.toUpperCase() === orderId.trim().toUpperCase());
        if (found) {
          setResult(found);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
      setLoading(false);
    }, 1200);
  };

  const handleClose = () => {
    setResult(null);
    setError(false);
    setOrderId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
      ></div>
      <div className="relative w-full max-w-lg glass rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 overflow-hidden animate-in zoom-in-95 duration-300">
        <button onClick={handleClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {!result ? (
          <>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter uppercase leading-none">Theo dõi đơn hàng</h2>
            <p className="text-slate-400 mb-10 font-medium">Nhập mã đơn hàng của bạn để kiểm tra trạng thái kích hoạt và thời hạn bảo hành.</p>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-2">Mã đơn hàng (Order ID)</label>
                <input 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                  type="text" 
                  placeholder="Ví dụ: KACE-9999-XXXX"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 font-bold placeholder:text-slate-700 transition-all uppercase"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  Mã đơn hàng không tồn tại hoặc chưa được thanh toán thành công.
                </div>
              )}

              <button 
                onClick={handleTrack}
                disabled={loading || !orderId.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Đang kiểm tra...
                  </div>
                ) : 'Kiểm tra trạng thái'}
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5">
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Bạn có thể tìm thấy mã đơn hàng trong email xác nhận hoặc tin nhắn Zalo/Telegram sau khi thanh toán thành công.</p>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Tìm thấy đơn hàng!</h2>
                <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-1">ID: {result.id}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trạng thái</span>
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      result.status === 'Hoàn tất' ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-blue-500/20 text-blue-500 border border-blue-500/30 animate-pulse'
                    }`}>
                      {result.status}
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ngày mua</span>
                    <span className="text-sm font-bold text-white">{new Date(result.date).toLocaleDateString('vi-VN')}</span>
                 </div>
                 <div className="h-px bg-white/5 my-2"></div>
                 <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Sản phẩm</span>
                    {result.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">{item.productName}</span>
                          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{item.optionLabel}</span>
                        </div>
                        <span className="text-xs font-black text-white">{item.price.toLocaleString()}đ</span>
                      </div>
                    ))}
                 </div>
                 <div className="h-px bg-white/5 my-2"></div>
                 <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tổng tiền</span>
                    <span className="text-2xl font-black text-blue-500 tracking-tighter">{result.total.toLocaleString()}đ</span>
                 </div>
              </div>

              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                 <p className="text-[10px] font-bold text-slate-400 leading-relaxed">
                   * Nếu trạng thái là <span className="text-blue-400">Đang xử lý</span>, vui lòng đợi từ 5-15 phút để nhận thông tin tài khoản qua Email. 
                   Nếu quá thời gian trên, hãy nhấn nút Hỗ trợ bên dưới.
                 </p>
              </div>

              <div className="flex gap-3">
                 <button 
                  onClick={() => setResult(null)}
                  className="flex-grow bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                 >
                   Kiểm tra mã khác
                 </button>
                 <a 
                  href="https://zalo.me/0916882278" 
                  target="_blank"
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20"
                 >
                   Hỗ trợ
                 </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingModal;
