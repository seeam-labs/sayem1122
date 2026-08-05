import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Heart, Upload, X, Filter, Sparkles, Plus, Check } from 'lucide-react';
import { GalleryItem } from '../types';

interface PhotoGalleryProps {
  galleryItems: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ galleryItems, onAddGalleryItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  // Add custom photo state
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<GalleryItem['category']>('craft');
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [newCaption, setNewCaption] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'সব ছবি' },
    { id: 'craft', label: 'মাস্টারশেফ ক্রাফট' },
    { id: 'ambiance', label: 'ক্যাফে অ্যাম্বিয়েন্স' },
    { id: 'kitchen', label: 'ওপেন কিচেন' },
    { id: 'customers', label: 'হ্যাপি কাস্টমার্স' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCustomUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim() || !newTitle.trim()) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      titleBn: newTitle,
      category: newCategory,
      imageUrl: newImageUrl,
      likes: 1,
      captionBn: newCaption || 'কফি পয়েন্ট আউটলেটের বিশেষ ছবি।',
    };

    onAddGalleryItem(newItem);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowUploadModal(false);
      setNewTitle('');
      setNewImageUrl('');
      setNewCaption('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-28 px-4 max-w-6xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>ফটো ও মেমোরিজ গ্যালারি</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
            কফি পয়েন্ট ফটো গ্যালারি
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            মাস্টারশেফ রব্বির বিশেষ আইটেম ক্রাফটিং, ওপেন কিচেন ও কাস্টমারদের সেরা মুহূর্তগুলোর অ্যালবাম
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:brightness-110 transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          ছবি আপলোড করুন
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredItems.map((item, idx) => {
          const isLiked = likedIds[item.id];
          const totalLikes = item.likes + (isLiked ? 1 : 0);

          return (
            <motion.div
              key={`${item.id}-${idx}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setActiveImage(item)}
              className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500/50 hover:shadow-xl transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.titleBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30 font-semibold uppercase">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {item.titleBn}
                  </h4>
                </div>

                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className={`p-2 rounded-full backdrop-blur-md transition-all ${
                    isLiked
                      ? 'bg-red-500/20 text-red-500 border border-red-500/40'
                      : 'bg-slate-900/60 text-slate-300 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-950/80 text-white rounded-full hover:bg-amber-500 hover:text-slate-950 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] overflow-hidden bg-black">
                <img src={activeImage.imageUrl} alt={activeImage.titleBn} className="w-full h-full object-contain mx-auto" />
              </div>

              <div className="p-5 bg-slate-900">
                <h3 className="text-lg font-bold text-amber-300">{activeImage.titleBn}</h3>
                {activeImage.captionBn && (
                  <p className="text-xs text-slate-300 mt-1">{activeImage.captionBn}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Photo Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 max-w-md w-full shadow-2xl text-white relative"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 p-1.5 bg-slate-800 text-slate-400 rounded-full hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-amber-300 mb-2 flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-400" />
                গ্যালারিতে ছবি যোগ করুন
              </h3>

              {isSuccess ? (
                <div className="py-8 text-center">
                  <Check className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-base font-bold text-emerald-300">ছবি গ্যালারিতে যোগ হয়েছে!</p>
                </div>
              ) : (
                <form onSubmit={handleCustomUpload} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">ছবির শিরোনাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মালাই চা উৎসব ২০২৬"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">ক্যাটাগরি</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="craft">মাস্টারশেফ ক্রাফট</option>
                      <option value="ambiance">ক্যাফে অ্যাম্বিয়েন্স</option>
                      <option value="kitchen">ওপেন কিচেন</option>
                      <option value="customers">হ্যাপি কাস্টমার্স</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">ছবির ইউআরএল (Image URL) *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">ক্যাপশন / বিবরণ</label>
                    <textarea
                      rows={2}
                      placeholder="ক্যাপশন লিখুন..."
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl text-xs font-extrabold hover:brightness-110 shadow-lg"
                    >
                      যোগ করুন
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
