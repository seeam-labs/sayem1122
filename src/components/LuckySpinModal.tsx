import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Gift, X, Check, Copy } from 'lucide-react';
import { sounds } from '../lib/soundEffects';

interface LuckySpinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (code: string, discountAmount: number) => void;
  lang: 'bn' | 'en';
}

export const LuckySpinModal: React.FC<LuckySpinModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
  lang,
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<{ labelBn: string; code: string; discount: number } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const prizes = [
    { labelBn: '১০% ইন্সট্যান্ট ডিসকাউন্ট', code: 'CRAFT10', discount: 15 },
    { labelBn: 'মালাই চা ফ্রী কুপন', code: 'FREECHAI', discount: 15 },
    { labelBn: '২০৳ ক্যাশব্যাক ছাড়', code: 'SAVE20', discount: 20 },
    { labelBn: 'ফ্রী চিজ ট্রিপল বার্গার', code: 'CHEESE3D', discount: 25 },
    { labelBn: 'কোল্ড কফি স্পেশাল ছাড়', code: 'COLD2026', discount: 20 },
    { labelBn: '১৫% মেগা সেভিংস', code: 'MEGA15', discount: 30 },
  ];

  const handleSpin = () => {
    if (spinning || prize) return;
    setSpinning(true);
    sounds.playClick();

    const selectedIdx = Math.floor(Math.random() * prizes.length);
    const degreesPerSegment = 360 / prizes.length;
    const targetDeg = 360 * 5 + (360 - (selectedIdx * degreesPerSegment + degreesPerSegment / 2));

    setRotation(targetDeg);

    setTimeout(() => {
      setSpinning(false);
      setPrize(prizes[selectedIdx]);
      sounds.playOrderSuccess();
    }, 3500);
  };

  const handleCopyAndApply = () => {
    if (!prize) return;
    onApplyCoupon(prize.code, prize.discount);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md bg-slate-900 border border-amber-500/50 rounded-3xl p-6 text-center shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-extrabold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>কফি পয়েন্ট লাকি হুইল</span>
            </div>

            <h3 className="text-xl font-black text-white font-serif">
              {lang === 'bn' ? 'স্পিন করুন ও ডিসকাউন্ট কুপন জিতুন!' : 'Spin & Win Food Rewards!'}
            </h3>

            {/* Wheel Container */}
            <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
              {/* Pointer */}
              <div className="absolute top-0 z-20 -mt-3 text-amber-400 text-2xl drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]">
                ▼
              </div>

              {/* Wheel graphic */}
              <div
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
                }}
                className="w-full h-full rounded-full border-4 border-amber-500/80 bg-gradient-to-tr from-amber-950 via-slate-900 to-amber-900 shadow-[0_0_30px_rgba(245,158,11,0.3)] relative overflow-hidden flex items-center justify-center"
              >
                {prizes.map((p, idx) => {
                  const angle = (360 / prizes.length) * idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: '50% 50%',
                      }}
                      className="absolute w-full h-full flex justify-center items-start pt-3"
                    >
                      <span className="text-[10px] font-bold text-amber-200 bg-slate-950/80 px-1.5 py-0.5 rounded border border-amber-500/30">
                        {p.code}
                      </span>
                    </div>
                  );
                })}

                <div className="w-16 h-16 rounded-full bg-amber-500 border-4 border-slate-950 flex items-center justify-center shadow-lg z-10">
                  <Gift className="w-8 h-8 text-slate-950" />
                </div>
              </div>
            </div>

            {!prize ? (
              <button
                onClick={handleSpin}
                disabled={spinning}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-2xl shadow-xl hover:scale-105 transition disabled:opacity-50"
              >
                {spinning ? 'স্পিন ঘুরছে...' : 'ভাগ্য পরীক্ষা করুন 🎰'}
              </button>
            ) : (
              <div className="bg-amber-500/20 border border-amber-500/50 rounded-2xl p-4 space-y-3 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>অভিনন্দন! আপনি জিতেছেন:</span>
                </div>
                <div className="text-lg font-black text-white">{prize.labelBn}</div>
                <div className="inline-block bg-slate-950 text-amber-400 font-mono text-base font-bold px-4 py-1.5 rounded-xl border border-amber-500/40">
                  {prize.code}
                </div>
                <div>
                  <button
                    onClick={handleCopyAndApply}
                    className="w-full py-2.5 bg-amber-500 text-slate-950 font-extrabold rounded-xl shadow flex items-center justify-center gap-2 hover:bg-amber-400 transition"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'কুপন অ্যাপ্লাই করা হয়েছে!' : 'কার্টে কুপন অ্যাপ্লাই করুন'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
