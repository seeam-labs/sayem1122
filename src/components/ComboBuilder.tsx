import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Check, 
  ShoppingBag, 
  Utensils, 
  Coffee, 
  Cookie,
  BadgePercent
} from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';

interface ComboBuilderProps {
  onAddToCart: (item: MenuItem, selectedOptions?: string[]) => void;
  lang: 'bn' | 'en';
}

export const ComboBuilder: React.FC<ComboBuilderProps> = ({ onAddToCart, lang }) => {
  const mainItems = MENU_ITEMS.filter((i) => ['burger', 'sandwich', 'shawarma', 'chowmein'].includes(i.category));
  const drinkItems = MENU_ITEMS.filter((i) => ['coffee', 'tea'].includes(i.category));
  const snackItems = MENU_ITEMS.filter((i) => i.category === 'snacks');

  const [selectedMain, setSelectedMain] = useState<MenuItem | null>(mainItems[0] || null);
  const [selectedDrink, setSelectedDrink] = useState<MenuItem | null>(drinkItems[0] || null);
  const [selectedSnack, setSelectedSnack] = useState<MenuItem | null>(null);

  // Price calculations
  const mainPrice = selectedMain ? selectedMain.price : 0;
  const drinkPrice = selectedDrink ? selectedDrink.price : 0;
  const snackPrice = selectedSnack ? selectedSnack.price : 0;

  const totalPrice = mainPrice + drinkPrice + snackPrice;
  // Apply a 10৳ or 15৳ discount for creating a custom combo!
  const discount = totalPrice > 100 ? 15 : totalPrice > 60 ? 10 : 5;
  const finalComboPrice = Math.max(15, totalPrice - discount);

  const handleAddComboToCart = () => {
    if (!selectedMain && !selectedDrink) return;

    const comboNameBn = `কাস্টম কম্বো (${selectedMain ? selectedMain.nameBn : ''}${selectedDrink ? ` + ${selectedDrink.nameBn}` : ''}${selectedSnack ? ` + ${selectedSnack.nameBn}` : ''})`;
    const comboNameEn = `Custom Combo (${selectedMain ? selectedMain.nameEn : ''}${selectedDrink ? ` + ${selectedDrink.nameEn}` : ''})`;

    const customComboItem: MenuItem = {
      id: `custom-combo-${Date.now()}`,
      nameBn: comboNameBn,
      nameEn: comboNameEn,
      price: finalComboPrice,
      category: 'combos',
      descriptionBn: `মাস্টারশেফ রব্বির স্পেশাল ডিসকাউন্টেড কম্বো। (মূল দাম ${totalPrice}৳, আপনি সেভ করলেন ${discount}৳)`,
      descriptionEn: `Customized meal deal with ${discount} BDT discount!`,
      image: selectedMain ? selectedMain.image : selectedDrink ? selectedDrink.image : 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      isChefSpecial: true
    };

    onAddToCart(customComboItem);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Combo Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 border border-amber-800/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
              <BadgePercent className="w-4 h-4 text-amber-400" />
              <span>নিজের বাজেটে স্পেশাল ডিসকাউন্ট</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-white">
              নিজের পছন্দমতো খাবার ও কফি মিলিয়ে <span className="text-amber-400">কম্বো বানিয়ে নিন</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl">
              বার্গার/সাব/শর্মা + কফি/চা + ফ্রেন্চ ফ্রাইজ একত্রিত করুন এবং পান নগদ {discount}৳ ছাড়!
            </p>
          </div>

          <div className="bg-zinc-950 border-2 border-amber-500 p-4 rounded-2xl text-center shadow-xl">
            <span className="text-xs text-zinc-400 font-bold block uppercase">{lang === 'bn' ? 'কম্বো স্পেশাল অফার' : 'Combo Special Price'}</span>
            <div className="text-3xl font-black text-amber-400 font-mono flex items-center justify-center gap-1">
              <span>{finalComboPrice}</span>
              <span className="text-sm">৳</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold block">
              সাশ্রয় হচ্ছে {discount}৳!
            </span>
          </div>
        </div>
      </div>

      {/* Builder Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1: Main Meal */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-amber-400 font-bold text-sm">
            <Utensils className="w-4 h-4" />
            <span>১. প্রধান খাবার নির্বাচন করুন:</span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
            {mainItems.map((item, idx) => {
              const isSelected = selectedMain?.id === item.id;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => setSelectedMain(item)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-500 shadow-md'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.nameBn}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.nameBn}</h4>
                    <p className="text-[10px] text-amber-400 font-mono font-bold">{item.price} ৳</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Drinks */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-amber-400 font-bold text-sm">
            <Coffee className="w-4 h-4" />
            <span>২. ড্রিংকস বা কফি বেছে নিন:</span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
            {drinkItems.map((item, idx) => {
              const isSelected = selectedDrink?.id === item.id;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => setSelectedDrink(item)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-500 shadow-md'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.nameBn}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.nameBn}</h4>
                    <p className="text-[10px] text-amber-400 font-mono font-bold">{item.price} ৳</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Optional Snack */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-amber-400 font-bold text-sm">
            <Cookie className="w-4 h-4" />
            <span>৩. ফ্রাইজ/স্ন্যাক্স (ঐচ্ছিক):</span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
            <div
              onClick={() => setSelectedSnack(null)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                selectedSnack === null
                  ? 'bg-amber-950/60 border-amber-500 text-white font-bold'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
              }`}
            >
              <span>কোনো স্ন্যাকস লাগবে না</span>
              {selectedSnack === null && <Check className="w-4 h-4 text-amber-400" />}
            </div>

            {snackItems.map((item, idx) => {
              const isSelected = selectedSnack?.id === item.id;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => setSelectedSnack(item)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-500 shadow-md'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.nameBn}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.nameBn}</h4>
                    <p className="text-[10px] text-amber-400 font-mono font-bold">{item.price} ৳</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Combo Summary Bar */}
      <div className="bg-zinc-900 border-2 border-amber-500/60 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>আপনার তৈরি কম্বো সামারি:</span>
          </h3>
          <p className="text-xs text-zinc-300">
            {selectedMain?.nameBn || 'প্রধান খাবার'} + {selectedDrink?.nameBn || 'ড্রিংকস'} {selectedSnack ? `+ ${selectedSnack.nameBn}` : ''}
          </p>
          <div className="text-[11px] text-zinc-400">
            আলাদা মোট দাম: <span className="line-through">{totalPrice}৳</span> | কম্বো ছাড়: <span className="text-emerald-400 font-bold">{discount}৳</span>
          </div>
        </div>

        <button
          onClick={handleAddComboToCart}
          className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black px-8 py-3 rounded-2xl shadow-xl shadow-amber-500/25 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5 text-zinc-950" />
          <span>অর্ডার লিস্টে যোগ করুন ({finalComboPrice}৳)</span>
        </button>
      </div>
    </div>
  );
};
