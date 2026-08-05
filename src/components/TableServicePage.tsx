import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, GlassWater, Receipt, UtensilsCrossed, CheckCircle2, PhoneCall, Sparkles, AlertCircle } from 'lucide-react';
import { sounds } from '../lib/soundEffects';
import { RESTAURANT_INFO } from '../data/menuData';

interface TableServicePageProps {
  onRequestService: (tableNo: string, serviceType: string, note?: string) => void;
  lang?: 'bn' | 'en';
}

export const TableServicePage: React.FC<TableServicePageProps> = ({
  onRequestService,
  lang = 'bn',
}) => {
  const [tableNo, setTableNo] = useState<string>('01');
  const [selectedService, setSelectedService] = useState<string>('call-waiter');
  const [note, setNote] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const services = [
    { id: 'call-waiter', titleBn: 'ওয়েটার কল করুন', titleEn: 'Call Waiter', descBn: 'অর্ডার নেওয়া বা পরামর্শের জন্য', icon: Bell, color: 'from-amber-500 to-amber-600' },
    { id: 'water', titleBn: 'পানি ও গ্লাস পাঠান', titleEn: 'Request Water', descBn: 'ঠান্ডা খাবার পানি ও ন্যাপকিন', icon: GlassWater, color: 'from-sky-500 to-blue-600' },
    { id: 'bill', titleBn: 'বিল ও কিউআর পেমেন্ট', titleEn: 'Request Bill', descBn: 'ক্যাশ বা বিকাশ কিউআর পেমেন্ট', icon: Receipt, color: 'from-emerald-500 to-teal-600' },
    { id: 'clean', titleBn: 'টেবিল পরিষ্কার করুন', titleEn: 'Clean Table', descBn: 'টেবিল ওয়াইপ বা ওয়াস্ট রিমুভ', icon: UtensilsCrossed, color: 'from-purple-500 to-indigo-600' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playWaiterBell();
    onRequestService(tableNo, selectedService, note);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold">
            <Bell className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>স্মার্ট ডিজিটাল টেবিল ওয়েটার বেল</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-serif">
            টেবিল সার্ভিস ও ওয়েটার কল
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-lg">
            টেবিলে বসে শুধু এক ক্লিকে ওয়েটার ডাকুন, ড্রিংকস বা বিল রিকোয়েস্ট করুন। কাউন্টারে বেল বাজে!
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shrink-0 shadow-2xl">
          <Bell className="w-10 h-10 animate-bounce" />
        </div>
      </div>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-8 text-center space-y-4 shadow-2xl"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-white font-serif">
            সার্ভিস মেসেজ সফলভাবে পৌঁছেছে!
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            টেবিল নম্বর <span className="font-extrabold text-amber-400 text-base">{tableNo}</span> এর জন্য বার্তা কফি পয়েন্ট কিচেন ও কাউন্টার প্যানেলে প্রদর্শিত হচ্ছে। খুব শীঘ্রই আমাদের স্টাফ আসছেন!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-2xl text-xs shadow-lg hover:bg-amber-400"
          >
            নতুন কল দিন
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Table Number Picker */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              আপনার টেবিল নম্বর চয়ন করুন:
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'VIP-1', 'PARCEL'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setTableNo(t);
                  }}
                  className={`py-3 text-xs sm:text-sm font-extrabold rounded-2xl border transition-all ${
                    tableNo === t
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xl scale-105'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Service Option Picker */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              কী ধরণের সহায়তা প্রয়োজন?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((s) => {
                const Icon = s.icon;
                const isSelected = selectedService === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setSelectedService(s.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-xl ring-2 ring-amber-400/30'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${s.color} text-slate-950 shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{s.titleBn}</div>
                      <div className="text-xs text-slate-400">{s.descBn}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instruction Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              অতিরিক্ত নির্দেশনা বা বার্তা (ঐচ্ছিক):
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="যেমন: এক্সট্রা সস ও টিস্যু লাগবে, অথবা গরম পানির গ্লাস..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-2xl flex items-center justify-center gap-2 transition active:scale-98"
          >
            <Bell className="w-5 h-5" />
            <span>টেবিল {tableNo} থেকে ওয়েটার সিগন্যাল পাঠান</span>
          </button>
        </form>
      )}

      {/* Emergency Contact Footer Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-slate-300">
            <span className="font-bold text-white block">সরাসরি কাউন্টারে কল দিন:</span>
            {RESTAURANT_INFO.phone}
          </div>
        </div>
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-4 py-2 rounded-xl"
        >
          কল করুন
        </a>
      </div>
    </div>
  );
};
