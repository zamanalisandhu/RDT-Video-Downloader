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
  const [currentStep, setCurrentStep] = useState<'idle' | 'analyzing' | 'downloading' | 'muxing' | 'done'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleGetInfo = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) { toast.error('Please paste a Reddit URL'); return; }
    if (!isValidRedditUrl(trimmedUrl)) { toast.error('Please enter a valid Reddit URL'); return; }

    setLoading(true);
    setInfo(null);
    setCurrentStep('analyzing');

    try {
      const data = await fetchVideoInfo(trimmedUrl);
      if (!data.success) {
        toast.error(formatErrorMessage(data.error || 'Failed to fetch video'));
        setInfo(data);
        setCurrentStep('idle');
        return;
      }

      setInfo(data);
      toast.success('Video found! Choose your quality below.');
      setCurrentStep('idle');
    } catch (err: unknown) {
      toast.error('Network error. Please try again.');
      setInfo({
        success: false,
        error: err instanceof Error ? err.message : 'Network error',
      });
      console.error(err);
      setCurrentStep('idle');
    } finally {
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
    setCurrentStep('downloading');
    setDownloadProgress(0);

    // Animate progress smoothly
    let p = 0;
    const progressInterval = setInterval(() => {
      p += Math.floor(Math.random() * 8) + 4; // increment 4 to 12%
      if (p >= 100) {
        p = 100;
        clearInterval(progressInterval);
        setCurrentStep('muxing');
      }
      setDownloadProgress(p);
    }, 150);

    const toastId = toast.loading('Processing download...');

    try {
      const data = await getDownloadUrl(url.trim(), quality);

      if (data.success && data.downloadUrl) {
        clearInterval(progressInterval);
        setDownloadProgress(100);

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

        const script = downloadWin.document.createElement('script');
        script.textContent = `
          (function() {
            // data.downloadUrl is already the Worker's proxy URL
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = "${data.downloadUrl}" + "&filename=" + encodeURIComponent("${fileName}");
            document.body.appendChild(iframe);
            
            // Wait 10 seconds for the browser to register the download stream, then close the tab
            setTimeout(() => {
              window.close();
            }, 10000);
          })();
        `;
        downloadWin.document.body.appendChild(script);
        toast.success('Download started!', { id: toastId });
        setCurrentStep('done');
        setTimeout(() => setCurrentStep('idle'), 3000);
      } else {
        clearInterval(progressInterval);
        downloadWin.close();
        toast.error(formatErrorMessage(data.error || 'Download failed'), { id: toastId });
        setCurrentStep('idle');
      }
    } catch (err: unknown) {
      clearInterval(progressInterval);
      downloadWin.close();
      toast.error('Download failed. Please try again.', { id: toastId });
      console.error(err);
      setCurrentStep('idle');
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

      {currentStep !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_4px_16px_rgb(0,0,0,0.01)] space-y-4 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 border-b border-slate-50 pb-2.5">
            <Loader2 className="animate-spin text-brand-orange shrink-0" size={16} />
            <span>Download Progress</span>
          </div>
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
              <span className={`${currentStep === 'analyzing' ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                1. Fetching Reddit Metadata
              </span>
              <span>
                {currentStep === 'analyzing' ? (
                  <span className="text-brand-orange animate-pulse flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> In Progress...</span>
                ) : (
                  <span className="text-emerald-500 flex items-center gap-1 font-bold"><CheckCircle2 size={14} className="fill-emerald-50" /> Done</span>
                )}
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className={`${
                  currentStep === 'downloading' 
                    ? 'text-slate-900 font-bold' 
                    : currentStep === 'analyzing' 
                      ? 'text-slate-400 font-medium' 
                      : 'text-slate-500'
                }`}>
                  2. Extracting Video & Audio Streams
                </span>
                <span>
                  {currentStep === 'analyzing' ? (
                    <span className="text-slate-400 font-medium">Waiting...</span>
                  ) : currentStep === 'downloading' ? (
                    <span className="text-brand-orange font-bold">{downloadProgress}%</span>
                  ) : (
                    <span className="text-emerald-500 flex items-center gap-1 font-bold"><CheckCircle2 size={14} className="fill-emerald-50" /> Done</span>
                  )}
                </span>
              </div>
              {currentStep === 'downloading' && (
                <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden w-full">
                  <div 
                    className="h-full bg-brand-orange transition-all duration-100 rounded-full" 
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
              <span className={`${
                currentStep === 'muxing' 
                  ? 'text-slate-900 font-bold' 
                  : currentStep === 'done'
                    ? 'text-slate-500'
                    : 'text-slate-400 font-medium'
              }`}>
                3. Muxing streams into HD MP4
              </span>
              <span>
                {currentStep === 'done' ? (
                  <span className="text-emerald-500 flex items-center gap-1 font-bold"><CheckCircle2 size={14} className="fill-emerald-50" /> Done</span>
                ) : currentStep === 'muxing' ? (
                  <span className="text-brand-orange flex items-center gap-1.5 font-bold"><Loader2 size={14} className="animate-spin" /> Processing...</span>
                ) : (
                  <span className="text-slate-400 font-medium">Waiting...</span>
                )}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {info && info.success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group mt-6"
        >
          {/* Decorative gradient glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-emerald-500/5 rounded-[2rem] blur-xl opacity-30 pointer-events-none"></div>

          <div className="relative bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 bg-emerald-50/70 w-fit px-3 py-1.5 rounded-full border border-emerald-100">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Media ready to download</span>
            </div>

            <MediaDisplay info={info} />

            {/* Gallery Image Grid */}
            {info.type === 'gallery' && info.images && info.images.length > 0 && (
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left">Gallery Images ({info.images.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {info.images.map((img, idx) => (
                    <div key={idx} className="relative group/img bg-slate-50 border border-slate-100 rounded-xl overflow-hidden aspect-square">
                      <img 
                        src={img.url} 
                        alt={`Gallery image ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-2">
                        <a 
                          href={img.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-white text-slate-900 rounded-lg text-[11px] font-bold shadow-md hover:bg-slate-100 transition-all flex items-center gap-1"
                        >
                          <Download size={10} />
                          <span>View</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Multiple Video Formats Selection */}
            {info.formats && info.formats.length > 1 && (
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left">All Available Qualities</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {info.formats
                    .filter((f) => f.quality)
                    .map((format) => {
                      const isDownloading = downloadingQuality === format.quality;
                      return (
                        <button
                          key={format.quality}
                          onClick={() => handleDownload(format.height || 720, format.quality)}
                          disabled={downloadingQuality !== null}
                          className="flex items-center justify-center gap-2 px-3.5 py-3 bg-slate-50 hover:bg-brand-orange/5 border border-slate-200/60 hover:border-brand-orange/30 text-slate-700 hover:text-brand-orange rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                        >
                          {isDownloading ? (
                            <Loader2 className="animate-spin text-brand-orange" size={12} />
                          ) : (
                            <Download size={12} className="text-slate-400 group-hover:text-brand-orange transition-colors" />
                          )}
                          <span>{format.quality}</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
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
                className="relative overflow-hidden flex items-center justify-center gap-2.5 py-4 px-8 bg-brand-orange text-white rounded-xl font-extrabold text-base hover:bg-brand-orange-light transition-all shadow-md shadow-brand-orange/15 hover:shadow-brand-orange/25 active:scale-[0.98] disabled:opacity-75 disabled:active:scale-100 group/dl"
              >
                {downloadingQuality ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Download size={18} className="group-hover/dl:translate-y-0.5 transition-transform" />
                )}
                <span>
                  {downloadingQuality 
                    ? 'Processing...' 
                    : info.type === 'image' 
                      ? 'Download Image' 
                      : info.type === 'gallery'
                        ? 'Download Main Image'
                        : 'Download Best Quality'}
                </span>
                
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/dl:translate-x-full transition-transform duration-1000"></div>
              </button>

              <button
                onClick={handleClear}
                className="flex items-center justify-center gap-2.5 py-4 px-8 bg-slate-50 text-slate-600 rounded-xl font-bold text-base hover:bg-slate-100 hover:text-slate-800 transition-all border border-slate-200/60 active:scale-[0.98]"
              >
                <RotateCcw size={18} className="hover:rotate-180 transition-transform duration-500" />
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
