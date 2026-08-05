import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  RefreshCw,
  Download,
  Sparkles,
  Star,
  Upload,
  CheckCircle2,
  Image as ImageIcon,
  Flame,
  Coffee,
  Sliders,
  Crown,
  RotateCcw
} from 'lucide-react';
import { ReviewItem } from '../types';

interface CameraStudioProps {
  onPhotoUploadedAsReview?: (review: ReviewItem) => void;
}

interface Sticker {
  id: string;
  emoji: string;
  label: string;
  x: number;
  y: number;
}

export const CameraStudio: React.FC<CameraStudioProps> = ({ onPhotoUploadedAsReview }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas3dRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Custom uploaded photo state
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  // Active Scene / Frame
  const [selectedFrame, setSelectedFrame] = useState<'neon-3d' | 'warm-cafe' | 'chef-vip' | 'malai-spot'>('neon-3d');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  // Filters & Adjustments
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [warmth, setWarmth] = useState<number>(100);

  // Countdown timer state
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);

  // Active stickers placed on studio
  const [activeStickers, setActiveStickers] = useState<Sticker[]>([]);

  // Review submission modal state
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('কফি পয়েন্টের থ্রিডি মেমোরি স্টুডিওতে তোলা দারুণ এক স্মৃতি!');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Initialize camera
  useEffect(() => {
    let isMounted = true;

    async function startCamera() {
      try {
        setCameraError(null);
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });

        if (isMounted) {
          setStream(mediaStream);
          setHasCamera(true);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        }
      } catch (err: any) {
        console.warn('Camera stream error:', err);
        if (isMounted) {
          setHasCamera(false);
          setCameraError('ক্যামেরা চালু করা যায়নি। আপনি নিচে থেকে ফটো আপলোড করতে পারেন অথবা ভার্চুয়াল ৩ডি স্টুডিও মোড ব্যবহার করতে পারেন।');
        }
      }
    }

    startCamera();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Real-time 3D Dynamic Canvas Background Rendering Loop
  useEffect(() => {
    const canvas = canvas3dRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = 0;

    // Steam particles
    const particles: Array<{ x: number; y: number; r: number; speedY: number; alpha: number }> = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1,
      speedY: Math.random() * 0.8 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
    }));

    const render3DScene = () => {
      angle += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw 3D Depth Grid background if no video or in uploaded mode
      if (!hasCamera && !uploadedPhoto) {
        // Gradient base
        const bgGrad = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          50,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width
        );
        bgGrad.addColorStop(0, '#1e1b4b');
        bgGrad.addColorStop(0.6, '#0f172a');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3D Perspective Grid
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
        ctx.lineWidth = 1;

        const horizon = canvas.height * 0.55;
        const perspectiveCenter = canvas.width / 2;

        // Vertical lines emanating from vanishing point
        for (let x = -canvas.width; x <= canvas.width * 2; x += 30) {
          ctx.beginPath();
          ctx.moveTo(perspectiveCenter, horizon);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        // Horizontal lines with perspective distance
        for (let y = horizon; y <= canvas.height; y += Math.pow((y - horizon) / 20, 1.4) + 6) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // 3D Floating Glowing Ring
        ctx.save();
        ctx.translate(canvas.width / 2, horizon - 20 + Math.sin(angle * 1.5) * 10);
        ctx.scale(1, 0.3);
        ctx.beginPath();
        ctx.arc(0, 0, 90 + Math.sin(angle) * 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 25;
        ctx.stroke();
        ctx.restore();

        // 3D Animated Cup Silhouette
        ctx.save();
        ctx.translate(canvas.width / 2, horizon - 15 + Math.sin(angle * 1.5) * 8);
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 15;

        // Cup body
        ctx.beginPath();
        ctx.moveTo(-35, -30);
        ctx.lineTo(35, -30);
        ctx.lineTo(25, 25);
        ctx.lineTo(-25, 25);
        ctx.closePath();
        ctx.fill();

        // Cup handle
        ctx.beginPath();
        ctx.arc(32, -5, 12, -Math.PI / 2, Math.PI / 2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#fbbf24';
        ctx.stroke();

        ctx.restore();
      }

      // 2. Animated Steam / Sparkle Particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Floating 3D Orbs/Stars
      for (let i = 0; i < 5; i++) {
        const orbX = (canvas.width / 6) * (i + 1) + Math.sin(angle + i) * 15;
        const orbY = canvas.height * 0.25 + Math.cos(angle * 0.8 + i) * 20;
        ctx.fillStyle = i % 2 === 0 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(251, 113, 133, 0.4)';
        ctx.beginPath();
        ctx.arc(orbX, orbY, 6 + Math.sin(angle + i) * 3, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fbbf24';
        ctx.fill();
      }

      animationId = requestAnimationFrame(render3DScene);
    };

    render3DScene();

    return () => cancelAnimationFrame(animationId);
  }, [hasCamera, uploadedPhoto, selectedFrame]);

  // Handle file photo selection from user device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add sticker to the studio preview
  const handleAddSticker = (emoji: string, label: string) => {
    const newSticker: Sticker = {
      id: `stk-${Date.now()}`,
      emoji,
      label,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
    };
    setActiveStickers((prev) => [...prev, newSticker]);
  };

  const handleRemoveSticker = (id: string) => {
    setActiveStickers((prev) => prev.filter((s) => s.id !== id));
  };

  // Countdown timer before capture
  const startCountdownAndCapture = () => {
    setIsCountingDown(true);
    setCountdown(3);

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdown(current);
      } else {
        clearInterval(interval);
        setIsCountingDown(false);
        performCapture();
      }
    }, 1000);
  };

  // Perform complete image rendering onto final high-res canvas
  const performCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 900;
    canvas.height = 1200;

    // Apply color filter matrix
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) sepia(${(100 - warmth) / 2}%)`;

    // 1. Draw base photo or live video or 3D canvas
    if (uploadedPhoto) {
      const img = new Image();
      img.src = uploadedPhoto;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        finishOverlayRender(ctx, canvas);
      };
      return;
    } else if (hasCamera && video && video.readyState === 4) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else {
      // Draw 3D canvas overlay output
      if (canvas3dRef.current) {
        ctx.drawImage(canvas3dRef.current, 0, 0, canvas.width, canvas.height);
      } else {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(0.5, '#1e1b4b');
        grad.addColorStop(1, '#311021');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    finishOverlayRender(ctx, canvas);
  };

  const finishOverlayRender = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Reset filter for frame vector text
    ctx.filter = 'none';

    // 2. Render Frame Borders
    if (selectedFrame === 'neon-3d') {
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 18;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 6;
      ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);
    } else if (selectedFrame === 'warm-cafe') {
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 24;
      ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
    } else if (selectedFrame === 'chef-vip') {
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 20;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    } else {
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 20;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    }

    // 3. Render Active Placed Stickers
    activeStickers.forEach((stk) => {
      const realX = (stk.x / 100) * canvas.width;
      const realY = (stk.y / 100) * canvas.height;

      ctx.font = '50px sans-serif';
      ctx.fillText(stk.emoji, realX, realY);

      if (stk.label) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText(stk.label, realX, realY + 28);
      }
    });

    // 4. Render Brand Footer Banner
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(30, canvas.height - 120, canvas.width - 60, 90);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('☕ COFFEE POINT • 3D STUDIO', 55, canvas.height - 75);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '18px sans-serif';
    ctx.fillText('সোনার বাংলা গেট, কেরাণীগঞ্জ • Masterchef Craft Rabbi', 55, canvas.height - 45);

    // Timestamp
    const dateStr = new Date().toLocaleDateString('bn-BD');
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(dateStr, canvas.width - 55, canvas.height - 45);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.94);
    setCapturedImage(dataUrl);
  };

  const handleFlipCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const handleDownload = () => {
    if (!capturedImage) return;
    const a = document.createElement('a');
    a.href = capturedImage;
    a.download = `coffee-point-3d-photo-${Date.now()}.jpg`;
    a.click();
  };

  const handleSubmitReviewWithPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      userName: reviewerName.trim() || 'কফি পয়েন্ট লাভার',
      rating,
      commentBn: comment,
      photoUrl: capturedImage,
      itemOrdered: '৩ডি ক্যামেরা মেমোরি',
      date: new Date().toISOString().split('T')[0],
      likes: 1,
      isVerified: true,
    };

    if (onPhotoUploadedAsReview) {
      onPhotoUploadedAsReview(newRev);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowReviewModal(false);
      setCapturedImage(null);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-28 px-4 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold mb-2 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>অগমেন্টেড ৩ডি মেমোরি স্টুডিও (Interactive 3D Studio)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
          কফি পয়েন্ট ৩ডি ক্যামেরা স্টুডিও
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          লাইভ ক্যামেরা অন করুন বা ফটো আপলোড করুন! ৩ডি থিম ফ্রেম ও স্টিকার যুক্ত করে সরাসরি কফি পয়েন্ট রিভিউতে ছবি শেয়ার করুন।
        </p>
      </div>

      {/* Main Viewport Card */}
      <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-slate-900 border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)]">
        {!capturedImage ? (
          <>
            {/* Background Layer: Uploaded Photo OR Live Video OR 3D Canvas */}
            {uploadedPhoto ? (
              <img
                src={uploadedPhoto}
                alt="Uploaded"
                className="w-full h-full object-cover transition-all"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${(100 - warmth) / 2}%)`,
                }}
              />
            ) : hasCamera ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${(100 - warmth) / 2}%)`,
                }}
              />
            ) : (
              /* Fallback 3D Canvas Scene */
              <canvas ref={canvas3dRef} width={450} height={600} className="w-full h-full object-cover" />
            )}

            {/* Countdown Beep Overlay */}
            <AnimatePresence>
              {isCountingDown && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="absolute inset-0 z-40 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                >
                  <span className="text-8xl font-black text-amber-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.8)]">
                    {countdown}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AR Frame Overlay Graphics */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {selectedFrame === 'neon-3d' && (
                <div className="absolute inset-0 border-[10px] border-amber-500/80 rounded-3xl shadow-[inset_0_0_40px_rgba(245,158,11,0.4)] flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                      RABBI 3D NEON
                    </span>
                    <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                  </div>
                  <div className="bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-amber-500/40 text-center">
                    <p className="text-xs font-extrabold text-amber-300">কফি পয়েন্ট • কেরাণীগঞ্জ</p>
                    <p className="text-[10px] text-slate-300">Masterchef Craft Rabbi Special Cafe</p>
                  </div>
                </div>
              )}

              {selectedFrame === 'warm-cafe' && (
                <div className="absolute inset-0 border-[12px] border-amber-800/90 rounded-3xl flex flex-col justify-between p-4 bg-amber-950/10">
                  <div className="text-right">
                    <span className="text-[11px] bg-amber-900/80 text-amber-200 px-3 py-1 rounded-full border border-amber-600/50">
                      ☕ Warm Cafe Vibes
                    </span>
                  </div>
                  <div className="bg-amber-950/90 backdrop-blur-md p-3 rounded-xl border border-amber-700/50 text-center">
                    <p className="text-xs font-bold text-amber-200">সোনার বাংলা গেট আউটলেট</p>
                    <p className="text-[10px] text-amber-400/80">স্মৃতিগুলোকে রাখুন জীবন্ত</p>
                  </div>
                </div>
              )}

              {selectedFrame === 'chef-vip' && (
                <div className="absolute inset-0 border-8 border-yellow-500 rounded-3xl p-4 flex flex-col justify-between bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400 animate-pulse" />
                    <span className="text-xs font-bold text-yellow-400 tracking-wide">VIP MASTERCHEF ZONE</span>
                  </div>
                  <div className="text-center bg-slate-900/90 p-3 rounded-xl border border-yellow-500/50">
                    <p className="text-xs font-extrabold text-yellow-300">মাস্টারশেফ রব্বির বিশেষ অতিথি</p>
                    <p className="text-[10px] text-slate-300">Coffee Point Masterchef Craft</p>
                  </div>
                </div>
              )}

              {selectedFrame === 'malai-spot' && (
                <div className="absolute inset-0 border-[10px] border-orange-600/90 rounded-3xl p-4 flex flex-col justify-between">
                  <span className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full w-fit">
                    🍵 খাঁটি মালাই চায়ের আড্ডা
                  </span>
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-orange-500/40 text-center">
                    <p className="text-xs font-bold text-orange-300">কেরাণীগঞ্জের সেরা মালাই চা স্পট</p>
                  </div>
                </div>
              )}
            </div>

            {/* Placed Interactive Stickers Overlay */}
            <div className="absolute inset-0 pointer-events-auto z-25">
              {activeStickers.map((stk) => (
                <div
                  key={stk.id}
                  style={{ left: `${stk.x}%`, top: `${stk.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center"
                  onClick={() => handleRemoveSticker(stk.id)}
                  title="মুছে ফেলতে ক্লিক করুন"
                >
                  <span className="text-3xl filter drop-shadow-lg group-hover:scale-125 transition-all">
                    {stk.emoji}
                  </span>
                  {stk.label && (
                    <span className="text-[9px] bg-slate-950/90 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 font-bold whitespace-nowrap">
                      {stk.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Controls Toolbar */}
            <div className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-3 px-6">
              {/* Reset Uploaded / Camera */}
              {uploadedPhoto && (
                <button
                  onClick={() => setUploadedPhoto(null)}
                  className="p-3 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-full text-slate-300 hover:text-white hover:bg-slate-700 transition"
                  title="ফটো মুছুন"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              )}

              {hasCamera && !uploadedPhoto && (
                <button
                  onClick={handleFlipCamera}
                  className="p-3 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-full text-white hover:bg-slate-700 active:scale-95 transition-all"
                  title="ক্যামেরা ফ্লিপ করুন"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}

              {/* Shutter Button */}
              <button
                onClick={startCountdownAndCapture}
                disabled={isCountingDown}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 p-1 shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                title="৩ সেকেন্ড কাউন্টডাউনসহ ছবি তুলুন"
              >
                <div className="w-full h-full rounded-full border-2 border-slate-950 flex items-center justify-center">
                  <Camera className="w-7 h-7 text-slate-950" />
                </div>
              </button>

              {/* Upload Custom Photo File Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 rounded-full text-amber-300 hover:bg-amber-500/30 transition"
                title="গ্যালারি থেকে ছবি নির্বাচন করুন"
              >
                <Upload className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </>
        ) : (
          /* Captured Photo Snapshot View */
          <div className="relative w-full h-full flex flex-col">
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-amber-500/30 flex items-center justify-around gap-2">
              <button
                onClick={() => setCapturedImage(null)}
                className="px-3 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
              >
                আবার তুলুন
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold hover:bg-amber-500/30 transition flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                ডাউনলোড
              </button>
              <button
                onClick={() => setShowReviewModal(true)}
                className="px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl text-xs font-bold hover:brightness-110 shadow-lg transition flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                রিভিউতে পোস্ট
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Frame Selector */}
      <div className="mt-6 max-w-md mx-auto space-y-4">
        <div>
          <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
            <span>🎨 ৩ডি ব্যাকগ্রাউন্ড ও ফ্রেম থিম:</span>
            <span className="text-[10px] text-amber-400 font-normal">ক্লিক করে পরিবর্তন করুন</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'neon-3d', label: '৩ডি নিয়ন' },
              { id: 'warm-cafe', label: 'ওয়ার্ম ক্যাফে' },
              { id: 'chef-vip', label: 'ভিআইপি জোন' },
              { id: 'malai-spot', label: 'মালাই চা' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFrame(f.id as any)}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                  selectedFrame === f.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add 3D Props & Stickers */}
        <div>
          <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
            <span>✨ স্টিকার ও ৩ডি প্রপ্স যোগ করুন:</span>
            <span className="text-[10px] text-slate-500">স্টিকারে ট্যাপ করে মুছুন</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { emoji: '☕', label: 'হট এস্প্রেসো' },
              { emoji: '👑', label: 'মাস্টারশেফ' },
              { emoji: '🔥', label: 'হট চা' },
              { emoji: '✨', label: 'গোল্ডেন গ্লো' },
              { emoji: '🏆', label: 'সেরা কাস্টমার' },
              { emoji: '❤️', label: 'লাভ ক্যাফে' },
            ].map((stk, idx) => (
              <button
                key={`${stk.emoji}-${idx}`}
                onClick={() => handleAddSticker(stk.emoji, stk.label)}
                className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl text-xs flex items-center gap-1 hover:bg-slate-800 transition"
              >
                <span>{stk.emoji}</span>
                <span className="text-[11px] text-slate-300">{stk.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lighting & Color Adjustments */}
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-400" />
              লাইটিং ও কালার অ্যাডজাস্টমেন্ট
            </span>
            <button
              onClick={() => {
                setBrightness(100);
                setContrast(100);
                setWarmth(100);
              }}
              className="text-[10px] text-amber-400 hover:underline"
            >
              রিসেট
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">উজ্জ্বলতা: {brightness}%</label>
              <input
                type="range"
                min={70}
                max={150}
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1">কনট্রাস্ট: {contrast}%</label>
              <input
                type="range"
                min={70}
                max={150}
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1">উষ্ণতা (Warmth): {warmth}%</label>
              <input
                type="range"
                min={70}
                max={130}
                value={warmth}
                onChange={(e) => setWarmth(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for taking snapshot */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Review Submission Modal with Photo */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 max-w-md w-full shadow-2xl text-white relative"
            >
              <h3 className="text-lg font-bold text-amber-300 mb-2 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" />
                ছবিসহ রিভিউ পোস্ট করুন
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                আপনার তোলা ছবিটি কফি পয়েন্টের পাবলিক রিভিউ গ্যালারিতে সরাসরি সংযুক্ত হবে।
              </p>

              {isSubmitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-base font-bold text-emerald-300">রিভিউ সফলভাবে পোস্ট হয়েছে!</p>
                  <p className="text-xs text-slate-400 mt-1">ধন্যবাদ কফি পয়েন্টের সাথে থাকার জন্য!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReviewWithPhoto} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: তানভীর আহমেদ"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">রেটিং (১ থেকে ৫ স্টার্স)</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 text-amber-400 hover:scale-125 transition"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">আপনার রিভিউ মন্তব্য</label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="flex-1 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl text-xs font-extrabold hover:brightness-110 shadow-lg"
                    >
                      পোস্ট করুন
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
