export interface ChefProfile {
  nameBn: string;
  nameEn: string;
  titleBn: string;
  titleEn: string;
  experienceBn: string;
  experienceEn: string;
  bioBn: string;
  bioEn: string;
  phone: string;
  whatsapp: string;
  whatsappUrl: string;
  facebookUrl: string;
  locationBn: string;
  locationEn: string;
  kuwaitStoryBn: string;
  kuwaitStoryEn: string;
  specialtiesBn: string[];
  specialtiesEn: string[];
  photos: {
    id: string;
    url: string;
    titleBn: string;
    titleEn: string;
    tagBn: string;
    tagEn: string;
  }[];
  videos: {
    id: string;
    titleBn: string;
    titleEn: string;
    url: string;
    type: 'local_video' | 'facebook_reel';
    thumbnailUrl: string;
  }[];
}

export const CHEF_DATA: ChefProfile = {
  nameBn: 'মাহমুদুল ইসলাম রব্বি (শেফ রব্বি)',
  nameEn: 'Mahmudul Islam Rabbe (Chef Rabby)',
  titleBn: 'মাস্টারশেফ, কুকিং আর্টিস্ট ও কফি পয়েন্টের প্রতিষ্ঠাতা',
  titleEn: 'Masterchef, Culinary Artist & Founder of Coffee Point',
  experienceBn: 'কুয়েতে আন্তর্জাতিক পেশাদার কিচেনে ৮+ বছরের দক্ষতা ও কুয়েতি ট্রেনিংপ্রাপ্ত',
  experienceEn: '8+ Years Kuwait Culinary Training & Professional Chef Experience',
  bioBn: 'শেফ রব্বি রান্না করেন গভীর ভালোবাসা ও প্যাশন থেকে। তাঁর প্রতিটি রেসিপি কেবল খাবার নয়, একটি রন্ধনশিল্প (Art of Cooking)। কুয়েতের আন্তর্জাতিক রেস্তোরাঁয় কাজের দীর্ঘ অভিজ্ঞতায় তিনি উদ্ভাবন করেছেন নিজস্ব সিক্রেট মশলা, জুসি বার্গার ও খাঁটি মালাই চা।',
  bioEn: 'Chef Rabby cooks with passion and considers culinary creation as pure Art. Having honed his craft in top commercial kitchens in Kuwait, he brings authentic Arabian spices and artisanal Bangladeshi comfort foods to Coffee Point.',
  phone: '01712-345678',
  whatsapp: '+8801319885649',
  whatsappUrl: 'https://wa.me/8801319885649?text=Assalamu%20Alaikum%20Masterchef%20Rabby,%20I%20want%20to%20order%20from%20Coffee%20Point!',
  facebookUrl: 'https://www.facebook.com/share/1J4Uuu2UJe/',
  locationBn: 'সোনার বাংলা গেট, গদাবাগ, কেরাণীগঞ্জ, ঢাকা',
  locationEn: 'Sonar Bangla Gate, Godabag, Keraniganj, Dhaka',
  kuwaitStoryBn: 'কুয়েতের বিখ্যাত আন্তর্জাতিক রেস্তোরাঁয় কাজের অভিজ্ঞতা থেকে তৈরি হয়েছে সিক্রেট মেরিনেশন, ক্রাফট সস এবং পারফেক্ট টেম্পারেচারে খাঁটি মালাই চা তৈরির অনবদ্য আর্ট।',
  kuwaitStoryEn: 'Trained in Kuwait\'s finest kitchens, combining authentic Arabian spice blends with Bangladeshi passion.',
  specialtiesBn: [
    'সিক্রেট সস জুসি বার্গার ও ড্রাগন জুস',
    'কুয়েতি স্টাইল মশলাদার চিকেন শর্মা',
    'বেকড চিজ সাব স্যান্ডুইচ',
    'মাটকা বাটি খাঁটি মালাই চা ও রুটি',
    'স্পেশাল থিক কোল্ড কফি'
  ],
  specialtiesEn: [
    'Secret Sauce Juicy Burgers & Fresh Juices',
    'Kuwaiti Spiced Chicken Shawarma',
    'Oven Baked Sub Sandwiches',
    'Traditional Clay Matka Malai Tea',
    'Thick Blended Cold Coffee'
  ],
  photos: [
    {
      id: 'chef-photo-logo-full',
      url: '/input_file_5.png',
      titleBn: 'মাস্টারশেফ রব্বি - অফিশিয়াল ব্র্যান্ডিং পোর্ট্রেট',
      titleEn: 'Masterchef Rabby Official Branding Portrait',
      tagBn: 'মাস্টারশেফ রব্বি',
      tagEn: 'Masterchef Rabby'
    },
    {
      id: 'chef-photo-1',
      url: '/input_file_1.png',
      titleBn: 'মাস্টারশেফ রব্বি - কিচেন স্টুডিওতে ড্রাগন জুস ও বার্গার সমাহারে',
      titleEn: 'Masterchef Rabby with Dragon Fruit Drink & Burger',
      tagBn: 'শেফ স্পেশাল',
      tagEn: 'Chef Signature'
    },
    {
      id: 'chef-photo-kuwait-thobe',
      url: '/input_file_2.png',
      titleBn: 'কুয়েতের ঐতিহ্যবাহী আরবি পোশাকে শেফ রব্বি',
      titleEn: 'Chef Rabby in Traditional Kuwaiti Ghutra & Thobe',
      tagBn: 'কুয়েত মেমোরিজ',
      tagEn: 'Kuwait Memories'
    },
    {
      id: 'chef-photo-kuwait-sword',
      url: '/input_file_3.png',
      titleBn: 'কুয়েতের রাজকীয় লাউঞ্জে শেফ মাহমুদুল ইসলাম রব্বি',
      titleEn: 'Chef Rabby in Kuwaiti Royal Lounge',
      tagBn: 'কুয়েত লাইফস্টাইল',
      tagEn: 'Kuwait Heritage'
    },
    {
      id: 'chef-photo-portrait',
      url: '/input_file_4.png',
      titleBn: 'পেশাদার শেফ পোশাকে শেফ রব্বি',
      titleEn: 'Chef Rabby Executive Uniform Portrait',
      tagBn: 'পেশাদার রূপ',
      tagEn: 'Executive Chef'
    }
  ],
  videos: [
    {
      id: 'local-vid-0',
      titleBn: 'মাস্টারশেফ রব্বির প্রফেশনাল কিচেন ওয়াকথ্রু ও ব্র্যান্ড রিভিল',
      titleEn: 'Masterchef Rabby Kitchen Walkthrough & Brand Reveal',
      url: '/input_file_0.mp4',
      type: 'local_video',
      thumbnailUrl: '/input_file_5.png'
    },
    {
      id: 'local-vid-1',
      titleBn: 'ওয়েলকাম টু কফি পয়েন্ট - শেফ রব্বির অফিশিয়াল বার্তা',
      titleEn: 'Welcome to Coffee Point - Chef Rabby Official Intro',
      url: '/input_file_1.mp4',
      type: 'local_video',
      thumbnailUrl: '/input_file_1.png'
    },
    {
      id: 'local-vid-2',
      titleBn: 'মাস্টারশেফ রব্বির সিক্রেট কিচেন সার্ভিস ও মেসেজ',
      titleEn: 'Chef Rabby Secret Kitchen Service Speech',
      url: '/input_file_2.mp4',
      type: 'local_video',
      thumbnailUrl: '/input_file_4.png'
    },
    {
      id: 'reel-1',
      titleBn: 'কফি পয়েন্ট সিক্রেট কিচেন ও স্পেশাল মালাই চা প্রিপারেশন',
      titleEn: 'Coffee Point Kitchen & Malai Tea Preparation',
      url: 'https://www.facebook.com/share/r/1Ccebt23DD/',
      type: 'facebook_reel',
      thumbnailUrl: '/input_file_0.png'
    },
    {
      id: 'reel-2',
      titleBn: 'মাস্টারশেফ রব্বির জুসি বার্গার ও সাব স্যান্ডুইচ মেকিং',
      titleEn: 'Masterchef Rabby Burger & Sub Making',
      url: 'https://www.facebook.com/share/r/1EKnJ3Ank1/',
      type: 'facebook_reel',
      thumbnailUrl: '/input_file_1.png'
    }
  ]
};
