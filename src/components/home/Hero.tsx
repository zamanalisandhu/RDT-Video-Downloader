'use client';

import LiveCounter from '@/components/LiveCounter';
import HeroBadge from '@/components/HeroBadge';
import DownloadForm from '@/components/DownloadForm';

export default function Hero() {
  return (
    <section className="pt-6 pb-10 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mb-3">
          <HeroBadge />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 leading-[1.1] tracking-tight">
          Reddit Video Downloader 
          <span className="text-brand-orange"> with Audio</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-8 font-medium max-w-2xl mx-auto leading-relaxed">
          Free HD downloads. No watermarks, no signup, works on all devices.
        </p>
        
        <DownloadForm />

        <div className="mt-8">
          <LiveCounter />
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-orange/5 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}
