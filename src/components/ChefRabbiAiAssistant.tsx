import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Award, 
  Coffee, 
  Utensils, 
  Coins, 
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface ChefRabbiAiAssistantProps {
  lang: 'bn' | 'en';
}

export const ChefRabbiAiAssistant: React.FC<ChefRabbiAiAssistantProps> = ({ lang }) => {
  const [budget, setBudget] = useState<string>('100');
  const [preference, setPreference] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleGetRecommendation = async (customBudget?: number, customQuery?: string) => {
    setLoading(true);
    setRecommendation(null);

    const targetBudget = customBudget !== undefined ? customBudget : Number(budget) || 100;
    const targetQuery = customQuery !== undefined ? customQuery : query;

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget: targetBudget,
          preference,
          query: targetQuery,
        }),
      });

      const data = await res.json();
      if (data.recommendation) {
        setRecommendation(data.recommendation);
      } else {
        setRecommendation('দুঃখিত, এই মুহূর্তে উত্তর তৈরি করা সম্ভব হয়নি। আমাদের মালাই চা (১৫৳) এবং বার্গার (৮০৳) ট্রাই করার অনুরোধ রইলো!');
      }
    } catch (err) {
      console.error(err);
      setRecommendation('স্বাগতম কফি পয়েন্টে! আমাদের স্পেশাল বার্গার (৮০৳) এবং কোল্ড কফি (৫০৳) নিয়ে চমৎকার একটি ইভনিং স্ন্যাকস সময় কাটান!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* AI Assistant Banner Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-amber-950 to-zinc-950 border border-amber-800/50 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-500/20 border-2 border-amber-400">
              <Bot className="w-10 h-10 text-zinc-950" />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-zinc-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-zinc-950">
              ONLINE
            </span>
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs px-3 py-1 rounded-full font-bold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{RESTAURANT_INFO.chefBn} এআই গাইড</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
              আজকে কি খাবেন? মাস্টারশেফ রব্বি আপনাকে সাহায্য করবে!
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              আপনার বাজেট বা পছন্দের কথা বলুন। আমাদের এআই অ্যালগরিদম মাস্টারশেফ রব্বির আসল রেসিপি ও সিগনেচার মেন্যু থেকে সেরা আইটেম কম্বিনেশন সাজেস্ট করবে।
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Assistant Input Panel */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-amber-400 flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Sparkles className="w-4 h-4" />
          <span>আপনার বাজেট বা পছন্দ জানান:</span>
        </h3>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => {
              setBudget('50');
              handleGetRecommendation(50, '৫০ টাকার মধ্যে সেরা খাবার');
            }}
            className="bg-zinc-950 hover:bg-amber-950 text-amber-300 border border-amber-700/50 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 font-medium"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>বাজেট ৫০৳</span>
          </button>

          <button
            onClick={() => {
              setBudget('100');
              handleGetRecommendation(100, '১০০ টাকার ধামাকা কম্বো');
            }}
            className="bg-zinc-950 hover:bg-amber-950 text-amber-300 border border-amber-700/50 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 font-medium"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>বাজেট ১০০৳</span>
          </button>

          <button
            onClick={() => {
              setBudget('150');
              handleGetRecommendation(150, '১৫০ টাকার রাজকীয় স্ন্যাকস');
            }}
            className="bg-zinc-950 hover:bg-amber-950 text-amber-300 border border-amber-700/50 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 font-medium"
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>বাজেট ১৫০৳</span>
          </button>

          <button
            onClick={() => {
              setPreference('আড্ডা ও কোল্ড কফি');
              handleGetRecommendation(120, 'বন্ধুদের সাথে আড্ডার কফি ও স্ন্যাক্স');
            }}
            className="bg-zinc-950 hover:bg-amber-950 text-amber-300 border border-amber-700/50 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 font-medium"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>কফি ও আড্ডা কম্বো</span>
          </button>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>আপনার বাজেট (টাকায় ৳):</span>
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="যেমন: ১০০"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="md:col-span-8 space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>স্পেশাল কোনো চাওয়া বা প্রশ্ন থাকলে লিখুন:</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="যেমন: ঝাল চাওমিন আর চিলড কফি কোনটা ভালো হবে?"
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleGetRecommendation()}
                disabled={loading}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>পরামর্শ চান</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* AI Recommendation Result Display */}
        {recommendation && (
          <div className="bg-gradient-to-br from-amber-950/60 to-zinc-950 border-2 border-amber-500/60 rounded-2xl p-6 space-y-3 animate-fade-in shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-5 h-5 text-amber-400" />
              <span>মাস্টারশেফ রব্বির স্পেশাল পরামর্শ:</span>
            </div>

            <p className="text-zinc-100 text-sm leading-relaxed font-serif whitespace-pre-line">
              {recommendation}
            </p>

            <div className="pt-2 border-t border-amber-900/40 flex justify-between items-center text-xs text-amber-300/80">
              <span>কফি পয়েন্ট, সোনার বাংলা গেট, গদাবাগ, কেরাণীগঞ্জ</span>
              <button 
                onClick={() => handleGetRecommendation()}
                className="text-amber-400 font-bold hover:underline"
              >
                অন্য রেকমেন্ডেশন পান →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
