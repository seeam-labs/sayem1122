import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DigitalMenu } from './components/DigitalMenu';
import { PrintableMenuDesigner } from './components/PrintableMenuDesigner';
import { ChefRabbiAiAssistant } from './components/ChefRabbiAiAssistant';
import { ComboBuilder } from './components/ComboBuilder';
import { LocationCard } from './components/LocationCard';
import { CartDrawer } from './components/CartDrawer';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { QrTableModal } from './components/QrTableModal';
import { TableServiceModal } from './components/TableServiceModal';
import { LuckySpinModal } from './components/LuckySpinModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { GlassBottomNav } from './components/GlassBottomNav';
import { CameraStudio } from './components/CameraStudio';
import { PhotoGallery } from './components/PhotoGallery';
import { CustomerReviews } from './components/CustomerReviews';
import { SuperAdminPanel } from './components/SuperAdmin/SuperAdminPanel';
import { ArMenuStudio } from './components/ArMenuStudio';
import { ChefProfileModal } from './components/ChefProfileModal';
import { ChefProfilePage } from './components/ChefProfilePage';
import { TableServicePage } from './components/TableServicePage';
import { QrCodePage } from './components/QrCodePage';
import { LuckySpinPage } from './components/LuckySpinPage';
import { MenuSidebarDrawer } from './components/MenuSidebarDrawer';
import { ChefVideoShowcase } from './components/ChefVideoShowcase';
import { DeveloperCredit } from './components/DeveloperCredit';

import { AppTab, CartItem, GalleryItem, MenuItem, OrderItem, ReviewItem, SpaceApp, StockItem } from './types';
import { MENU_ITEMS, RESTAURANT_INFO } from './data/menuData';
import { INITIAL_GALLERY, INITIAL_ORDERS, INITIAL_REVIEWS, INITIAL_SPACES, INITIAL_STOCK } from './data/extendedData';
import { Coffee, Heart } from 'lucide-react';
import { sounds } from './lib/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [selectedArItem, setSelectedArItem] = useState<MenuItem | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isTableServiceOpen, setIsTableServiceOpen] = useState(false);
  const [isLuckySpinOpen, setIsLuckySpinOpen] = useState(false);
  const [isChefModalOpen, setIsChefModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [orderTrackerData, setOrderTrackerData] = useState<{ open: boolean; orderNo: string; tableNo: string; total: number }>({
    open: false,
    orderNo: '#CP-1001',
    tableNo: '01',
    total: 0,
  });

  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number }>({ code: '', discount: 0 });
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  // Helper to deduplicate arrays by ID to prevent duplicate keys
  const dedupeById = <T extends { id: string }>(items: T[]): T[] => {
    const seen = new Set<string>();
    return items.filter((item) => {
      if (!item || !item.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  // Dynamic state loaded from localStorage or initial defaults
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('cp_menu_items');
      return saved ? dedupeById(JSON.parse(saved)) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });

  const [stockItems, setStockItems] = useState<StockItem[]>(() => {
    try {
      const saved = localStorage.getItem('cp_stock_items');
      return saved ? dedupeById(JSON.parse(saved)) : INITIAL_STOCK;
    } catch {
      return INITIAL_STOCK;
    }
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('cp_orders');
      return saved ? dedupeById(JSON.parse(saved)) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('cp_reviews');
      return saved ? dedupeById(JSON.parse(saved)) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('cp_gallery');
      return saved ? dedupeById(JSON.parse(saved)) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [spaces, setSpaces] = useState<SpaceApp[]>(() => {
    try {
      const saved = localStorage.getItem('cp_spaces');
      return saved ? dedupeById(JSON.parse(saved)) : INITIAL_SPACES;
    } catch {
      return INITIAL_SPACES;
    }
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('cp_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('cp_stock_items', JSON.stringify(stockItems));
  }, [stockItems]);

  useEffect(() => {
    localStorage.setItem('cp_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cp_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('cp_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('cp_spaces', JSON.stringify(spaces));
  }, [spaces]);

  // Cart operations
  const handleAddToCart = (item: MenuItem, selectedOptions: string[] = []) => {
    sounds.playAddToCart();
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevCart, { item, quantity: 1, selectedOptions }];
    });
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleApplyCoupon = (code: string, discount: number) => {
    setAppliedCoupon({ code, discount });
  };

  const handleRequestTableService = (tableNo: string, serviceType: string, note?: string) => {
    console.log(`Table Service Request: Table ${tableNo}, Type: ${serviceType}, Note: ${note}`);
  };

  // State update handlers for Super Admin & Camera/Reviews/Gallery
  const handleUpdateMenuItem = (updated: MenuItem) => {
    setMenuItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleAddMenuItem = (newItem: MenuItem) => {
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const handleUpdateStock = (updated: StockItem) => {
    setStockItems((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleAddStock = (newItem: StockItem) => {
    setStockItems((prev) => [newItem, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderItem['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const handleAddReview = (newRev: ReviewItem) => {
    setReviews((prev) => [newRev, ...prev]);
  };

  const handleAddGalleryItem = (item: GalleryItem) => {
    setGalleryItems((prev) => [item, ...prev]);
  };

  const handleToggleSpace = (spaceId: string) => {
    setSpaces((prev) => prev.map((sp) => (sp.id === spaceId ? { ...sp, isActive: !sp.isActive } : sp)));
  };

  const cartCount = cart.reduce((count, ci) => count + ci.quantity, 0);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-amber-50/60 text-slate-900'} font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between pb-16 transition-colors duration-300`}>
      <div>
        {/* Sticky Translucent Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={cartCount}
          setIsCartOpen={setIsCartOpen}
          setIsQrModalOpen={setIsQrModalOpen}
          setIsTableServiceOpen={setIsTableServiceOpen}
          setIsLuckySpinOpen={setIsLuckySpinOpen}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          lang={lang}
          setLang={setLang}
        />

        {/* Main Route Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          {activeTab === 'menu' && (
            <>
              <DigitalMenu
                menuItems={menuItems}
                onAddToCart={handleAddToCart}
                onSelectItem={(item) => setSelectedItemForModal(item)}
                lang={lang}
                onOpenArView={(item) => {
                  setSelectedArItem(item);
                  setActiveTab('ar');
                }}
              />

              {/* Masterchef Videos & Reels Showcase on Homepage */}
              <ChefVideoShowcase
                onOpenChefPage={() => setActiveTab('chef')}
              />
            </>
          )}

          {activeTab === 'chef' && (
            <ChefProfilePage onOrderClick={() => setActiveTab('menu')} />
          )}

          {activeTab === 'videos' && (
            <ChefVideoShowcase onOpenChefPage={() => setActiveTab('chef')} />
          )}

          {activeTab === 'table-service' && (
            <TableServicePage onRequestService={handleRequestTableService} lang={lang} />
          )}

          {activeTab === 'qr' && (
            <QrCodePage />
          )}

          {activeTab === 'spin' && (
            <LuckySpinPage onApplyCoupon={handleApplyCoupon} lang={lang} />
          )}

          {activeTab === 'ar' && (
            <ArMenuStudio
              menuItems={menuItems}
              onAddToCart={handleAddToCart}
              lang={lang}
              initialSelectedItem={selectedArItem}
              onPhotoUploadedAsReview={(newRev) => {
                handleAddReview(newRev);
                setActiveTab('reviews');
              }}
            />
          )}

          {activeTab === 'camera' && (
            <CameraStudio
              onPhotoUploadedAsReview={(newRev) => {
                handleAddReview(newRev);
                setActiveTab('reviews');
              }}
            />
          )}

          {activeTab === 'gallery' && (
            <PhotoGallery
              galleryItems={galleryItems}
              onAddGalleryItem={handleAddGalleryItem}
            />
          )}

          {activeTab === 'reviews' && (
            <CustomerReviews
              reviews={reviews}
              onAddReview={handleAddReview}
              onOpenCameraStudio={() => setActiveTab('camera')}
            />
          )}

          {activeTab === 'superadmin' && (
            <SuperAdminPanel
              menuItems={menuItems}
              onUpdateMenuItem={handleUpdateMenuItem}
              onAddMenuItem={handleAddMenuItem}
              stockItems={stockItems}
              onUpdateStock={handleUpdateStock}
              onAddStock={handleAddStock}
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              spaces={spaces}
              onToggleSpace={handleToggleSpace}
            />
          )}

          {activeTab === 'print' && <PrintableMenuDesigner />}

          {activeTab === 'combo' && <ComboBuilder onAddToCart={handleAddToCart} lang={lang} />}

          {activeTab === 'ai' && <ChefRabbiAiAssistant lang={lang} />}

          {activeTab === 'location' && <LocationCard lang={lang} />}
        </main>
      </div>

      {/* Floating Glassmorphism Bottom Navigation Bar */}
      <GlassBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenChefModal={() => setActiveTab('chef')}
        onOpenTableService={() => setActiveTab('table-service')}
        onQuickOrderTea={() => {
          const tea = menuItems.find((i) => i.id === 'malai-tea');
          if (tea) handleAddToCart(tea);
        }}
      />

      {/* Menu Sidebar Drawer */}
      <MenuSidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenChefModal={() => setActiveTab('chef')}
        onOpenTableService={() => setActiveTab('table-service')}
        onOpenLuckySpin={() => setActiveTab('spin')}
        onOpenQrModal={() => setActiveTab('qr')}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Global Footer */}
      <footer className="no-print bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 text-xs mt-12 mb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-between">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-white font-serif font-bold text-sm flex items-center justify-center md:justify-start gap-1.5">
              <Coffee className="w-4 h-4 text-amber-400" />
              <span>{RESTAURANT_INFO.nameBn}</span>
            </h4>
            <p className="text-amber-300/80 font-medium">{RESTAURANT_INFO.chefBn}</p>
            <p className="text-slate-500">{RESTAURANT_INFO.locationBn}</p>
          </div>

          <div className="text-center space-y-1">
            <p className="text-slate-300 font-medium">হটলাইন ও অনলাইন টেকঅ্যাওয়ে অর্ডার</p>
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-amber-400 font-bold font-mono text-sm block hover:underline">
              {RESTAURANT_INFO.phone}
            </a>
            <p className="text-slate-500 text-[11px]">{RESTAURANT_INFO.openingHoursBn}</p>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-slate-400">© 2026 কফি পয়েন্ট। সর্বস্বত্ব সংরক্ষিত।</p>
            <p className="text-slate-500 text-[11px] flex items-center justify-center md:justify-end gap-1">
              <span>ডিজাইনড বাই</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span className="text-amber-400 font-semibold">মাস্টারশেফ রব্বি</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Developer Credit Footer */}
      <DeveloperCredit />

      {/* Chef Profile & Videos Modal */}
      <ChefProfileModal
        isOpen={isChefModalOpen}
        onClose={() => setIsChefModalOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
        lang={lang}
        couponCode={appliedCoupon.code}
        discountAmount={appliedCoupon.discount}
        onOpenOrderTracker={(orderNo, tableNo, total) => {
          setOrderTrackerData({ open: true, orderNo, tableNo, total });
        }}
      />

      {/* Item Details Popup */}
      <ItemDetailsModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      {/* QR Table Sticker Modal */}
      <QrTableModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      {/* Table Service Call Bell Modal */}
      <TableServiceModal
        isOpen={isTableServiceOpen}
        onClose={() => setIsTableServiceOpen(false)}
        onRequestService={handleRequestTableService}
        lang={lang}
      />

      {/* Lucky Spin Wheel Modal */}
      <LuckySpinModal
        isOpen={isLuckySpinOpen}
        onClose={() => setIsLuckySpinOpen(false)}
        onApplyCoupon={handleApplyCoupon}
        lang={lang}
      />

      {/* Live Order Status Tracker Modal */}
      <OrderStatusModal
        isOpen={orderTrackerData.open}
        onClose={() => setOrderTrackerData((prev) => ({ ...prev, open: false }))}
        orderNo={orderTrackerData.orderNo}
        tableNo={orderTrackerData.tableNo}
        totalAmount={orderTrackerData.total}
        lang={lang}
      />
    </div>
  );
}
