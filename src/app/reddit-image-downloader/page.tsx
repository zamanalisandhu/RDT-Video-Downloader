import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import RelatedTools from '@/components/home/RelatedTools';
import { pageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Camera, FolderArchive, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = pageSEO({
  title: "Reddit Image & Gallery Downloader - Download Reddit Albums & Photos",
  description: "Download full resolution images and multi-photo galleries from Reddit. Save single photos or download entire Reddit albums as a ZIP file.",
  path: "/reddit-image-downloader",
  keywords: [
    "reddit image downloader",
    "reddit gallery downloader",
    "download reddit album zip",
    "save reddit photos HD",
    "reddit photo downloader",
    "download full resolution reddit images"
  ]
});

const imageFaqs = [
  {
    q: "How do I download multi-photo galleries from Reddit?",
    a: "Copy the link of the Reddit post containing multiple images, paste it into RDT, and click Download. You can download each photo individually in high resolution or save the full album as a single ZIP file."
  },
  {
    q: "Are the downloaded Reddit images in full original resolution?",
    a: "Yes! RDT fetches the uncompressed master PNG/JPEG source files directly from Reddit's media CDN (preview.redd.it and i.redd.it) without browser downscaling."
  },
  {
    q: "Can I download images from subreddits like r/pics, r/wallpapers, or r/art?",
    a: "Yes. Our downloader works across all public subreddits, user profiles, and image formats including PNG, JPG, WebP, and HEIC."
  },
  {
    q: "Does RDT add watermarks or compress image quality?",
    a: "Never. All photo downloads retain their original resolution, EXIF metadata, and color profiles with zero watermarks or re-compression."
  },
  {
    q: "Can I save Reddit gallery ZIP files on iPhone or Android?",
    a: "Yes. iOS Safari and Android Chrome allow downloading ZIP archives directly to your Files app or Downloads folder, where you can tap to unzip all images automatically."
  }
];

export default function RedditImageDownloaderPage() {
  return (
    <>
      <SchemaMarkup />
      <Header />
      <main className="min-h-screen">
        <Hero 
          title={
            <>
              Download <span className="text-[#FF4500]">Reddit Images</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] via-[#ff5c1a] to-[#0079D3]">
                & Full Galleries (ZIP)
              </span>
            </>
          }
          subtitle="Extract original uncompressed PNG, JPG, and WebP photos from single posts or multi-image Reddit galleries in one click."
        />
        
        {/* Dedicated Image & Gallery Feature Section */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                High-Resolution Reddit Gallery & Photo Downloader
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed text-base">
                Saving multi-image posts on Reddit one by one is time-consuming. RDT parses entire gallery collections instantly and provides single-click full resolution downloads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF4500] flex items-center justify-center mb-4">
                  <Camera size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Original Master Quality</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Bypass compressed browser thumbnails and download 4K wallpapers, infographics, and photos in uncompressed original quality.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <FolderArchive size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">1-Click Gallery ZIP</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Download 10, 20, or 50 images from a single Reddit post bundled automatically into a single clean ZIP archive.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">All Formats Supported</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Seamlessly extract PNG, JPG, WebP, and Imgur photo albums hosted on Reddit without broken links or missing slides.
                </p>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* Detailed Image & Gallery Explanation */}
        <section className="py-12 bg-slate-50 border-t border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
              How the Reddit Gallery Album Extractor Works
            </h2>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
              <p>
                When a user posts a multi-image gallery on Reddit, Reddit stores metadata objects in its API under <code className="bg-slate-100 text-[#FF4500] px-2 py-0.5 rounded font-mono text-xs">media_metadata</code>. Each photo has multiple resolution tiers ranging from small 108px previews up to the full-size original master image.
              </p>
              <p>
                Most browser right-click saves only capture the scaled preview image. **RDT Image Downloader** inspects the JSON payload of the post, extracts the highest resolution source URL for every slide, and packages them into individual high-res downloads or a ZIP file.
              </p>
              <ul className="space-y-2 pt-2 text-slate-800 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Perfect for archiving photo dumps, infographics, step-by-step DIY guides, and wallpapers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Preserves original aspect ratios and high DPI detail</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                  <span>Fast client-side ZIP generation with zero server logging</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <RelatedTools />

        {/* Dedicated Image FAQs */}
        <section id="faq" className="py-12 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">
                Reddit Image Downloader FAQs
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Frequently asked questions about downloading photos and galleries from Reddit.
              </p>
            </div>

            <div className="space-y-4">
              {imageFaqs.map((faq, i) => (
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
