'use client';

export default function Testimonials() {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Trusted by 10,000+ Redditors</h2>
        </div>
        <p className="text-center text-slate-600 mb-6 text-sm">
          Don&apos;t just take our word for it. Here&apos;s what the community thinks.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-base">
                JD
              </div>
              <div>
                <p className="font-bold text-slate-900 text-[15px]">John D.</p>
                <div className="flex text-sm text-brand-orange">
                  {'★★★★★'}
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm italic leading-relaxed">
              &quot;The only downloader that actually merges audio on the first try. 
              Super fast and clean UI. Highly recommended!&quot;
            </p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-base">
                SM
              </div>
              <div>
                <p className="font-bold text-slate-900 text-[15px]">Sarah M.</p>
                <div className="flex text-sm text-brand-orange">
                  {'★★★★★'}
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm italic leading-relaxed">
              &quot;I use this for saving educational clips from Reddit. The gallery 
              downloader is a lifesaver for infographics!&quot;
            </p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-base">
                MK
              </div>
              <div>
                <p className="font-bold text-slate-900 text-[15px]">Mike K.</p>
                <div className="flex text-sm text-brand-orange">
                  {'★★★★★'}
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm italic leading-relaxed">
              &quot;Best tool for Reddit videos. No annoying popups or redirects. 
              It just works exactly how you expect it to.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
