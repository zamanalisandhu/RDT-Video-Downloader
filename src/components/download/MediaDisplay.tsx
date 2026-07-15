'use client';

import { useState } from 'react';
import { VideoInfo } from '@/lib/api-client';
import { Film } from 'lucide-react';

interface MediaDisplayProps {
  info: VideoInfo;
}

export default function MediaDisplay({ info }: MediaDisplayProps) {
  const [imgError, setImgError] = useState(false);

  const isGenericLogo = info.thumbnail && (
    info.thumbnail.includes('redditstatic.com') ||
    info.thumbnail.includes('reddit.com/static') ||
    info.thumbnail.includes('no_thumbnail') ||
    info.thumbnail.includes('redditLogo') ||
    info.thumbnail === 'default' ||
    info.thumbnail === 'self' ||
    info.thumbnail === 'nsfw' ||
    info.thumbnail === 'image' ||
    !info.thumbnail.startsWith('http')
  );

  return (
    <div className="flex items-start gap-3">
      {/* Thumbnail */}
      {info.thumbnail && !isGenericLogo && !imgError ? (
        <div className="shrink-0 w-20 h-14 sm:w-28 sm:h-[4.5rem] relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={info.thumbnail}
            alt={info.title || 'Video thumbnail'}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            width={112}
            height={72}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="shrink-0 w-20 h-14 sm:w-28 sm:h-[4.5rem] relative rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400">
          <Film size={20} className="text-slate-400/80" />
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
