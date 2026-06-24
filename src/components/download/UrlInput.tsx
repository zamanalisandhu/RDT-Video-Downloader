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
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="relative group"
    >
      {/* Decorative gradient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange/20 via-orange-400/20 to-brand-orange/20 rounded-[2rem] blur-xl opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" aria-hidden="true"></div>
      
      <div className="relative bg-white rounded-2xl border border-brand-orange/25 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 p-1.5 sm:p-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="flex items-center flex-1 w-full bg-slate-50 rounded-xl border border-brand-orange/20 px-3.5 py-2 transition-all focus-within:border-brand-orange/50 focus-within:bg-white focus-within:shadow-sm">
            <Clipboard 
              size={16} 
              className="text-slate-400 hover:text-brand-orange cursor-pointer transition-colors shrink-0" 
              onClick={onPaste}
              role="button"
              aria-label="Paste URL from clipboard"
            />
            
            <input
              ref={inputRef}
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Reddit URL here..."
              disabled={loading}
              aria-label="Paste Reddit URL here"
              className="flex-1 min-w-0 px-2 text-sm sm:text-base text-slate-800 bg-transparent outline-none placeholder:text-slate-400 disabled:opacity-50 font-medium"
            />

            {url && !loading && (
              <button
                type="button"
                onClick={onClear}
                aria-label="Clear input URL"
                className="shrink-0 p-1 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="relative w-full md:w-auto overflow-hidden group/btn px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-md shadow-slate-900/10 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                <span className="text-sm">Fetching...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} className="text-orange-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="text-sm">Get Video</span>
              </>
            )}
            
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </form>
  );
}
