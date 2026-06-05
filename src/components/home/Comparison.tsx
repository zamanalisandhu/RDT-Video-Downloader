'use client';

export default function Comparison() {
  return (
    <section className="py-6 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-6">
          Better Than Other Reddit Downloaders
        </h2>
        
        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4.5 text-slate-900 font-bold text-[15px]">Feature</th>
                <th className="px-6 py-4.5 text-center bg-brand-orange/5 text-brand-orange font-black text-[15px]">RDT Video Downloader</th>
                <th className="px-6 py-4.5 text-center text-slate-600 font-bold text-[15px]">RedditSave</th>
                <th className="px-6 py-4.5 text-center text-slate-600 font-bold text-[15px]">Viddit</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 font-medium text-[15px]">
              <tr className="border-t border-slate-100">
                <td className="px-6 py-4">Audio merged automatically</td>
                <td className="px-6 py-4 text-center bg-brand-orange/5">✅</td>
                <td className="px-6 py-4 text-center">✅</td>
                <td className="px-6 py-4 text-center">⚠️</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-6 py-4">1080p HD support</td>
                <td className="px-6 py-4 text-center bg-brand-orange/5">✅</td>
                <td className="px-6 py-4 text-center">✅</td>
                <td className="px-6 py-4 text-center">❌</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-6 py-4">Gallery downloads as ZIP</td>
                <td className="px-6 py-4 text-center bg-brand-orange/5">✅</td>
                <td className="px-6 py-4 text-center">✅</td>
                <td className="px-6 py-4 text-center">❌</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-6 py-4">No ads / clean UI</td>
                <td className="px-6 py-4 text-center bg-brand-orange/5">✅</td>
                <td className="px-6 py-4 text-center">❌</td>
                <td className="px-6 py-4 text-center">✅</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-6 py-4">Privacy (zero logs)</td>
                <td className="px-6 py-4 text-center bg-brand-orange/5">✅</td>
                <td className="px-6 py-4 text-center">❌</td>
                <td className="px-6 py-4 text-center">⚠️</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-6 py-4">Processing speed</td>
                <td className="px-6 py-4 text-center bg-brand-orange/5 font-black text-brand-orange">&lt; 2s</td>
                <td className="px-6 py-4 text-center">3-5s</td>
                <td className="px-6 py-4 text-center">4-6s</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
