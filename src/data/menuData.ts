import { CategoryInfo, MenuItem } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', nameBn: 'সব আইটেম', nameEn: 'All Items', icon: 'Utensils' },
  { id: 'burger', nameBn: 'বার্গার', nameEn: 'Burgers', icon: 'HamBurger' },
  { id: 'sandwich', nameBn: 'সাব স্যান্ডুইচ', nameEn: 'Sub Sandwiches', icon: 'Sandwich' },
  { id: 'shawarma', nameBn: 'শর্মা', nameEn: 'Shawarma', icon: 'Flame' },
  { id: 'chowmein', nameBn: 'চাওমিন', nameEn: 'Chowmein', icon: 'Soup' },
  { id: 'coffee', nameBn: 'কফি', nameEn: 'Coffee', icon: 'Coffee' },
  { id: 'tea', nameBn: 'মালাই চা ও রুটি', nameEn: 'Malai Tea & Roti', icon: 'CupSoda' },
  { id: 'snacks', nameBn: 'স্ন্যাক্স ও ফ্রাইজ', nameEn: 'Snacks & Fries', icon: 'Cookie' },
  { id: 'combos', nameBn: 'ধামাকা কম্বো', nameEn: 'Special Combos', icon: 'Sparkles' },
];

export const MENU_ITEMS: MenuItem[] = [
  // User Requested Items (Exact Matching)
  {
    id: 'burger-classic',
    nameBn: 'বার্গার',
    nameEn: 'Classic Juicy Burger',
    price: 80,
    category: 'burger',
    descriptionBn: 'মাস্টারশেফ রব্বির সিক্রেট সস, জুসি চিকেন প্যাটি ও ফ্রেশ লেটুস দিয়ে তৈরি সুস্বাদু বার্গার।',
    descriptionEn: 'Juicy chicken patty with Chef Rabbi special sauce, fresh lettuce & mayo.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    sketchfabEmbedUrl: 'https://sketchfab.com/models/93bb230cefa845708dc4f88a7334f274/embed',
    isPopular: true,
    preparationTime: '১০-১২ মিনিট',
    spicyLevel: 1,
    calories: '৩২০ kcal',
    options: ['এক্সট্রা চিজ (+২০৳)', 'মেয়োনিজ সস (+১০৳)', 'ডাবল প্যাটি (+৪০৳)']
  },
  {
    id: 'sub-sandwich',
    nameBn: 'সাব স্যান্ডুইচ',
    nameEn: 'Loaded Sub Sandwich',
    price: 90,
    category: 'sandwich',
    descriptionBn: 'স্পেশাল ডাবল ওভেন বেকড সাব ব্রেডে গ্রিলড চিকেন, চিজ ও মাস্টারশেফ স্পেশাল ক্রাফট ড্রেসিং।',
    descriptionEn: 'Oven baked sub bread filled with grilled chicken, melted cheese & house sauce.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    sketchfabEmbedUrl: 'https://sketchfab.com/models/5e91182bd6f340ab8208294e66d00743/embed',
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '১২-১৫ মিনিট',
    spicyLevel: 1,
    options: ['এক্সট্রা চিজ (+২০৳)', 'স্পাইসি পেপার সস (+১০৳)']
  },
  {
    id: 'shawarma-special',
    nameBn: 'শর্মা',
    nameEn: 'Masterchef Chicken Shawarma',
    price: 80,
    category: 'shawarma',
    descriptionBn: 'নরম তাজা পরোটায় মোড়ানো মশলাদার ও জুসি চিকেন কিউব, গার্লিক মেয়ো ও শশার কুচি।',
    descriptionEn: 'Juicy spiced chicken wrapped in soft freshly baked pita with garlic mayo.',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    sketchfabEmbedUrl: 'https://sketchfab.com/models/5e91182bd6f340ab8208294e66d00743/embed',
    isPopular: true,
    preparationTime: '১০ মিনিট',
    spicyLevel: 2,
    options: ['এক্সট্রা চিকেন (+৩০৳)', 'মেয়ো পনির পেস্ট (+১৫৳)']
  },
  {
    id: 'chowmein-egg-veg',
    nameBn: 'চাওমিন',
    nameEn: 'Egg & Veg Chowmein',
    price: 50,
    category: 'chowmein',
    descriptionBn: 'স্পেশাল সসে টস করা ঝাল ঝাল চাওমিন, সাথে ডিম ও ফ্রেশ ভেজিটেবল ফ্রাই।',
    descriptionEn: 'Stir-fried noodles with farm eggs, crunchy vegetables & aromatic spices.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    sketchfabEmbedUrl: 'https://sketchfab.com/models/5e91182bd6f340ab8208294e66d00743/embed',
    isPopular: true,
    preparationTime: '৮-১০ মিনিট',
    spicyLevel: 2,
    options: ['ডাবল এগ (+১৫৳)', 'চিকেন টপিং (+৩০৳)']
  },
  {
    id: 'cold-coffee',
    nameBn: 'কোল্ড কফি',
    nameEn: 'Thick Creamy Cold Coffee',
    price: 50,
    category: 'coffee',
    descriptionBn: 'গাঢ় রিচ রোস্টেড কফি, ঘন দুধ ও চকলেট সিরাপের স্বাদে তৈরি বরফ শীতল স্পেশাল কোল্ড কফি।',
    descriptionEn: 'Rich espresso blended with chilled creamy milk, chocolate drizzle & ice.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    sketchfabEmbedUrl: 'https://sketchfab.com/models/fd2e9142168d4f31ba99bf4d9b1165b4/embed',
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '৫ মিনিট',
    calories: '২১০ kcal',
    options: ['আইসক্রিম স্কুপ (+২৫৳)', 'চকলেট ট্রাফেল (+১৫৳)', 'কম চিনি']
  },
  {
    id: 'hot-coffee',
    nameBn: 'হট কফি',
    nameEn: 'Signature Hot Coffee',
    price: 50,
    category: 'coffee',
    descriptionBn: 'ফ্রেশলি প্রিমিয়াম রোস্টেড কফি বিনস থেকে তৈরি সুবাসিত ঘন ফেনা যুক্ত গরম কফি।',
    descriptionEn: 'Aromatic hot brewed espresso with velvety steamed milk foam.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    preparationTime: '৫ মিনিট',
    calories: '১৩০ kcal',
    options: ['এক্সট্রা স্ট্রং', 'লেস সুগার', 'ক্যাপুচিনো ফোম']
  },
  {
    id: 'malai-tea',
    nameBn: 'মালাই চা',
    nameEn: 'Special Matka Malai Tea',
    price: 15,
    category: 'tea',
    descriptionBn: 'কেরাণীগঞ্জের বিখ্যাত ঘন খাঁটি দুধের সর, মালাই ও সুবাসিত চা পাতার স্পেশাল মাটকা বাটি মালাই চা।',
    descriptionEn: 'Authentic rich milk tea loaded with thick clotted cream (Malai) served in clay matka cup.',
    image: '/input_file_0.png',
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '৩ মিনিট',
    options: ['ডাবল মালাই (+১০৳)', 'এলাচি ফ্লেভার', 'চিনি ছাড়া']
  },
  {
    id: 'malai-roti',
    nameBn: 'মালাই রুটি',
    nameEn: 'Crispy Paratha with Fresh Malai',
    price: 60,
    category: 'tea',
    descriptionBn: 'গরম গরম মচমচে বাটার রুটি/পরোটা সাথে গাঢ় খাঁটি মালাই ও হালকা মিষ্টির স্বাদ।',
    descriptionEn: 'Hot golden crispy paratha served with thick sweet fresh cream.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '৮ মিনিট',
    options: ['এক্সট্রা পরোটা (+২০৳)', 'এক্সট্রা মালাই (+২৫৳)']
  },

  // Additional Menu Items to Elevate the Experience
  {
    id: 'burger-special-cheese',
    nameBn: 'স্পেশাল চিজ বার্গার',
    nameEn: 'Double Cheese Burst Burger',
    price: 110,
    category: 'burger',
    descriptionBn: 'ডাবল চিজ স্লাইস ও স্পেশাল চিকেন প্যাটির সমন্বয়ে রাজকীয় স্বাদের বার্গার।',
    descriptionEn: 'Double melted cheese slice with crispy chicken patty.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true,
    preparationTime: '১৫ মিনিট',
    spicyLevel: 1
  },
  {
    id: 'shawarma-cheese',
    nameBn: 'চিজ চিকেন শর্মা',
    nameEn: 'Melting Cheese Shawarma',
    price: 100,
    category: 'shawarma',
    descriptionBn: 'গলানো মোজারেলা চিজ ও জুসি মশলাদার চিকেন দিয়ে ঠাসা স্পেশাল চিজি শর্মা।',
    descriptionEn: 'Classic chicken shawarma loaded with gooey melted cheese.',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true,
    preparationTime: '১২ মিনিট',
    spicyLevel: 2
  },
  {
    id: 'chowmein-chicken-special',
    nameBn: 'স্পেশাল চিকেন চাওমিন',
    nameEn: 'Masterchef Chicken Chowmein',
    price: 80,
    category: 'chowmein',
    descriptionBn: 'চিকেন কিউব, ডিম, স্পাইসি সস ও ভেজিটেবল দিয়ে ফ্রাই করা সুস্বাদু চাওমিন।',
    descriptionEn: 'Loaded chicken noodles with egg, spicy garlic paste & crisp bell peppers.',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    preparationTime: '১০-১২ মিনিট',
    spicyLevel: 3
  },
  {
    id: 'french-fries-classic',
    nameBn: 'ফ্রেন্চ ফ্রাইজ',
    nameEn: 'Crispy French Fries',
    price: 60,
    category: 'snacks',
    descriptionBn: 'গোল্ডেন ক্রিসপি ফ্রেন্চ ফ্রাইজ সাথে স্পেশাল পেরি-পেরি মশলা ও চিলি সস।',
    descriptionEn: 'Crispy golden potato fries seasoned with chef spice mix & ketchup.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    preparationTime: '৭ মিনিট',
    spicyLevel: 1
  },
  {
    id: 'french-fries-cheese',
    nameBn: 'চিজি পেরি-পেরি ফ্রাইজ',
    nameEn: 'Cheesy Peri-Peri Fries',
    price: 85,
    category: 'snacks',
    descriptionBn: 'গরম গরম পেরি পেরি ফ্রাইজের ওপর লিকুইড চিজ ও অরিগানোর ছিটা।',
    descriptionEn: 'Fries smothered in warm liquid cheese sauce and herbs.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true,
    preparationTime: '৮ মিনিট'
  },
  {
    id: 'special-malai-cold-coffee',
    nameBn: 'মালাই কোল্ড কফি',
    nameEn: 'Special Malai Cold Coffee',
    price: 70,
    category: 'coffee',
    descriptionBn: 'কফি পয়েন্টের সিক্রেট ফিউশন! ডাবল কফি সাথে রিয়েল দুধের সর ও মালাই ক্রাফট।',
    descriptionEn: 'Signature fusion of cold espresso blended with authentic malai cream.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true,
    preparationTime: '৫ মিনিট'
  },

  // Special Money Saver Combos
  {
    id: 'combo-1',
    nameBn: 'ধামাকা কম্বো ১ (বার্গার + কোল্ড কফি)',
    nameEn: 'Burger + Cold Coffee Combo',
    price: 120, // (80 + 50 = 130 -> Save 10৳)
    category: 'combos',
    descriptionBn: '১টি জুসি বার্গার + ১টি চিলড কোল্ড কফি। আলাদা দাম ১৩০৳, কম্বো প্রাইস মাত্র ১২০৳! (সাশ্রয় ১০৳)',
    descriptionEn: '1 Classic Burger + 1 Cold Coffee. Original price 130 BDT, combo price 120 BDT!',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isChefSpecial: true
  },
  {
    id: 'combo-2',
    nameBn: 'ধামাকা কম্বো ২ (সাব স্যান্ডুইচ + হট কফি)',
    nameEn: 'Sub Sandwich + Hot Coffee Combo',
    price: 130, // (90 + 50 = 140 -> Save 10৳)
    category: 'combos',
    descriptionBn: '১টি বেকড সাব স্যান্ডুইচ + ১টি হট স্পেশাল কফি। সাশ্রয়ী দাম মাত্র ১৩০৳!',
    descriptionEn: '1 Sub Sandwich + 1 Hot Coffee. Save 10 BDT with this evening combo!',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true
  },
  {
    id: 'combo-3',
    nameBn: 'ইভনিং কম্বো ৩ (শর্মা + মালাই চা)',
    nameEn: 'Shawarma + Malai Tea Combo',
    price: 90, // (80 + 15 = 95 -> Save 5৳)
    category: 'combos',
    descriptionBn: '১টি জুসি চিকেন শর্মা + ১ কাপ স্পেশাল মালাই চা। আড্ডার সেরা কম্বো মাত্র ৯০৳!',
    descriptionEn: '1 Chicken Shawarma + 1 Special Matka Malai Tea. Perfect evening bite!',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'combo-4',
    nameBn: 'মালাই লাভার কম্বো (মালাই রুটি + মালাই চা)',
    nameEn: 'Malai Roti + Malai Tea Delight',
    price: 70, // (60 + 15 = 75 -> Save 5৳)
    category: 'combos',
    descriptionBn: '১টি মচমচে পরোটা মালাই + ১ কাপ সুবাসিত মালাই চা। গাঢ় মালাই এর রাজকীয় অনুভূতি!',
    descriptionEn: '1 Crispy Malai Roti + 1 Cup Matka Malai Tea.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true
  }
];

export const RESTAURANT_INFO = {
  nameBn: 'কফি পয়েন্ট',
  nameEn: 'Coffee Point',
  logoUrl: '/input_file_6.png',
  chefBn: 'মাস্টারশেফ রব্বি',
  chefEn: 'Masterchef Rabby',
  locationBn: 'সোনার বাংলা গেট, গদাবাগ, কেরাণীগঞ্জ, ঢাকা ১৩১০',
  locationEn: 'Sonar Bangla Gate, Godabag, Keraniganj, Dhaka 1310',
  phone: '01712-345678',
  whatsapp: '+8801319885649',
  whatsappUrl: 'https://wa.me/8801319885649?text=Assalamu%20Alaikum%20Masterchef%20Rabby,%20I%20want%20to%20order%20from%20Coffee%20Point!',
  facebookUrl: 'https://www.facebook.com/share/1J4Uuu2UJe/',
  bkash: '01712-345678 (Personal/Merchant)',
  openingHoursBn: 'প্রতিদিন দুপুর ১২:০০ টা - রাত ১১:০০ টা',
  openingHoursEn: 'Daily 12:00 PM - 11:00 PM',
  sloganBn: 'রান্না একটি শিল্প • ভালোবাসার ছোঁয়ায় মাস্টারশেফ রব্বির রন্ধনকলা',
  sloganEn: 'Cooking is an Art • Crafted with Passion by Masterchef Rabby',
  social: '@coffeepoint.keraniganj'
};
