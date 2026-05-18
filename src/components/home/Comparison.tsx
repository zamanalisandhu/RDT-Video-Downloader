'use client';

export default function Comparison() {
  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-10">
          Better Than Other Reddit Downloaders
        </h2>
        
        <div className="overflow-x-auto bg-white rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/40">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-6 text-slate-900 font-bold">Feature</th>
                <th className="px-8 py-6 text-center bg-brand-orange/5 text-brand-orange font-black">RDT Video Downloader</th>
                <th className="px-8 py-6 text-center text-slate-600 font-bold">RedditSave</th>
                <th className="px-8 py-6 text-center text-slate-600 font-bold">Viddit</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 font-medium">
              <tr className="border-t border-slate-100">
                <td className="px-8 py-5">Audio merged automatically</td>
                <td className="px-8 py-5 text-center bg-brand-orange/5">✅</td>
                <td className="px-8 py-5 text-center">✅</td>
                <td className="px-8 py-5 text-center">⚠️</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-8 py-5">1080p HD support</td>
                <td className="px-8 py-5 text-center bg-brand-orange/5">✅</td>
                <td className="px-8 py-5 text-center">✅</td>
                <td className="px-8 py-5 text-center">❌</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-8 py-5">Gallery downloads as ZIP</td>
                <td className="px-8 py-5 text-center bg-brand-orange/5">✅</td>
                <td className="px-8 py-5 text-center">✅</td>
                <td className="px-8 py-5 text-center">❌</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-8 py-5">No ads / clean UI</td>
                <td className="px-8 py-5 text-center bg-brand-orange/5">✅</td>
                <td className="px-8 py-5 text-center">❌</td>
                <td className="px-8 py-5 text-center">✅</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-8 py-5">Privacy (zero logs)</td>
                <td className="px-8 py-5 text-center bg-brand-orange/5">✅</td>
                <td className="px-8 py-5 text-center">❌</td>
                <td className="px-8 py-5 text-center">⚠️</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-8 py-5">Processing speed</td>
                <td className="px-8 py-5 text-center bg-brand-orange/5 font-black text-brand-orange">&lt; 2s</td>
                <td className="px-8 py-5 text-center">3-5s</td>
                <td className="px-8 py-5 text-center">4-6s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
