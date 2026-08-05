import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Utensils, 
  Box, 
  Camera, 
  Bot, 
  ImageIcon, 
  Star, 
  Sparkles, 
  Printer, 
  ShieldCheck, 
  Bell, 
  Gift, 
  ChefHat, 
  MessageSquare, 
  PhoneCall, 
  Facebook, 
  MapPin, 
  Award,
  ChevronRight,
  Tv,
  Film,
  Lock,
  QrCode,
  Sun,
  Moon
} from 'lucide-react';
import { AppTab } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { sounds } from '../lib/soundEffects';

interface MenuSidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenChefModal?: () => void;
  onOpenTableService?: () => void;
  onOpenLuckySpin?: () => void;
  onOpenQrModal?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const MenuSidebarDrawer: React.FC<MenuSidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  isDarkMode = true,
  onToggleTheme,
}) => {
  const mainPages = [
    { id: 'menu' as AppTab, labelBn: 'ডিজিটাল ফুড মেন্যু', descBn: 'ক্যাটাগরি, মূল্য ও অনলাইন অর্ডার লিস্ট', icon: Utensils, badge: 'মেনু' },
    { id: 'chef' as AppTab, labelBn: 'মাস্টারশেফ রব্বির প্রোফাইল', descBn: 'কুকিং বায়োগ্রাফি, ফিলোসফি ও কন্টাক্ট', icon: ChefHat, badge: 'শেফ' },
    { id: 'videos' as AppTab, labelBn: 'ভিডিও শোকেস ও ফেসবুক রিলস', descBn: 'শেফের কিচেন ভিডিও ও স্পেশাল মেকিং', icon: Film, badge: 'HD রিলস' },
    { id: 'table-service' as AppTab, labelBn: 'টেবিল ওয়েটার সার্ভিস বেল', descBn: 'ওয়েটার ডাকার স্মার্ট ডিজিটাল কল বেল', icon: Bell, badge: 'সার্ভিস' },
    { id: 'spin' as AppTab, labelBn: 'লাকি হুইল কুপন স্পিন', descBn: 'চাকা ঘুরে জিতুন ফ্রি মালাই চা ও ডিসকাউন্ট', icon: Gift, badge: 'কুপন' },
    { id: 'qr' as AppTab, labelBn: 'টেবিল QR কোড স্টিকার', descBn: 'প্রতি টেবিলের স্ট্যান্ডি ডায়নামিক QR জেনারেটর', icon: QrCode, badge: 'QR' },
    { id: 'ar' as AppTab, labelBn: '৩ডি AR ফুড স্টুডিও', descBn: 'টেবিলে খাবারের ৩ডি মডেল ও ৩৬০° ভিউ', icon: Box, badge: 'AR' },
    { id: 'camera' as AppTab, labelBn: '৩ডি ফটো স্টুডিও ও ফিল্টার', descBn: 'খাবারের ছবি তুলুন ও স্টিকার যোগ করুন', icon: Camera, badge: 'স্টুডিও' },
    { id: 'ai' as AppTab, labelBn: 'শেফ রব্বির এআই অ্যাসিস্ট্যান্ট', descBn: 'রেসিপি জানা ও খাবারের পরামর্শ', icon: Bot, badge: 'AI' },
    { id: 'gallery' as AppTab, labelBn: 'ফটো গ্যালারি ও আড্ডা', descBn: 'কফি পয়েন্টের সুন্দর মুহূর্তসমূহ', icon: ImageIcon, badge: 'ছবি' },
    { id: 'reviews' as AppTab, labelBn: 'কাস্টমার রিভিউ ও রেটিং', descBn: 'গ্রাহকদের রিভিউ ও ফিডব্যাক', icon: Star, badge: '৪.৯★' },
    { id: 'combo' as AppTab, labelBn: 'ধামাকা কম্বো বিল্ডার', descBn: 'কাস্টম কম্বো বানিয়ে বিশেষ ছাড়', icon: Sparkles, badge: 'কম্বো' },
    { id: 'print' as AppTab, labelBn: 'প্রিন্টেবল মেন্যু মেকার', descBn: 'রেস্তোরাঁর প্রিন্টেড মেন্যু পেপার ডিজাইন', icon: Printer, badge: 'প্রিন্ট' },
    { id: 'superadmin' as AppTab, labelBn: 'সুপার অ্যাডমিন প্যানেল (লকড)', descBn: 'পাসওয়ার্ড প্রটেক্টেড কন্ট্রোল সেন্টার', icon: Lock, badge: 'অ্যাডমিন' },
  ];

  const handleTabSelect = (tab: AppTab) => {
    sounds.playClick();
    setActiveTab(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-slate-950/80 backdrop-blur-md">
          {/* Backdrop dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Drawer Sidebar Content */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative z-10 w-full max-w-xs sm:max-w-sm h-full bg-slate-900 border-r border-amber-500/30 text-white flex flex-col shadow-2xl overflow-y-auto no-scrollbar"
          >
            {/* Drawer Top Header */}
            <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-950 border border-amber-400/50 p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={RESTAURANT_INFO.logoUrl}
                    alt={RESTAURANT_INFO.nameEn}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h2 className="text-base font-bold font-serif text-amber-300">
                    {RESTAURANT_INFO.nameBn}
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {RESTAURANT_INFO.chefBn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {onToggleTheme && (
                  <button
                    onClick={onToggleTheme}
                    className="p-2 rounded-full bg-slate-800 text-amber-400 hover:bg-slate-700 transition"
                    title="থিম পরিবর্তন করুন"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Navigation List */}
            <div className="p-4 space-y-4 flex-1">
              
              {/* Masterchef Profile Card Banner */}
              <div 
                onClick={() => handleTabSelect('chef')}
                className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/40 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer hover:border-amber-400 transition group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 bg-amber-950">
                    <img
                      src="/input_file_4.png"
                      alt="Chef Rabby"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-amber-300">মাস্টারশেফ রব্বি</span>
                      <Award className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="text-[10px] text-slate-300">রান্না একটি আর্ট • বায়োগ্রাফি ও গ্যালাই</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Navigation Options List */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider px-2 mb-1">
                  সকল পেজ ও নেভিগেশন
                </div>
                {mainPages.map((page) => {
                  const Icon = page.icon;
                  const isActive = activeTab === page.id;

                  return (
                    <button
                      key={page.id}
                      onClick={() => handleTabSelect(page.id)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-md'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-amber-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{page.labelBn}</div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">{page.descBn}</div>
                        </div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 font-mono shrink-0 ml-2">
                        {page.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Direct Chef Contact Links */}
              <div className="p-3.5 bg-slate-950 border border-amber-900/30 rounded-2xl space-y-2.5">
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" />
                  সরাসরি যোগাযোগ ও বুকিং
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={RESTAURANT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-[11px] font-bold text-emerald-300 flex items-center justify-center gap-1.5 hover:bg-emerald-900/60 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    হোয়াটসঅ্যাপ
                  </a>

                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="p-2 bg-amber-950/60 border border-amber-500/40 rounded-xl text-[11px] font-bold text-amber-300 flex items-center justify-center gap-1.5 hover:bg-amber-900/60 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    কল করুন
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
                  <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{RESTAURANT_INFO.locationBn}</span>
                </div>
              </div>

            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-800 text-center text-[10px] text-slate-500">
              কফি পয়েন্ট প্রিমিয়াম অ্যাপ • Masterchef Rabby © 2026
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
