'use client';

import Image from 'next/image';
import { VideoInfo } from '@/lib/api-client';

interface MediaDisplayProps {
  info: VideoInfo;
}

export default function MediaDisplay({ info }: MediaDisplayProps) {
  return (
    <div className="flex items-start gap-3">
      {/* Thumbnail */}
      {info.thumbnail && (
        <div className="shrink-0 w-20 h-14 sm:w-28 sm:h-[4.5rem] relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          <Image
            src={info.thumbnail}
            alt={info.title || 'Video thumbnail'}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] sm:text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
          {info.title || 'Reddit Video'}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
          {info.author && (
            <span className="text-[11px] text-slate-400 font-medium">u/{info.author}</span>
          )}
          {info.subreddit && (
            <>
              <span className="text-[11px] text-slate-300">·</span>
              <span className="text-[11px] text-slate-400 font-medium">r/{info.subreddit}</span>
            </>
          )}
          {info.duration ? (
            <>
              <span className="text-[11px] text-slate-300">·</span>
              <span className="text-[11px] text-slate-400 font-medium">{info.duration}s</span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
