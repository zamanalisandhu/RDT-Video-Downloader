'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowRightLeft, ShieldCheck, Zap } from 'lucide-react';
import { toast } from 'sonner';
import LiveCounter from '@/components/LiveCounter';
import HeroBadge from '@/components/HeroBadge';
import DownloadForm from '@/components/DownloadForm';

const ChromeIcon = ({ className, size = 14, style }: { className?: string; size?: number; style?: React.CSSProperties }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={style}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);

export default function Hero() {
  return (
    <section className="pt-10 pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Premium Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.35] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#ff4500 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-brand-orange/10 to-orange-400/5 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Extension Promo Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <HeroBadge />
        </motion.div>

        {/* Catchy Subtitle/Extension Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 max-w-lg mx-auto"
        >
          <button 
            onClick={() => {
              toast.warning("Extension Under Review", {
                description: "The RDT Chrome Extension is currently undergoing the Google Web Store review process. It will be live soon!",
                duration: 4000,
              });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/90 hover:bg-slate-950 text-white rounded-xl text-[12px] font-extrabold shadow-md shadow-slate-950/10 hover:shadow-slate-950/25 hover:scale-[1.01] transition-all border border-slate-800 group"
          >
            <ChromeIcon size={13} className="text-brand-orange animate-spin" style={{ animationDuration: '4s' }} />
            <span>NEW: Install Chrome Extension for 1-Click Downloads</span>
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto mb-6">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-[46px] font-black text-slate-900 tracking-tight leading-[1.1] mb-4"
          >
            Reddit Video Downloader{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-orange-500 to-rose-500">
              with Audio
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-slate-500 font-semibold max-w-2xl mx-auto leading-relaxed"
          >
            Save Reddit videos, galleries, and GIFs instantly. Free, unlimited, and watermark-free downloads across all devices.
          </motion.p>
        </div>
        
        {/* Main Downloader Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-20"
        >
          <DownloadForm />
        </motion.div>

        {/* Live Counters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <LiveCounter />
        </motion.div>

        {/* Visual Trust Indicators / Mini Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-2xl mx-auto grid grid-cols-3 gap-4 border-t border-slate-100 pt-6"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange mb-1.5">
              <Zap size={15} className="fill-brand-orange/10" />
            </div>
            <span className="text-xs font-bold text-slate-900">Ultra Fast Muxing</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600 mb-1.5">
              <ShieldCheck size={15} className="fill-green-50/10" />
            </div>
            <span className="text-xs font-bold text-slate-900">100% Secure & Clean</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-1.5">
              <ArrowRightLeft size={15} />
            </div>
            <span className="text-xs font-bold text-slate-900">Separate Audio Mux</span>
          </div>
        </motion.div>

        {/* Chrome Extension Live Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-2xl mx-auto bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-[0_8px_24px_rgb(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-4 text-left"
        >
          <div className="flex items-center gap-4 flex-1">
            {/* Chrome logo wrapper */}
            <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm shrink-0">
              <ChromeIcon size={20} className="text-slate-800" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h4 className="font-extrabold text-slate-900 text-base leading-tight">Our Chrome Extension is Live!</h4>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-50 border border-emerald-100 text-[9px] font-black text-emerald-600 tracking-wider uppercase">OFFICIAL</span>
              </div>
              <p className="text-slate-500 text-xs font-medium">Download Reddit videos directly from the page with a single click.</p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              toast.warning("Extension Under Review", {
                description: "The RDT Chrome Extension is currently undergoing the Google Web Store review process. It will be live soon!",
                duration: 4000,
              });
            }}
            className="w-full md:w-auto px-5 py-2.5 bg-[#0b0f19] hover:bg-[#151c2d] text-white rounded-xl font-bold text-xs tracking-wide transition-all active:scale-[0.98] shadow-md shadow-slate-900/10 flex items-center justify-center gap-1.5 shrink-0 group"
          >
            <span>Add to Chrome (Free)</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
