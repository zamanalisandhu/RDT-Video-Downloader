'use client';

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`wp-block-kadence-pane border rounded-[16px] transition-all duration-300 overflow-hidden mb-3.5 bg-white ${
        isOpen 
          ? 'border-brand-orange shadow-md shadow-brand-orange/5' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <dt>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="kt-blocks-accordion-header w-full flex items-center justify-between p-5 text-left cursor-pointer select-none focus:outline-none"
        >
          <span className="text-[17px] font-semibold text-slate-900 pr-4">
            {question}
          </span>
          <div 
            className={`kt-blocks-accordion-icon-trigger relative w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
              isOpen ? 'bg-brand-orange text-white rotate-45' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {/* Horizontal line of plus */}
            <span className={`absolute w-3 h-0.5 rounded transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-slate-600'}`} />
            {/* Vertical line of plus */}
            <span className={`absolute w-0.5 h-3 rounded transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-slate-600'}`} />
          </div>
        </button>
      </dt>
      <dd 
        className="kt-accordion-panel transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5 pt-0 text-slate-600 leading-relaxed text-[15px]">
          {answer}
        </div>
      </dd>
    </div>
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
    <dl className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </dl>
  );
}
