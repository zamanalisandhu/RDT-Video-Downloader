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
        
        <ul className="grid md:grid-cols-3 gap-8 list-none">
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <figure className="h-full flex flex-col justify-between">
              <blockquote className="text-slate-600 text-sm italic leading-relaxed mb-4">
                &quot;The only downloader that actually merges audio on the first try. 
                Super fast and clean UI. Highly recommended!&quot;
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="w-11 h-11 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-base" aria-hidden="true">
                  JD
                </div>
                <div>
                  <cite className="font-bold text-slate-900 text-[15px] not-italic">John D.</cite>
                  <div className="flex text-sm text-brand-orange" aria-hidden="true">
                    {'★★★★★'}
                  </div>
                </div>
              </figcaption>
            </figure>
          </li>
          
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <figure className="h-full flex flex-col justify-between">
              <blockquote className="text-slate-600 text-sm italic leading-relaxed mb-4">
                &quot;I use this for saving educational clips from Reddit. The gallery 
                downloader is a lifesaver for infographics!&quot;
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="w-11 h-11 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-base" aria-hidden="true">
                  SM
                </div>
                <div>
                  <cite className="font-bold text-slate-900 text-[15px] not-italic">Sarah M.</cite>
                  <div className="flex text-sm text-brand-orange" aria-hidden="true">
                    {'★★★★★'}
                  </div>
                </div>
              </figcaption>
            </figure>
          </li>
          
          <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <figure className="h-full flex flex-col justify-between">
              <blockquote className="text-slate-600 text-sm italic leading-relaxed mb-4">
                &quot;Best tool for Reddit videos. No annoying popups or redirects. 
                It just works exactly how you expect it to.&quot;
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="w-11 h-11 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-base" aria-hidden="true">
                  MK
                </div>
                <div>
                  <cite className="font-bold text-slate-900 text-[15px] not-italic">Mike K.</cite>
                  <div className="flex text-sm text-brand-orange" aria-hidden="true">
                    {'★★★★★'}
                  </div>
                </div>
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </section>
  );
}
