import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Flame, Utensils, Sparkles, Clock, X, ChefHat, BellRing } from 'lucide-react';
import { sounds } from '../lib/soundEffects';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNo?: string;
  tableNo?: string;
  totalAmount?: number;
  lang: 'bn' | 'en';
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
  orderNo = '#CP-9824',
  tableNo = '03',
  totalAmount = 180,
  lang,
}) => {
  const [step, setStep] = useState<number>(1);
  const [secondsLeft, setSecondsLeft] = useState<number>(45);

  useEffect(() => {
    if (!isOpen) return;

    sounds.playOrderSuccess();
    setStep(1);
    setSecondsLeft(45);

    const step2Timer = setTimeout(() => {
      setStep(2);
    }, 4000);

    const step3Timer = setTimeout(() => {
      setStep(3);
    }, 12000);

    const step4Timer = setTimeout(() => {
      setStep(4);
      sounds.playWaiterBell();
    }, 22000);

    const countdown = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(step4Timer);
      clearInterval(countdown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const stages = [
    { id: 1, titleBn: 'অর্ডার গৃহীত হয়েছে', titleEn: 'Order Received', descBn: 'কাউন্টারে আপনার আইটেম কনফার্মড' },
    { id: 2, titleBn: 'মাস্টারশেফ কিচেনে রান্না চলছে', titleEn: 'Kitchen Preparing', descBn: 'মাস্টারশেফ রব্বি নিজ হাতে জুসি প্রিপারেশন করছেন' },
    { id: 3, titleBn: 'কোয়ালিটি চেক ও গার্নিশিং', titleEn: 'Quality & Plating', descBn: 'হট সাব ও ফ্রেশ সস পরিবেশনের প্রস্তুতি' },
    { id: 4, titleBn: 'টেবিলে পরিবেশনের জন্য প্রস্তুত!', titleEn: 'Ready to Serve!', descBn: 'টেবিলে ডেলিভারি অথবা পার্সেল কাউন্টারে রেডি' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-slate-900 border border-amber-500/50 rounded-3xl p-6 shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <ChefHat className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white font-serif">লাইভ কিচেন ট্র্যাকার</h3>
                  <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    {orderNo}
                  </span>
                </div>
                <p className="text-xs text-slate-400">টেবিল নম্বর: {tableNo} • বিল: {totalAmount}৳</p>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="bg-slate-950 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-xs text-slate-300 font-medium">আনুমানিক অপেক্ষার সময়:</span>
              </div>
              <span className="text-xl font-black text-amber-400 font-mono">
                {secondsLeft > 0 ? `${secondsLeft} সেকেন্ড` : 'পরিবেশিত!'}
              </span>
            </div>

            {/* Progress Timeline */}
            <div className="space-y-4 relative">
              <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-slate-800" />

              {stages.map((st) => {
                const isCurrent = step === st.id;
                const isCompleted = step > st.id;

                return (
                  <div key={st.id} className="relative flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center z-10 border transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                          : isCurrent
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30 scale-110'
                          : 'bg-slate-950 text-slate-600 border-slate-800'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isCurrent ? (
                        <Flame className="w-5 h-5 animate-bounce" />
                      ) : (
                        <span className="text-xs font-mono font-bold">{st.id}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isCurrent
                            ? 'text-amber-300'
                            : isCompleted
                            ? 'text-emerald-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {lang === 'bn' ? st.titleBn : st.titleEn}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{st.descBn}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-xl transition"
            >
              বন্ধ করুন ও মেন্যুতে ফিরে যান
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
