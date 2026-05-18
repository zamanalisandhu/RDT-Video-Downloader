'use client';

import { CheckCircle } from 'lucide-react';

export default function PowerUsers() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-10">
          Built for Reddit Power Users
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Why It Matters</h3>
            <ul className="space-y-5 text-slate-600">
              <li className="flex gap-4">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={24} />
                <span className="text-lg">Reddit splits video and audio — most tools only grab video</span>
              </li>
              <li className="flex gap-4">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={24} />
                <span className="text-lg">Screen recording loses quality and adds UI clutter</span>
              </li>
              <li className="flex gap-4">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={24} />
                <span className="text-lg">Most downloaders limit usage or add watermarks</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">How We Solve It</h3>
            <ul className="space-y-5 text-slate-600">
              <li className="flex gap-4">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={24} />
                <span className="text-lg">Server-side extraction merges audio + video automatically</span>
              </li>
              <li className="flex gap-4">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={24} />
                <span className="text-lg">Direct stream extraction at original source quality</span>
              </li>
              <li className="flex gap-4">
                <CheckCircle className="text-brand-orange flex-shrink-0 mt-1" size={24} />
                <span className="text-lg">Unlimited downloads, zero data tracking or signup</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
