import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for Chef Rabbi AI Assistant
  app.post('/api/recommend', async (req, res) => {
    try {
      const { budget, preference, query } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      const menuContext = `
Restaurant Name: কফি পয়েন্ট (Coffee Point)
Chef: মাস্টারশেফ craft Rabbi
Location: সোনার বাংলা গেট, গদাবাগ, কেরাণীগঞ্জ

Menu Items & Prices:
- বার্গার (Burger) - ৮০৳
- সাব স্যান্ডুইচ (Sub Sandwich) - ৯০৳
- শর্মা (Shawarma) - ৮০৳
- চাওমিন (Chowmein) - ৫০৳
- কোল্ড কফি (Cold Coffee) - ৫০৳
- হট কফি (Hot Coffee) - ৫০৳
- মালাই চা (Malai Tea) - ১৫৳
- মালাই রুটি (Malai Roti) - ৬০৳
- স্পেশাল চিজ বার্গার - ১১০৳
- চিজ শর্মা - ১০০৳
- স্পেশাল চিকেন চাওমিন - ৮০৳
- ফ্রেন্চ ফ্রাইজ - ৬০৳
- চিজি পেরি-পেরি ফ্রাইজ - ৮৫৳
- মালাই কোল্ড কফি - ৭০৳
- কম্বো ১ (বার্গার + কোল্ড কফি) - ১২০৳
- কম্বো ২ (সাব স্যান্ডুইচ + হট কফি) - ১৩০৳
- কম্বো ৩ (শর্মা + মালাই চা) - ৯০৳
- কম্বো ৪ (মালাই রুটি + মালাই চা) - ৭০৳
      `;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Smart fallback logic if Gemini key is not provided yet
        const text = getSmartFallbackRecommendation(budget, preference, query);
        return res.json({ recommendation: text, isFallback: true });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Masterchef Craft Rabbi (মাস্টারশেফ রব্বি), the warm, enthusiastic head chef and owner of "কফি পয়েন্ট" (Coffee Point) located at সোনার বাংলা গেট, গদাবাগ, কেরাণীগঞ্জ।
Speak in warm, appetizing, polite Bengali language.

Customer Input:
${query ? `Customer Query: ${query}` : ''}
${budget ? `Customer Budget: ${budget} BDT` : ''}
${preference ? `Customer Preference: ${preference}` : ''}

Available Menu Context:
${menuContext}

Your goal:
1. Recommend the best items or combos from the menu matching their budget/preference in Bengali.
2. Mention exact BDT prices (৳) and why Masterchef Rabbi crafted this combination specially for them.
3. Keep it brief, friendly, appetizing, and around 3-4 sentences.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return res.json({ recommendation: response.text });
    } catch (error) {
      console.error('Gemini error:', error);
      const text = getSmartFallbackRecommendation(req.body.budget, req.body.preference, req.body.query);
      return res.json({ recommendation: text, isFallback: true });
    }
  });

  // Helper fallback when API key is pending
  function getSmartFallbackRecommendation(budget?: number, preference?: string, query?: string) {
    if (budget) {
      if (budget <= 30) {
        return `নমস্কার! মাত্র ${budget}৳ বাজেটে কফি পয়েন্টের বিখ্যাত ১ কাপ গরম মালাই চা (১৫৳) সাথে একটা আড্ডা একদম জমে যাবে! কফি পয়েন্টে আপনাকে স্বাগতম! ☕✨`;
      } else if (budget <= 100) {
        return `স্বাগতম! আপনার ${budget}৳ বাজেটের জন্য মাস্টারশেফ রব্বির স্পেশাল শর্মা (৮০৳) অথবা চাওমিন (৫০৳) সাথে কোল্ড কফি (৫০৳) সেরা চয়েস হবে! কোনটা নিবেন বলুন? 🌯☕`;
      } else if (budget <= 150) {
        return `দুর্দান্ত বাজেট! ${budget}৳ বাজেটে আমাদের ধামাকা কম্বো ১ (বার্গার + কোল্ড কফি মাত্র ১২০৳) অথবা ধামাকা কম্বো ২ (সাব স্যান্ডুইচ + হট কফি মাত্র ১৩০৳) ট্রাই করুন! আপনার ১০৳ পর্যন্ত সেভ হবে! 🍔🥤`;
      } else {
        return `অসাধারণ! আপনার বাজেটে স্পেশাল চিজ বার্গার (১১০৳) সাথে চিলড কোল্ড কফি (৫০৳) অথবা সাব স্যান্ডুইচ (৯০৳) আর ফ্রেন্চ ফ্রাইজ (৬০৳) নিয়ে পেটপুরে সেরা স্ন্যাক্স উপভোগ করুন! 🍔🍟`;
      }
    }
    return `স্বাগতম কফি পয়েন্টে! আমি মাস্টারশেফ রব্বি। আমাদের সবচেয়ে জনপ্রিয় বার্গার (৮০৳), সাব স্যান্ডুইচ (৯০৳) এবং সিগনেচার মালাই চা (১৫৳) ও কোল্ড কফি (৫০৳) দিয়ে শুরু করতে পারেন! আপনার বাজেট বা পছন্দের কথা বলুন, আমি স্পেশাল কম্বো বানিয়ে দিচ্ছি! 🌟`;
  }

  // Vite middleware for dev or static server for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Coffee Point App running at http://localhost:${PORT}`);
  });
}

startServer();
