import React, { useState } from 'react';
import { X, QrCode, Printer, Wifi, Coffee, MapPin, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface QrTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrTableModal: React.FC<QrTableModalProps> = ({ isOpen, onClose }) => {
  const [tableNumber, setTableNumber] = useState<string>('১');
  const [wifiPass, setWifiPass] = useState<string>('coffeepoint2026');

  if (!isOpen) return null;

  const handlePrintSticker = () => {
    window.print();
  };

  const menuUrl = `https://coffeepoint-keraniganj.app?table=${encodeURIComponent(tableNumber)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-zinc-950 border border-amber-800/60 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0 text-white relative">
        {/* Header */}
        <div className="no-print p-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">টেবিল QR কোড স্টিকার জেনারেটর</h3>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="no-print p-4 bg-zinc-900/50 border-b border-zinc-800 flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-bold">টেবিল নম্বর:</span>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-amber-400 font-bold w-20 text-center"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-bold">ওয়াইফাই পাসওয়ার্ড:</span>
            <input
              type="text"
              value={wifiPass}
              onChange={(e) => setWifiPass(e.target.value)}
              className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-white font-mono w-32"
            />
          </div>

          <button
            onClick={handlePrintSticker}
            className="ml-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3 py-1 rounded-lg flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>প্রিন্ট করুন</span>
          </button>
        </div>

        {/* STICKER PRINT DISPLAY BOARD */}
        <div className="p-6 flex justify-center bg-zinc-900/30">
          <div className="w-[85mm] min-h-[110mm] bg-zinc-950 border-4 border-amber-500 p-5 rounded-3xl text-center space-y-3 shadow-2xl text-white relative">
            <div className="flex justify-center items-center gap-1.5 text-amber-400 text-[10px] uppercase tracking-widest font-bold">
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>{RESTAURANT_INFO.nameBn}</span>
            </div>

            <h2 className="text-xl font-black font-serif text-amber-400">
              টেবিল নম্বর {tableNumber}
            </h2>

            <p className="text-[10px] text-zinc-300 font-medium">
              মোবাইলে ডিজিটাল মেন্যু দেখতে এবং সরাসরি ক্যাশিয়ারে অর্ডার পাঠাতে QR কোড স্ক্যান করুন:
            </p>

            {/* QR Code Frame */}
            <div className="bg-white p-3 rounded-2xl inline-block border-2 border-amber-400 shadow-xl my-1">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(menuUrl)}`}
                alt="Table QR Code"
                referrerPolicy="no-referrer"
                className="w-32 h-32 mx-auto"
              />
            </div>

            <div className="space-y-1 pt-1 border-t border-amber-500/30 text-[10px]">
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-mono font-bold">
                <Wifi className="w-3 h-3" />
                <span>ফ্রি ওয়াইফাই: {wifiPass}</span>
              </div>
              <div className="text-zinc-400 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3 text-amber-500" />
                <span>{RESTAURANT_INFO.locationBn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
