import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  ImageIcon, 
  ShoppingBag, 
  Menu, 
  Film, 
  Plus, 
  X, 
  MessageSquare, 
  PhoneCall, 
  Coffee, 
  Bell, 
  Sparkles 
} from 'lucide-react';
import { AppTab } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { sounds } from '../lib/soundEffects';

interface GlassBottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
  onOpenSidebar: () => void;
  onOpenChefModal: () => void;
  onOpenTableService: () => void;
  onQuickOrderTea: () => void;
}

export const GlassBottomNav: React.FC<GlassBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  setIsCartOpen,
  onOpenSidebar,
  onOpenChefModal,
  onOpenTableService,
  onQuickOrderTea,
}) => {
  const [isFabOpen, setIsFabOpen] = useState<boolean>(false);

  const toggleFab = () => {
    sounds.playClick();
    setIsFabOpen(!isFabOpen);
  };

  const quickFabActions = [
    {
      id: 'whatsapp',
      label: 'শেফ ওয়াটসঅ্যাপ',
      subLabel: '+8801319885649',
      icon: MessageSquare,
      color: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400',
      action: () => {
        sounds.playClick();
        setIsFabOpen(false);
        window.open(RESTAURANT_INFO.whatsappUrl, '_blank');
      }
    },
    {
      id: 'call',
      label: 'সরাসরি ফোন কল',
      subLabel: '01712-345678',
      icon: PhoneCall,
      color: 'bg-amber-500 text-slate-950 hover:bg-amber-400',
      action: () => {
        sounds.playClick();
        setIsFabOpen(false);
        window.location.href = `tel:${RESTAURANT_INFO.phone}`;
      }
    },
    {
      id: 'tea',
      label: '১৫৳ মালাই চা অর্ডার',
      subLabel: 'খাঁটি দুধের মাটকা চা',
      icon: Coffee,
      color: 'bg-amber-700 text-amber-100 hover:bg-amber-600',
      action: () => {
        sounds.playClick();
        setIsFabOpen(false);
        onQuickOrderTea();
      }
    },
    {
      id: 'waiter',
      label: 'ওয়েটার বেল',
      subLabel: 'টেবিল সার্ভিসের জন্য কল',
      icon: Bell,
      color: 'bg-red-600 text-white hover:bg-red-500',
      action: () => {
        sounds.playWaiterBell();
        setIsFabOpen(false);
        onOpenTableService();
      }
    }
  ];

  return (
    <>
      {/* Floating (+) Quick Actions Modal Backdrop */}
      <AnimatePresence>
        {isFabOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 backdrop-blur-md pb-24 px-4">
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsFabOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-sm bg-slate-900 border border-amber-500/40 rounded-3xl p-5 shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">কুইক সার্ভিস অ্যান্ড কন্টাক্ট</h4>
                    <p className="text-[10px] text-amber-300">কফি পয়েন্টে আপনাকে স্বাগতম</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsFabOpen(false)}
                  className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {quickFabActions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.id}
                      onClick={act.action}
                      className="p-3 bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl flex flex-col items-start gap-1.5 transition text-left group"
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${act.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          {act.label}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {act.subLabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={() => setIsFabOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 underline"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* App-like Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-1 pointer-events-none">
        <div className="max-w-lg mx-auto pointer-events-auto">
          <div className="relative backdrop-blur-2xl bg-slate-950/95 border border-amber-500/30 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] px-3 py-1.5 flex items-center justify-between">
            
            {/* Top Glowing Accent Line */}
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

            {/* TAB 1: 🍽️ ডিজিটাল মেনু */}
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('menu');
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                activeTab === 'menu'
                  ? 'text-amber-400 font-bold scale-105 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-400 hover:text-amber-200'
              }`}
            >
              <Utensils className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold tracking-tight">মেন্যু</span>
            </button>

            {/* TAB 2: 🎥 শেফ ও ভিডিও */}
            <button
              onClick={() => {
                sounds.playClick();
                if (onOpenChefModal) onOpenChefModal();
                else setActiveTab('chef');
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                activeTab === 'chef' || activeTab === 'videos'
                  ? 'text-amber-400 font-bold scale-105 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-400 hover:text-amber-200'
              }`}
            >
              <Film className="w-5 h-5 mb-0.5 text-amber-400" />
              <span className="text-[10px] font-bold tracking-tight text-amber-300">শেফ ও ভিডিও</span>
            </button>

            {/* CENTER ELEVATED FLOATING (+) ACTION BUTTON */}
            <div className="relative -top-5 z-10 mx-1">
              <motion.button
                onClick={toggleFab}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-[0_8px_25px_rgba(245,158,11,0.6)] border-4 border-slate-950 focus:outline-none"
              >
                {/* Ping Pulse Outer Ring */}
                <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping pointer-events-none opacity-50" />

                <motion.div
                  animate={{ rotate: isFabOpen ? 135 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Plus className="w-7 h-7 text-slate-950 stroke-[3]" />
                </motion.div>
              </motion.button>
            </div>

            {/* TAB 3: 🖼️ ফটো গ্যালারি */}
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('gallery');
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                activeTab === 'gallery'
                  ? 'text-amber-400 font-bold scale-105 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-400 hover:text-amber-200'
              }`}
            >
              <ImageIcon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold tracking-tight">গ্যালারি</span>
            </button>

            {/* TAB 4: ☰ মেনু সাইডবার ড্রয়ার */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenSidebar();
              }}
              className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 text-slate-400 hover:text-amber-200"
            >
              <Menu className="w-5 h-5 mb-0.5 text-amber-400" />
              <span className="text-[10px] font-bold tracking-tight text-amber-300">মেনুবার</span>
            </button>

            {/* Cart Floating Action Badge Button on Far Right */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsCartOpen(true);
              }}
              className="relative p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-2xl shadow-lg hover:brightness-110 active:scale-95 transition-all ml-1 shrink-0"
              title="অর্ডার কার্ট"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

          </div>
        </div>
      </div>
    </>
  );
};
