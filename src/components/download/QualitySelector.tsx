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
      <div className="flex flex-wrap gap-1.5">
        {info.formats
          .filter((f) => f.height || f.url)
          .sort((a, b) => (b.height || 0) - (a.height || 0))
          .map((format, i) => {
            const isActive = downloadingQuality === format.quality;
            return (
              <button
                key={i}
                onClick={() => onDownload(format.height || 720, format.quality)}
                disabled={downloadingQuality !== null}
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
                  <Loader2 className="animate-spin" size={12} />
                ) : (
                  <Download size={12} />
                )}
                {format.quality}
              </button>
            );
          })}
      </div>
    </div>
  );
}
