import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Gift, Check, Copy } from 'lucide-react';
import { sounds } from '../lib/soundEffects';

interface LuckySpinPageProps {
  onApplyCoupon: (code: string, discountAmount: number) => void;
  lang?: 'bn' | 'en';
}

export const LuckySpinPage: React.FC<LuckySpinPageProps> = ({
  onApplyCoupon,
  lang = 'bn',
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<{ labelBn: string; code: string; discount: number } | null>(null);
  const [copied, setCopied] = useState(false);

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
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-extrabold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>কফি পয়েন্ট লাকি হুইল কুপন</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white font-serif">
          ভাগ্য পরীক্ষা করুন ও ডিসকাউন্ট জিতুন!
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/80 max-w-md mx-auto">
          চাকা ঘুরিয়ে পেয়ে যান আপনার স্পেশাল ফুড কুপন কোড! অর্ডারে ছাড় পান সাথে সাথেই।
        </p>
      </div>

      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 text-center space-y-6 shadow-2xl">
        {/* Wheel Graphic */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto my-4 flex items-center justify-center">
          <div className="absolute top-0 z-20 -mt-3 text-amber-400 text-3xl drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]">
            ▼
          </div>

          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            }}
            className="w-full h-full rounded-full border-4 border-amber-500/80 bg-gradient-to-tr from-amber-950 via-slate-900 to-amber-900 shadow-[0_0_40px_rgba(245,158,11,0.4)] relative overflow-hidden flex items-center justify-center"
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
                  className="absolute w-full h-full flex justify-center items-start pt-4"
                >
                  <span className="text-[11px] font-bold text-amber-200 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    {p.code}
                  </span>
                </div>
              );
            })}

            <div className="w-20 h-20 rounded-full bg-amber-500 border-4 border-slate-950 flex items-center justify-center shadow-xl z-10">
              <Gift className="w-10 h-10 text-slate-950" />
            </div>
          </div>
        </div>

        {!prize ? (
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full max-w-sm py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-2xl shadow-xl hover:scale-105 transition disabled:opacity-50 text-base"
          >
            {spinning ? 'স্পিন ঘুরছে...' : 'স্পিন করুন 🎰'}
          </button>
        ) : (
          <div className="bg-amber-500/20 border border-amber-500/50 rounded-2xl p-6 space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-base">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>অভিনন্দন! আপনি জিতেছেন:</span>
            </div>
            <div className="text-xl font-black text-white font-serif">{prize.labelBn}</div>
            <div className="inline-block bg-slate-950 text-amber-400 font-mono text-lg font-bold px-6 py-2 rounded-xl border border-amber-500/40">
              {prize.code}
            </div>
            <div>
              <button
                onClick={handleCopyAndApply}
                className="w-full py-3 bg-amber-500 text-slate-950 font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-amber-400 transition"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? 'কুপন অ্যাপ্লাই করা হয়েছে!' : 'কার্টে কুপন যুক্ত করুন'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
