'use client';
import { Clipboard, X, Loader2, Sparkles, Link as LinkIcon } from 'lucide-react';
import { RefObject } from 'react';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
  onPaste: () => void;
  onClear: () => void;
  onSubmit: () => void;
  inputRef: RefObject<HTMLInputElement>;
}

export default function UrlInput({
  url,
  setUrl,
  loading,
  onPaste,
  onClear,
  onSubmit,
  inputRef,
}: UrlInputProps) {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="relative w-full max-w-2xl mx-auto group"
    >
      {/* Premium glow backdrop */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#FF4500]/12 via-orange-400/5 to-[#0079D3]/12 rounded-[24px] blur-xl opacity-30 group-hover:opacity-45 transition duration-500 pointer-events-none" aria-hidden="true"></div>
      
      {/* Unified clean input container */}
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white rounded-[20px] p-2 border border-slate-200/90 focus-within:border-[#FF4500]/50 focus-within:ring-4 focus-within:ring-[#FF4500]/8 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.03)]">
        
        {/* Left Side: Icon & Input Field */}
        <div className="flex items-center flex-1 gap-2.5 px-3 py-1 sm:py-0">
          <LinkIcon 
            size={18} 
            className="text-[#0079D3] shrink-0 opacity-85" 
            aria-hidden="true"
          />
          
          <input
            ref={inputRef}
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Reddit link here..."
            disabled={loading}
            aria-label="Paste Reddit URL here"
            className="flex-1 min-w-0 text-sm sm:text-base text-slate-800 bg-transparent outline-none placeholder:text-slate-400/80 disabled:opacity-50 font-medium"
          />

          {/* Quick Actions (Clear or Paste) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {url && !loading ? (
              <button
                type="button"
                onClick={onClear}
                aria-label="Clear input URL"
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
              >
                <X size={16} aria-hidden="true" />
              </button>
            ) : (
              !loading && (
                <button
                  type="button"
                  onClick={onPaste}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-[#FF4500]/5 text-slate-500 hover:text-[#FF4500] rounded-lg text-xs font-bold transition-all border border-slate-200/60 hover:border-[#FF4500]/20"
                  aria-label="Paste URL from clipboard"
                >
                  <Clipboard size={12} />
                  <span>Paste</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* CTA Submit Button */}
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="relative overflow-hidden group/btn px-7 py-3.5 sm:py-3.5 bg-gradient-to-r from-[#FF4500] to-[#ff6b35] hover:from-[#ff5714] hover:to-[#ff8152] text-white font-extrabold rounded-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 shadow-md shadow-[#FF4500]/15 hover:shadow-[#FF4500]/25 flex items-center justify-center gap-2 shrink-0 sm:min-w-[130px]"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin text-white" size={16} aria-hidden="true" />
              <span className="text-sm font-bold">Fetching...</span>
            </>
          ) : (
            <>
              <Sparkles size={15} className="text-white/95 group-hover/btn:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-sm font-bold">Get Video</span>
            </>
          )}
          
          {/* Glossy overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
        </button>

      </div>
    </form>
  );
}
