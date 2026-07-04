'use client';

import { Zap, Image as ImageIcon, Layers, Share2, Lock } from 'lucide-react';

export default function SupportedFormats() {
  return (
    <section className="py-6 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Supported Reddit Media Formats</h2>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {`Reddit hosts a wider variety of media formats than most people realize — and different reddit video downloader tools support different slices of it. RDT handles every format Reddit natively serves, which means you don't need a separate reddit gif downloader, another one for galleries, and a third for video posts. Here is the full breakdown of what we process and how each format is handled on our end.`}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none">
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Zap className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">v.redd.it videos</h3>
              <p className="text-slate-600 text-sm">
                {`v.redd.it is Reddit's native video CDN — every video uploaded directly to Reddit, rather than linked from YouTube, Streamable, or another external host, gets served from this domain. These are by far the most common video posts on the platform. RDT pulls both the video stream and the audio stream from this domain over the MPEG-DASH protocol and merges them into a single reddit mp4 file with synced sound, ready to play on any device.`}
              </p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <ImageIcon className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">i.redd.it images</h3>
              <p className="text-slate-600 text-sm">
                {`i.redd.it is Reddit's image host. Single-image posts and individual frames from galleries are served from this domain. Our reddit image downloader grabs the original-resolution file with zero Reddit-side compression applied — useful for pulling wallpaper-quality images from r/EarthPorn, r/space, r/MacroPorn, or r/foodporn. The file you get is the exact file the uploader submitted, with EXIF metadata preserved where the original had it. No watermarks, no downscaling.`}
              </p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Zap className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">Reddit GIFs</h3>
              <p className="text-slate-600 text-sm">
                {`Reddit GIFs are technically short MP4 files disguised as GIFs — they autoplay in the feed but have no audio track. Our reddit gif downloader saves them in their native MP4 format, which is five to ten times smaller than a true .gif file at the same visual quality and works in every modern messaging app including WhatsApp, Telegram, Discord, and iMessage. Perfect for building a personal reaction-GIF library from r/reactiongifs or r/wholesomememes. Imgur-hosted .gifv embeds are also supported.`}
              </p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Layers className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">Gallery posts</h3>
              <p className="text-slate-600 text-sm">
                {`A reddit gallery post is Reddit's answer to Instagram carousels — multiple images uploaded in a single post. Our reddit gallery downloader extracts every image at full original resolution, then bundles them into a single ZIP archive so you don't have to right-click-save twenty times in a row. Works on r/pics collections, infographic dumps, meme carousels, step-by-step tutorial slideshows, and any post where multiple images are meant to be viewed together as a sequence.`}
              </p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Share2 className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">Crossposts</h3>
              <p className="text-slate-600 text-sm">
                {`A crosspost is a post shared from one subreddit to another. The original video file lives in the source subreddit, but the crosspost URL still works with our tool. Just paste the crosspost link into the input field — our parser follows the redirect to the original media file automatically and downloads it with audio merged. No extra steps, no manual URL fixing, no copy-paste gymnastics required on your end. The reddit post link works regardless of which subreddit you found it in.`}
              </p>
            </div>
          </li>
          <li className="flex gap-3.5 p-5 bg-white rounded-xl border border-slate-200">
            <Lock className="text-brand-orange shrink-0" size={22} aria-hidden="true" />
            <div>
              <h3 className="text-base font-bold mb-1.5">NSFW posts</h3>
              <p className="text-slate-600 text-sm">
                {`Most downloader bots refuse NSFW-tagged content because of API restrictions or content filtering. RDT does not — we process a reddit nsfw video the exact same way we process any other public post on Reddit, with audio merged automatically and no quality downgrade. The only hard requirement is that the post must be publicly accessible without logging into a Reddit account. Age-restricted subreddits work fine; quarantined or private subreddits do not, since Reddit itself blocks access to them.`}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
