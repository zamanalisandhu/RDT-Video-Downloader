import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="bg-white pt-9 pb-7 border-t border-slate-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
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
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              {/* Fazier Launch Badge */}
              <a href="https://fazier.com/launches/rdtvideodownloader.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                <img 
                  src="https://fazier.com/api/v1/public/badges/launch_badges.svg?badge_type=launched&theme=neutral" 
                  alt="Fazier badge" 
                  className="h-6 w-auto"
                />
              </a>

              {/* Startup Fame Badge */}
              <a href="https://startupfa.me/s/rdt?utm_source=rdtvideodownloader.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                <img 
                  src="https://startupfa.me/badges/featured-badge.webp" 
                  alt="RTD Video Downloader - Featured on Startup Fame" 
                  className="h-6 w-auto"
                />
              </a>

              {/* Plug Your Build Badge */}
              <a href="https://plugyourbuild.com/listing/rdt-video-downloader-24b2e0" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                <img 
                  src="https://plugyourbuild.com/api/badge/rdt-video-downloader-24b2e0?style=dark"
                  alt="Listed on Plug Your Build" 
                  className="h-6 w-auto"
                />
              </a>

              {/* ProjectHunt Badge */}
              <a href="https://projecthunt.me" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 48" role="img" aria-label="Featured on: projecthunt.me" className="h-6 w-auto">
                  <title>Featured on projecthunt.me</title>
                  <g>
                    <rect width="180" height="48" rx="4" fill="#FFFFFF" stroke="#E85C0D" strokeWidth="1.5"/>
                  </g>
                  <g transform="translate(10, 8)">
                    <image href="https://projecthunt.me/favicon.ico" width="32" height="32"/>
                  </g>
                  <g fill="#666666" textAnchor="start" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif">
                    <text x="50" y="22" fontSize="13" fontWeight="500">Featured on</text>
                    <text x="50" y="38" fontSize="14" fontWeight="600" fill="#E85C0D">projecthunt.me</text>
                  </g>
                </svg>
              </a>

              {/* Startups.fm Badge */}
              <a href="https://startups.fm/startups/rdt-video-downloader" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
                <img 
                  src="https://startups.fm/badge/rdt-video-downloader" 
                  alt="Featured on Startups.fm" 
                  className="h-6 w-auto"
                />
              </a>
            </div>
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
        
        <div className="pt-6 border-t border-slate-200 text-center">
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
