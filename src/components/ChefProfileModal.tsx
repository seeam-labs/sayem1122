import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChefHat, 
  Award, 
  MapPin, 
  MessageSquare, 
  Facebook, 
  PhoneCall, 
  Video, 
  Sparkles, 
  ExternalLink,
  Play
} from 'lucide-react';
import { CHEF_DATA } from '../data/chefData';
import { sounds } from '../lib/soundEffects';

interface ChefProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChefProfileModal: React.FC<ChefProfileModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'kuwait' | 'videos'>('profile');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 text-white"
        >
          {/* Glowing Header Banner */}
          <div className="relative bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 p-6 sm:p-8 border-b border-amber-500/30">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Chef Avatar with Glow */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-amber-950">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
                    alt={CHEF_DATA.nameBn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full border-2 border-slate-900 shadow-lg flex items-center gap-1">
                  <Award className="w-3 h-3 text-slate-950" />
                  মাস্টারশেফ
                </span>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
                  <ChefHat className="w-3.5 h-3.5 text-amber-400" />
                  <span>{CHEF_DATA.titleBn}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                  {CHEF_DATA.nameBn}
                </h2>

                <p className="text-xs sm:text-sm text-amber-200/90 font-medium max-w-lg">
                  {CHEF_DATA.experienceBn}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <a
                    href={CHEF_DATA.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow-md transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>ওয়াটসঅ্যাপ (+8801319885649)</span>
                  </a>

                  <a
                    href={CHEF_DATA.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-md transition"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>ফেসবুক পেজ</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/80 px-4 pt-2">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('profile');
              }}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span>শেফ প্রোফাইল</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('kuwait');
              }}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'kuwait'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>কুয়েত অভিজ্ঞতা ও গ্যালারি</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('videos');
              }}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'videos'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>ভিডিও ও রিলস ({CHEF_DATA.videos.length})</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* TAB 1: Profile & Bio */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>শেফ পরিচিতি ও ব্যাকগ্রাউন্ড</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {CHEF_DATA.bioBn}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>মাস্টারশেফ রব্বির বিশেষ স্পেশালিটি ডিশ</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CHEF_DATA.specialtiesBn.map((item, idx) => (
                      <div
                        key={`${item}-${idx}`}
                        className="bg-amber-950/30 border border-amber-500/20 p-3 rounded-xl flex items-center gap-3 text-xs font-semibold text-amber-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-amber-500/20 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-amber-300">সরাসরি কথা বলতে চান?</div>
                    <div className="text-[11px] text-slate-300">ওয়াটসঅ্যাপ বা ফোনে যেকোনো স্পেশাল অর্ডারের জন্য যোগাযোগ করুন</div>
                  </div>
                  <a
                    href={CHEF_DATA.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow transition shrink-0 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>মেসেজ দিন</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 2: Kuwait Experience & Photo Gallery */}
            {activeTab === 'kuwait' && (
              <div className="space-y-6">
                <div className="bg-amber-950/40 p-5 rounded-2xl border border-amber-500/30 space-y-2">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>কুয়েত শেখের দেশে রন্ধনশৈলী চর্চা</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {CHEF_DATA.kuwaitStoryBn}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white">ছবি গ্যালারি (কুয়েত ও কিচেন লাইফ)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                    {CHEF_DATA.photos.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPhoto(p.url)}
                        className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer aspect-video"
                      >
                        <img
                          src={p.url}
                          alt={p.titleBn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-2 left-2 right-2 text-left">
                          <span className="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                            {p.tagBn}
                          </span>
                          <div className="text-[11px] font-bold text-white truncate mt-1">
                            {p.titleBn}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Embedded Videos & Reels */}
            {activeTab === 'videos' && (
              <div className="space-y-4">
                <div className="text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 p-3 rounded-xl flex items-center gap-2">
                  <Video className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>ফেসবুক রিলস ও মাস্টারশেফ রব্বির অফিসিয়াল কিচেন ভিডিওসমূহ দেখুন</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CHEF_DATA.videos.map((vid) => (
                    <div
                      key={vid.id}
                      className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 space-y-3 hover:border-amber-500/40 transition"
                    >
                      <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 group">
                        <img
                          src={vid.thumbnailUrl}
                          alt={vid.titleBn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                          <a
                            href={vid.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition transform"
                          >
                            <Play className="w-6 h-6 ml-1 fill-slate-950" />
                          </a>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-2">
                          {vid.titleBn}
                        </h4>
                        <a
                          href={vid.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300"
                        >
                          <span>ফেসবুকে প্লে করুন</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <a
              href={CHEF_DATA.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Facebook className="w-4 h-4" />
              <span>Coffee Point FB Page</span>
            </a>

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="px-5 py-2 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-xl hover:bg-amber-400 transition"
            >
              বন্ধ করুন
            </button>
          </div>
        </motion.div>
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedPhoto}
              alt="Chef Fullscreen"
              className="max-w-full max-h-[85vh] rounded-2xl border-2 border-amber-400 shadow-2xl object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 p-2 bg-slate-900 border border-amber-400 text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
