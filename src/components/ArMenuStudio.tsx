import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Box, 
  Camera, 
  RotateCw, 
  Maximize2, 
  Sparkles, 
  ShoppingBag, 
  Sun, 
  Flame, 
  Check, 
  Layers, 
  Info, 
  Eye, 
  Utensils, 
  Share2, 
  Volume2, 
  Coffee, 
  RefreshCw,
  Zap,
  Tag,
  Grid
} from 'lucide-react';
import { MenuItem } from '../types';
import { sounds } from '../lib/soundEffects';

interface ArMenuStudioProps {
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem, selectedOptions?: string[]) => void;
  lang: 'bn' | 'en';
  onPhotoUploadedAsReview?: (review: any) => void;
  initialSelectedItem?: MenuItem | null;
}

export const ArMenuStudio: React.FC<ArMenuStudioProps> = ({
  menuItems,
  onAddToCart,
  lang,
  onPhotoUploadedAsReview,
  initialSelectedItem,
}) => {
  // View mode: 'sketchfab' for real 3D model, 'ar-projection' for projected dish
  const [arViewMode, setArViewMode] = useState<'sketchfab' | 'ar-projection'>('sketchfab');
  const [selectedItem, setSelectedItem] = useState<MenuItem>(initialSelectedItem || menuItems[0] || menuItems[2]);

  useEffect(() => {
    if (initialSelectedItem) {
      setSelectedItem(initialSelectedItem);
    }
  }, [initialSelectedItem]);

  // Helper to resolve Sketchfab embed URL
  const getSketchfabUrl = (item: MenuItem) => {
    if (item.sketchfabEmbedUrl) return item.sketchfabEmbedUrl;
    if (item.category === 'sandwich') {
      return 'https://sketchfab.com/models/5e91182bd6f340ab8208294e66d00743/embed';
    }
    if (item.category === 'burger') {
      return 'https://sketchfab.com/models/93bb230cefa845708dc4f88a7334f274/embed';
    }
    if (item.category === 'coffee' || item.category === 'tea') {
      return 'https://sketchfab.com/models/fd2e9142168d4f31ba99bf4d9b1165b4/embed';
    }
    return 'https://sketchfab.com/models/93bb230cefa845708dc4f88a7334f274/embed';
  };
  
  // AR Transform States
  const [rotation, setRotation] = useState<number>(15);
  const [pitch, setPitch] = useState<number>(25);
  const [scale, setScale] = useState<number>(1.0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [lighting, setLighting] = useState<'warm' | 'daylight' | 'neon' | 'cozy'>('warm');
  const [tableTexture, setTableTexture] = useState<'slate' | 'wood' | 'marble' | 'checkered'>('slate');
  const [showSteam, setShowSteam] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  // Camera stream state
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // AR Snapshot State
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [addedToCartToast, setAddedToCartToast] = useState<boolean>(false);

  // Dragging logic for manual 3D rotation
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);

  // Handle Camera Feed Initialization
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (useCamera) {
      navigator.mediaDevices
        ?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          setCameraError(null);
        })
        .catch((err) => {
          console.warn('Camera access error:', err);
          setCameraError('ক্যামেরা পারমিশন পাওয়া যায়নি। ভার্চুয়াল টেবিল ভিউ সক্রিয় রাখা হয়েছে।');
          setUseCamera(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [useCamera]);

  // Auto-rotate effect
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Handle Touch/Mouse Drag for 3D rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    setAutoRotate(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - startYRef.current;

    setRotation((prev) => (prev + deltaX * 0.8) % 360);
    setPitch((prev) => Math.max(-10, Math.min(60, prev - deltaY * 0.4)));

    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Dish specific AR Hotspots
  const getHotspotsForItem = (item: MenuItem) => {
    if (item.category === 'burger') {
      return [
        { id: 'patty', labelBn: 'জুসি ডাবল প্যাটি', x: -25, y: -20, descBn: 'মাস্টারশেফ রব্বির স্পেশাল ১০০০গ গ্রিলড চিকেন' },
        { id: 'sauce', labelBn: 'সিক্রেট মেল্টেড সস', x: 25, y: -10, descBn: 'সিক্রেট হার্বস ও মেয়ো স্পেশাল সস' },
        { id: 'bun', labelBn: 'বেকড ক্রাফট বান', x: 0, y: -45, descBn: 'নরম তাজা তিল ছড়ানো টোস্টেড বান' },
      ];
    }
    if (item.category === 'coffee' || item.category === 'tea') {
      return [
        { id: 'foam', labelBn: 'ঘন থিক মালাই/ফোম', x: 0, y: -35, descBn: 'প্রাকৃতিক খাঁটি দুধের সর ও ক্রিম' },
        { id: 'aroma', labelBn: 'প্রাকৃতিক অ্যারোমা', x: 20, y: -10, descBn: 'প্রিমিয়াম রোস্টেড কফি বিনসের সুবাস' },
      ];
    }
    return [
      { id: 'flavor', labelBn: 'মাস্টারশেফ রেসিপি', x: 0, y: -25, descBn: 'তাজা উপাদান ও সিক্রেট রেসিপির অনন্য স্বাদ' },
      { id: 'fresh', labelBn: '১০০% তাজা পরিবেশন', x: 25, y: 0, descBn: 'অর্ডার করার পরই গরম গরম প্রস্তুত করা হয়' },
    ];
  };

  const handleAddToCartClick = () => {
    sounds.playAddToCart();
    onAddToCart(selectedItem);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 2000);
  };

  // Snapshot Capture Simulation
  const handleTakeArSnapshot = () => {
    sounds.playShutter();
    setIsCapturing(true);

    setTimeout(() => {
      setIsCapturing(false);
      setSnapshotUrl(selectedItem.image);
    }, 600);
  };

  const currentHotspots = getHotspotsForItem(selectedItem);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Title & AR Info Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'bn' ? 'অগমেন্টেড রিয়্যালিটি (AR) ৩ডি টেবিল মেন্যু' : 'Augmented Reality (AR) 3D Menu'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-tight">
              {lang === 'bn' ? 'আপনার টেবিলে খাবার দেখুন ৩ডি এআরে!' : 'Project Food on Your Table in 3D AR'}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {lang === 'bn'
                ? 'অর্ডার করার আগেই খাবারটি আপনার টেবিলে কেমন দেখাবে, কতটুকু সাইজ এবং কী কী উপাদান রয়েছে তা ৩৬০° ঘুরিয়ে দেখুন!'
                : 'Visualize your food in 3D life-size AR directly on your table before ordering! Rotate, inspect ingredients & order instantly.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Camera Toggle Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setUseCamera(!useCamera);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shadow-lg ${
                useCamera
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                  : 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-500/30'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{useCamera ? 'লাইভ ক্যামেরা অন' : 'লাইভ ক্যামেরা ভিউ অন করুন'}</span>
            </button>
          </div>
        </div>

        {cameraError && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-300 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{cameraError}</span>
          </div>
        )}
      </div>

      {/* Main AR Viewing Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: AR View Stage (3 Columns on Large Screens) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-2xl border border-amber-500/30 w-fit">
            <button
              onClick={() => {
                sounds.playClick();
                setArViewMode('sketchfab');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                arViewMode === 'sketchfab'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>ইন্টারেক্টিভ ৩ডি মডেল</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setArViewMode('ar-projection');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                arViewMode === 'ar-projection'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>AR টেবিল প্রজেকশন</span>
            </button>
          </div>

          <div
            onPointerDown={arViewMode === 'ar-projection' ? handlePointerDown : undefined}
            onPointerMove={arViewMode === 'ar-projection' ? handlePointerMove : undefined}
            onPointerUp={arViewMode === 'ar-projection' ? handlePointerUp : undefined}
            className={`relative w-full h-[500px] sm:h-[560px] rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden select-none transition-all ${
              arViewMode === 'ar-projection' ? 'cursor-grab active:cursor-grabbing' : ''
            } ${
              lighting === 'warm'
                ? 'bg-slate-950'
                : lighting === 'daylight'
                ? 'bg-slate-900'
                : lighting === 'neon'
                ? 'bg-purple-950/80'
                : 'bg-amber-950/70'
            }`}
          >
            {/* Mode 1: Interactive Real Sketchfab 3D Model Embed */}
            {arViewMode === 'sketchfab' ? (
              <div className="relative w-full h-full bg-slate-950">
                <iframe
                  title={selectedItem.nameEn || selectedItem.nameBn}
                  src={getSketchfabUrl(selectedItem)}
                  className="w-full h-full border-0 rounded-3xl"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  xr-spatial-tracking="true"
                  execution-while-out-of-viewport="true"
                  execution-while-not-rendered="true"
                  web-share="true"
                />

                {/* Overlay Badge for Sketchfab 3D */}
                <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-amber-500/40 px-3.5 py-1.5 rounded-2xl text-xs font-bold text-amber-300 flex items-center gap-2 pointer-events-none shadow-xl">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>{selectedItem.nameBn} • 3D Real Sketchfab Model</span>
                </div>
              </div>
            ) : (
              /* Mode 2: AR Projection Feed / Camera */
              <>
                {/* Real Camera Video Feed Layer */}
                {useCamera ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  /* Virtual 3D Table Simulator Floor */
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      tableTexture === 'wood'
                        ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/80 via-slate-950 to-black'
                        : tableTexture === 'marble'
                        ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black'
                        : tableTexture === 'checkered'
                        ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/60 via-slate-950 to-black'
                        : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black'
                    }`}
                  >
                    {/* 3D Table Perspective Surface Grid */}
                    <div 
                      className="absolute inset-0 opacity-30 pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(245, 158, 11, 0.15) 1px, transparent 1px),
                                          linear-gradient(to bottom, rgba(245, 158, 11, 0.15) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        transform: 'perspective(600px) rotateX(60deg) translateY(120px) scale(2)',
                      }}
                    />
                  </div>
                )}

                {/* AR Target Surface Reticle Indicator */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 px-4 py-1.5 rounded-full text-[11px] font-bold text-amber-300 flex items-center gap-2 z-20 shadow-lg">
                  <TargetReticle className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>{lang === 'bn' ? 'টেবিল সারফেস ডিটেক্টেড • ৩ডি প্রজেকশন' : 'Surface Detected • 3D Food AR'}</span>
                </div>

                {/* 3D PROJECTED FOOD DISH CONTAINER */}
                <div className="absolute inset-0 flex items-center justify-center p-8 z-10 pointer-events-none">
                  <div
                    style={{
                      transform: `perspective(1000px) rotateX(${pitch}deg) rotateY(${rotation}deg) scale(${scale})`,
                      transition: isDraggingRef.current ? 'none' : 'transform 0.1s ease-out',
                    }}
                    className="relative flex items-center justify-center pointer-events-auto"
                  >
                    {/* Optical Drop Shadow onto Table Surface */}
                    <div
                      style={{
                        transform: 'translateY(110px) scaleY(0.25) scaleX(1.1)',
                      }}
                      className="absolute w-64 h-64 bg-black/80 rounded-full blur-xl pointer-events-none"
                    />

                    {/* Hot Steam Animation Particles */}
                    {showSteam && (selectedItem.category === 'coffee' || selectedItem.category === 'tea' || selectedItem.category === 'sandwich' || selectedItem.category === 'burger') && (
                      <div className="absolute -top-16 z-20 flex space-x-2 pointer-events-none">
                        <span className="w-2 h-12 bg-gradient-to-t from-white/30 to-transparent rounded-full blur-sm animate-pulse" />
                        <span className="w-3 h-16 bg-gradient-to-t from-white/40 to-transparent rounded-full blur-md animate-pulse delay-100" />
                        <span className="w-2 h-10 bg-gradient-to-t from-white/20 to-transparent rounded-full blur-sm animate-pulse delay-300" />
                      </div>
                    )}

                    {/* 3D Dish Platter Glass Plate Base */}
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950/60 p-4 border-2 border-amber-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden group">
                      
                      {/* Plate Inner Ring Rim */}
                      <div className="absolute inset-3 rounded-full border border-amber-500/30 shadow-inner" />

                      {/* Projected High-Res Food Photo */}
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.nameBn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full shadow-2xl transition-transform duration-300"
                      />

                      {/* AR Floating Ingredient Hotspots */}
                      {showHotspots &&
                        currentHotspots.map((hs) => (
                          <button
                            key={hs.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              sounds.playClick();
                              setSelectedHotspot(selectedHotspot === hs.id ? null : hs.id);
                            }}
                            style={{
                              transform: `translate(${hs.x}px, ${hs.y}px)`,
                            }}
                            className="absolute z-30 group/spot flex items-center gap-1 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-xl border border-white/80 hover:scale-110 transition-transform"
                          >
                            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                            <span>{hs.labelBn}</span>

                            {/* Tooltip on Tap */}
                            {selectedHotspot === hs.id && (
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-950 text-white p-2.5 rounded-xl border border-amber-500/50 text-[11px] shadow-2xl pointer-events-auto">
                                <p className="font-bold text-amber-400">{hs.labelBn}</p>
                                <p className="text-slate-300 text-[10px] mt-0.5">{hs.descBn}</p>
                              </div>
                            )}
                          </button>
                        ))}
                    </div>

                    {/* Floating 3D AR Tag above Dish */}
                    <div 
                      style={{ transform: 'translateY(-170px)' }}
                      className="absolute z-30 bg-slate-950/90 backdrop-blur-md border border-amber-500/60 px-4 py-2 rounded-2xl text-center shadow-2xl flex items-center gap-3 whitespace-nowrap"
                    >
                      <div className="text-left">
                        <div className="text-xs font-extrabold text-white">{selectedItem.nameBn}</div>
                        <div className="text-[10px] text-amber-400 font-mono font-bold">
                          {selectedItem.price} ৳ {selectedItem.calories ? `• ${selectedItem.calories}` : ''}
                        </div>
                      </div>

                      <button
                        onClick={handleAddToCartClick}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl shadow transition"
                      >
                        + কার্টে নিন
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Flash Capture Feedback Effect */}
            <AnimatePresence>
              {isCapturing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white z-50 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Bottom Overlay Controls (Rotate, Lighting, Scale) */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3 rounded-2xl text-xs text-white">
              
              {/* Rotation & Auto-rotate Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setAutoRotate(!autoRotate);
                  }}
                  className={`p-2 rounded-xl border transition ${
                    autoRotate ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                  title="৩৬০° অটো ঘূর্ণন"
                >
                  <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setShowSteam(!showSteam);
                  }}
                  className={`p-2 rounded-xl border transition ${
                    showSteam ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                  title="গরম ধোঁয়া/বাস্প অন-অফ"
                >
                  <Flame className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setShowHotspots(!showHotspots);
                  }}
                  className={`p-2 rounded-xl border transition ${
                    showHotspots ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                  title="উপাদান এর ট্যাগ অন-অফ"
                >
                  <Tag className="w-4 h-4" />
                </button>
              </div>

              {/* Life-Size Scale Slider */}
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold">সাইজ (AR Scale):</span>
                <input
                  type="range"
                  min="0.6"
                  max="1.4"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-20 accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] font-mono text-amber-400 font-bold">{Math.round(scale * 100)}%</span>
              </div>

              {/* Table Environment Texture Selector */}
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
                {(['slate', 'wood', 'marble', 'checkered'] as const).map((tex) => (
                  <button
                    key={tex}
                    onClick={() => setTableTexture(tex)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition ${
                      tableTexture === tex ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tex === 'slate' ? 'স্লেট' : tex === 'wood' ? 'কাঠ' : tex === 'marble' ? 'মার্বেল' : 'চেক'}
                  </button>
                ))}
              </div>

              {/* AR Snapshot Button */}
              <button
                onClick={handleTakeArSnapshot}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-3.5 py-2 rounded-xl shadow flex items-center gap-1.5 transition active:scale-95"
              >
                <Camera className="w-4 h-4" />
                <span>AR স্ন্যাপশট</span>
              </button>
            </div>
          </div>

          {/* Added to Cart Toast Notification */}
          <AnimatePresence>
            {addedToCartToast && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-emerald-500 text-slate-950 font-black text-xs p-3 rounded-2xl flex items-center justify-between shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{selectedItem.nameBn} সফলভাবে অর্ডারে যুক্ত হয়েছে!</span>
                </div>
                <span className="font-mono">{selectedItem.price} ৳</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: AR Interactive Food Selection Carousel & Details */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-extrabold text-amber-400 font-serif flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>AR প্রজেকশনের জন্য আইটেম বাছুন</span>
            </h3>

            {/* Menu Items List for AR Projection */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
              {menuItems.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedItem(item);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.nameBn}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-800"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{item.nameBn}</div>
                      <div className="text-[11px] text-amber-400 font-mono font-bold mt-0.5">
                        {item.price} ৳
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Add to Cart Primary Button */}
            <button
              onClick={handleAddToCartClick}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl shadow-xl flex items-center justify-center gap-2 transition active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span>{selectedItem.nameBn} অর্ডারে যোগ করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Captured AR Photo Modal */}
      <AnimatePresence>
        {snapshotUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-slate-900 border border-amber-500/50 rounded-3xl p-6 shadow-2xl space-y-4 text-center"
            >
              <h3 className="text-lg font-bold text-white font-serif">
                AR ফুড ফটো স্ন্যাপশট রেডি!
              </h3>

              <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 shadow-xl">
                <img src={snapshotUrl} alt="AR Snapshot" className="w-full h-64 object-cover" />
                <div className="absolute bottom-2 right-2 bg-slate-950/80 px-3 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold border border-amber-500/40">
                  Coffee Point AR View • Masterchef Rabbi
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (onPhotoUploadedAsReview) {
                      onPhotoUploadedAsReview({
                        id: `ar-${Date.now()}`,
                        userName: 'AR ভিজিটর',
                        rating: 5,
                        commentBn: `${selectedItem.nameBn} এর ৩ডি এআর ভিউ দেখে মুগ্ধ হয়েছি!`,
                        photoUrl: snapshotUrl,
                        itemOrdered: selectedItem.nameBn,
                        date: 'আজকে',
                        likes: 1,
                        isVerified: true,
                      });
                    }
                    setSnapshotUrl(null);
                  }}
                  className="flex-1 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl shadow text-xs"
                >
                  রিভিউ গ্যালারিতে শেয়ার করুন 🌟
                </button>
                <button
                  onClick={() => setSnapshotUrl(null)}
                  className="py-2.5 px-4 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper SVG Icon
function TargetReticle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="4 4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v3m0 12v3M3 12h3m12 0h3" />
    </svg>
  );
}
