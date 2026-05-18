'use client';

import { Zap, Image as ImageIcon, Layers, Share2, Lock } from 'lucide-react';

export default function SupportedFormats() {
  return (
    <section className="py-10 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Supported Reddit Media Formats</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <Zap className="text-brand-orange shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-bold mb-2">v.redd.it videos</h3>
              <p className="text-slate-600">Native Reddit-hosted MP4 files with audio merged</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <ImageIcon className="text-brand-orange shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-bold mb-2">i.redd.it images</h3>
              <p className="text-slate-600">JPG, PNG, and WebP image posts in original resolution</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <Zap className="text-brand-orange shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-bold mb-2">Reddit GIFs</h3>
              <p className="text-slate-600">Animated GIF posts converted to MP4 for smaller file size</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <Layers className="text-brand-orange shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-bold mb-2">Gallery posts</h3>
              <p className="text-slate-600">Multi-image posts downloaded as ZIP or individual files</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <Share2 className="text-brand-orange shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-bold mb-2">Crossposts</h3>
              <p className="text-slate-600">Shared content from original sources, fully supported</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200">
            <Lock className="text-brand-orange shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-bold mb-2">NSFW posts</h3>
              <p className="text-slate-600">Public NSFW content downloads normally with no age-gate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
