import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - RDT Video Downloader",
  description: "Learn about RDT Video Downloader, our mission, technology, and commitment to privacy.",
  alternates: {
    canonical: 'https://rdtvideodownloader.com/about',
    languages: {
      'en': 'https://rdtvideodownloader.com/about',
      'x-default': 'https://rdtvideodownloader.com/about',
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col flex-grow bg-white">
        {/* About Header Banner Section */}
        <section className="relative pt-12 pb-8 text-center border-b border-slate-100/80 bg-slate-50/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 
              className="text-[32px] md:text-[40px] font-black text-slate-900 mb-4 tracking-tight leading-tight animate-fade-in-up"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              About RDT Video Downloader
            </h1>
            <p 
              className="text-[15px] md:text-[16px] text-slate-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-150"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Learn about our mission, our media-merging technology, and our commitment to user privacy.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl py-10">
          
          <div className="prose prose-slate max-w-none space-y-6 text-lg text-slate-600">
            <p>
              <strong>RDT Video Downloader</strong> was founded in 2024 with a simple mission: to provide the most reliable, 
              fastest, and easiest way to save high-quality media from Reddit.
            </p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-6 mb-3">Our Technology</h2>
            <p>
              We understand that Reddit media is technically complex. Using DASH (Dynamic Adaptive Streaming over HTTP), 
              Reddit separates audio and video into different files. This is why many other tools result in &quot;silent&quot; videos. 
              Our proprietary server-side processing automatically detects and merges these streams in real-time, 
              delivering a perfect MP4 file to your device in seconds.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-6 mb-3">Privacy &amp; Ethics</h2>
            <p>
              Privacy is not just a feature for us&mdash;it&apos;s a core value. We believe you should be able to save 
              content for personal enjoyment without being tracked, logged, or analyzed. RDT Video Downloader does 
              not use advertising cookies, does not require accounts, and never stores the URLs you process.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-6 mb-3">Community Focused</h2>
            <p>
              We are built by Reddit enthusiasts, for Reddit enthusiasts. Our tool is optimized to support 
              everything from the latest 1080p video uploads to complex multi-image galleries and viral GIFs. 
              We are constantly updating our parser to ensure compatibility with Reddit&apos;s evolving architecture.
            </p>

            <p className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 italic">
              &quot;Providing the tools you need to preserve the best of the front page of the internet.&quot;
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
