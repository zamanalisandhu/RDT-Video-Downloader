'use client';

import { Zap, Image as ImageIcon, Layers, Share2, Lock } from 'lucide-react';

export default function SupportedFormats() {
  return (
    <section className="py-6 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Supported Reddit Media Formats</h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none">
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Zap className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">v.redd.it videos</h3>
              <p className="text-slate-600 text-sm">Native Reddit-hosted MP4 files with audio merged</p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <ImageIcon className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">i.redd.it images</h3>
              <p className="text-slate-600 text-sm">JPG, PNG, and WebP image posts in original resolution</p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Zap className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">Reddit GIFs</h3>
              <p className="text-slate-600 text-sm">Animated GIF posts converted to MP4 for smaller file size</p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Layers className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">Gallery posts</h3>
              <p className="text-slate-600 text-sm">Multi-image posts downloaded as ZIP or individual files</p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Share2 className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">Crossposts</h3>
              <p className="text-slate-600 text-sm">Shared content from original sources, fully supported</p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Lock className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">NSFW posts</h3>
              <p className="text-slate-600 text-sm">Public NSFW content downloads normally with no age-gate</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
