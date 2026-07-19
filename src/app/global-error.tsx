'use client';

export default function GlobalError({
  reset,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Critical Error</h2>
          <p className="text-slate-600 text-sm mb-6">
            A system error occurred. Click below to recover the application.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 bg-[#FF4500] hover:bg-[#ff5714] text-white font-extrabold rounded-xl transition-all shadow-md active:scale-[0.98] text-sm"
          >
            Refresh Application
          </button>
        </div>
      </body>
    </html>
  );
}
