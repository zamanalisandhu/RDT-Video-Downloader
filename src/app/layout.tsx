import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientSideHelpers from "@/components/ClientSideHelpers";
import CookieConsent from "@/components/CookieConsent";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#162235",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com'),
  title: {
    default: "Reddit Video Downloader - Download Reddit Video with Sound - Free HD MP4 | RDT",
    template: "%s | RDT Video Downloader"
  },
  description: "Download Reddit videos with audio in 1080p HD. Free MP4 downloader for videos, GIFs & galleries. No watermark, no signup. Works on iPhone, Android, PC.",
  authors: [{ name: "RDT Video Downloader" }],
  creator: "RDT Video Downloader",
  publisher: "RDT Video Downloader",
  alternates: {
    canonical: "https://rdtvideodownloader.com",
    languages: {
      "en": "https://rdtvideodownloader.com",
      "x-default": "https://rdtvideodownloader.com",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
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
        {/* Google AdSense - Loaded non-blocking */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8248447086167339"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        <ClientSideHelpers />
        <CookieConsent />
        <ScrollToTop />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
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
          <Script
            id="clarity-init"
            strategy="lazyOnload"
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
