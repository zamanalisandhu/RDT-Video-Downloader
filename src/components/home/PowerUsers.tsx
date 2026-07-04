'use client';



export default function PowerUsers() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2.5">
          Built for Reddit Power Users
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl mx-auto text-center leading-relaxed mb-8">
          {`Casual users hit the share button and forget about it. Power users — subreddit moderators, content curators, researchers, journalists, and people who spend four-plus hours a day on Reddit — have very different needs from a reddit video downloader. RDT was built with that second group in mind from day one. Here are the specific pain points we solved that most other reddit video downloader tools either ignore entirely or handle badly.`}
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Why It Matters</h3>
            <p className="text-slate-600 text-[15px] leading-relaxed">
              {`If you have ever used a "reddit video downloader" that gave you a reddit silent video, you already know the core problem. The video plays fine on Reddit itself, but the moment you save it locally the audio vanishes. That's because Reddit serves video and audio as two separate streams over MPEG-DASH, and most downloader tools only fetch the video stream — leaving you with a reddit video no sound issue. Screen-recording as a workaround loses quality and adds UI clutter to the frame. You end up with a clip that looks right but plays completely mute.`}
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">How We Solve It</h3>
            <p className="text-slate-600 text-[15px] leading-relaxed">
              {`When you paste a Reddit URL into the input field, our backend fetches the post's metadata from Reddit's public API, identifies both the video stream (in your chosen resolution) and the audio stream, downloads them in parallel to save time, and multiplexes them into a single MP4 file using FFmpeg. The result is a clean reddit video with audio — usually ready in under two seconds for posts of typical length, and under five seconds for longer clips. You get a reddit video with sound on the very first try, every single time.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
