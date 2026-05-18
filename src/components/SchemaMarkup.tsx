import JsonLd from './JsonLd';

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
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to download Reddit videos with sound?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Downloading Reddit videos with sound is easy with RDT Video Downloader. Simply copy the Reddit post URL, paste it into our tool, and click 'Download.' Our server automatically extracts the separate video and audio streams and merges them into a single high-quality MP4 file for you."
        }
      },
      {
        "@type": "Question",
        "name": "Is RDT Video Downloader the best Reddit video downloader for 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! RDT Video Downloader is optimized for 2026, supporting the latest Reddit media formats, 1080p Full HD resolution, and multi-image galleries. We offer the fastest processing speeds and zero watermarks."
        }
      },
      {
        "@type": "Question",
        "name": "How do I use the Reddit video downloader for iPhone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On iPhone, open the Reddit app, tap 'Share' and 'Copy Link.' Open Safari, go to rdtvideodownloader.com, paste the link, and tap 'Download.' Once the video processes, tap the download button. The video will be saved to your 'Files' app or 'Downloads' folder."
        }
      },
      {
        "@type": "Question",
        "name": "Does this work as a Reddit video downloader for Android?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. On Android, copy the Reddit link and paste it into our website using Chrome or any mobile browser. You can save videos directly to your device's gallery in seconds."
        }
      },
      {
        "@type": "Question",
        "name": "Can I save Reddit videos to my camera roll?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. After downloading the video on your mobile device, locate it in your downloads folder. On iPhone, tap the share icon on the video and select 'Save Video' to move it to your camera roll. On Android, it typically appears in your gallery automatically."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a free Reddit video downloader without watermarks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, RDT Video Downloader is completely free and never adds watermarks to your downloads. You get the original, clean content exactly as it was posted on Reddit."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Reddit gallery downloader work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When you paste a link to a Reddit gallery post, our tool identifies all images in the collection. You can then choose to download them individually in high resolution or save the entire gallery as a single ZIP archive."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this as a Reddit GIF downloader?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Reddit GIFs (often hosted as .gifv or .mp4) can be downloaded easily. We convert them to standard MP4 format which offers better quality and smaller file sizes for easy sharing."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer a Reddit to MP3 converter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If a Reddit post contains audio, our tool provides an option to download just the audio track. This is perfect for extracting podcasts, music, or interviews from Reddit posts."
        }
      },
      {
        "@type": "Question",
        "name": "Why is the Reddit video silent when I download it elsewhere?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Reddit stores audio and video separately. Most basic downloaders only grab the video file, resulting in no sound. RDT Video Downloader solves this by automatically merging the audio and video streams server-side."
        }
      }
    ]
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
