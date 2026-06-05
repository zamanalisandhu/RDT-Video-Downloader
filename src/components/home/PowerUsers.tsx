'use client';

import { CheckCircle } from 'lucide-react';

export default function PowerUsers() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-6">
          Built for Reddit Power Users
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Why It Matters</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3.5">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={20} />
                <span className="text-[15px]">Reddit splits video and audio — most tools only grab video</span>
              </li>
              <li className="flex gap-3.5">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={20} />
                <span className="text-[15px]">Screen recording loses quality and adds UI clutter</span>
              </li>
              <li className="flex gap-3.5">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={20} />
                <span className="text-[15px]">Most downloaders limit usage or add watermarks</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">How We Solve It</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-3.5">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={20} />
                <span className="text-[15px]">Server-side extraction merges audio + video automatically</span>
              </li>
              <li className="flex gap-3.5">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={20} />
                <span className="text-[15px]">Direct stream extraction at original source quality</span>
              </li>
              <li className="flex gap-3.5">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={20} />
                <span className="text-[15px]">Unlimited downloads, zero data tracking or signup</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
