export default function BlogHero() {
  return (
    <section className="relative pt-16 pb-8 bg-white text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 
          className="text-[32px] md:text-[40px] font-black text-slate-900 mb-4 tracking-tight leading-tight animate-fade-in-up"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          Latest Articles & Guides
        </h1>
        <p 
          className="text-[15px] md:text-[16px] text-slate-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-150"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Learn how to download and convert Reddit videos, audio, and images in high quality on all your devices.
        </p>
      </div>
    </section>
  );
}
