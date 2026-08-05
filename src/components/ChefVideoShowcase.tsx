import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Film, ExternalLink, ChefHat, Sparkles, X, Eye } from 'lucide-react';
import { CHEF_DATA } from '../data/chefData';
import { sounds } from '../lib/soundEffects';

interface ChefVideoShowcaseProps {
  onOpenChefPage?: () => void;
}

export const ChefVideoShowcase: React.FC<ChefVideoShowcaseProps> = ({ onOpenChefPage }) => {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; type: string } | null>(null);

  const handlePlayVideo = (vid: typeof CHEF_DATA.videos[0]) => {
    sounds.playClick();
    setActiveVideo({
      url: vid.url,
      title: vid.titleBn,
      type: vid.type,
    });
  };

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden my-6">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center shadow-md shrink-0">
            <Film className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                মাস্টারশেফ রব্বির ভিডিও ও রিলস
              </h3>
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                <Sparkles className="w-2.5 h-2.5" />
                HD ভিডিও
              </span>
            </div>
            <p className="text-xs text-amber-200/80 font-medium">
              প্যাশনেট কুকিং আর্ট, সিক্রেট রেসিপি ও স্পেশাল সার্ভিস
            </p>
          </div>
        </div>

        {onOpenChefPage && (
          <button
            onClick={() => {
              sounds.playClick();
              onOpenChefPage();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-2xl text-xs transition shadow-lg active:scale-95"
          >
            <ChefHat className="w-4 h-4" />
            <span>শেফ বায়োগ্রাফি ও ফটো</span>
          </button>
        )}
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHEF_DATA.videos.map((vid, idx) => {
          const isLocal = vid.type === 'local_video';
          return (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="group relative bg-slate-950 border border-amber-500/20 hover:border-amber-400 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail / Video Preview Box */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                {isLocal ? (
                  <video
                    src={vid.url}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseOut={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.titleBn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Play Button Overlay */}
                <button
                  onClick={() => handlePlayVideo(vid)}
                  className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white/80 group-hover:bg-amber-400">
                    <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                  </div>
                </button>

                {/* Badge */}
                <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Eye className="w-3 h-3 text-amber-400" />
                  {isLocal ? 'এইচডি ভিডিও' : 'ফেসবুক রিলস'}
                </span>
              </div>

              {/* Title & Action Footer */}
              <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                  {vid.titleBn}
                </h4>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                  <button
                    onClick={() => handlePlayVideo(vid)}
                    className="text-amber-400 font-bold flex items-center gap-1 hover:underline"
                  >
                    <Play className="w-3 h-3" />
                    প্লে ভিডিও
                  </button>

                  {!isLocal && (
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-1"
                      title="ফেসবুকে দেখুন"
                    >
                      <ExternalLink className="w-3 h-3" />
                      FB
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white font-serif line-clamp-1">
                    {activeVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Display */}
              {activeVideo.type === 'local_video' ? (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden aspect-video">
                  <video
                    src={activeVideo.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center border border-blue-500/40">
                    <ExternalLink className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white">
                      ফেসবুক রিলসে সরাসরি দেখুন
                    </h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      ফেসবুক সিকিউরিটি প্রোটোকলের কারণে রিলসটি দেখার জন্য নিচের বাটনটিতে ক্লিক করুন।
                    </p>
                  </div>

                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-2xl text-sm transition shadow-xl"
                  >
                    <span>ফেসবুকে প্লে করুন</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
