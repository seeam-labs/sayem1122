import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CheckCircle2, 
  Send, 
  Receipt,
  UtensilsCrossed,
  Tag,
  Clock
} from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { sounds } from '../lib/soundEffects';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  lang: 'bn' | 'en';
  couponCode?: string;
  discountAmount?: number;
  onOpenOrderTracker?: (orderNo: string, tableNo: string, total: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
  couponCode = '',
  discountAmount = 0,
  onOpenOrderTracker,
}) => {
  const [tableNo, setTableNo] = useState<string>('১');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeout'>('dine-in');
  const [phone, setPhone] = useState<string>('');
  const [customerNote, setCustomerNote] = useState<string>('');
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [placedOrderInfo, setPlacedOrderInfo] = useState<{ orderNo: string; tableNo: string; total: number } | null>(null);

  if (!isOpen) return null;

  const rawTotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const finalTotal = Math.max(0, rawTotal - discountAmount);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const generatedOrderNo = `#CP-${Math.floor(1000 + Math.random() * 9000)}`;
    const info = { orderNo: generatedOrderNo, tableNo, total: finalTotal };

    sounds.playOrderSuccess();
    setPlacedOrderInfo(info);
    setIsOrderPlaced(true);
  };

  const handleResetOrder = () => {
    setIsOrderPlaced(false);
    onClearCart();
    onClose();
  };

  const handleOpenTracker = () => {
    if (placedOrderInfo && onOpenOrderTracker) {
      onOpenOrderTracker(placedOrderInfo.orderNo, placedOrderInfo.tableNo, placedOrderInfo.total);
      onClearCart();
      setIsOrderPlaced(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-950 text-white h-full shadow-2xl flex flex-col justify-between border-l border-amber-800/40">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-serif text-white">
              {lang === 'bn' ? 'আপনার খাবার তালিকা' : 'Your Order List'}
            </h3>
            <span className="bg-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
              {cart.reduce((count, item) => count + item.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isOrderPlaced && placedOrderInfo ? (
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="text-xl font-bold font-serif text-amber-400">
              অর্ডার সফলভাবে জমা হয়েছে!
            </h3>

            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              ধন্যবাদ! মাস্টারশেফ রব্বির কিচেনে আপনার খাবার তৈরির কাজ শুরু হয়েছে।
              {orderType === 'dine-in' ? ` টেবিল নম্বর: ${tableNo}` : ' টেক-অ্যাওয়ে অর্ডার।'}
            </p>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl w-full text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>অর্ডার নম্বর:</span>
                <strong className="text-amber-400 font-mono">{placedOrderInfo.orderNo}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>মোট বিল:</span>
                <strong className="text-emerald-400 font-mono text-sm">{placedOrderInfo.total} ৳</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>রেস্টুরেন্ট:</span>
                <span className="text-white font-medium">{RESTAURANT_INFO.nameBn}</span>
              </div>
            </div>

            <div className="w-full space-y-2">
              <button
                onClick={handleOpenTracker}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3 rounded-xl transition text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4 text-slate-950" />
                <span>লাইভ কিচেন ট্র্যাকার দেখুন ⏱️</span>
              </button>

              <button
                onClick={handleResetOrder}
                className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold py-2.5 rounded-xl transition text-xs"
              >
                মেন্যুতে ফিরে যান
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-3">
            <UtensilsCrossed className="w-12 h-12 text-slate-600" />
            <h4 className="text-sm font-bold text-slate-300">অর্ডার লিস্ট ফাঁকা রয়েছে</h4>
            <p className="text-xs text-slate-500 max-w-xs">
              মেন্যু থেকে আপনার পছন্দের বার্গার, সাব বা কফি অর্ডারে যোগ করুন।
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {/* Table or Takeout Selector */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setOrderType('dine-in')}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    orderType === 'dine-in' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  🍽️ ডাইন-ইন (রেস্টুরেন্টে)
                </button>
                <button
                  onClick={() => setOrderType('takeout')}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    orderType === 'takeout' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  🛍️ পার্শেল / টেকঅ্যাওয়ে
                </button>
              </div>

              {orderType === 'dine-in' ? (
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-300 font-bold">আপনার টেবিল নম্বর:</span>
                  <select
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-amber-400 font-bold rounded-lg px-3 py-1"
                  >
                    {['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', 'স্পেশাল বুথ'].map((t) => (
                      <option key={t} value={t}>টেবিল {t}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="মোবাইল নম্বর (যোগাযোগের জন্য)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((cartItem, index) => (
                <div
                  key={`${cartItem.item.id}-${index}`}
                  className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center gap-3"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.nameBn}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{cartItem.item.nameBn}</h4>
                    <p className="text-[11px] text-amber-400 font-mono font-bold">
                      {cartItem.item.price} ৳ x {cartItem.quantity} = {cartItem.item.price * cartItem.quantity} ৳
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onUpdateQuantity(index, -1);
                      }}
                      className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-mono font-bold text-amber-400">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => {
                        sounds.playAddToCart();
                        onUpdateQuantity(index, 1);
                      }}
                      className="w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      onRemoveItem(index);
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Applied Coupon Badge */}
            {couponCode && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Tag className="w-4 h-4 text-emerald-400" />
                  <span>কুপন অ্যাপ্লাইড: {couponCode}</span>
                </span>
                <span className="font-mono font-black">-{discountAmount} ৳</span>
              </div>
            )}

            {/* Customer Special Note */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-medium">বিশেষ নির্দেশনাবলী (কম ঝাল, কম চিনি ইত্যাদি):</label>
              <textarea
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="যেমন: কোল্ড কফিতে আইসক্রিম একটু বেশি দিবেন..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        )}

        {/* Footer */}
        {!isOrderPlaced && cart.length > 0 && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
            <div className="space-y-1">
              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>সাবটোটাল:</span>
                  <span className="font-mono">{rawTotal} ৳</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-300">সর্বমোট প্রদেয় বিল:</span>
                <span className="text-xl text-amber-400 font-mono font-black">{finalTotal} ৳</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-2xl shadow-xl shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>অর্ডার কনফার্ম করুন ({finalTotal}৳)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
