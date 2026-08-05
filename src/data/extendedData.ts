import { GalleryItem, OrderItem, ReviewItem, SpaceApp, StockItem } from '../types';

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    userName: 'তানভীর আহমেদ',
    userPhone: '01711*****1',
    rating: 5,
    commentBn: 'কেরাণীগঞ্জের মধ্যে কফি পয়েন্টের মালাই চা ও সাব স্যান্ডুইচের মতো কোয়ালিটি আর কোথাও পাইনি! মাস্টারশেফ রব্বির হাতের জাদু আছে।',
    photoUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    itemOrdered: 'সাব স্যান্ডুইচ & মালাই চা',
    date: '২০২৬-০৮-০২',
    likes: 24,
    isVerified: true,
  },
  {
    id: 'rev-2',
    userName: 'সামিয়া রহমান',
    userPhone: '01822*****4',
    rating: 5,
    commentBn: 'কোল্ড কফিটা জাস্ট অসাম ছিল! ৫০ টাকায় এত থিক অ্যান্ড ক্রিমির কোল্ড কফি একদমই অপ্রত্যাশিত। পরিবেশটাও অনেক ফ্রেন্ডলি।',
    photoUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    itemOrdered: 'কোল্ড কফি',
    date: '২০২৬-০৮-০৩',
    likes: 18,
    isVerified: true,
  },
  {
    id: 'rev-3',
    userName: 'রাকিবুল ইসলাম (রাজু)',
    userPhone: '01933*****9',
    rating: 5,
    commentBn: 'ধামাকা কম্বো ১ টা ট্রাই করলাম। বার্গারের জুসিনেস আর স্পেশাল সস মাইন্ড ব্লোয়িং! ফ্রেন্ডদের নিয়ে আড্ডা দেওয়ার সেরা স্পট।',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    itemOrdered: 'ধামাকা কম্বো ১',
    date: '২০২৬-০৮-০৪',
    likes: 31,
    isVerified: true,
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    titleBn: 'মাস্টারশেফ রব্বির সিগনেচার বার্গার মেকিং',
    category: 'craft',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    likes: 88,
    captionBn: 'তাজা চিকেন প্যাটি ও সিক্রেট সসের মাস্টারশেফ কারিগরি স্পর্শ।',
  },
  {
    id: 'gal-2',
    titleBn: 'সোনার বাংলা গেট আউটলেটের সান্ধ্যকালীন রূপ',
    category: 'ambiance',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    likes: 112,
    captionBn: 'কেরাণীগঞ্জের সোনা বাংলা গেটের মিষ্টি লাইটিং আর কফির সুবাস।',
  },
  {
    id: 'gal-3',
    titleBn: 'স্পেশাল মাটকা মালাই চা তৈরি',
    category: 'craft',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    likes: 95,
    captionBn: 'ঘন গাঢ় দুধের খাঁটি মালাই দিয়ে তৈরি গরম গরম চায়ের কাপ।',
  },
  {
    id: 'gal-4',
    titleBn: 'হায়জিন ও পরিচ্ছন্ন ওপেন কিচেন',
    category: 'kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    likes: 64,
    captionBn: '১০০% পরিষ্কার পরিচ্ছন্ন পরিবেশে সুস্বাদু খাবার প্রস্তুত করা হয়।',
  },
  {
    id: 'gal-5',
    titleBn: 'ফুড লাভারদের আনন্দঘন মুহূর্ত',
    category: 'customers',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    likes: 140,
    captionBn: 'কফি পয়েন্টে বিকেলবেলার বন্ধুদের সান্ধ্যকালীন আড্ডা।',
  },
  {
    id: 'gal-6',
    titleBn: 'জুসি শর্মা ও চিজি সাব স্যান্ডুইচ',
    category: 'craft',
    imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
    likes: 73,
    captionBn: 'মুখরোচক মশলাদার স্বাদের হট ফ্রেশ প্রিপারেশন।',
  },
];

export const INITIAL_STOCK: StockItem[] = [
  {
    id: 'stk-1',
    nameBn: 'খাঁটি তরল দুধ',
    nameEn: 'Pure Liquid Milk',
    category: 'raw',
    quantity: 45,
    unit: 'লিটার',
    minThreshold: 15,
    costPerUnit: 90,
    lastRestocked: '২০২৬-০৮-০৪',
    supplier: 'কেরাণীগঞ্জ ডেইরি ফার্ম',
  },
  {
    id: 'stk-2',
    nameBn: 'প্রিমিয়াম রোস্টেড কফি বিনস',
    nameEn: 'Roasted Coffee Beans',
    category: 'beverage',
    quantity: 12,
    unit: 'কেজি',
    minThreshold: 5,
    costPerUnit: 1200,
    lastRestocked: '২০২৬-০৮-০১',
    supplier: 'স্পেশাল কফি ইমপোর্টস',
  },
  {
    id: 'stk-3',
    nameBn: 'চিকেন প্যাটি (বার্গারের)',
    nameEn: 'Chicken Burger Patties',
    category: 'meat',
    quantity: 120,
    unit: 'পিস',
    minThreshold: 30,
    costPerUnit: 35,
    lastRestocked: '২০২৬-০৮-০৩',
    supplier: 'মাস্টারশেফ প্রিপারেশন কিচেন',
  },
  {
    id: 'stk-4',
    nameBn: 'সাব স্যান্ডুইচ ব্রেড',
    nameEn: 'Sub Bread Buns',
    category: 'packaging',
    quantity: 80,
    unit: 'পিস',
    minThreshold: 20,
    costPerUnit: 25,
    lastRestocked: '২০২৬-০৮-০৪',
    supplier: 'গোল্ডেন বেকার্স কেরাণীগঞ্জ',
  },
  {
    id: 'stk-5',
    nameBn: 'মালাই চা মাটকা কাপ',
    nameEn: 'Clay Cups (Matka)',
    category: 'packaging',
    quantity: 350,
    unit: 'পিস',
    minThreshold: 100,
    costPerUnit: 4,
    lastRestocked: '২০২৬-০৭-২৮',
    supplier: 'মৃৎশিল্প কেরাণীগঞ্জ',
  },
  {
    id: 'stk-6',
    nameBn: 'মোজারেলা চিজ ব্লক',
    nameEn: 'Mozzarella Cheese',
    category: 'raw',
    quantity: 4,
    unit: 'কেজি',
    minThreshold: 6, // Triggering warning
    costPerUnit: 850,
    lastRestocked: '২০২৬-০৭-২৫',
    supplier: 'আড়ং ডেইরি সরবরাহ',
  },
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-101',
    orderNo: '#CP-901',
    customerName: 'শামসুল আরেফিন',
    customerPhone: '01712111222',
    tableNo: 'টেবিল ৩',
    orderType: 'dine-in',
    items: [
      {
        item: {
          id: 'burger-classic',
          nameBn: 'বার্গার',
          nameEn: 'Classic Burger',
          price: 80,
          category: 'burger',
          descriptionBn: '',
          descriptionEn: '',
          image: '',
        },
        quantity: 2,
        selectedOptions: ['এক্সট্রা চিজ (+২০৳)'],
      },
      {
        item: {
          id: 'cold-coffee',
          nameBn: 'কোল্ড কফি',
          nameEn: 'Cold Coffee',
          price: 50,
          category: 'coffee',
          descriptionBn: '',
          descriptionEn: '',
          image: '',
        },
        quantity: 2,
      },
    ],
    totalAmount: 280,
    status: 'delivered',
    createdAt: '১০:১৫ AM, ০৪ আগস্ট',
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
  },
  {
    id: 'ord-102',
    orderNo: '#CP-902',
    customerName: 'মেহজাবীন চৌধুরী',
    customerPhone: '01819333444',
    tableNo: 'টেবিল ৫',
    orderType: 'dine-in',
    items: [
      {
        item: {
          id: 'sub-sandwich',
          nameBn: 'সাব স্যান্ডুইচ',
          nameEn: 'Sub Sandwich',
          price: 90,
          category: 'sandwich',
          descriptionBn: '',
          descriptionEn: '',
          image: '',
        },
        quantity: 1,
      },
      {
        item: {
          id: 'malai-tea',
          nameBn: 'মালাই চা',
          nameEn: 'Malai Tea',
          price: 15,
          category: 'tea',
          descriptionBn: '',
          descriptionEn: '',
          image: '',
        },
        quantity: 2,
      },
    ],
    totalAmount: 120,
    status: 'cooking',
    createdAt: '১০:৪৫ AM, ০৪ আগস্ট',
    paymentMethod: 'cash',
    paymentStatus: 'paid',
  },
  {
    id: 'ord-103',
    orderNo: '#CP-903',
    customerName: 'আরিফুল ইসলাম',
    customerPhone: '01912555666',
    orderType: 'home-delivery',
    items: [
      {
        item: {
          id: 'combo-1',
          nameBn: 'ধামাকা কম্বো ১',
          nameEn: 'Combo 1',
          price: 120,
          category: 'combos',
          descriptionBn: '',
          descriptionEn: '',
          image: '',
        },
        quantity: 2,
      },
    ],
    totalAmount: 240,
    status: 'pending',
    createdAt: '১১:০২ AM, ০৪ আগস্ট',
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
  },
];

export const INITIAL_SPACES: SpaceApp[] = [
  {
    id: 'sp-1',
    titleBn: 'স্পিন অ্যান্ড উইন কুপন গেম',
    descriptionBn: 'কফি পয়েন্টে এসে হুইল ঘুরিয়ে জিতে নিন ফ্রি মালাই চা বা ১০% ডিসকাউন্ট ভাউচার!',
    iconName: 'Gift',
    category: 'loyalty',
    type: 'html_embed',
    isActive: true,
    htmlContent: `
      <div style="font-family: sans-serif; text-align: center; padding: 20px; background: #0f172a; color: #fff; border-radius: 12px;">
        <h2 style="color: #fbbf24;">🎉 কফি পয়েন্ট লাকি হুইল</h2>
        <p style="color: #94a3b8; font-size: 14px;">প্রতিদিন একবার ঘুরিয়ে জিতে নিন আকর্ষণীয় ছাড়!</p>
        <div id="wheel" style="width: 180px; height: 180px; margin: 20px auto; border-radius: 50%; border: 6px solid #fbbf24; background: conic-gradient(#d97706 0deg 90deg, #b45309 90deg 180deg, #92400e 180deg 270deg, #78350f 270deg 360deg); display: flex; align-items: center; justify-content: center; font-weight: bold; transition: transform 3s ease-out; font-size: 16px; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">
          🎁 আপনার কুপন
        </div>
        <button onclick="spinWheel()" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; border: none; padding: 12px 28px; font-weight: bold; border-radius: 30px; cursor: pointer; box-shadow: 0 4px 15px rgba(245,158,11,0.4); font-size: 16px;">স্পিন করুন!</button>
        <p id="result" style="margin-top: 15px; color: #4ade80; font-weight: bold; min-height: 24px;"></p>
        <script>
          function spinWheel() {
            var w = document.getElementById('wheel');
            var r = document.getElementById('result');
            var degrees = Math.floor(2000 + Math.random() * 2000);
            w.style.transform = 'rotate(' + degrees + 'deg)';
            r.innerText = 'ঘুরছে... অপেক্ষা করুন!';
            setTimeout(function() {
              var prizes = ['🎉 ১০% ছাড় কুপন (কোড: CP10)', '☕ ১ কাপ ফ্রি মালাই চা!', '🍔 বার্গারে ১৫৳ ডিসকাউন্ট!', '⭐ ২০ পয়েন্ট লয়ালটি বোনাস!'];
              var prize = prizes[Math.floor(Math.random() * prizes.length)];
              r.innerText = prize;
            }, 3000);
          }
        </script>
      </div>
    `,
  },
  {
    id: 'sp-2',
    titleBn: 'ক্যালোরি ও নিউট্রিশন ক্যলকুলেটর',
    descriptionBn: 'আপনার আজকের অর্ডারের মোট ক্যালোরি ও নিউট্রিশন পয়েন্ট সহজে হিসাব করুন।',
    iconName: 'Activity',
    category: 'utility',
    type: 'html_embed',
    isActive: true,
    htmlContent: `
      <div style="font-family: sans-serif; padding: 20px; background: #1e293b; color: #e2e8f0; border-radius: 12px;">
        <h3 style="color: #38bdf8; margin-top:0;">🥗 হেলথ অ্যান্ড ক্যালোরি ট্র্যাক</h3>
        <p style="font-size: 13px; color: #94a3b8;">কফি পয়েন্টের হেলদি ডায়েট গাইডার:</p>
        <ul style="line-height: 1.8; font-size: 14px; padding-left: 20px;">
          <li>কোল্ড কফি: <b>২১০ kcal</b></li>
          <li>হট কফি: <b>১৩০ kcal</b></li>
          <li>ক্লাসিক বার্গার: <b>৩২০ kcal</b></li>
          <li>মালাই চা: <b>১৬০ kcal</b></li>
        </ul>
        <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid #38bdf8; padding: 10px; border-radius: 8px; font-size: 13px; color: #7dd3fc;">
          💡 টিপস: মাস্টারশেফ রব্বির সুষম খাবার আপনার শরীরকে সারাদিন সতেজ রাখে!
        </div>
      </div>
    `,
  },
];
