import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import RelatedTools from '@/components/home/RelatedTools';
import { pageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Image as ImageIcon, Zap, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = pageSEO({
  title: "Reddit GIF Downloader - Save Animated GIFs & GIFV from Reddit",
  description: "Download animated GIFs, Giphy clips, and GIFV files from Reddit in original high resolution or MP4 format. 100% free and fast.",
  path: "/reddit-to-gif",
  keywords: [
    "reddit gif downloader",
    "reddit to gif",
    "download gif from reddit",
    "save reddit gifv",
    "reddit animated gif downloader",
    "giphy reddit downloader"
  ]
});

const gifFaqs = [
  {
    q: "How do I download animated GIFs from Reddit?",
    a: "Copy the link of the Reddit post containing the animated GIF or GIFV file, paste it into our Reddit GIF downloader, and click Download. You can save it as an MP4 video loop or animated image."
  },
  {
    q: "What is the difference between Reddit GIF and GIFV format?",
    a: "GIFV is a format popularized by Imgur and Reddit that delivers animated content using MP4 video containers. MP4 container GIFs load much faster and take up to 90% less disk space than legacy .gif files."
  },
  {
    q: "Can I download GIFs from Giphy or Imgur posts embedded on Reddit?",
    a: "Yes! RDT automatically parses embedded Giphy, Imgur, and Reddit native animated media and provides direct high-definition download links."
  },
  {
    q: "Do Reddit GIFs contain sound?",
    a: "Traditional GIFs do not contain sound. However, if the post is actually a short video clip (sometimes called a 'GIF with sound'), RDT will detect and include the audio track for you."
  },
  {
    q: "Can I share downloaded Reddit GIFs on WhatsApp or Discord?",
    a: "Absolutely. Downloaded GIF/MP4 loops play automatically in Discord, Telegram, WhatsApp, and iMessage without buffering."
  }
];

export default function RedditToGIFPage() {
  return (
    <>
      <SchemaMarkup />
      <Header />
      <main className="min-h-screen">
        <Hero 
          title={
            <>
              Download <span className="text-[#FF4500]">Reddit GIFs</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] via-[#ff5c1a] to-[#0079D3]">
                & Animated Clips
              </span>
            </>
          }
          subtitle="Save high quality animated GIFs, GIFV animations, and Giphy content from Reddit to your camera roll or desktop."
        />
        
        {/* Dedicated GIF Feature Section */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                High-Speed Reddit GIF & GIFV Downloader
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed text-base">
                Reddit is home to millions of viral reaction GIFs, meme animations, and high-fps looping clips. RDT provides clean animated GIF downloads without quality degradation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF4500] flex items-center justify-center mb-4">
                  <ImageIcon size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Original Frame Rate</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Preserve 60fps smooth animations, color accuracy, and original loop playback speed without frame drops.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <Zap size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">90% Smaller File Size</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We offer MP4 animated loop conversions which dramatically reduce file size for instant sharing on messaging apps.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Imgur & Giphy Support</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Download third-party hosted GIFs from Imgur, Giphy, and RedGifs embedded in Reddit posts effortlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* Detailed GIF Explanation */}
        <section className="py-12 bg-slate-50 border-t border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
              Why Modern Reddit GIFs Use MP4 Containers
            </h2>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
              <p>
                Legacy <code className="bg-slate-100 text-[#FF4500] px-2 py-0.5 rounded font-mono text-xs">.gif</code> files were invented in 1987 and are extremely inefficient for modern HD screens. A 5-second high-definition animation in legacy GIF format can take up 40MB or more!
              </p>
              <p>
                Reddit and Imgur automatically convert uploaded GIFs into **MP4 video loops** (often referred to as GIFV). This drops the file size to 2MB while improving color depth and animation smoothness.
              </p>
              <p>
                Our <strong>Reddit GIF Downloader</strong> gives you the best of both worlds: crisp HD video loops ready for social media posts, stickers, and meme archives.
              </p>
              <ul className="space-y-2 pt-2 text-slate-800 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Compatible with Discord, Telegram, iMessage, and WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>No watermarks or compression artifacts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Save directly to iPhone Photos / Android Gallery</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <RelatedTools />

        {/* Dedicated GIF FAQs */}
        <section id="faq" className="py-12 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">
                Reddit GIF Downloader FAQs
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Frequently asked questions about downloading animated GIFs from Reddit.
              </p>
            </div>

            <div className="space-y-4">
              {gifFaqs.map((faq, i) => (
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
