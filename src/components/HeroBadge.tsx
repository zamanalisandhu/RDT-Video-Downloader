import { Star } from 'lucide-react';

export default function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/5 border border-brand-orange/10 rounded-full">
      <Star className="text-brand-orange fill-brand-orange" size={16} />
      <span className="text-sm font-bold text-brand-orange uppercase tracking-tight">
        #1 RATED REDDIT DOWNLOADER
      </span>
    </div>
  );
}

