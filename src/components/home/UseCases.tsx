'use client';

import { Globe, Shield, Star, Share2 } from 'lucide-react';

export default function UseCases() {
  return (
    <section className="py-6 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Common Use Cases for RDT Downloader</h2>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {`People download Reddit videos for all sorts of reasons — and not all of them are about killing time on a commute. Here are the four most common scenarios our users tell us about, and why a dedicated tool beats Reddit's built-in save feature for each one. If your use case isn't listed here, it almost certainly still works — these are just the most frequent ones we hear about from redditors who use RDT to save reddit video content daily.`}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 list-none">
          <li className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-5" aria-hidden="true">
              <Globe className="text-brand-orange" size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Offline Viewing</h3>
            <p className="text-slate-600 text-sm">
              {`Save videos to watch during flights, subway commutes, or anywhere with spotty cell service. Reddit's mobile app streams every video over your data plan, which adds up fast on long trips or limited plans. Pre-download a handful of clips over home Wi-Fi before you leave, and you're set for reddit video offline viewing on the entire journey — no buffering, no autoplay pauses, no surprise carrier charges at the end of the month. Files land straight in your camera roll or downloads folder.`}
            </p>
          </li>
          <li className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-5" aria-hidden="true">
              <Shield className="text-brand-orange" size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Content Archiving</h3>
            <p className="text-slate-600 text-sm">
              {`Reddit posts get deleted, subreddits get quarantined, and accounts get suspended without warning. If there's a video you genuinely care about — a tutorial you'll need again, an interview with someone you admire, a piece of internet history worth preserving — save a local copy before it disappears from the platform. RDT gives you the original file with audio intact, in the exact resolution the OP originally posted. Don't rely on Reddit's servers to keep your favorite content alive forever.`}
            </p>
          </li>
          <li className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-5" aria-hidden="true">
              <Star className="text-brand-orange" size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Education</h3>
            <p className="text-slate-600 text-sm">
              {`Teachers, trainers, homeschoolers, and self-learners use RDT to pull educational clips from r/Documentaries, r/lectures, r/AskHistorians, and dozens of science-focused subreddits. Embedding a Reddit-hosted video in a slide deck is unreliable — the post might be removed mid-semester. A downloaded MP4 plays offline with zero buffering, no ads, and no risk of the source disappearing the night before your presentation. Perfect for classrooms, online courses, and corporate training sessions.`}
            </p>
          </li>
          <li className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-5" aria-hidden="true">
              <Share2 className="text-brand-orange" size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Content Creation</h3>
            <p className="text-slate-600 text-sm">
              {`YouTubers, TikTok creators, and newsletter writers need clean source files for curation work. Screen-recordings look amateurish and include your phone's status bar, notification shade, and UI clutter. RDT hands you the original MP4 in 1080p — ready to drop straight into Premiere, CapCut, or DaVinci Resolve with no cropping or cleanup required. Always credit the original poster and the source subreddit when you share the clip on YouTube, TikTok, WhatsApp, Telegram, or Discord. Respecting copyright and fair use protects your channel from DMCA takedowns.`}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
