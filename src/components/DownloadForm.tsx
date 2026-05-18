'use client';

import { useState, useRef } from 'react';
import { RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  fetchVideoInfo,
  getDownloadUrl,
  isValidRedditUrl,
  formatErrorMessage,
  type VideoInfo,
} from '@/lib/api-client';

import UrlInput from './download/UrlInput';
import MediaDisplay from './download/MediaDisplay';
import { Download, Loader2 } from 'lucide-react';

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadingQuality, setDownloadingQuality] = useState<string | null>(null);
  const [info, setInfo] = useState<VideoInfo | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const animateProgress = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 90) { p = 90; clearInterval(interval); }
      setProgress(Math.floor(p));
    }, 200);
    return () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    };
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) { toast.error('Clipboard is empty'); return; }
      setUrl(text);
      toast.success('Link pasted');
    } catch {
      toast.error('Could not access clipboard');
    }
  };

  const handleClear = () => {
    setUrl('');
    setInfo(null);
    setProgress(0);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleGetInfo = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) { toast.error('Please paste a Reddit URL'); return; }
    if (!isValidRedditUrl(trimmedUrl)) { toast.error('Please enter a valid Reddit URL'); return; }

    setLoading(true);
    setInfo(null);
    const stopProgress = animateProgress();

    try {
      const data = await fetchVideoInfo(trimmedUrl);
      if (!data.success) {
        toast.error(formatErrorMessage(data.error || 'Failed to fetch video'));
        setInfo(data);
        return;
      }
      setInfo(data);
      toast.success('Video found! Choose your quality below.');
    } catch (err: unknown) {
      toast.error('Network error. Please try again.');
      setInfo({
        success: false,
        error: err instanceof Error ? err.message : 'Network error',
      });
      console.error(err);
    } finally {
      stopProgress();
      setLoading(false);
    }
  };

  const handleDownload = async (quality: number | string, label: string) => {
    // 1. Open the tab IMMEDIATELY to avoid popup blockers and feel instant
    const downloadWin = window.open('', '_blank');
    
    if (!downloadWin) {
      toast.error('Popup blocked! Please allow popups to download.');
      return;
    }

    // Show initial loading state in the new tab
    downloadWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Preparing Download...</title>
          <style>
            body { font-family: -apple-system, system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #ffffff; }
            .c { text-align: center; }
            .s { border: 4px solid #f3f3f3; border-top: 4px solid #ff4500; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            h1 { font-size: 1.2rem; color: #1a1a1a; margin: 0; }
          </style>
        </head>
        <body>
          <div class="c">
            <div class="s"></div>
            <h1>Preparing your download...</h1>
          </div>
        </body>
      </html>
    `);

    setDownloadingQuality(label);
    const toastId = toast.loading('Processing download...');

    try {
      const data = await getDownloadUrl(url.trim(), quality);

      if (data.success && data.downloadUrl) {
        const fileName = info?.title 
          ? `rdtvideodownloader.com_${info.title.slice(0, 50).replace(/[^a-z0-9]/gi, '_')}.mp4` 
          : `rdtvideodownloader.com_video_${Date.now()}.mp4`;

        // Update the already open tab with the download logic
        downloadWin.document.body.innerHTML = `
          <div class="c">
            <div class="s"></div>
            <h1>Downloading Media</h1>
            <p style="color: #666; font-size: 0.9rem;">Your file is being saved now...</p>
          </div>
        `;

        const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://rdtapidownload.techiesline.workers.dev').replace(/\/+$/, '');

        const script = downloadWin.document.createElement('script');
        script.textContent = `
          (function() {
            const proxyUrl = "${apiBaseUrl}/api/proxy?url=" + encodeURIComponent("${data.downloadUrl}") + "&filename=" + encodeURIComponent("${fileName}");
            
            // Create a hidden iframe inside the child tab to trigger the download natively
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = proxyUrl;
            document.body.appendChild(iframe);
            
            // Wait 10 seconds for the browser to register the download stream, then close the tab
            setTimeout(() => {
              window.close();
            }, 10000);
          })();
        `;
        downloadWin.document.body.appendChild(script);
        toast.success('Download started!', { id: toastId });
      } else {
        downloadWin.close();
        toast.error(formatErrorMessage(data.error || 'Download failed'), { id: toastId });
      }
    } catch (err: unknown) {
      downloadWin.close();
      toast.error('Download failed. Please try again.', { id: toastId });
      console.error(err);
    } finally {
      setDownloadingQuality(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <UrlInput
        url={url}
        setUrl={setUrl}
        loading={loading}
        onPaste={handlePaste}
        onClear={handleClear}
        onSubmit={handleGetInfo}
        inputRef={inputRef}
      />

      {progress > 0 && (
        <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-brand-orange"
          />
        </div>
      )}

      {info && info.success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group mt-6"
        >
          {/* Decorative gradient glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/10 via-emerald-500/10 to-green-400/10 rounded-[2rem] blur-xl opacity-20 transition duration-1000"></div>

          <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
            <div className="flex items-center gap-3 text-sm font-bold text-emerald-600 bg-emerald-50 w-fit px-4 py-1.5 rounded-full border border-emerald-100">
              <CheckCircle2 size={16} />
              Media processed successfully
            </div>

            <MediaDisplay info={info} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => {
                  const bestFormat = info.formats
                    ?.filter((f) => f.height || f.url)
                    .sort((a, b) => (b.height || 0) - (a.height || 0))[0];
                  
                  if (bestFormat) {
                    handleDownload(bestFormat.height || 720, bestFormat.quality);
                  } else if (info.type === 'image' || info.type === 'gallery') {
                    const imgUrl = info.images?.[0]?.url || info.thumbnail || info.externalUrl;
                    if (imgUrl) window.open(imgUrl, '_blank');
                  } else {
                    handleDownload(720, '720p');
                  }
                }}
                disabled={downloadingQuality !== null}
                className="relative overflow-hidden flex items-center justify-center gap-3 py-5 px-8 bg-brand-orange text-white rounded-2xl font-bold text-xl hover:bg-brand-orange-dark transition-all shadow-xl shadow-brand-orange/20 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 group/dl"
              >
                {downloadingQuality ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <Download size={24} className="group-hover/dl:translate-y-1 transition-transform" />
                )}
                <span>{downloadingQuality ? 'Processing...' : 'Download Video'}</span>
                
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/dl:translate-x-full transition-transform duration-1000"></div>
              </button>

              <button
                onClick={handleClear}
                className="flex items-center justify-center gap-3 py-5 px-8 bg-slate-50 text-slate-600 rounded-2xl font-bold text-xl hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-200 active:scale-[0.98]"
              >
                <RotateCcw size={24} className="hover:rotate-180 transition-transform duration-500" />
                <span>Download Another</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {info && !info.success && info.error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-5 mt-4"
        >
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-red-900">{formatErrorMessage(info.error)}</p>
            <p className="text-sm text-red-700/80 mt-0.5">Please check the URL and try again.</p>
          </div>
          <button
            onClick={handleClear}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm font-bold transition-colors"
          >
            <RotateCcw size={14} />
            Retry
          </button>
        </motion.div>
      )}

      <p className="text-xs text-center text-slate-400 font-medium pt-4">
        By using this service you accept our{' '}
        <a href="/legal/terms-of-service" className="underline hover:text-brand-orange">Terms</a>
        {' '}and{' '}
        <a href="/legal/privacy-policy" className="underline hover:text-brand-orange">Privacy Policy</a>.
      </p>
    </div>
  );
}
