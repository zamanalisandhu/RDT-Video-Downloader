'use client';

import Link from 'next/link';
import { Zap, Layers, Shield } from 'lucide-react';

export default function RelatedTools() {
  return (
    <section className="py-6 bg-white border-t border-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Explore Our Specialized Tools</h2>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {`RDT isn't just one tool — it's a small suite of Reddit-specific downloaders, each tuned for a particular content type. The homepage handles ninety percent of use cases, but if you work with one format repeatedly, the dedicated tools below give you a cleaner interface and format-specific options the main reddit video downloader doesn't surface.`}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 list-none">
          <li>
            <Link href="/" className="group block p-6 bg-slate-50 rounded-[24px] border border-slate-100 hover:bg-brand-orange/5 hover:border-brand-orange/20 transition-all text-center">
              <Zap className="mx-auto text-brand-orange mb-3" size={28} aria-hidden="true" />
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Reddit GIF Downloader</h3>
              <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                {`A focused reddit gif downloader built specifically for downloading Reddit GIFs as MP4 files. Handles native Reddit GIFs, .gifv embeds, and GIFs hosted on Imgur. Perfect for building a personal reaction-GIF library from r/reactiongifs or saving satisfying loops from r/oddlysatisfying. Output is always MP4 — five to ten times smaller than a true GIF file with no quality loss, and it plays inline in every modern messaging app.`}
              </p>
            </Link>
          </li>
          <li>
            <Link href="/" className="group block p-6 bg-slate-50 rounded-[24px] border border-slate-100 hover:bg-brand-orange/5 hover:border-brand-orange/20 transition-all text-center">
              <Layers className="mx-auto text-brand-orange mb-3" size={28} aria-hidden="true" />
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Reddit Gallery Downloader</h3>
              <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                {`Our reddit gallery downloader is built for multi-image Reddit posts. Paste a gallery URL and RDT extracts every image at original resolution, then bundles them into a single ZIP archive for one-click download. No more right-click-saving twenty times in a row. Works on r/pics collections, meme dumps, tutorial slideshows, infographic sets, and any post where multiple images belong together as a sequence rather than as standalone files.`}
              </p>
            </Link>
          </li>
          <li>
            <Link href="/" className="group block p-6 bg-slate-50 rounded-[24px] border border-slate-100 hover:bg-brand-orange/5 hover:border-brand-orange/20 transition-all text-center">
              <Shield className="mx-auto text-brand-orange mb-3" size={28} aria-hidden="true" />
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Reddit Image Saver</h3>
              <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                {`A dedicated reddit image downloader for single-image posts hosted on i.redd.it. Downloads the original file with zero Reddit-side compression — useful for grabbing wallpaper-resolution images from r/EarthPorn, r/space, or r/foodporn. Supports JPEG, PNG, and WebP outputs, with EXIF metadata preserved on files where the uploader included it. The file you get is the file the uploader submitted, nothing more and nothing less.`}
              </p>
            </Link>
          </li>
          <li>
            <Link href="/" className="group block p-6 bg-slate-50 rounded-[24px] border border-slate-100 hover:bg-brand-orange/5 hover:border-brand-orange/20 transition-all text-center">
              <Zap className="mx-auto text-brand-orange mb-3" size={28} aria-hidden="true" />
              <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors">Reddit Audio Extractor</h3>
              <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                {`Our reddit audio extractor is for moments when you only need the audio track — podcasts, interviews, music shares, ASMR clips, ambient soundscapes, or spoken-word content from Reddit. RDT strips the video track and converts reddit to mp3 format at the source's original bitrate. Faster than running ffmpeg yourself, with no command-line syntax to memorize and no software to install on your machine.`}
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
