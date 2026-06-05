'use client';

import FeatureCard from '@/components/FeatureCard';
import { Zap, Award, Layers, EyeOff, Lock, Smartphone } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-6 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Why Choose RDT Video Downloader?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-brand-orange" />}
            title="Audio Merged Automatically"
            description="Reddit stores video and audio as separate streams. Most tools give you a silent MP4. We merge them into a single high-quality file automatically."
          />
          <FeatureCard 
            icon={<Award className="text-brand-orange" />}
            title="HD 1080p Quality"
            description="Download videos in the highest available resolution — up to 1080p Full HD. We never compress or downgrade your files."
          />
          <FeatureCard 
            icon={<Layers className="text-brand-orange" />}
            title="Reddit Gallery Support"
            description="Save entire image galleries from a single post. Download all photos as separate files or one organized ZIP archive."
          />
          <FeatureCard 
            icon={<EyeOff className="text-brand-orange" />}
            title="No Watermarks, No Limits"
            description="Clean, original Reddit media. No logos, no overlays, no daily download caps. Download as many videos as you need."
          />
          <FeatureCard 
            icon={<Lock className="text-brand-orange" />}
            title="Privacy-First Design"
            description="We don't log URLs or track users. No cookies for advertising, no accounts, no email required. Stay completely anonymous."
          />
          <FeatureCard 
            icon={<Smartphone className="text-brand-orange" />}
            title="Universal Device Support"
            description="Works on Windows, macOS, Android, and iOS. No app installation required — just paste and download from any browser."
          />
        </div>
      </div>
    </section>
  );
}
