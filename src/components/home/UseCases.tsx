'use client';

import { Globe, Shield, Star, Share2 } from 'lucide-react';

export default function UseCases() {
  return (
    <section className="py-6 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Common Use Cases for RDT Downloader</h2>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Whether you&apos;re a content creator, a researcher, or just a Reddit fan, our tool 
            is designed to help you preserve the web&apos;s best moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-5">
              <Globe className="text-brand-orange" size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Offline Viewing</h3>
            <p className="text-slate-600 text-sm">Save tutorials, documentaries, and long-form clips to watch later without an internet connection.</p>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-5">
              <Shield className="text-brand-orange" size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Content Archiving</h3>
            <p className="text-slate-600 text-sm">Archive viral moments and historic threads before they are deleted or the subreddit goes private.</p>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-5">
              <Star className="text-brand-orange" size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Education</h3>
            <p className="text-slate-600 text-sm">Collect educational infographics, science clips, and historical photos for classroom presentations.</p>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-5">
              <Share2 className="text-brand-orange" size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Content Creation</h3>
            <p className="text-slate-600 text-sm">Research viral trends and gather inspiration for your own social media content or video essays.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
