import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import RelatedTools from '@/components/home/RelatedTools';
import { pageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { CheckCircle2, Film, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

export const metadata: Metadata = pageSEO({
  title: "Reddit to MP4 Downloader - Convert Reddit Video to MP4 HD",
  description: "Convert and download Reddit videos to MP4 format with audio in 1080p Full HD. Fast, free, and watermark-free online Reddit MP4 converter.",
  path: "/reddit-to-mp4",
  keywords: [
    "reddit to mp4",
    "reddit video to mp4",
    "download reddit mp4",
    "convert reddit video to mp4",
    "reddit mp4 converter with sound",
    "save reddit video mp4 1080p"
  ]
});

const mp4Faqs = [
  {
    q: "How do I convert a Reddit video to MP4 with sound?",
    a: "Simply copy the Reddit post URL, paste it into our MP4 converter input box, and click 'Get Video'. Our backend automatically fetches both the separate video stream and audio stream from Reddit's servers, merges them using FFmpeg, and hands you a ready-to-play MP4 file with audio."
  },
  {
    q: "What resolution options are available for MP4 downloads?",
    a: "We offer all resolutions provided by the original Reddit poster. This includes 1080p Full HD, 720p HD, 480p, and 360p. We never compress or re-encode your video below the original master quality."
  },
  {
    q: "Why do Reddit videos lose audio when saved using basic downloaders?",
    a: "Reddit uses MPEG-DASH streaming technology which stores video and audio in two completely separate files. Basic downloaders only capture the video file, leaving it silent. RDT Video Downloader fetches both streams and merges them into a single MP4 file."
  },
  {
    q: "Will the converted MP4 video have any watermarks or logos?",
    a: "No. All MP4 videos downloaded through RDT are 100% clean and free of watermarks, logos, or overlay text. You get the original video file exactly as posted."
  },
  {
    q: "Can I convert Reddit videos to MP4 on iPhone, iPad, or Android?",
    a: "Yes! RDT is a browser-based web application. You can convert Reddit videos to MP4 using Safari on iPhone/iPad or Chrome on Android devices, and save the file directly to your camera roll or downloads."
  }
];

export default function RedditToMP4Page() {
  return (
    <>
      <SchemaMarkup />
      <Header />
      <main className="min-h-screen">
        <Hero 
          title={
            <>
              Convert <span className="text-[#FF4500]">Reddit to MP4</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] via-[#ff5c1a] to-[#0079D3]">
                with High Quality Audio
              </span>
            </>
          }
          subtitle="Fastest online Reddit to MP4 converter. Download any Reddit post video directly into clean MP4 format in 1080p HD, 720p, or 480p."
        />
        
        {/* Dedicated MP4 Feature Section */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                Why Convert Reddit Videos to MP4?
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed text-base">
                MP4 (MPEG-4 Part 14) is the global standard video container. By converting Reddit posts to MP4 format, you guarantee seamless playback across all platforms, media players, and video editors without codec errors or missing audio tracks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF4500] flex items-center justify-center mb-4">
                  <Film size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Universal Compatibility</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  MP4 files play natively on iOS, Android, Windows, Mac, smart TVs, and video editors like Premiere Pro, Final Cut, and CapCut.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <Zap size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Server-Side Audio Muxing</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our high-speed workers combine Reddit&apos;s isolated video and audio tracks in real-time, delivering a synchronized MP4 file in under 2 seconds.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Original 1080p Full HD</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We preserve the highest bitrate stream uploaded by the original poster. Enjoy crisp 1080p HD video with crystal clear AAC audio.
                </p>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* Technical Deep Dive Section */}
        <section className="py-12 bg-slate-50 border-t border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
              Understanding Reddit MP4 Video Downloads
            </h2>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
              <p>
                When a user uploads a video clip to Reddit (via <code className="bg-slate-100 text-[#FF4500] px-2 py-0.5 rounded font-mono text-xs">v.redd.it</code>), Reddit&apos;s media processing architecture splits the media file into separate DASH streams: an H.264 video file and an AAC audio file.
              </p>
              <p>
                When you watch the video on the Reddit app or web browser, Reddit&apos;s internal player synchronizes both streams dynamically. However, right-clicking and saving the video directly will only save the silent video track.
              </p>
              <p>
                <strong>RDT Reddit to MP4 Downloader</strong> bridges this gap. Our server fetches both streams simultaneously, combines them into a single standardized MP4 container, and allows you to download the complete file with full sound restored.
              </p>
              <ul className="space-y-2 pt-2 text-slate-800 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Supports all v.redd.it video URLs and shortened redd.it links</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>No account, registration, or software installation needed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Unlimited free conversions with zero daily download limits</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <RelatedTools />

        {/* Dedicated MP4 FAQs */}
        <section id="faq" className="py-12 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">
                Reddit to MP4 Converter FAQs
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Frequently asked questions about downloading Reddit videos in MP4 format.
              </p>
            </div>

            <div className="space-y-4">
              {mp4Faqs.map((faq, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200/70 rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 text-base md:text-lg mb-2 flex items-center gap-2">
                    <HelpCircle size={18} className="text-[#FF4500] shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
