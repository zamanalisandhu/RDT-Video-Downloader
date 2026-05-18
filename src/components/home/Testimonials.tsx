'use client';

export default function Testimonials() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by 10,000+ Redditors</h2>
        </div>
        <p className="text-center text-slate-600 mb-12 text-lg">
          Don&apos;t just take our word for it. Here&apos;s what the community thinks.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div>
                <p className="font-bold text-slate-900">John D.</p>
                <div className="flex text-brand-orange">
                  {'★★★★★'}
                </div>
              </div>
            </div>
            <p className="text-slate-600 italic leading-relaxed">
              &quot;The only downloader that actually merges audio on the first try. 
              Super fast and clean UI. Highly recommended!&quot;
            </p>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                SM
              </div>
              <div>
                <p className="font-bold text-slate-900">Sarah M.</p>
                <div className="flex text-brand-orange">
                  {'★★★★★'}
                </div>
              </div>
            </div>
            <p className="text-slate-600 italic leading-relaxed">
              &quot;I use this for saving educational clips from Reddit. The gallery 
              downloader is a lifesaver for infographics!&quot;
            </p>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                MK
              </div>
              <div>
                <p className="font-bold text-slate-900">Mike K.</p>
                <div className="flex text-brand-orange">
                  {'★★★★★'}
                </div>
              </div>
            </div>
            <p className="text-slate-600 italic leading-relaxed">
              &quot;Best tool for Reddit videos. No annoying popups or redirects. 
              It just works exactly how you expect it to.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
