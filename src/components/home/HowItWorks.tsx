'use client';

import HowItWorksStep from '@/components/HowItWorksStep';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-6 bg-white scroll-mt-20 border-t border-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">How to Save Reddit Videos in 3 Steps</h2>
          <p className="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Fast, simple, and optimized. We give you the raw media file 
            in the highest possible quality, instantly.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 relative list-none">
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-slate-200 -translate-y-10" aria-hidden="true" />
          
          <HowItWorksStep 
            number={1}
            title="Step 1: Copy the Reddit URL"
            description="Open the Reddit post containing the video, GIF, or gallery you want to save. Tap the share button and select 'Copy Link' — works on all devices."
          />
          <HowItWorksStep 
            number={2}
            title="Step 2: Paste & Process"
            description="Return to RDT Video Downloader and paste the URL above. Click 'Download Now' and our servers will merge audio automatically in under 2 seconds."
          />
          <HowItWorksStep 
            number={3}
            title="Step 3: Save to Your Device"
            description="Choose your preferred resolution (up to 1080p HD) and format. The file downloads directly to your device with no third-party redirects."
          />
        </ol>
      </div>
    </section>
  );
}
