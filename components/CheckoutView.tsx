
import React, { useState } from 'react';
import { CartItem } from '../types';

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
  cart: CartItem[];
  onBack: () => void;
  onClear: () => void;
}

const CheckoutView: React.FC<Props> = ({ cart, onBack, onClear }) => {
  const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [orderCode] = useState(`KACE${Math.floor(100000 + Math.random() * 900000)}`);
  
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const finalizeOrder = () => {
    // Save to localStorage so tracking modal can find it
    const newOrder: SavedOrder = {
      id: orderCode,
      items: cart.map(item => ({
        productName: item.productName,
        optionLabel: item.optionLabel,
        price: item.price
      })),
      total: totalPrice,
      date: new Date().toISOString(),
      status: 'Đang xử lý'
    };

    const existingOrdersRaw = localStorage.getItem('kace_orders');
    const existingOrders: SavedOrder[] = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
    existingOrders.push(newOrder);
    localStorage.setItem('kace_orders', JSON.stringify(existingOrders));

    setStep('success');
    onClear();
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 px-6">
        <div className="w-40 h-40 bg-white/5 rounded-[4rem] flex items-center justify-center mb-12 border border-white/5 relative group">
           <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <svg className="w-16 h-16 text-slate-700 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase">Giỏ hàng đang trống</h2>
        <button onClick={onBack} className="bg-blue-600 text-white px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-2xl active:scale-95">Quay lại mua sắm ngay</button>
      </div>
    );
  }

  const Stepper = () => (
    <div className="flex items-center justify-center mb-20 gap-4 md:gap-8">
      {[
        { id: 'cart', label: 'Giỏ hàng' },
        { id: 'payment', label: 'Thanh toán' },
        { id: 'success', label: 'Hoàn tất' }
      ].map((s, i) => (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500 border ${
              step === s.id 
              ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] scale-110' 
              : i < ['cart', 'payment', 'success'].indexOf(step)
              ? 'bg-green-500/20 border-green-500/30 text-green-500'
              : 'bg-white/5 border-white/10 text-slate-600'
            }`}>
              {i < ['cart', 'payment', 'success'].indexOf(step) ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
              ) : i + 1}
            </div>
            <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${step === s.id ? 'text-white' : 'text-slate-600'}`}>{s.label}</span>
          </div>
          {i < 2 && <div className={`h-px w-8 md:w-16 ${i < ['cart', 'payment', 'success'].indexOf(step) ? 'bg-green-500/30' : 'bg-white/10'}`}></div>}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="pt-32 pb-32 container mx-auto px-6 max-w-6xl">
      <Stepper />

      {step === 'cart' && (
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-700">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* List Products */}
            <div className="flex-grow space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Danh sách <span className="text-blue-500">Sản phẩm</span></h2>
              </div>
              
              {cart.map((item) => (
                <div key={item.cartId} className="group relative bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-6 hover:border-blue-500/20 transition-all duration-500">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shrink-0">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">{item.productName}</h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <span className="text-blue-500">{item.optionLabel}</span>
                       <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                       <span>{item.accountType}</span>
                    </p>
                  </div>
                  <div className="text-2xl font-black text-white tracking-tighter pr-4">
                    {item.price.toLocaleString()}đ
                  </div>
                </div>
              ))}

              <button onClick={onBack} className="flex items-center gap-3 text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all pt-4 group">
                 <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg> Tiếp tục mua sắm
              </button>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-[#0b0f19] border border-white/10 p-10 rounded-[3rem] sticky top-32 shadow-2xl">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-10 border-b border-white/5 pb-6">Tổng kết đơn hàng</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-slate-400 font-bold">
                    <span>Tạm tính</span>
                    <span className="text-white">{totalPrice.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-bold">
                    <span>Phí dịch vụ</span>
                    <span className="text-green-500">0đ</span>
                  </div>
                  <div className="h-px bg-white/5 my-6"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Thành tiền</span>
                    <span className="text-4xl font-black text-blue-500 tracking-tighter leading-none">{totalPrice.toLocaleString()}đ</span>
                  </div>
                </div>

                <button 
                  onClick={() => setStep('payment')}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] active:scale-95 flex items-center justify-center gap-3 group"
                >
                  Xác nhận thanh toán
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </button>
                
                <p className="text-center text-[8px] font-black text-slate-700 uppercase tracking-[0.3em] mt-8">Secure 256-bit encrypted transaction</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="animate-in zoom-in-95 duration-700 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 uppercase leading-none">Cổng <span className="text-blue-500">Thanh toán</span></h2>
            <p className="text-slate-400 font-medium text-lg">Vui lòng quét mã QR hoặc chuyển khoản thủ công để hoàn tất đơn hàng.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#0b0f19] border border-white/10 p-10 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full"></div>
            
            {/* QR Section */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_0_60px_rgba(255,255,255,0.08)] relative group overflow-hidden">
                {/* VietQR Implementation - Optimized for Vietnam Banking */}
                <img 
                  src={`https://img.vietqr.io/image/MB-0916882278-compact2.png?amount=${totalPrice}&addInfo=${encodeURIComponent(orderCode)}&accountName=DAM%20PHU%20THANH`} 
                  alt="VietQR Payment" 
                  className="w-full aspect-square transition-all duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 border-[8px] border-blue-600/5 rounded-[2.5rem] pointer-events-none"></div>
              </div>
              <div className="mt-8 flex items-center gap-2 px-6 py-3 bg-blue-600/10 rounded-full border border-blue-600/20">
                 <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">VietQR: Tự động nhập số tiền & nội dung</span>
              </div>
            </div>

            {/* Manual Transfer Info */}
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Ngân hàng</span>
                <div className="text-xl font-black text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-[10px]">MB</div>
                  MB BANK (QUÂN ĐỘI)
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Chủ tài khoản</span>
                <div className="text-xl font-black text-white uppercase tracking-tight">ĐÀM PHÚ THÀNH</div>
              </div>

              <div className="space-y-2 relative group">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Số tài khoản</span>
                <div className="flex items-center justify-between bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all">
                  <span className="text-2xl font-black text-white tracking-widest">0916882278</span>
                  <button 
                    onClick={() => handleCopy('0916882278', 'stk')}
                    className="bg-blue-600/20 text-blue-400 p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    {copiedField === 'stk' ? 'Xong!' : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2 relative">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Nội dung chuyển khoản</span>
                <div className="flex items-center justify-between bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all">
                  <span className="text-2xl font-black text-blue-500 tracking-widest">{orderCode}</span>
                  <button 
                    onClick={() => handleCopy(orderCode, 'content')}
                    className="bg-blue-600/20 text-blue-400 p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    {copiedField === 'content' ? 'Xong!' : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6">
            <button 
              onClick={finalizeOrder}
              className="w-full md:w-auto bg-blue-600 text-white px-20 py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-blue-500 shadow-[0_25px_60px_rgba(37,99,235,0.4)] transition-all active:scale-95"
            >
              Tôi đã chuyển khoản thành công
            </button>
            <button onClick={() => setStep('cart')} className="text-slate-600 font-black text-[10px] uppercase tracking-widest hover:text-slate-400 transition-colors">Quay lại giỏ hàng</button>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="animate-in fade-in duration-1000 text-center py-20 max-w-4xl mx-auto">
          <div className="relative inline-block mb-16">
            <div className="absolute inset-0 bg-green-500/20 blur-[60px] rounded-full animate-pulse"></div>
            <div className="w-40 h-40 bg-green-500 rounded-[3.5rem] flex items-center justify-center text-white relative z-10 shadow-[0_20px_50px_rgba(34,197,94,0.4)]">
               <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7"/></svg>
            </div>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 uppercase leading-none">Giao dịch <br/><span className="text-green-500">Thành công</span></h2>
          <p className="text-slate-400 text-2xl font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
            Hệ thống đã ghi nhận thanh toán. Tài khoản của bạn sẽ được kích hoạt trong <span className="text-white font-bold">5-15 phút</span> tới.
          </p>
          
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] mb-16 flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Mã đơn hàng</span>
              <span className="text-3xl font-black text-white tracking-widest uppercase">{orderCode}</span>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block"></div>
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Trạng thái</span>
              <span className="text-xl font-black text-blue-500 uppercase tracking-widest">Đang xử lý</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={onBack} className="w-full sm:w-auto bg-white text-black px-16 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95">Về trang chủ</button>
            <a href="https://zalo.me/0916882278" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-16 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              Hỗ trợ Zalo 24/7
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutView;
