import React, { useState } from 'react';
import { 
  Coffee, 
  Printer, 
  Sparkles, 
  Bot, 
  MapPin, 
  ShoppingBag, 
  QrCode, 
  Award,
  PhoneCall,
  Camera,
  Image as ImageIcon,
  Star,
  ShieldCheck,
  Bell,
  Gift,
  Volume2,
  VolumeX,
  Box,
  Menu
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { AppTab } from '../types';
import { sounds } from '../lib/soundEffects';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  setIsQrModalOpen: (open: boolean) => void;
  setIsTableServiceOpen: (open: boolean) => void;
  setIsLuckySpinOpen: (open: boolean) => void;
  onOpenSidebar: () => void;
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  setIsQrModalOpen,
  setIsTableServiceOpen,
  setIsLuckySpinOpen,
  onOpenSidebar,
  lang,
  setLang,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(sounds.getMuted());

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-amber-900/30 text-white shadow-xl transition-all">
      {/* Top Bar with Info & Quick Actions */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-amber-200/90 py-1.5 px-4 text-xs font-medium border-b border-amber-800/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              {RESTAURANT_INFO.chefBn}
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-amber-500" />
              {RESTAURANT_INFO.locationBn}
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Table Waiter Call Bell Button */}
            <button
              onClick={() => setIsTableServiceOpen(true)}
              className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/40 text-[11px] font-bold transition shadow-sm animate-pulse"
              title="টেবিল ওয়েটার কল করুন"
            >
              <Bell className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">ওয়েটার বেল</span>
            </button>

            {/* Lucky Spin Wheel Button */}
            <button
              onClick={() => setIsLuckySpinOpen(true)}
              className="flex items-center gap-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/40 text-[11px] font-bold transition shadow-sm"
              title="লাকি হুইল স্পিন করুন ও কুপন জিতুন"
            >
              <Gift className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">লাকি কুপন</span>
            </button>

            <a 
              href={`tel:${RESTAURANT_INFO.phone}`} 
              className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="hidden lg:flex items-center gap-1 bg-amber-900/40 hover:bg-amber-800/60 text-amber-200 px-2.5 py-0.5 rounded-full border border-amber-600/30 text-[11px] transition"
              title="টেবিলের জন্য QR কোড স্টিকার জেনারেট করুন"
            >
              <QrCode className="w-3 h-3 text-amber-400" />
              <span>QR কোড</span>
            </button>

            {/* Sound Effects Toggle */}
            <button
              onClick={handleToggleMute}
              className="p-1 rounded bg-slate-900 border border-slate-700 text-amber-400 hover:text-amber-300 transition"
              title={isMuted ? 'সাউন্ড সাউন্ড অন করুন' : 'সাউন্ড মিউট করুন'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-amber-100 px-2 py-0.5 rounded border border-slate-700 font-semibold"
            >
              {lang === 'bn' ? 'ENGLISH' : 'বাংলা'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Menu Sidebar Hamburger Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSidebar();
            }}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 rounded-2xl transition shadow-md flex items-center gap-1.5"
            title="মেনু সাইডবার ড্রয়ার খুলুন"
          >
            <Menu className="w-5 h-5 text-amber-400" />
            <span className="hidden sm:inline text-xs font-bold text-amber-300">মেন্যুবার</span>
          </button>

          <div 
            onClick={() => setActiveTab('menu')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-950/80 p-0.5 shadow-lg shadow-amber-900/40 border border-amber-400/40 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
                <img
                  src={RESTAURANT_INFO.logoUrl}
                  alt={RESTAURANT_INFO.nameEn}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 text-[9px] font-black px-1 rounded-full border border-slate-950">
                LIVE
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white font-serif group-hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? RESTAURANT_INFO.nameBn : RESTAURANT_INFO.nameEn}
                </h1>
                <span className="hidden xs:inline-block bg-amber-950/80 border border-amber-700/50 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  গদাবাগ
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-200/70 font-medium truncate max-w-[150px] sm:max-w-none">
                {lang === 'bn' ? RESTAURANT_INFO.chefBn : RESTAURANT_INFO.chefEn}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>ডিজিটাল মেন্যু</span>
          </button>

          <button
            onClick={() => setActiveTab('ar')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ar'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-amber-300 hover:text-amber-100 hover:bg-amber-950/40 border border-amber-500/30'
            }`}
          >
            <Box className="w-4 h-4 text-amber-400" />
            <span>AR ৩ডি মেন্যু</span>
          </button>

          <button
            onClick={() => setActiveTab('camera')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'camera'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-amber-300 hover:text-amber-100 hover:bg-amber-950/40 border border-amber-500/30'
            }`}
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>৩ডি স্টুডিও</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'ai'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-amber-300 hover:text-amber-100 hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>এআই শেয়ার</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'gallery'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>গ্যালারি</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'reviews'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400" />
            <span>রিভিউ</span>
          </button>

          <button
            onClick={() => setActiveTab('superadmin')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'superadmin'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-amber-400 font-bold hover:bg-amber-500/20'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>সুপার অ্যাডমিন</span>
          </button>
        </nav>

        {/* Right Cart Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-2xl shadow-lg transition-all transform active:scale-95"
          >
            <ShoppingBag className="w-5 h-5 text-slate-950" />
            <span className="hidden sm:inline">অর্ডার লিস্ট</span>
            {cartCount > 0 && (
              <span className="bg-slate-950 text-amber-400 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border border-amber-400/50 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
