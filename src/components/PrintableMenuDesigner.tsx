import React, { useState } from 'react';
import { 
  Printer, 
  Palette, 
  QrCode, 
  PhoneCall, 
  Award, 
  LayoutGrid, 
  Check, 
  Sparkles,
  Info,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { PrintConfig, PrintTemplate } from '../types';

export const PrintableMenuDesigner: React.FC = () => {
  const [config, setConfig] = useState<PrintConfig>({
    template: 'luxury-gold',
    paperSize: 'a4',
    columns: 2,
    showImages: true,
    showQR: true,
    showChefNote: true,
    customHotline: RESTAURANT_INFO.phone,
    customNotice: 'হোম ডেলিভারি সার্ভিস উপলব্ধ | কাস্টম পার্টি অর্ডারের জন্য অগ্রিম কল করুন।',
    currencySymbol: '৳'
  });

  const handlePrint = () => {
    window.print();
  };

  // Group items by category for menu layout
  const categoriesMap: { [key: string]: { titleBn: string; titleEn: string; items: typeof MENU_ITEMS } } = {
    burger: { titleBn: 'বার্গার সেকশন', titleEn: 'Burgers', items: MENU_ITEMS.filter(i => i.category === 'burger') },
    sandwich: { titleBn: 'সাব স্যান্ডুইচ', titleEn: 'Sub Sandwiches', items: MENU_ITEMS.filter(i => i.category === 'sandwich') },
    shawarma: { titleBn: 'শর্মা আইটেম', titleEn: 'Shawarma', items: MENU_ITEMS.filter(i => i.category === 'shawarma') },
    chowmein: { titleBn: 'চাওমিন ও নুডলস', titleEn: 'Chowmein', items: MENU_ITEMS.filter(i => i.category === 'chowmein') },
    coffee: { titleBn: 'কফি পয়েন্ট স্পেশাল', titleEn: 'Coffee Specials', items: MENU_ITEMS.filter(i => i.category === 'coffee') },
    tea: { titleBn: 'মালাই চা ও রুটি', titleEn: 'Malai Tea & Roti', items: MENU_ITEMS.filter(i => i.category === 'tea') },
    snacks: { titleBn: 'স্ন্যাক্স ও ফ্রাইজ', titleEn: 'Snacks & Fries', items: MENU_ITEMS.filter(i => i.category === 'snacks') },
    combos: { titleBn: 'ধামাকা কম্বো প্যাকেজ', titleEn: 'Value Combos', items: MENU_ITEMS.filter(i => i.category === 'combos') },
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner explaining Printable Menu */}
      <div className="no-print bg-zinc-900 border border-amber-800/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 mb-2">
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>প্রিন্ট ও ফিজিক্যাল মেন্যু কার্ড ডিজাইনার</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-amber-400">
              কফি পয়েন্ট এর জন্য ইউনিক প্রিন্টেবল মেন্যু
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mt-1">
              রেস্টুরেন্টের ডাইনিং টেবিল, কাউন্টার বা ওয়ালে ঝুলানোর জন্য চোখধাঁধানো ফিজিক্যাল মেন্যু কার্ড তৈরি করুন। থিম পরিবর্তন করুন, কাস্টম নোট লিখুন এবং এক ক্লিকে প্রিন্ট বা PDF সেভ করুন।
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black px-6 py-3 rounded-2xl shadow-xl shadow-amber-500/20 transition-all transform hover:scale-105"
          >
            <Printer className="w-5 h-5 text-zinc-950" />
            <span>প্রিন্ট বা PDF সেভ করুন</span>
          </button>
        </div>

        {/* Customization Controls Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-zinc-800 text-xs">
          {/* Template Theme Selector */}
          <div className="space-y-1.5">
            <label className="text-amber-300 font-bold flex items-center gap-1">
              <Palette className="w-3.5 h-3.5" />
              <span>মেন্যু থিম ডিজাইন:</span>
            </label>
            <select
              value={config.template}
              onChange={(e) => setConfig({ ...config, template: e.target.value as PrintTemplate })}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-500"
            >
              <option value="luxury-gold">✨ লাক্সারি গোল্ড & ডার্ক (Luxury Gold)</option>
              <option value="vintage-craft">📜 ভিন্টেজ উডেন ক্রাফট (Vintage Parchment)</option>
              <option value="modern-cafe">☕ মডার্ন অরেঞ্জ ক্যাফে (Modern Amber)</option>
              <option value="compact-table-tent">📌 টেবিল স্ট্যান্ড / টেন্ট কার্ড (Table Stand)</option>
            </select>
          </div>

          {/* Paper & Columns Selector */}
          <div className="space-y-1.5">
            <label className="text-amber-300 font-bold flex items-center gap-1">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>কলাম ও পেপার সাইজ:</span>
            </label>
            <div className="flex gap-2">
              <select
                value={config.columns}
                onChange={(e) => setConfig({ ...config, columns: Number(e.target.value) as 1 | 2 | 3 })}
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-500"
              >
                <option value={1}>১ কলাম</option>
                <option value={2}>২ কলাম</option>
                <option value={3}>৩ কলাম</option>
              </select>
              <select
                value={config.paperSize}
                onChange={(e) => setConfig({ ...config, paperSize: e.target.value as any })}
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-500"
              >
                <option value="a4">A4 সাইজ</option>
                <option value="a5">A5 সাইজ</option>
                <option value="table-card">টেবিল স্ট্যান্ড</option>
              </select>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-1.5">
            <label className="text-amber-300 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ছবি ও QR কোড প্রদর্শন:</span>
            </label>
            <div className="flex items-center gap-3 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300">
                <input
                  type="checkbox"
                  checked={config.showImages}
                  onChange={(e) => setConfig({ ...config, showImages: e.target.checked })}
                  className="accent-amber-500 rounded"
                />
                <span>খাবারের ছবি</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300">
                <input
                  type="checkbox"
                  checked={config.showQR}
                  onChange={(e) => setConfig({ ...config, showQR: e.target.checked })}
                  className="accent-amber-500 rounded"
                />
                <span>QR কোড</span>
              </label>
            </div>
          </div>

          {/* Hotline & Notice */}
          <div className="space-y-1.5">
            <label className="text-amber-300 font-bold flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>হটলাইন কন্টাক্ট:</span>
            </label>
            <input
              type="text"
              value={config.customHotline}
              onChange={(e) => setConfig({ ...config, customHotline: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-white text-xs"
              placeholder="হটলাইন নম্বর"
            />
          </div>
        </div>
      </div>

      {/* PRINTABLE MENU CONTAINER (This is rendered for print & screen preview) */}
      <div className="menu-print-wrapper flex justify-center overflow-x-auto p-2">
        <div 
          className={`menu-print-board relative transition-all duration-300 shadow-2xl rounded-2xl ${
            config.paperSize === 'a4' 
              ? 'w-[210mm] min-h-[297mm] p-[10mm]' 
              : config.paperSize === 'a5' 
                ? 'w-[148mm] min-h-[210mm] p-[8mm]' 
                : 'w-[180mm] min-h-[250mm] p-[8mm]'
          } ${
            config.template === 'luxury-gold'
              ? 'bg-zinc-950 text-amber-100 border-4 border-amber-500/80'
              : config.template === 'vintage-craft'
                ? 'bg-[#f4ebd0] text-[#3e2723] border-4 border-[#5d4037]'
                : config.template === 'modern-cafe'
                  ? 'bg-white text-zinc-900 border-4 border-amber-500'
                  : 'bg-zinc-900 text-white border-4 border-amber-400'
          }`}
        >
          {/* Inner Decorative Border */}
          <div 
            className={`w-full h-full p-4 md:p-6 rounded-xl flex flex-col justify-between ${
              config.template === 'luxury-gold'
                ? 'border border-amber-500/40 bg-zinc-950/95'
                : config.template === 'vintage-craft'
                  ? 'border-2 border-dashed border-[#8d6e63]'
                  : config.template === 'modern-cafe'
                    ? 'border border-amber-200 bg-amber-50/20'
                    : 'border-2 border-amber-400/60 bg-zinc-950/80'
            }`}
          >
            {/* Header / Brand Badge Section */}
            <div className="text-center space-y-2 pb-4 border-b border-amber-500/30">
              <div className="flex justify-center items-center gap-2">
                <span className="text-amber-500 text-xs uppercase tracking-widest font-bold">
                  ★ {RESTAURANT_INFO.chefBn} ★
                </span>
              </div>

              <h1 
                className={`text-3xl sm:text-4xl font-black font-serif tracking-tight ${
                  config.template === 'luxury-gold'
                    ? 'text-amber-400 drop-shadow'
                    : config.template === 'vintage-craft'
                      ? 'text-[#3e2723]'
                      : config.template === 'modern-cafe'
                        ? 'text-amber-600'
                        : 'text-amber-300'
                }`}
              >
                {RESTAURANT_INFO.nameBn}
              </h1>

              <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{RESTAURANT_INFO.locationBn}</span>
              </div>

              <p className="text-[11px] italic opacity-80 font-medium">
                "{RESTAURANT_INFO.sloganBn}"
              </p>
            </div>

            {/* Menu Items Categories Grid */}
            <div 
              className={`grid gap-6 my-4 ${
                config.columns === 1 
                  ? 'grid-cols-1' 
                  : config.columns === 2 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
              }`}
            >
              {Object.keys(categoriesMap).map((catKey) => {
                const category = categoriesMap[catKey];
                if (!category.items || category.items.length === 0) return null;

                return (
                  <div 
                    key={catKey} 
                    className={`space-y-2 p-3 rounded-xl border ${
                      config.template === 'luxury-gold'
                        ? 'bg-zinc-900/60 border-amber-900/40'
                        : config.template === 'vintage-craft'
                          ? 'bg-[#eefeeb]/30 border-[#bcaaa4]'
                          : config.template === 'modern-cafe'
                            ? 'bg-amber-50/50 border-amber-200'
                            : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    {/* Category Title */}
                    <div className="flex items-center gap-2 pb-1.5 border-b border-amber-500/30">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <h2 
                        className={`text-sm font-bold font-serif uppercase tracking-wider ${
                          config.template === 'luxury-gold'
                            ? 'text-amber-300'
                            : config.template === 'vintage-craft'
                              ? 'text-[#4e342e]'
                              : config.template === 'modern-cafe'
                                ? 'text-amber-700'
                                : 'text-amber-400'
                        }`}
                      >
                        {category.titleBn}
                      </h2>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2.5 pt-1">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-start justify-between gap-2 group">
                          {config.showImages && (
                            <img
                              src={item.image}
                              alt={item.nameBn}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-lg object-cover border border-amber-500/30 flex-shrink-0"
                            />
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-1">
                              <h3 className="text-xs font-bold font-serif truncate">
                                {item.nameBn}
                                {item.isChefSpecial && (
                                  <span className="ml-1 text-[9px] text-amber-500 font-sans">
                                    ★
                                  </span>
                                )}
                              </h3>

                              {/* Dotted Leader Line */}
                              <div className="flex-1 border-b border-dotted border-current opacity-30 mx-1" />

                              <span className="text-xs font-black font-mono text-amber-500 whitespace-nowrap">
                                {item.price} {config.currencySymbol}
                              </span>
                            </div>

                            <p className="text-[10px] opacity-70 line-clamp-1">
                              {item.descriptionBn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Notice & QR Code Section */}
            <div className="pt-4 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="font-bold flex items-center justify-center sm:justify-start gap-1 text-amber-500">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>অর্ডার করতে কল করুন: {config.customHotline}</span>
                </div>
                <p className="text-[10px] opacity-80">
                  {config.customNotice}
                </p>
              </div>

              {config.showQR && (
                <div className="flex items-center gap-3 bg-white/10 p-2 rounded-xl border border-amber-500/30">
                  <div className="bg-white p-1.5 rounded-lg shadow-inner">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent('https://coffeepoint-keraniganj.app')}`}
                      alt="Menu QR Code"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12"
                    />
                  </div>
                  <div className="text-[10px] font-medium leading-tight">
                    <strong className="block text-amber-400">স্ক্যান করে স্পেশাল ছাড় পান!</strong>
                    <span>মোবাইলে ইন্টারেক্টিভ অর্ডার</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
