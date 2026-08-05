import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, BarChart3, Package, UtensilsCrossed, Settings, DollarSign,
  Plus, Edit, CheckCircle, AlertTriangle, Download, Trash2, Layers, RefreshCw, Eye, Lock
} from 'lucide-react';
import { MenuItem, OrderItem, SpaceApp, StockItem } from '../../types';

interface SuperAdminPanelProps {
  menuItems: MenuItem[];
  onUpdateMenuItem: (updated: MenuItem) => void;
  onAddMenuItem: (newItem: MenuItem) => void;
  stockItems: StockItem[];
  onUpdateStock: (updated: StockItem) => void;
  onAddStock: (newItem: StockItem) => void;
  orders: OrderItem[];
  onUpdateOrderStatus: (orderId: string, status: OrderItem['status']) => void;
  spaces: SpaceApp[];
  onToggleSpace: (spaceId: string) => void;
}

export const SuperAdminPanel: React.FC<SuperAdminPanelProps> = ({
  menuItems,
  onUpdateMenuItem,
  onAddMenuItem,
  stockItems,
  onUpdateStock,
  onAddStock,
  orders,
  onUpdateOrderStatus,
  spaces,
  onToggleSpace,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'kds' | 'menu-cms' | 'spaces'>('analytics');
  const [pinInput, setPinInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin123' || pinInput === '2026') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('ভুল পাসওয়ার্ড/পিন! সঠিক পিন দিন (ডিফল্ট: 1234)');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 mx-auto shadow-xl">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white font-serif">
              সুপার অ্যাডমিন সিকিউরিটি লক
            </h2>
            <p className="text-xs text-slate-400">
              ম্যানেজমেন্ট প্যানেলে প্রবেশের জন্য পাসওয়ার্ড বা পিন কোড প্রদান করুন
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="পিন কোড দিন (ডিফল্ট: 1234)"
                className="w-full text-center bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl py-3 px-4 text-base font-mono text-amber-300 font-bold tracking-widest focus:outline-none"
              />
            </div>

            {pinError && (
              <p className="text-xs font-bold text-red-400 bg-red-950/40 p-2.5 rounded-xl border border-red-500/30">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition active:scale-95"
            >
              প্যানেলে প্রবেশ করুন 🔓
            </button>
          </form>

          <div className="text-[11px] text-amber-300/80 bg-amber-950/40 border border-amber-500/20 p-3 rounded-xl">
            💡 <span className="font-bold">ম্যানেজমেন্ট টিপ:</span> ডেমো বা টেস্টের জন্য অ্যাডমিন পিন কোড: <code className="font-mono font-bold text-white bg-slate-950 px-1.5 py-0.5 rounded">1234</code>
          </div>
        </div>
      </div>
    );
  }

  // New Stock Form
  const [showAddStockModal, setShowAddStockModal] = useState<boolean>(false);
  const [newStockName, setNewStockName] = useState<string>('');
  const [newStockQty, setNewStockQty] = useState<number>(10);
  const [newStockUnit, setNewStockUnit] = useState<StockItem['unit']>('কেজি');
  const [newStockCost, setNewStockCost] = useState<number>(100);

  // New Menu Item Form
  const [showAddMenuModal, setShowAddMenuModal] = useState<boolean>(false);
  const [newItemNameBn, setNewItemNameBn] = useState<string>('');
  const [newItemPrice, setNewItemPrice] = useState<number>(100);
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('burger');

  // Compute analytics metrics
  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const avgOrderVal = totalOrdersCount > 0 ? Math.round(totalSales / totalOrdersCount) : 0;
  const lowStockCount = stockItems.filter((s) => s.quantity <= s.minThreshold).length;

  const handleRestock = (item: StockItem, addAmount: number) => {
    const updated: StockItem = {
      ...item,
      quantity: item.quantity + addAmount,
      lastRestocked: new Date().toISOString().split('T')[0],
    };
    onUpdateStock(updated);
  };

  const handleAddNewStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStockName.trim()) return;

    const newItem: StockItem = {
      id: `stk-${Date.now()}`,
      nameBn: newStockName,
      nameEn: newStockName,
      category: 'raw',
      quantity: newStockQty,
      unit: newStockUnit,
      minThreshold: 5,
      costPerUnit: newStockCost,
      lastRestocked: new Date().toISOString().split('T')[0],
      supplier: 'লোকাল মার্কেট কেরাণীগঞ্জ',
    };

    onAddStock(newItem);
    setShowAddStockModal(false);
    setNewStockName('');
  };

  const handleAddNewMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemNameBn.trim()) return;

    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      nameBn: newItemNameBn,
      nameEn: newItemNameBn,
      price: newItemPrice,
      category: newItemCategory,
      descriptionBn: 'মাস্টারশেফ রব্বির বিশেষ কারিগরি ফ্রেশ রেসিপি।',
      descriptionEn: 'Chef Rabbi special freshly prepared dish.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      inStock: true,
    };

    onAddMenuItem(newItem);
    setShowAddMenuModal(false);
    setNewItemNameBn('');
  };

  const exportCSVReport = () => {
    const csvRows = [
      ['অর্ডার আইডি', 'গ্রাহক', 'ফোন', 'ধরন', 'মূল্য (৳)', 'স্ট্যাটাস'],
      ...orders.map((o) => [o.orderNo, o.customerName, o.customerPhone, o.orderType, o.totalAmount, o.status]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `coffee-point-sales-report-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-28 px-4 max-w-7xl mx-auto">
      {/* Super Admin Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/60 to-slate-900 border border-amber-500/40 rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                SUPER BUSINESS ADMIN
              </span>
              <span className="text-xs text-emerald-400 font-medium">● সিস্টেম সক্রিয়</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-0.5">
              কফি পয়েন্ট ফুল ডায়নামিক ম্যানেজমেন্ট প্যানেল
            </h2>
            <p className="text-xs text-slate-400">
              ইনভেনটরি, কেডিএস লাইভ কিচেন, সেলস রিপোর্ট ও কাস্টম স্পেস পরিচালনা করুন
            </p>
          </div>
        </div>

        <button
          onClick={exportCSVReport}
          className="px-4 py-2.5 bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs rounded-xl hover:bg-slate-700 transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          সেলস রিপোর্ট ডাউনলোড (CSV)
        </button>
      </div>

      {/* Control Module Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {[
          { id: 'analytics', label: '📊 সেলস ও এ্যানালিটিক্স', icon: BarChart3 },
          { id: 'inventory', label: `📦 ইনভেনটরি ও স্টক (${lowStockCount ? `⚠️ ${lowStockCount}` : 'OK'})`, icon: Package },
          { id: 'kds', label: '👨‍🍳 কেডিএস লাইভ কিচেন', icon: UtensilsCrossed },
          { id: 'menu-cms', label: '🏷️ মেন্যু ও প্রাইজ সিএমএস', icon: Settings },
          { id: 'spaces', label: '🚀 মাইক্রো-অ্যাপস স্পেস', icon: Layers },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-slate-400">মোট বিক্রি (Revenue)</span>
              <p className="text-2xl font-black text-amber-400 mt-1">৳ {totalSales.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-400 mt-1">↑ ১০% গ্রোথ আজকের দিনে</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-slate-400">মোট সম্পন্ন অর্ডার</span>
              <p className="text-2xl font-black text-white mt-1">{totalOrdersCount} টি</p>
              <p className="text-[11px] text-slate-400 mt-1">ডাইনিং ও হোম ডেলিভারি</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-slate-400">গড় অর্ডার মূল্য (AOV)</span>
              <p className="text-2xl font-black text-amber-300 mt-1">৳ {avgOrderVal}</p>
              <p className="text-[11px] text-slate-400 mt-1">প্রতি টিকিটে গড় আয়</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <span className="text-xs font-semibold text-slate-400">স্টক ওয়ার্নিং আলার্ট</span>
              <p className={`text-2xl font-black mt-1 ${lowStockCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {lowStockCount} টি আইটেম
              </p>
              <p className="text-[11px] text-slate-400 mt-1">পুনরায় অর্ডার করার অনুরোধ</p>
            </div>
          </div>

          {/* Quick Business Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-amber-300 mb-4">সেরা বিক্রি হওয়া আইটেমসমূহ</h3>
            <div className="space-y-3">
              {[
                { name: 'স্পেশাল মালাই চা', sold: 180, rev: 2700 },
                { name: 'ক্লাসিক জুসি বার্গার', sold: 65, rev: 5200 },
                { name: 'ক্রিমি কোল্ড কফি', sold: 54, rev: 2700 },
                { name: 'ধামাকা কম্বো ১', sold: 38, rev: 4560 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl">
                  <span className="text-xs font-bold text-slate-200">{item.name}</span>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-amber-400">{item.sold} টি বিক্রি</span>
                    <span className="text-[11px] text-slate-400 block">৳ {item.rev}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory & Stock Management */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-amber-300">কাঁচামাল ও ইনভেনটরি স্টক টেবিল</h3>
            <button
              onClick={() => setShowAddStockModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow hover:brightness-110 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> নতুন স্টক যোগ করুন
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-amber-400 border-b border-slate-800">
                <tr>
                  <th className="p-3.5">আইটেমের নাম</th>
                  <th className="p-3.5">ক্যাটাগরি</th>
                  <th className="p-3.5">বর্তমান স্টক</th>
                  <th className="p-3.5">একক মূল্য (৳)</th>
                  <th className="p-3.5">স্ট্যাটাস</th>
                  <th className="p-3.5 text-right">স্টক আপডেট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {stockItems.map((item) => {
                  const isLow = item.quantity <= item.minThreshold;

                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3.5 font-bold text-white">{item.nameBn}</td>
                      <td className="p-3.5 text-slate-400 uppercase">{item.category}</td>
                      <td className="p-3.5 font-extrabold text-slate-200">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-3.5 text-slate-300">৳ {item.costPerUnit}</td>
                      <td className="p-3.5">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
                            <AlertTriangle className="w-3 h-3" /> কম স্টক!
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                            <CheckCircle className="w-3 h-3" /> পর্যাপ্ত
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleRestock(item, 10)}
                          className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 text-[11px] font-bold"
                        >
                          +১০ {item.unit} যোগ
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: KDS Live Kitchen Order Pipeline */}
      {activeTab === 'kds' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-amber-300">কেডিএস (Kitchen Display System) লাইভ অর্ডার ট্র্যাকার</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { id: 'pending', title: 'অপেক্ষমান (Pending)', color: 'border-yellow-500/50 bg-yellow-950/10' },
              { id: 'cooking', title: 'তৈরি হচ্ছে (Cooking)', color: 'border-blue-500/50 bg-blue-950/10' },
              { id: 'ready', title: 'রেডি (Ready)', color: 'border-purple-500/50 bg-purple-950/10' },
              { id: 'delivered', title: 'ডেলিভার্ড (Delivered)', color: 'border-emerald-500/50 bg-emerald-950/10' },
            ].map((col) => {
              const columnOrders = orders.filter((o) => o.status === col.id);

              return (
                <div key={col.id} className={`border rounded-2xl p-4 min-h-[350px] ${col.color}`}>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-bold text-slate-200">{col.title}</h4>
                    <span className="text-xs bg-slate-800 text-amber-400 font-extrabold px-2 py-0.5 rounded-full">
                      {columnOrders.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {columnOrders.map((ord) => (
                      <div key={ord.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow">
                        <div className="flex justify-between items-center text-xs font-extrabold text-amber-400">
                          <span>{ord.orderNo}</span>
                          <span className="text-slate-400 text-[10px]">{ord.createdAt}</span>
                        </div>
                        <p className="text-xs font-bold text-white mt-1">{ord.customerName} ({ord.tableNo || 'ডেলিভারি'})</p>

                        <div className="my-2 text-[11px] text-slate-300 border-y border-slate-800/80 py-1.5 space-y-1">
                          {ord.items.map((it, idx) => (
                            <div key={`${it.item?.id || 'item'}-${idx}`} className="flex justify-between">
                              <span>• {it.item.nameBn}</span>
                              <span className="font-bold">x{it.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-2 pt-1">
                          <span className="text-xs font-bold text-emerald-400">৳ {ord.totalAmount}</span>

                          {ord.status === 'pending' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'cooking')}
                              className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold"
                            >
                              রান্না শুরু →
                            </button>
                          )}
                          {ord.status === 'cooking' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'ready')}
                              className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold"
                            >
                              রেডি করুন →
                            </button>
                          )}
                          {ord.status === 'ready' && (
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold"
                            >
                              ডেলিভার করুন ✓
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Dynamic Menu & Price CMS */}
      {activeTab === 'menu-cms' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-amber-300">মেন্যু আইটেম ও মূল্য সরাসরি এডিটর</h3>
            <button
              onClick={() => setShowAddMenuModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow hover:brightness-110 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> নতুন ডিশ যোগ করুন
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-3 items-center">
                <img src={item.image} alt={item.nameBn} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{item.nameBn}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-extrabold text-amber-400">৳</span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => onUpdateMenuItem({ ...item, price: Number(e.target.value) })}
                      className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-amber-300 font-bold"
                    />
                  </div>
                  <button
                    onClick={() => onUpdateMenuItem({ ...item, inStock: !(item.inStock ?? true) })}
                    className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      (item.inStock ?? true)
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    {(item.inStock ?? true) ? 'স্টকে আছে' : 'স্টক আউট'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Micro-App Spaces System */}
      {activeTab === 'spaces' && (
        <div className="space-y-6">
          <h3 className="text-base font-bold text-amber-300">মাইক্রো-অ্যাপস (Spaces Ecosystem)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spaces.map((sp) => (
              <div key={sp.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{sp.titleBn}</h4>
                  <button
                    onClick={() => onToggleSpace(sp.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      sp.isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {sp.isActive ? 'সক্রিয়' : 'বন্ধ'}
                  </button>
                </div>
                <p className="text-xs text-slate-400">{sp.descriptionBn}</p>
                {sp.htmlContent && (
                  <div className="mt-2 border border-slate-800 rounded-xl overflow-hidden max-h-48">
                    <div dangerouslySetInnerHTML={{ __html: sp.htmlContent }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Stock Modal */}
      <AnimatePresence>
        {showAddStockModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 max-w-md w-full text-white">
              <h3 className="text-base font-bold text-amber-300 mb-3">নতুন ইনভেনটরি স্টক যোগ করুন</h3>
              <form onSubmit={handleAddNewStock} className="space-y-3 text-xs">
                <div>
                  <label className="block mb-1 font-semibold text-slate-300">আইটেমের নাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ফুল ক্রিম মিল্ক পাউডার"
                    value={newStockName}
                    onChange={(e) => setNewStockName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-1 font-semibold text-slate-300">পরিমাণ</label>
                    <input
                      type="number"
                      value={newStockQty}
                      onChange={(e) => setNewStockQty(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-slate-300">একক (Unit)</label>
                    <select
                      value={newStockUnit}
                      onChange={(e) => setNewStockUnit(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                    >
                      <option value="কেজি">কেজি</option>
                      <option value="লিটার">লিটার</option>
                      <option value="প্যাক">প্যাক</option>
                      <option value="পিস">পিস</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddStockModal(false)}
                    className="flex-1 py-2 bg-slate-800 rounded-xl font-bold text-slate-300"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl"
                  >
                    সেভ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Menu Item Modal */}
      <AnimatePresence>
        {showAddMenuModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 max-w-md w-full text-white">
              <h3 className="text-base font-bold text-amber-300 mb-3">নতুন মেন্যু ডিশ যোগ করুন</h3>
              <form onSubmit={handleAddNewMenuItem} className="space-y-3 text-xs">
                <div>
                  <label className="block mb-1 font-semibold text-slate-300">খাবারের বাংলা নাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: স্পেশাল নাগা বার্গার"
                    value={newItemNameBn}
                    onChange={(e) => setNewItemNameBn(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-1 font-semibold text-slate-300">মূল্য (৳)</label>
                    <input
                      type="number"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-slate-300">ক্যাটাগরি</label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                    >
                      <option value="burger">বার্গার</option>
                      <option value="sandwich">স্যান্ডুইচ</option>
                      <option value="shawarma">শর্মা</option>
                      <option value="chowmein">চাওমিন</option>
                      <option value="coffee">কফি</option>
                      <option value="tea">মালাই চা</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMenuModal(false)}
                    className="flex-1 py-2 bg-slate-800 rounded-xl font-bold text-slate-300"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl"
                  >
                    মেন্যুতে যোগ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
