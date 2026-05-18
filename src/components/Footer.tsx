import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="bg-white pt-10 pb-8 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-lg shadow-brand-orange/20 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="RDT Video Downloader Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">RDT Video Downloader</span>
            </Link>
            <p className="text-slate-600 leading-relaxed">
              The fastest way to download videos, images, and GIFs from Reddit. 
              No watermarks, no limits.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-brand-orange transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-brand-orange transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-brand-orange transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/privacy-policy" className="text-slate-600 hover:text-brand-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-of-service" className="text-slate-600 hover:text-brand-orange transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/dmca" className="text-slate-600 hover:text-brand-orange transition-colors">
                  DMCA Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500 mb-4 max-w-4xl mx-auto">
            Disclaimer: RDT Video Downloader is not affiliated with Reddit Inc. All trademarks belong to their respective owners. Please respect content creators and copyright laws when downloading.
          </p>
          <p className="text-sm text-slate-500">
            © <span suppressHydrationWarning>{currentYear}</span> RDT Video Downloader. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
