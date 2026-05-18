'use client';
import { Clipboard, X, Loader2, Sparkles } from 'lucide-react';
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
    <div className="relative group">
      {/* Decorative gradient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange/20 via-orange-400/20 to-brand-orange/20 rounded-[2rem] blur-xl opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 p-2 sm:p-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex items-center flex-1 w-full bg-slate-50/50 rounded-2xl border border-slate-100 px-4 py-2.5 transition-all focus-within:border-brand-orange/30 focus-within:bg-white focus-within:shadow-sm">
            <Clipboard 
              size={18} 
              className="text-slate-400 hover:text-brand-orange cursor-pointer transition-colors shrink-0" 
              onClick={onPaste}
            />
            
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
              placeholder="Paste Reddit URL here..."
              disabled={loading}
              className="flex-1 min-w-0 px-3 text-base sm:text-lg text-slate-800 bg-transparent outline-none placeholder:text-slate-400 disabled:opacity-50 font-medium"
            />

            {url && !loading && (
              <button
                onClick={onClear}
                className="shrink-0 p-1.5 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <button
            onClick={onSubmit}
            disabled={loading || !url.trim()}
            className="relative w-full md:w-auto overflow-hidden group/btn px-8 py-4 sm:py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span className="text-lg">Fetching...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} className="text-orange-400 group-hover:scale-125 transition-transform" />
                <span className="text-lg">Get Video</span>
              </>
            )}
            
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
