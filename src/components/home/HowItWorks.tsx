'use client';

import HowItWorksStep from '@/components/HowItWorksStep';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-6 bg-white scroll-mt-20 border-t border-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">How to Save Reddit Videos in 3 Steps</h2>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {`Saving a Reddit video with RDT takes less than ten seconds from start to finish. Whether you want to save a Reddit video on iPhone, pull a clip on Android, or download a Reddit video to PC, the process is identical — no app to install, no account to create, no learning curve to climb. Here is exactly how to download Reddit videos with sound, one step at a time, using our free reddit video downloader.`}
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 relative list-none">
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-slate-200 -translate-y-10" aria-hidden="true" />
          
          <HowItWorksStep 
            number={1}
            title="Step 1: Copy the Reddit URL"
            description={`Open the Reddit post containing the video, GIF, or gallery you want to save. Tap the share button underneath the post and select "Copy Link" from the menu — this works the same way on iPhone, Android, and the mobile web. On desktop, right-click the post's timestamp and choose "Copy Link Address" instead. The reddit post link will look something like reddit.com/r/subreddit/comments/xxxxx/post_title/ — that's the URL you need to paste in the next step.`}
          />
          <HowItWorksStep 
            number={2}
            title="Step 2: Paste & Process"
            description={`Return to RDT, paste the reddit post link into the input box at the top of the page, and hit the Download button. On Windows press Ctrl+V to paste, on Mac use Cmd+V, and on mobile a long-press brings up the paste menu. Our reddit mp4 downloader fetches both the video stream and the audio stream in parallel, converts the reddit video to mp4 with sound, and prepares your final file — usually in under two seconds for typical Reddit posts.`}
          />
          <HowItWorksStep 
            number={3}
            title="Step 3: Save to Your Device"
            description={`Pick your preferred quality — usually 1080p, 720p, or 480p depending on what the original poster uploaded — and click Download one more time. The MP4 file lands in your browser's downloads folder. To save a Reddit video on iPhone, tap the share icon on the saved file and choose "Save Video" to push it directly into your camera roll, or use the Files app to organize it. On Android, the file appears in your Gallery app automatically within a few seconds, no extra steps required.`}
          />
        </ol>
      </div>
    </section>
  );
}
