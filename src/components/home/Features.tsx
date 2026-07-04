'use client';

import FeatureCard from '@/components/FeatureCard';
import { Zap, Award, Layers, EyeOff, Lock, Smartphone } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-6 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Why Choose RDT Video Downloader?</h2>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {`We built RDT after years of frustration with half-broken Reddit downloaders that left us with a reddit silent video, bloated watermarks, or strict daily limits that cut us off mid-binge. Every feature below was added to solve a real problem we hit ourselves while trying to save Reddit content. No fluff, no marketing speak — just the six things that actually matter when you're trying to download a reddit video with sound and not lose the audio in the process.`}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none">
          <FeatureCard 
            icon={<Zap className="text-brand-orange" />}
            title="Audio Merged Automatically"
            description={`Reddit stores video and audio as two separate files using the MPEG-DASH protocol. Most downloader tools only grab the video stream, leaving you with a reddit video no sound problem. RDT fetches both streams and merges them server-side into a single MP4 file using FFmpeg. You get a reddit video with sound on the very first try, every single time — no second tool required, no separate audio file to chase down. The merged MP4 plays correctly in every media player, on every device, with audio perfectly synced from the first frame.`}
          />
          <FeatureCard 
            icon={<Award className="text-brand-orange" />}
            title="HD 1080p Quality"
            description={`Reddit caps uploads at 1080p Full HD, and our reddit hd video downloader delivers the highest resolution the original poster actually uploaded. No re-encoding, no compression artifacts, no sneaky quality downgrade to save bandwidth on our end. If the source reddit 1080p video is available, you get 1080p. If the source is 720p, you get the clean 720p master file exactly as it was uploaded — never a stretched, upscaled, or pixelated version that some other downloaders serve to shrink file size.`}
          />
          <FeatureCard 
            icon={<Layers className="text-brand-orange" />}
            title="Reddit Gallery Support"
            description={`Multi-image Reddit posts are notoriously painful to save one by one. RDT extracts every image at full original resolution, then offers a one-click ZIP download so you can grab an entire reddit gallery post in a single click instead of right-click-saving twenty times in a row. Perfect for archiving r/pics collections, meme dumps, tutorial slideshows, infographic sets, and any post where the images are meant to be viewed together as a sequence rather than individually.`}
          />
          <FeatureCard 
            icon={<EyeOff className="text-brand-orange" />}
            title="No Watermarks, No Limits"
            description={`Your downloaded videos look exactly like the original post — a reddit video with no watermark, no RDT logo burned into the corner, no end-card, no overlay text. We also don't cap daily downloads. Save five videos in a day or five hundred — the tool behaves identically either way. No signup wall, no email verification, no premium tier upsell waiting behind a paywall. This is a reddit video downloader free forever, and it always will be.`}
          />
          <FeatureCard 
            icon={<Lock className="text-brand-orange" />}
            title="Privacy-First Design"
            description={`We don't store the URLs you paste, the files you download, or any personal identifier. Every request is processed in real-time and discarded once the MP4 is handed to your browser. There is no account system, no tracking pixel, no download history tied to your IP address. What you download stays on your device and nowhere else — not in our logs, not in a third-party analytics dashboard, not anywhere. That's what makes us a reddit video downloader online that privacy-conscious redditors actually trust.`}
          />
          <FeatureCard 
            icon={<Smartphone className="text-brand-orange" />}
            title="Universal Device Support"
            description={`RDT runs in any modern browser — it works as a reddit video downloader for Safari on iPhone, a reddit video downloader for Chrome on Android, on Edge for Windows, and on Firefox for Mac and Linux. No app install required, no plugin to enable. The interface adapts to your screen size, so the experience on a six-inch phone is just as smooth as on a twenty-seven-inch desktop monitor. We also offer a reddit video downloader chrome extension for one-click saves directly from your Reddit feed — no copy-pasting required.`}
          />
        </ul>
      </div>
    </section>
  );
}
