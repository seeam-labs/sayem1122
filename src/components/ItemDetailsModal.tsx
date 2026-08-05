import React, { useState } from 'react';
import { X, Clock, Award, Flame, Plus, CheckCircle2, Heart } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemDetailsModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedOptions?: string[]) => void;
  lang: 'bn' | 'en';
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  onClose,
  onAddToCart,
  lang,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  if (!item) return null;

  const toggleOption = (opt: string) => {
    if (selectedOptions.includes(opt)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== opt));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  const handleAdd = () => {
    onAddToCart(item, selectedOptions);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-950 border border-amber-800/50 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0 text-white relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/10] bg-zinc-900">
          <img
            src={item.image}
            alt={item.nameBn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

          {item.isChefSpecial && (
            <div className="absolute bottom-3 left-4 bg-amber-500 text-zinc-950 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Award className="w-3.5 h-3.5 text-zinc-950" />
              <span>মাস্টারশেফ স্পেশাল ক্রাফট</span>
            </div>
          )}
        </div>

        {/* Item Content */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-black font-serif text-white">
                {lang === 'bn' ? item.nameBn : item.nameEn}
              </h2>
              <p className="text-xs text-amber-300/80 font-medium">{item.nameEn}</p>
            </div>

            <div className="text-2xl font-black font-mono text-amber-400 bg-amber-950/60 border border-amber-700/50 px-3 py-1 rounded-xl">
              {item.price} ৳
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            {lang === 'bn' ? item.descriptionBn : item.descriptionEn}
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-3 text-xs pt-1 border-t border-zinc-800">
            {item.preparationTime && (
              <span className="flex items-center gap-1 text-zinc-400 bg-zinc-900 px-3 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>প্রস্তুতি সময়: {item.preparationTime}</span>
              </span>
            )}
            {item.calories && (
              <span className="flex items-center gap-1 text-zinc-400 bg-zinc-900 px-3 py-1 rounded-lg">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>{item.calories}</span>
              </span>
            )}
          </div>

          {/* Custom Add-ons or Options */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-amber-300">কাস্টম অপশন নির্বাচন করুন:</label>
              <div className="flex flex-wrap gap-2">
                {item.options.map((opt, idx) => {
                  const isChecked = selectedOptions.includes(opt);
                  return (
                    <button
                      key={`${opt}-${idx}`}
                      onClick={() => toggleOption(opt)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                        isChecked
                          ? 'bg-amber-500 text-zinc-950 font-bold border-amber-400'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add to Order Button */}
          <div className="pt-4">
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl ${
                isAdded
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-amber-500/20'
              }`}
            >
              {isAdded ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>অর্ডারে যোগ করা হয়েছে!</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>অর্ডারে যোগ করুন ({item.price} ৳)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
