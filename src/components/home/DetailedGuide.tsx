'use client';

export default function DetailedGuide() {
  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 text-center leading-tight">
          The Ultimate Reddit Video Downloader: Everything You Need to Know
        </h2>
        
        <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 space-y-6">
          <p>
            Reddit is one of the most popular social hubs on the internet, containing millions of video clips, GIFs, and images. However, saving this media directly onto your device can be a challenge. If you have ever tried to save a video using your browser or the official Reddit app, you probably noticed that the downloaded file is completely silent. 
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-8">
            Why Do Reddit Videos Download Without Sound? (The MPEG-DASH Protocol)
          </h3>
          <p>
            The reason for silent downloads lies in Reddit&apos;s technical architecture. Reddit hosts its videos using a streaming protocol called <strong>MPEG-DASH</strong> (Dynamic Adaptive Streaming over HTTP) on its media servers (<code>v.redd.it</code>). 
          </p>
          <p>
            Under this protocol, when a user uploads a video, Reddit splits the media into <strong>two separate files</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>The Video Stream:</strong> Contains only the visual frames (available in multiple resolutions like 1080p, 720p, 480p to adapt to your internet speed).</li>
            <li><strong>The Audio Stream:</strong> A separate high-quality file containing only the sound track.</li>
          </ul>
          <p>
            When you watch a video on Reddit, their custom player streams both files simultaneously and syncs them. But when you use standard browser save tools, it only grabs the video track, resulting in a silent clip. <strong>RDT Video Downloader</strong> solves this by automatically fetching both files and merging (multiplexing) them server-side into a single, cohesive MP4 file with sound.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-8">
            How to Download Reddit Videos on Any Device
          </h3>
          <p>
            Our tool is designed to work seamlessly across all platforms. Here is a quick step-by-step guide:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="font-extrabold text-slate-800 text-lg mb-2">1. On iPhone / iPad</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Open the Reddit app, tap <strong>Share</strong>, and click <strong>Copy Link</strong>. Open Safari, navigate to <strong>rdtvideodownloader.com</strong>, paste the link, and click download. Save it from Safari&apos;s downloads directly to your camera roll.
              </p>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="font-extrabold text-slate-800 text-lg mb-2">2. On Android Devices</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Tap <strong>Share</strong> on any Reddit post and select <strong>Copy Link</strong>. Paste the URL into our tool using Google Chrome. The merged video will save directly into your mobile gallery app instantly.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="font-extrabold text-slate-800 text-lg mb-2">3. On PC / Mac</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Copy the URL from your browser&apos;s address bar and paste it onto our homepage, or install our official <strong>Chrome Extension</strong> for 1-click downloads directly from your feed.
              </p>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-8">
            Downloading NSFW and Restricted Subreddit Videos
          </h3>
          <p>
            A common limitation of many third-party Reddit download apps and bots is their inability to process age-restricted (NSFW) content or posts from private subreddits. This is due to API limits or content filtering. 
          </p>
          <p>
            Because RDT Video Downloader parses the raw media streams directly, we fully support downloading NSFW videos with audio, as long as the post is publicly accessible on Reddit. We never require you to log in with your Reddit account, ensuring your privacy and security are completely protected.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-8">
            Fair Use, Copyright, and Reposting Guidelines
          </h3>
          <p>
            When downloading content, it is crucial to respect digital copyright laws. Saving videos for personal archival, offline viewing, or educational reference is generally protected under the <strong>Fair Use</strong> doctrine. However, uploading downloaded videos to platforms like YouTube, TikTok, or Instagram without credit violates copyright terms and can lead to DMCA takedowns. Always credit the original poster (OP) and the source subreddit if you share the media.
          </p>
        </div>
      </div>
    </section>
  );
}
