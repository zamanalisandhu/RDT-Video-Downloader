'use client';

import Image from 'next/image';
import { Download } from 'lucide-react';
import { VideoInfo } from '@/lib/api-client';

interface GalleryDisplayProps {
  info: VideoInfo;
}

export default function GalleryDisplay({ info }: GalleryDisplayProps) {
  if (info.type !== 'gallery' || !info.images || info.images.length === 0) return null;

  return (
    <div className="space-y-2 pt-3 border-t border-slate-100">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        Gallery · {info.images.length} images
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {info.images.map((img, i) => (
          <a
            key={i}
            href={img.url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="block relative group aspect-square rounded-lg overflow-hidden border border-slate-200 hover:border-brand-orange transition-colors"
          >
            <Image
              src={img.url}
              alt={`Image ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <Download className="text-white" size={16} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
