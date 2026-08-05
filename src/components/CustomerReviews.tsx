import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ThumbsUp, MessageSquare, CheckCircle2, Upload, Plus, Camera, Sparkles } from 'lucide-react';
import { ReviewItem } from '../types';

interface CustomerReviewsProps {
  reviews: ReviewItem[];
  onAddReview: (review: ReviewItem) => void;
  onOpenCameraStudio: () => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews,
  onAddReview,
  onOpenCameraStudio,
}) => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [commentBn, setCommentBn] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [itemOrdered, setItemOrdered] = useState<string>('মালাই চা & বার্গার');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Compute average rating
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1);

  const toggleLike = (id: string) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !commentBn.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      userName: userName.trim(),
      userPhone,
      rating,
      commentBn,
      photoUrl: photoUrl.trim() || undefined,
      itemOrdered,
      date: new Date().toISOString().split('T')[0],
      likes: 1,
      isVerified: true,
    };

    onAddReview(newRev);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowAddForm(false);
      setUserName('');
      setUserPhone('');
      setCommentBn('');
      setPhotoUrl('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-28 px-4 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-3xl p-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>কাস্টমার ফিডব্যাক ও রিভিউ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            কাস্টমারদের ভালোবাসা ও রিভিউ
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            মাস্টারশেফ রব্বির বিশেষ আইটেম ও কফি পয়েন্টের সার্ভিস নিয়ে ফুড লাভারদের অভিজ্ঞতা পড়ুন ও নিজের ছবিসহ মতামত শেয়ার করুন।
          </p>
        </div>

        {/* Rating Score Card */}
        <div className="bg-slate-900/90 border border-amber-500/40 px-6 py-4 rounded-2xl text-center min-w-[150px]">
          <span className="text-3xl font-extrabold text-amber-400">{avgRating}</span>
          <div className="flex justify-center gap-1 my-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-slate-400">{reviews.length}টি ভেরিফাইড রিভিউ</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          সাম্প্রতিক মতামত
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCameraStudio}
            className="px-3.5 py-2 bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-xl hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            ৩ডি ফ্রেমে ছবি তুলুন
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold rounded-xl hover:brightness-110 shadow-lg transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            রিভিউ লিখুন
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev, idx) => {
          const isLiked = likedReviews[rev.id];
          const likesCount = rev.likes + (isLiked ? 1 : 0);

          return (
            <motion.div
              key={`${rev.id}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black text-base flex items-center justify-center shadow">
                    {rev.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{rev.userName}</h4>
                      {rev.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-medium">
                          <CheckCircle2 className="w-3 h-3" /> ভেরিফাইড
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {rev.itemOrdered && `অর্ডারড: ${rev.itemOrdered} • `}
                      {rev.date}
                    </p>
                  </div>
                </div>

                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((st) => (
                    <Star
                      key={st}
                      className={`w-3.5 h-3.5 ${
                        st <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-200 my-3 leading-relaxed">{rev.commentBn}</p>

              {rev.photoUrl && (
                <div className="mt-3 rounded-xl overflow-hidden max-w-sm border border-slate-800">
                  <img src={rev.photoUrl} alt="Review attachment" className="w-full max-h-60 object-cover" />
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>এই মতামতটি সাহায্য করেছে?</span>
                <button
                  onClick={() => toggleLike(rev.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition ${
                    isLiked
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-bold'
                      : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>লাইক ({likesCount})</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Review Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 max-w-md w-full shadow-2xl text-white relative"
            >
              <h3 className="text-lg font-bold text-amber-300 mb-2 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                আপনার রিভিউ শেয়ার করুন
              </h3>

              {isSuccess ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-base font-bold text-emerald-300">রিভিউ যোগ হয়েছে!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: সামিয়া রহমান"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">রেটিং স্টার্স</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 text-amber-400 hover:scale-125 transition"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">যেকোনো একটি খাবারের নাম</label>
                    <input
                      type="text"
                      placeholder="যেমন: মালাই চা ও সাব স্যান্ডুইচ"
                      value={itemOrdered}
                      onChange={(e) => setItemOrdered(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">আপনার মন্তব্য *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="খাবারের স্বাদ, সার্ভিস কেমন লেগেছে লিখুন..."
                      value={commentBn}
                      onChange={(e) => setCommentBn(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">ছবি যুক্ত করুন (Image URL - অপশনাল)</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl text-xs font-extrabold hover:brightness-110 shadow-lg"
                    >
                      জমা দিন
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
