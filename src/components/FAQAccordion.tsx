'use client';

import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="group border-b border-[#E2E8F0]">
      <summary className="flex items-center justify-between py-8 cursor-pointer list-none">
        <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] group-hover:text-brand-orange transition-colors pr-8">
          {question}
        </h3>
        <ChevronDown size={28} className="text-slate-400 group-open:rotate-180 transition-transform duration-300 shrink-0" />
      </summary>
      <div className="pb-8 px-1">
        <p className="text-[#64748B] leading-relaxed text-lg md:text-xl">
          {answer}
        </p>
      </div>
    </details>

  );
}

export default function FAQAccordion() {
  const faqs = [
    {
      question: "How to download Reddit videos with sound?",
      answer: "Downloading Reddit videos with sound is easy with RDT Video Downloader. Simply copy the Reddit post URL, paste it into our tool, and click 'Download.' Our server automatically extracts the separate video and audio streams and merges them into a single high-quality MP4 file for you."
    },
    {
      question: "Is RDT Video Downloader the best Reddit video downloader for 2026?",
      answer: "Yes! RDT Video Downloader is optimized for 2026, supporting the latest Reddit media formats, 1080p Full HD resolution, and multi-image galleries. We offer the fastest processing speeds and zero watermarks."
    },
    {
      question: "How do I use the Reddit video downloader for iPhone?",
      answer: "On iPhone, open the Reddit app, tap 'Share' and 'Copy Link.' Open Safari, go to rdtvideodownloader.com, paste the link, and tap 'Download.' Once the video processes, tap the download button. The video will be saved to your 'Files' app or 'Downloads' folder."
    },
    {
      question: "Does this work as a Reddit video downloader for Android?",
      answer: "Absolutely. On Android, copy the Reddit link and paste it into our website using Chrome or any mobile browser. You can save videos directly to your device's gallery in seconds."
    },
    {
      question: "Can I save Reddit videos to my camera roll?",
      answer: "Yes. After downloading the video on your mobile device, locate it in your downloads folder. On iPhone, tap the share icon on the video and select 'Save Video' to move it to your camera roll. On Android, it typically appears in your gallery automatically."
    },
    {
      question: "Is there a free Reddit video downloader without watermarks?",
      answer: "Yes, RDT Video Downloader is completely free and never adds watermarks to your downloads. You get the original, clean content exactly as it was posted on Reddit."
    },
    {
      question: "How does the Reddit gallery downloader work?",
      answer: "When you paste a link to a Reddit gallery post, our tool identifies all images in the collection. You can then choose to download them individually in high resolution or save the entire gallery as a single ZIP archive."
    },
    {
      question: "Can I use this as a Reddit GIF downloader?",
      answer: "Yes. Reddit GIFs (often hosted as .gifv or .mp4) can be downloaded easily. We convert them to standard MP4 format which offers better quality and smaller file sizes for easy sharing."
    },
    {
      question: "Do you offer a Reddit to MP3 converter?",
      answer: "If a Reddit post contains audio, our tool provides an option to download just the audio track. This is perfect for extracting podcasts, music, or interviews from Reddit posts."
    },
    {
      question: "Why is the Reddit video silent when I download it elsewhere?",
      answer: "Reddit stores audio and video separately. Most basic downloaders only grab the video file, resulting in no sound. RDT Video Downloader solves this by automatically merging the audio and video streams server-side."
    },
    {
      question: "Is RDT Video Downloader safe to use?",
      answer: "Yes. We don't require any software installation, accounts, or personal information. Our site is secured with SSL encryption and we don't store your download history or URLs."
    },
    {
      question: "What is the maximum resolution supported?",
      answer: "We support the maximum resolution available on Reddit, which is typically 1080p Full HD. If a video was uploaded in 4K or 720p, we provide the highest quality stream available."
    },
    {
      question: "Are there any download limits?",
      answer: "No. You can download an unlimited number of Reddit videos, images, and GIFs every day. We don't impose any daily or monthly caps."
    },
    {
      question: "Does it work for Reddit livestreams?",
      answer: "We currently support standard video posts and archived broadcasts. If the livestream has ended and is available as a post, you can download it using our tool."
    },
    {
      question: "Do you store my data?",
      answer: "No. We respect your privacy. All processing happens in real-time, and we do not log the URLs you download or any personal metadata."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
