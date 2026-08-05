import React from 'react';
import { Heart } from 'lucide-react';

export const DeveloperCredit: React.FC = () => {
  return (
    <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-slate-400 text-xs space-y-2">
      <div className="flex items-center justify-center gap-1.5 font-medium text-slate-300">
        <span>Crafted with</span>
        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse inline" />
        <span>by</span>
        <a 
          href="https://seeam.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white font-bold hover:text-amber-400 underline decoration-amber-500/50 hover:decoration-amber-400 transition-colors"
        >
          Seeam Rahman
        </a>
      </div>
      <div className="text-[11px] text-slate-500 font-serif">
        © 2026 সর্বস্বত্ব সংরক্ষিত • কফি পয়েন্ট
      </div>
    </footer>
  );
};
