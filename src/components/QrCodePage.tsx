import React, { useState } from 'react';
import { QrCode, Download, Share2, Copy, Check, Sparkles, Coffee, ExternalLink, Printer } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { sounds } from '../lib/soundEffects';

export const QrCodePage: React.FC = () => {
  const [tableNo, setTableNo] = useState<string>('01');
  const [copied, setCopied] = useState<boolean>(false);

  const currentUrl = window.location.origin + `?table=${tableNo}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}&color=000000&bgcolor=ffffff&margin=10`;

  const handleCopyLink = () => {
    sounds.playClick();
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Page Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold">
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>ডাইনামিক টেবিল কিউআর কোড জেনারেটর</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-serif">
            টেবিল QR কোড স্টিকার জেনারেটর
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-lg">
            কফি পয়েন্ট রেস্তোরাঁর প্রতি টেবিলে বা স্ট্যান্ডিতে ডিজিটাল মেন্যু দেখতে এবং অনলাইন অর্ডার করতে এই কিউআর ব্যবহার করুন।
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shrink-0 shadow-2xl">
          <QrCode className="w-8 h-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Table Selector Box */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-400" />
              টেবিল নম্বর নির্বাচন করুন:
            </h3>
            <p className="text-xs text-slate-400">
              টেবিল চয়ন করলে কিউআর কোডটি স্বয়ংক্রিয়ভাবে ওই টেবিল লিংকে আপডেট হয়ে যাবে।
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'VIP-1', 'PARCEL'].map((t) => (
              <button
                key={t}
                onClick={() => {
                  sounds.playClick();
                  setTableNo(t);
                }}
                className={`py-2.5 text-xs font-extrabold rounded-xl border transition ${
                  tableNo === t
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-105'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-300">ডাইনামিক টেবিল ইউআরএল:</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-2.5 rounded-2xl">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="bg-transparent text-xs text-amber-300 font-mono flex-1 focus:outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl transition shrink-0"
                title="লিংক কপি করুন"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Printable Standee Preview Box */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 text-center space-y-6 shadow-2xl print:p-0 print:border-none print:bg-white">
          <div className="inline-block bg-white text-slate-950 border-4 border-amber-500 rounded-3xl p-6 shadow-2xl space-y-4 max-w-xs mx-auto">
            {/* Header Branding */}
            <div className="flex items-center justify-center gap-2 border-b-2 border-amber-500 pb-2">
              <img
                src={RESTAURANT_INFO.logoUrl}
                alt="Coffee Point"
                className="w-10 h-10 object-cover rounded-lg border border-amber-400"
              />
              <div className="text-left">
                <h2 className="text-base font-extrabold text-slate-950 font-serif leading-none">
                  {RESTAURANT_INFO.nameEn}
                </h2>
                <p className="text-[10px] text-amber-700 font-bold">
                  {RESTAURANT_INFO.chefBn}
                </p>
              </div>
            </div>

            {/* QR Code Image */}
            <div className="p-2 bg-slate-100 rounded-2xl border border-slate-300 shadow-inner">
              <img
                src={qrApiUrl}
                alt={`Table ${tableNo} QR Code`}
                className="w-48 h-48 mx-auto object-contain"
              />
            </div>

            <div className="space-y-1">
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                টেবিল নম্বর #{tableNo}
              </span>
              <p className="text-[11px] font-bold text-slate-800">
                ক্যামেরা বা বিকাশ অ্যাপে স্ক্যান করে খাবার অর্ডার করুন
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
            <a
              href={qrApiUrl}
              download={`CoffeePoint_Table_${tableNo}_QR.png`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-2xl text-xs shadow-lg transition"
            >
              <Download className="w-4 h-4" />
              <span>কিউআর ছবি ডাউনলোড</span>
            </a>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-2xl text-xs border border-slate-700 transition"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>স্টিকার প্রিন্ট করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
