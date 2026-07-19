import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import RelatedTools from '@/components/home/RelatedTools';
import { pageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Music, Radio, Volume2, CheckCircle2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = pageSEO({
  title: "Reddit to MP3 Converter - Extract Audio & Sound from Reddit Videos",
  description: "Extract and download high quality MP3 audio from any Reddit video or clip. Free, fast online Reddit to MP3 audio converter and downloader.",
  path: "/reddit-to-mp3",
  keywords: [
    "reddit to mp3",
    "reddit audio downloader",
    "extract audio from reddit video",
    "reddit sound downloader",
    "convert reddit video to mp3",
    "download reddit audio track"
  ]
});

const mp3Faqs = [
  {
    q: "How do I extract audio from a Reddit video to MP3?",
    a: "Copy the link of the Reddit post containing the video or sound clip, paste it into our Reddit to MP3 converter, and click Download. Select the 'Audio / MP3' option to instantly download the standalone audio file."
  },
  {
    q: "What audio quality or bitrate will the extracted MP3 file be?",
    a: "We extract the raw audio stream directly from Reddit's servers without compressions or downgrades, giving you clean AAC/MP3 audio at up to 160kbps (the maximum bitrate hosted by Reddit)."
  },
  {
    q: "Can I extract audio from a video that has no sound on Reddit?",
    a: "If the original poster uploaded a silent video (or a GIF without an audio stream), Reddit does not store an audio track for that post. Our tool will notify you if no audio track exists."
  },
  {
    q: "Is downloading Reddit audio free?",
    a: "Yes! RDT Reddit to MP3 Converter is 100% free with unlimited extractions. No registration, software downloads, or subscriptions required."
  },
  {
    q: "Where can I use the extracted MP3 sound files?",
    a: "Downloaded MP3 audio files are saved directly to your device. You can use them for offline listening, ringtones, video editing, podcast soundbites, or sampling."
  }
];

export default function RedditToMP3Page() {
  return (
    <>
      <SchemaMarkup />
      <Header />
      <main className="min-h-screen">
        <Hero 
          title={
            <>
              Extract <span className="text-[#FF4500]">Reddit to MP3</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] via-[#ff5c1a] to-[#0079D3]">
                Audio & Sound Files
              </span>
            </>
          }
          subtitle="Extract pure sound and music tracks from Reddit videos. High bitrate MP3 audio download in seconds without downloading full heavy videos."
        />
        
        {/* Dedicated MP3 Feature Section */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                Dedicated Reddit Audio & Sound Extractor
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed text-base">
                Why waste bandwidth downloading large video files when you only need the sound? RDT Reddit to MP3 converter extracts the isolated audio stream directly from Reddit videos in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF4500] flex items-center justify-center mb-4">
                  <Music size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">High Bitrate Audio</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Extract pristine audio files up to 160kbps stereo sound directly from the original Reddit source file.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <Radio size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Ultra Lightweight</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Save data and storage space. Audio files are usually 90% smaller than downloading full 1080p video files.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Volume2 size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Instant MP3 Conversion</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our Cloudflare Workers isolate the audio URL from Reddit DASH manifests instantly without video rendering delays.
                </p>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* Detailed MP3 Explanation */}
        <section className="py-12 bg-slate-50 border-t border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
              How Reddit MP3 Audio Extraction Works
            </h2>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
              <p>
                Reddit hosts video posts on <code className="bg-slate-100 text-[#FF4500] px-2 py-0.5 rounded font-mono text-xs">v.redd.it</code> servers. Inside Reddit&apos;s server manifests, the audio stream is stored independently as an AAC audio file (typically named <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono text-xs">DASH_AUDIO_128.mp4</code> or <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono text-xs">DASH_AUDIO_64.mp4</code>).
              </p>
              <p>
                Our <strong>Reddit to MP3 tool</strong> bypasses the video container entirely and pulls the exact audio stream, making it available as a fast, downloadable audio file.
              </p>
              <ul className="space-y-2 pt-2 text-slate-800 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Ideal for downloading speeches, interviews, meme soundbites, and podcast clips</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Works on mobile browsers (Safari for iOS & Chrome for Android)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Zero quality loss compared to screen-recording or third-party audio rippers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <RelatedTools />

        {/* Dedicated MP3 FAQs */}
        <section id="faq" className="py-12 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">
                Reddit to MP3 Converter FAQs
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Frequently asked questions about extracting audio from Reddit posts.
              </p>
            </div>

            <div className="space-y-4">
              {mp3Faqs.map((faq, i) => (
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
