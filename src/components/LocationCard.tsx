import React from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Clock, 
  Award, 
  Coffee, 
  Navigation, 
  ShieldCheck, 
  Star,
  ExternalLink
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface LocationCardProps {
  lang: 'bn' | 'en';
}

export const LocationCard: React.FC<LocationCardProps> = ({ lang }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Location Hero Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-amber-950 to-zinc-950 border border-amber-800/40 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>লোকেশন ও আউটলেট ইনফো</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
              {RESTAURANT_INFO.nameBn} - {RESTAURANT_INFO.chefBn}
            </h2>

            <p className="text-amber-300 font-semibold text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{RESTAURANT_INFO.locationBn}</span>
            </p>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              কেরাণীগঞ্জের হৃদপিণ্ডে গদাবাগ সোনার বাংলা গেটে অবস্থিত আমাদের আউটলেটে রয়েছে মনোরম পরিবেশ, ফ্রেশ ব্রিউড কফি, হট বার্গার ও সেরা হাইজিনিক ফুড সার্ভিস।
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>কল করুন: {RESTAURANT_INFO.phone}</span>
              </a>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-zinc-700 transition"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>গুগল ম্যাপে দেখুন</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="md:col-span-5 space-y-3">
            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 font-medium block">আউটলেট সময়সূচি</span>
                <strong className="text-xs text-white">{RESTAURANT_INFO.openingHoursBn}</strong>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 font-medium block">বিকাশ পেমেন্ট মোড</span>
                <strong className="text-xs text-white">{RESTAURANT_INFO.bkash}</strong>
              </div>
            </div>

            <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 font-medium block">হেড শেফ</span>
                <strong className="text-xs text-white">{RESTAURANT_INFO.chefBn} (Craft Specialist)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Highlights */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>কাস্টমার রিভিউ ও পরিচিতি</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 italic">
              "কেরাণীগঞ্জের মধ্যে কফি পয়েন্টের কোল্ড কফি আর মালাই রুটি সেরা! দামের দিক থেকেও অনেক রিজনেবল।"
            </p>
            <span className="text-[10px] text-amber-400 font-bold block">— তানভীর আহমেদ, গদাবাগ</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 italic">
              "মাস্টারশেফ রব্বি ভাইয়ের সাব স্যান্ডুইচ এবং শর্মা টেস্ট না করলে মিস করবেন! একদম জুসি ও তাজা।"
            </p>
            <span className="text-[10px] text-amber-400 font-bold block">— রাফসান হাবিব, সোনার বাংলা গেট</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 italic">
              "১৫ টাকার মালাই চা আর ৮০ টাকার বার্গার নিয়ে বন্ধুদের আড্ডা একদম পারফেক্ট। সার্ভিস খুবই ফ্রেন্ডলি!"
            </p>
            <span className="text-[10px] text-amber-400 font-bold block">— সাবরিনা পারভীন, কেরাণীগঞ্জ</span>
          </div>
        </div>
      </div>
    </div>
  );
};
