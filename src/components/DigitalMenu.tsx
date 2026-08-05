import React, { useState } from 'react';
import { 
  Search, 
  Flame, 
  Sparkles, 
  Plus, 
  Clock, 
  ChevronRight, 
  SlidersHorizontal, 
  Award,
  Info,
  CheckCircle2,
  Utensils,
  Box
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { CategoryId, MenuItem } from '../types';

interface DigitalMenuProps {
  onAddToCart: (item: MenuItem, selectedOptions?: string[]) => void;
  onSelectItem: (item: MenuItem) => void;
  lang: 'bn' | 'en';
  menuItems?: MenuItem[];
  onOpenArView?: (item: MenuItem) => void;
}

export const DigitalMenu: React.FC<DigitalMenuProps> = ({
  onAddToCart,
  onSelectItem,
  lang,
  menuItems = MENU_ITEMS,
  onOpenArView
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number>(200);
  const [onlyChefSpecial, setOnlyChefSpecial] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (item.inStock === false) return;
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  // Filter Items
  const filteredItems = menuItems.filter((item) => {

    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchNameBn = item.nameBn.toLowerCase().includes(q);
      const matchNameEn = item.nameEn.toLowerCase().includes(q);
      const matchDescBn = item.descriptionBn.toLowerCase().includes(q);
      if (!matchNameBn && !matchNameEn && !matchDescBn) return false;
    }
    // Price filter
    if (item.price > priceRange) {
      return false;
    }
    // Chef Special filter
    if (onlyChefSpecial && !item.isChefSpecial) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-amber-950 to-zinc-950 border border-amber-800/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-700/60 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{lang === 'bn' ? 'মাস্টারশেফ craft Rabbi এর সিগনেচার কিচেন' : 'Crafted by Masterchef Rabbi'}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white font-serif leading-tight">
              {lang === 'bn' ? (
                <>
                  স্বাদ ও আড্ডার অনন্য ঠিকানা <span className="text-amber-400">কফি পয়েন্ট</span>
                </>
              ) : (
                <>
                  Taste & Warmth at <span className="text-amber-400">Coffee Point</span>
                </>
              )}
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {lang === 'bn' 
                ? 'সোনার বাংলা গেট, গদাবাগ, কেরাণীগঞ্জে পাচ্ছেন তাজা জুসি বার্গার, সাব স্যান্ডুইচ, শর্মা, কফি ও খাঁটি মালাই চা। সরাসরি রেস্টুরেন্টে বসে খাবারের অর্ডার করুন অথবা ফিজিক্যাল মেন্যু এক্সপ্লোর করুন।'
                : 'Experience juicy burgers, subs, shawarma, coffee, and authentic malai tea at Sonar Bangla Gate, Godabag, Keraniganj.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700 text-amber-200 text-xs px-3 py-1.5 rounded-xl font-medium">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'bn' ? 'বার্গার ৮০৳ থেকে শুরু' : 'Burgers from 80 BDT'}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700 text-amber-200 text-xs px-3 py-1.5 rounded-xl font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'bn' ? 'মালাই চা মাত্র ১৫৳' : 'Malai Tea only 15 BDT'}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700 text-amber-200 text-xs px-3 py-1.5 rounded-xl font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'bn' ? 'প্রতিদিন ১২টা - রাত ১১টা' : '12 PM - 11 PM Daily'}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="relative group cursor-pointer" onClick={() => {
              const malaiTea = menuItems.find(i => i.id === 'malai-tea');
              if (malaiTea) onSelectItem(malaiTea);
            }}>
              {/* Animated Glowing Ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse" />

              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl transform transition-transform duration-500 group-hover:scale-105 bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
                  alt="স্পেশাল মাটকা মালাই চা ও রুটি"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Steam Animated Badge */}
                <div className="absolute top-3 right-3 bg-slate-950/90 border border-amber-400/80 text-amber-300 px-3 py-1.5 rounded-full text-[11px] font-extrabold shadow-lg backdrop-blur-md flex items-center gap-1.5 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>গরম গরম খাঁটি সর</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex items-end justify-between">
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5">
                      <span>মালাই চা ও বাটার রুটি</span>
                    </div>
                    <div className="text-[11px] text-amber-300 font-medium">
                      কেরাণীগঞ্জের এক নম্বর ঐতিহ্যবাহী মাটকা চা
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs shadow-lg">
                    ৳১৫
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Matka Malai Cha Interactive Showcase */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/80 border-2 border-amber-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div 
              onClick={() => {
                const teaItem = menuItems.find(i => i.id === 'malai-tea');
                if (teaItem) onSelectItem(teaItem);
              }}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-amber-400/80 shrink-0 shadow-2xl cursor-pointer group"
            >
              <img
                src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
                alt="মালাই চা"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <span className="absolute bottom-2 left-2 bg-slate-950/90 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-500/40">
                মাটকা বাটি
              </span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>কেরাণীগঞ্জের সেরা স্পেশাল মালাই চা</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                খাঁটি ঘন দুধের সর ও মালাই সমৃদ্ধ মালাই চা
              </h3>

              <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl leading-relaxed">
                মাস্টারশেফ রব্বির নিজস্ব রেসিপিতে খাঁটি গরুর দুধ ঘন করে জ্বাল দেওয়া ও ওপরের খাঁটি নরম মালাই দিয়ে পরিবেশিত কফি পয়েন্টের বিখ্যাত মালাই চা।
              </p>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-2xl font-black text-amber-400">৳১৫</span>
                <span className="text-xs text-slate-400 line-through">৳২০</span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                  ৫৳ ছাড়
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={(e) => {
                const teaItem = menuItems.find(i => i.id === 'malai-tea');
                if (teaItem) handleQuickAdd(e, teaItem);
              }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-xl transition transform active:scale-95 text-sm"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>+ কার্টে মালাই চা নিন (১৫৳)</span>
            </button>

            <button
              onClick={() => {
                const teaItem = menuItems.find(i => i.id === 'malai-tea');
                if (teaItem && onOpenArView) onOpenArView(teaItem);
              }}
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold px-5 py-2.5 rounded-2xl border border-amber-500/40 transition text-xs"
            >
              <Box className="w-4 h-4 text-amber-400" />
              <span>৩ডি AR মডেলে কাপটি দেখুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Control Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'খাবারের নাম লিখে খুঁজুন (যেমন: বার্গার, কফি, শর্মা)...' : 'Search menu items...'}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-700/80 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Toggle Filters */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => setOnlyChefSpecial(!onlyChefSpecial)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium border transition-all ${
                onlyChefSpecial
                  ? 'bg-amber-500 text-zinc-950 font-bold border-amber-400 shadow-md'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'মাস্টারশেফ স্পেশাল' : 'Chef Special Only'}</span>
            </button>

            {/* Price Filter Slider */}
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3.5 py-1.5 rounded-xl text-zinc-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'সর্বোচ্চ:' : 'Max:'} <strong className="text-amber-400">{priceRange}৳</strong></span>
              <input
                type="range"
                min="15"
                max="200"
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-20 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-zinc-800/80">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
                }`}
              >
                <span>{lang === 'bn' ? cat.nameBn : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Item Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs text-zinc-400 px-1">
          <span>
            {lang === 'bn' 
              ? `মোট ${filteredItems.length} টি আইটেম পাওয়া গেছে`
              : `Found ${filteredItems.length} items`}
          </span>
          {priceRange < 200 && (
            <span className="text-amber-400">
              {lang === 'bn' ? `মূল্য সীমা: ৳১৫ - ৳${priceRange}` : `Price limit: 15 - ${priceRange} BDT`}
            </span>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-12 text-center space-y-4">
            <Info className="w-12 h-12 text-amber-500/50 mx-auto" />
            <h3 className="text-lg font-bold text-white">
              {lang === 'bn' ? 'কোনো খাবার পাওয়া যায়নি' : 'No items found'}
            </h3>
            <p className="text-zinc-400 text-xs max-w-md mx-auto">
              {lang === 'bn' 
                ? 'অন্য কোনো নাম বা বাজেট ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।'
                : 'Try clearing your search or adjusting the price slider.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange(200);
                setOnlyChefSpecial(false);
              }}
              className="bg-amber-500 text-zinc-950 font-bold px-4 py-2 rounded-xl text-xs"
            >
              {lang === 'bn' ? 'সব রিসেট করুন' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item, idx) => {
              const isAdded = addedItemIds[item.id];
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => onSelectItem(item)}
                  className="group bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                >
                  <div>
                    {/* Item Image Box */}
                    <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.nameBn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.isChefSpecial && (
                          <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                            <Award className="w-3 h-3 text-zinc-950" />
                            {lang === 'bn' ? 'মাস্টারশেফ স্পেশাল' : 'Chef Special'}
                          </span>
                        )}
                        {item.isPopular && !item.isChefSpecial && (
                          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                            {lang === 'bn' ? 'জনপ্রিয়' : 'Popular'}
                          </span>
                        )}
                      </div>

                      {/* Preparation Time */}
                      {item.preparationTime && (
                        <div className="absolute bottom-2.5 left-3 text-[10px] text-zinc-300 bg-zinc-950/80 border border-zinc-800 px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-sm">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{item.preparationTime}</span>
                        </div>
                      )}

                      {/* Price Tag Badge */}
                      <div className="absolute bottom-2.5 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-black text-sm px-3 py-1 rounded-xl shadow-xl flex items-center gap-0.5">
                        <span>{item.price}</span>
                        <span className="text-xs">৳</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors font-serif">
                          {lang === 'bn' ? item.nameBn : item.nameEn}
                        </h3>
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {lang === 'bn' ? item.descriptionBn : item.descriptionEn}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 pt-0 flex items-center gap-2">
                    {onOpenArView && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenArView(item);
                        }}
                        className="py-2.5 px-3 rounded-xl text-xs font-extrabold bg-amber-950/60 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-1 shrink-0"
                        title="৩ডি মডেল ও AR ভিউ দেখুন"
                      >
                        <Box className="w-4 h-4 text-amber-400 group-hover:text-slate-950" />
                        <span>৩ডি</span>
                      </button>
                    )}

                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isAdded
                          ? 'bg-emerald-500 text-zinc-950'
                          : 'bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-amber-300 border border-zinc-700/80'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{lang === 'bn' ? 'যোগ করা হয়েছে' : 'Added!'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>{lang === 'bn' ? 'অর্ডারে যোগ করুন' : 'Add to Order'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
