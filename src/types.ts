export type CategoryId = 'all' | 'burger' | 'sandwich' | 'shawarma' | 'chowmein' | 'coffee' | 'tea' | 'snacks' | 'combos';

export interface MenuItem {
  id: string;
  nameBn: string;
  nameEn: string;
  price: number;
  category: CategoryId;
  descriptionBn: string;
  descriptionEn: string;
  image: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  preparationTime?: string;
  spicyLevel?: 0 | 1 | 2 | 3; // 0=None, 1=Mild, 2=Medium, 3=Hot
  calories?: string;
  options?: string[];
  inStock?: boolean;
  sketchfabEmbedUrl?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOptions?: string[];
  note?: string;
}

export type PrintTemplate = 'luxury-gold' | 'vintage-craft' | 'modern-cafe' | 'compact-table-tent';
export type PaperSize = 'a4' | 'a5' | 'table-card';

export interface PrintConfig {
  template: PrintTemplate;
  paperSize: PaperSize;
  columns: 1 | 2 | 3;
  showImages: boolean;
  showQR: boolean;
  showChefNote: boolean;
  customHotline: string;
  customNotice: string;
  currencySymbol: string;
}

export interface CategoryInfo {
  id: CategoryId;
  nameBn: string;
  nameEn: string;
  icon: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  userPhone?: string;
  rating: number; // 1 to 5
  commentBn: string;
  photoUrl?: string;
  itemOrdered?: string;
  date: string;
  likes: number;
  isVerified?: boolean;
}

export interface GalleryItem {
  id: string;
  titleBn: string;
  category: 'craft' | 'ambiance' | 'kitchen' | 'events' | 'customers';
  imageUrl: string;
  likes: number;
  captionBn?: string;
}

export interface StockItem {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'raw' | 'packaging' | 'beverage' | 'spices' | 'meat';
  quantity: number;
  unit: 'কেজি' | 'লিটার' | 'প্যাক' | 'পিস' | 'গ্রাম';
  minThreshold: number;
  costPerUnit: number;
  lastRestocked: string;
  supplier: string;
}

export type OrderStatus = 'pending' | 'cooking' | 'ready' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  tableNo?: string;
  orderType: 'dine-in' | 'takeaway' | 'home-delivery';
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: 'cash' | 'bkash' | 'nagad' | 'card';
  paymentStatus: 'paid' | 'unpaid';
}

export interface SpaceApp {
  id: string;
  titleBn: string;
  descriptionBn: string;
  iconName: string;
  category: 'game' | 'utility' | 'promo' | 'loyalty';
  htmlContent?: string;
  externalUrl?: string;
  type: 'html_embed' | 'external_link';
  isActive: boolean;
}

export type AppTab = 
  | 'menu' 
  | 'chef' 
  | 'videos' 
  | 'table-service' 
  | 'spin' 
  | 'qr' 
  | 'ar' 
  | 'camera' 
  | 'gallery' 
  | 'reviews' 
  | 'superadmin' 
  | 'combo' 
  | 'print' 
  | 'ai';

