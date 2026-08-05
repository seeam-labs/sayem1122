import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChefHat, 
  Award, 
  MapPin, 
  MessageSquare, 
  Facebook, 
  PhoneCall, 
  Video, 
  Sparkles, 
  ExternalLink,
  Play,
  Heart,
  Eye,
  X,
  Palette
} from 'lucide-react';
import { CHEF_DATA } from '../data/chefData';
import { sounds } from '../lib/soundEffects';
import { ChefVideoShowcase } from './ChefVideoShowcase';

interface ChefProfilePageProps {
  onOrderClick?: () => void;
}

export const ChefProfilePage: React.FC<ChefProfilePageProps> = ({ onOrderClick }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'gallery' | 'videos'>('profile');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; type: string } | null>(null);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-amber-950/60 to-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          {/* Chef Main Portrait */}
          <div className="relative group shrink-0">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-amber-950 relative">
              <img
                src="/input_file_4.png"
                alt={CHEF_DATA.nameBn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>

            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full border-2 border-slate-950 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
              <Award className="w-4 h-4 text-slate-950 fill-slate-950" />
              কুকিং আর্টিস্ট • রব্বি
            </span>
          </div>

          {/* Biography Header */}
          <div className="text-center lg:text-left space-y-3 flex-1">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-inner">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>রান্না একটি উচ্চমার্গীয় শিল্প (Cooking is an Art)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif tracking-tight">
              {CHEF_DATA.nameBn}
            </h1>

            <p className="text-sm sm:text-base text-amber-200/90 font-medium max-w-2xl leading-relaxed">
              {CHEF_DATA.bioBn}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={CHEF_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-lg transition active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ওয়াটসঅ্যাপ (+8801319885649)</span>
              </a>

              <a
                href={CHEF_DATA.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-lg transition active:scale-95"
              >
                <Facebook className="w-4 h-4" />
                <span>অফিশিয়াল ফেসবুক পেজ</span>
              </a>

              {onOrderClick && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOrderClick();
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-xl transition active:scale-95"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>মেনু থেকে অর্ডার করুন</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-amber-500/20 bg-slate-900/60 rounded-2xl p-1.5 backdrop-blur-md">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('profile');
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-amber-500 text-slate-950 shadow-lg font-extrabold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>শেফ ফিলোসফি ও স্পেশালিটি</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('gallery');
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'gallery'
              ? 'bg-amber-500 text-slate-950 shadow-lg font-extrabold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>ফটো পোর্টফোলিও ({CHEF_DATA.photos.length})</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setActiveTab('videos');
          }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'videos'
              ? 'bg-amber-500 text-slate-950 shadow-lg font-extrabold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>ভিডিও ও রিলস ({CHEF_DATA.videos.length})</span>
        </button>
      </div>

      {/* TAB 1: Profile & Bio & Specialties */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Story Card */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">
                    কুয়েত কিচেনের অভিজ্ঞতা ও রন্ধনশিল্প
                  </h3>
                  <p className="text-xs text-amber-300/80">আন্তর্জাতিক মান ও খাঁটি স্বাদ</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {CHEF_DATA.kuwaitStoryBn}
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs text-slate-300">
                  <span className="font-bold text-white block">লোকেশন:</span>
                  {CHEF_DATA.locationBn}
                </div>
              </div>
            </div>

            {/* Specialties List Card */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-amber-500/20 pb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif">
                    শেফ রব্বির মাস্টারপিস সিগনেচার আইটেম
                  </h3>
                  <p className="text-xs text-amber-300/80">প্রতিটি ডিশ অনন্য কারিগরি শিল্প</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {CHEF_DATA.specialtiesBn.map((item, idx) => (
                  <div
                    key={`${item}-${idx}`}
                    className="bg-slate-950 border border-slate-800 hover:border-amber-400/50 p-3 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-bold text-amber-200 transition"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center shrink-0">
                      #{idx + 1}
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Width Branding Banner */}
          <div className="relative bg-slate-900 border border-amber-500/30 rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
            <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-amber-400/40 shadow-xl">
              <img
                src="/input_file_5.png"
                alt="Masterchef Rabby Official Logo Branding"
                className="w-full h-full object-contain bg-slate-950 p-2"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-3 text-center md:text-left">
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                OFFICIAL BRANDING
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                কফি পয়েন্ট কেরাণীগঞ্জ
              </h3>
              <p className="text-xs text-amber-200/80 leading-relaxed">
                শেফ রব্বির নিজস্ব রেসিপিতে তৈরি তাজা জুসি বার্গার, চিজ শর্মা, সাব স্যান্ডুইচ এবং খাঁটি মাটকা বাটি মালাই চা খেতে প্রতিদিন চলে আসুন সোনার বাংলা গেট, গদাবাগে!
              </p>
              <div className="pt-2">
                <a
                  href={CHEF_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপে বুকিং বা অর্ডার করুন</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Photo Portfolio */}
      {activeTab === 'gallery' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-amber-500/20 p-4 rounded-2xl flex items-center justify-between">
            <div className="text-xs text-amber-200 font-medium">
              ফটোগুলোতে ক্লিক করে ফুলস্ক্রিন হাই-রেজুলেশন পিকচার উপভোগ করুন
            </div>
            <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-lg">
              {CHEF_DATA.photos.length} টি ছবি
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHEF_DATA.photos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedPhoto(photo.url)}
                className="group relative bg-slate-900 border border-amber-500/20 hover:border-amber-400 rounded-3xl overflow-hidden shadow-xl cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={photo.url}
                    alt={photo.titleBn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-4 space-y-1">
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {photo.tagBn}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {photo.titleBn}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Video Showcase */}
      {activeTab === 'videos' && (
        <ChefVideoShowcase />
      )}

      {/* Lightbox Modal for Photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-slate-900 border-2 border-amber-400 rounded-3xl overflow-hidden p-2 shadow-2xl"
            >
              <img
                src={selectedPhoto}
                alt="Chef Rabby Lightbox"
                className="max-w-full max-h-[80vh] rounded-2xl object-contain mx-auto"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950 border border-amber-400 text-amber-400 rounded-full shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
