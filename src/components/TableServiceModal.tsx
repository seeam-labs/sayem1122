import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, GlassWater, Receipt, Sparkles, X, CheckCircle2, UtensilsCrossed, AlertCircle, PhoneCall } from 'lucide-react';
import { sounds } from '../lib/soundEffects';

interface TableServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestService: (tableNo: string, serviceType: string, note?: string) => void;
  lang: 'bn' | 'en';
}

export const TableServiceModal: React.FC<TableServiceModalProps> = ({
  isOpen,
  onClose,
  onRequestService,
  lang,
}) => {
  const [tableNo, setTableNo] = useState<string>('01');
  const [selectedService, setSelectedService] = useState<string>('call-waiter');
  const [note, setNote] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const services = [
    { id: 'call-waiter', titleBn: 'ওয়েটার কল করুন', titleEn: 'Call Waiter', icon: Bell, color: 'from-amber-500 to-amber-600' },
    { id: 'water', titleBn: 'পানি ও গ্লাস পাঠান', titleEn: 'Request Water', icon: GlassWater, color: 'from-sky-500 to-blue-600' },
    { id: 'bill', titleBn: 'বিল ও কিউআর পেমেন্ট', titleEn: 'Request Bill', icon: Receipt, color: 'from-emerald-500 to-teal-600' },
    { id: 'clean', titleBn: 'টেবিল পরিষ্কার করুন', titleEn: 'Clean Table', icon: UtensilsCrossed, color: 'from-purple-500 to-indigo-600' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playWaiterBell();
    onRequestService(tableNo, selectedService, note);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Bell className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-serif">
                    {lang === 'bn' ? 'ডিজিটাল ওয়েটার কল বেল' : 'Digital Waiter Call Bell'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'bn' ? 'টেবিলে বসেই স্টাফদের কোনো সাহায্য প্রয়োজন হলে দ্রুত কল করুন' : 'Instant table service request for Coffee Point'}
                  </p>
                </div>
              </div>

              {/* Table Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300">
                  {lang === 'bn' ? 'আপনার টেবিল নম্বর নির্বাচন করুন:' : 'Select Table Number:'}
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'VIP-1', 'PARCEL'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTableNo(t)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        tableNo === t
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Type Options */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300">
                  {lang === 'bn' ? 'কী ধরণের সাহায্য প্রয়োজন?' : 'Select Service Needed:'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((s) => {
                    const Icon = s.icon;
                    const isSelected = selectedService === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(s.id)}
                        className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${s.color} text-slate-950`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-100">
                            {lang === 'bn' ? s.titleBn : s.titleEn}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Note */}
              <div className="space-y-1">
                <label className="text-xs text-slate-400">
                  {lang === 'bn' ? 'অতিরিক্ত নির্দেশনা (ঐচ্ছিক):' : 'Additional note (optional):'}
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: এক্সট্রা সস ও ন্যাপকিন লাগবে...' : 'e.g., Need extra napkins...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition active:scale-98"
              >
                <Bell className="w-5 h-5" />
                <span>{lang === 'bn' ? `টেবিল ${tableNo} থেকে ওয়েটার ডাকুন` : `Call Waiter for Table ${tableNo}`}</span>
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 animate-pulse" />
              </div>
              <h4 className="text-xl font-bold text-white font-serif">
                {lang === 'bn' ? 'কল রিকুয়েস্ট সফল হয়েছে!' : 'Service Bell Sent!'}
              </h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                {lang === 'bn' 
                  ? `টেবিল নম্বর ${tableNo} এর বার্তা কাউন্টার ও ওয়েটার প্যানেলে পৌঁছে গেছে। আমাদের স্টাফ দ্রুত আসছেন!`
                  : `Your request for Table ${tableNo} has been dispatched to staff.`}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
