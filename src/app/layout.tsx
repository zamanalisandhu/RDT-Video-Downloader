import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientSideHelpers from "@/components/ClientSideHelpers";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com'),
  title: {
    default: "Reddit Video Downloader - Download Reddit Video with Sound - Free HD MP4 | RDT",
    template: "%s | RDT Video Downloader"
  },
  description: "Download Reddit videos with audio in 1080p HD. Free MP4 downloader for videos, GIFs & galleries. No watermark, no signup. Works on iPhone, Android, PC.",
  keywords: ["reddit video downloader", "reddit downloader with audio", "save reddit video", "reddit mp4", "reddit gif downloader", "reddit image downloader", "reddit gallery downloader"],
  authors: [{ name: "RDT Video Downloader" }],
  creator: "RDT Video Downloader",
  publisher: "RDT Video Downloader",
  alternates: {
    canonical: './',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Reddit Video Downloader - Download Reddit Video with Sound - Free HD MP4 | RDT",
    description: "Download Reddit videos with audio in 1080p HD. Free MP4 downloader for videos, GIFs & galleries. No watermark, no signup. Works on iPhone, Android, PC.",
    type: "website",
    url: "https://rdtvideodownloader.com/",
    siteName: "RDT Video Downloader",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RDT Video Downloader - Save Reddit Videos with Sound",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reddit Video Downloader - Download Reddit Video with Sound - Free HD MP4 | RDT",
    description: "Download Reddit videos with audio in 1080p HD. Free MP4 downloader for videos, GIFs & galleries. No watermark, no signup. Works on iPhone, Android, PC.",
    images: ["/twitter-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DNS Prefetch and Preconnect for performance */}
        <link rel="dns-prefetch" href="https://rdtapidownload.techiesline.workers.dev" />
        <link rel="preconnect" href="https://rdtapidownload.techiesline.workers.dev" />
        {process.env.NEXT_PUBLIC_GA_ID && <link rel="preconnect" href="https://www.googletagmanager.com" />}
        {process.env.NEXT_PUBLIC_CLARITY_ID && <link rel="preconnect" href="https://www.clarity.ms" />}
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8248447086167339"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        <ClientSideHelpers />
        <CookieConsent />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    transport_type: 'beacon'
                  });
                `,
              }}
            />
          </>
        )}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
              `,
            }}
          />
        )}
        {children}
      </body>
    </html>
  );
}
