'use client';

import Link from 'next/link';
import { Zap, Layers, Shield } from 'lucide-react';

export default function RelatedTools() {
  return (
    <section className="py-10 bg-white border-t border-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore Our Specialized Tools</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Optimized extraction tools for every type of Reddit content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/" className="group p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-brand-orange/5 hover:border-brand-orange/20 transition-all text-center">
            <Zap className="mx-auto text-brand-orange mb-4" size={32} />
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Reddit GIF Downloader</h3>
          </Link>
          <Link href="/" className="group p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-brand-orange/5 hover:border-brand-orange/20 transition-all text-center">
            <Layers className="mx-auto text-brand-orange mb-4" size={32} />
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Reddit Gallery Downloader</h3>
          </Link>
          <Link href="/" className="group p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-brand-orange/5 hover:border-brand-orange/20 transition-all text-center">
            <Shield className="mx-auto text-brand-orange mb-4" size={32} />
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Reddit Image Saver</h3>
          </Link>
          <Link href="/" className="group p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-brand-orange/5 hover:border-brand-orange/20 transition-all text-center">
            <Zap className="mx-auto text-brand-orange mb-4" size={32} />
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Reddit Audio Extractor</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}
