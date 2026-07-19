import JsonLd from './JsonLd';
import { homepageFaqs } from '@/lib/faqs';

export default function SchemaMarkup() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "RDT Video Downloader",
    "url": siteUrl,
    "description": "Free Reddit video, audio, GIF, and image downloader",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RDT Video Downloader",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RDT Video Downloader",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://twitter.com/rdtdownloader",
      "https://facebook.com/rdtdownloader"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homepageFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Reddit Videos with Sound",
    "description": "A simple 3-step guide to download high-quality Reddit videos with audio.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Copy Reddit URL",
        "text": "Go to Reddit and copy the link of the video or post you want to download.",
        "url": `${siteUrl}/#hero`
      },
      {
        "@type": "HowToStep",
        "name": "Paste and Process",
        "text": "Paste the link into the RDT Video Downloader input field and click 'Get Video'.",
        "url": `${siteUrl}/#hero`
      },
      {
        "@type": "HowToStep",
        "name": "Download HD Video",
        "text": "Choose your preferred quality (e.g., 1080p) and click the download button to save it to your device.",
        "url": `${siteUrl}/#hero`
      }
    ],
    "totalTime": "PT30S",
    "estimatedCost": {
      "@type": "HowToSupply",
      "name": "Free"
    }
  };

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
    </>
  );
}
