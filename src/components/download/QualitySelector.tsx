'use client';

import { Download, Loader2 } from 'lucide-react';
import { VideoInfo } from '@/lib/api-client';

interface QualitySelectorProps {
  info: VideoInfo;
  downloadingQuality: string | null;
  onDownload: (quality: number | string, label: string) => void;
}

export default function QualitySelector({
  info,
  downloadingQuality,
  onDownload,
}: QualitySelectorProps) {
  if (!info.formats || info.formats.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Download</p>
      <ul className="flex flex-wrap gap-1.5 list-none">
        {info.formats
          .filter((f) => f.height || f.url)
          .sort((a, b) => (b.height || 0) - (a.height || 0))
          .map((format, i) => {
            const isActive = downloadingQuality === format.quality;
            return (
              <li key={i}>
                <button
                  onClick={() => onDownload(format.height || 720, format.quality)}
                  disabled={downloadingQuality !== null}
                  aria-label={`Download video in ${format.quality} resolution`}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                    disabled:opacity-50 border
                    ${isActive
                      ? 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5'
                    }
                  `}
                >
                  {isActive ? (
                    <Loader2 className="animate-spin" size={12} aria-hidden="true" />
                  ) : (
                    <Download size={12} aria-hidden="true" />
                  )}
                  {format.quality}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
