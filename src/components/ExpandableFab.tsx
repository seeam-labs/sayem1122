import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  X, 
  MessageSquare, 
  PhoneCall, 
  Facebook, 
  ChefHat, 
  Bell, 
  Coffee,
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { CHEF_DATA } from '../data/chefData';
import { sounds } from '../lib/soundEffects';

interface ExpandableFabProps {
  onOpenChefModal: () => void;
  onOpenTableService: () => void;
  onQuickOrderTea: () => void;
}

export const ExpandableFab: React.FC<ExpandableFabProps> = ({
  onOpenChefModal,
  onOpenTableService,
  onQuickOrderTea,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    sounds.playClick();
    setIsOpen(!isOpen);
  };

  const fabActions = [
    {
      id: 'whatsapp',
      label: 'শেফ ওয়াটসঅ্যাপ',
      subLabel: '+8801319885649',
      icon: MessageSquare,
      color: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400',
      action: () => {
        sounds.playClick();
        window.open(RESTAURANT_INFO.whatsappUrl, '_blank');
      }
    },
    {
      id: 'facebook',
      label: 'ফেসবুক পেজ',
      subLabel: 'Coffee Point FB',
      icon: Facebook,
      color: 'bg-blue-600 text-white hover:bg-blue-500',
      action: () => {
        sounds.playClick();
        window.open(RESTAURANT_INFO.facebookUrl, '_blank');
      }
    },
    {
      id: 'call',
      label: 'সরাসরি কল',
      subLabel: '01712-345678',
      icon: PhoneCall,
      color: 'bg-amber-500 text-slate-950 hover:bg-amber-400',
      action: () => {
        sounds.playClick();
        window.location.href = `tel:${RESTAURANT_INFO.phone}`;
      }
    },
    {
      id: 'chef',
      label: 'শেফ রব্বির প্রোফাইল',
      subLabel: 'কুয়েত ট্রেইন্ড শেফ',
      icon: ChefHat,
      color: 'bg-amber-700 text-amber-100 hover:bg-amber-600',
      action: () => {
        sounds.playClick();
        setIsOpen(false);
        onOpenChefModal();
      }
    },
    {
      id: 'waiter',
      label: 'ওয়েটার বেল',
      subLabel: 'টেবিল সার্ভিস',
      icon: Bell,
      color: 'bg-red-600 text-white hover:bg-red-500',
      action: () => {
        sounds.playWaiterBell();
        setIsOpen(false);
        onOpenTableService();
      }
    },
    {
      id: 'tea',
      label: 'মালাই চা অর্ডার (১৫৳)',
      subLabel: 'খাঁটি দুধের সর',
      icon: Coffee,
      color: 'bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100 hover:brightness-110',
      action: () => {
        sounds.playClick();
        setIsOpen(false);
        onQuickOrderTea();
      }
    }
  ];

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto relative">
        {/* Expanded Action List */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="mb-3 space-y-2.5 flex flex-col items-end"
            >
              {fabActions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center gap-2.5"
                  >
                    {/* Tooltip label */}
                    <div className="bg-slate-900/95 border border-amber-500/40 px-3 py-1.5 rounded-xl shadow-xl text-right backdrop-blur-md">
                      <div className="text-xs font-bold text-white leading-none">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-amber-300 font-mono mt-0.5">
                        {item.subLabel}
                      </div>
                    </div>

                    {/* Action Circle Button */}
                    <button
                      onClick={item.action}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 transition-transform hover:scale-110 active:scale-95 ${item.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Trigger Button */}
        <motion.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-[0_10px_30px_rgba(245,158,11,0.5)] border-2 border-amber-300 focus:outline-none"
        >
          {/* Animated Glow Pulse */}
          <span className="absolute -inset-1 rounded-2xl bg-amber-400/40 animate-ping pointer-events-none opacity-60" />

          {/* Icon */}
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative z-10"
          >
            <Plus className="w-7 h-7 text-slate-950 stroke-[3]" />
          </motion.div>

          {/* Quick badge icon when closed */}
          {!isOpen && (
            <span className="absolute -top-1 -left-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-slate-950 flex items-center gap-0.5 shadow">
              <Sparkles className="w-2.5 h-2.5" />
              হট
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};
