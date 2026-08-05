import { GoogleGenAI } from '@google/genai';

const menuContext = `
Restaurant Name: কফি পয়েন্ট (Coffee Point)
Chef: মাস্টারশেফ Craft Rabbi
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
- ফ্রেঞ্চ ফ্রাইস - ৬০৳
- চিজি পেরি-পেরি ফ্রাইস - ৮৫৳
- মালাই কোল্ড কফি - ৭০৳
- কম্বো ১ (বার্গার + কোল্ড কফি) - ১২০৳
- কম্বো ২ (সাব স্যান্ডুইচ + হট কফি) - ১৩০৳
- কম্বো ৩ (শর্মা + মালাই চা) - ৯০৳
- কম্বো ৪ (মালাই রুটি + মালাই চা) - ৭০৳
`;

function getFallbackRecommendation(budget?: number) {
  if (budget && budget <= 30) {
    return `মাত্র ${budget}৳ বাজেটে কফি পয়েন্টের বিখ্যাত মালাই চা (১৫৳) দিয়ে শুরু করতে পারেন। গরম চায়ের সঙ্গে আড্ডা একদম জমে যাবে!`;
  }
  if (budget && budget <= 100) {
    return `আপনার ${budget}৳ বাজেটে শর্মা (৮০৳), চাওমিন (৫০৳), অথবা কোল্ড কফি (৫০৳) দারুণ পছন্দ হবে। ঝাল-ঝাল কিছু চাইলে শর্মা নিন!`;
  }
  if (budget && budget <= 150) {
    return `আপনার ${budget}৳ বাজেটে কম্বো ১, বার্গার ও কোল্ড কফি মাত্র ১২০৳, অথবা কম্বো ২, সাব স্যান্ডুইচ ও হট কফি ১৩০৳, সবচেয়ে ভালো হবে।`;
  }
  return 'কফি পয়েন্টে আমাদের বার্গার (৮০৳), সাব স্যান্ডুইচ (৯০৳), মালাই চা (১৫৳) ও কোল্ড কফি (৫০৳) সবচেয়ে জনপ্রিয়। আপনার বাজেট বললে আরও নির্দিষ্ট কম্বো সাজেস্ট করা যাবে।';
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { budget, preference, query } = req.body ?? {};
  const numericBudget = Number(budget) || undefined;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.status(200).json({
      recommendation: getFallbackRecommendation(numericBudget),
      isFallback: true,
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are Masterchef Craft Rabbi, the warm and enthusiastic chef of Coffee Point in Keraniganj. Reply in natural, appetizing Bengali.

Customer budget: ${numericBudget ?? 'not specified'} BDT
Customer preference: ${preference || 'not specified'}
Customer question: ${query || 'not specified'}

Available menu:
${menuContext}

Recommend only items available in the menu. Mention exact prices, stay within the budget where possible, and keep the answer to 3-4 concise sentences.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return res.status(200).json({
      recommendation: response.text || getFallbackRecommendation(numericBudget),
    });
  } catch (error) {
    console.error('Recommendation API error:', error);
    return res.status(200).json({
      recommendation: getFallbackRecommendation(numericBudget),
      isFallback: true,
    });
  }
}
