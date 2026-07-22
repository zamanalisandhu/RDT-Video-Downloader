/**
 * RDT Video Downloader - Downloader Logic Script
 * Direct integration with Cloudflare Worker Backend.
 */

(function() {
    const API_BASE = "https://rdtapidownload.techiesline.workers.dev";
    let currentInfo = null;
    let currentUrl = "";

    function isValidRedditUrl(url) {
        if (!url || typeof url !== 'string') return false;
        const patterns = [
            /^https?:\/\/(www\.|old\.|m\.|np\.)?reddit\.com\//i,
            /^https?:\/\/redd\.it\//i,
            /^https?:\/\/v\.redd\.it\//i
        ];
        return patterns.some(pattern => pattern.test(url.trim()));
    }

    function formatErrorMessage(error) {
        if (!error) return 'Something went wrong';
        const errorMap = {
            'Invalid Reddit URL': 'Please enter a valid Reddit URL',
            'Post not found': 'This post was deleted or is private',
            'No video found': 'No video found in this post',
            'Rate limit exceeded': 'Too many requests. Please wait a moment.',
            'Request timed out': 'Connection timed out. Try again.'
        };
        for (const [key, message] of Object.entries(errorMap)) {
            if (error.includes(key)) return message;
        }
        return error;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("rdt-form");
        const input = document.getElementById("rdt-url-input");
        const pasteBtn = document.getElementById("rdt-paste-btn");
        const clearBtn = document.getElementById("rdt-clear-btn");
        const fetchBtn = document.getElementById("rdt-fetch-btn");
        const loader = document.getElementById("rdt-loader");
        const errorDiv = document.getElementById("rdt-error");
        const errorMsg = document.getElementById("rdt-error-msg");
        const resultDiv = document.getElementById("rdt-result");
        const stepsContainer = document.getElementById("rdt-steps-container");

        if (!input || !fetchBtn) return;

        // Form submit handler
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                handleGetInfo();
            });
        }

        input.addEventListener("input", () => {
            if (input.value.trim().length > 0) {
                if (clearBtn) clearBtn.style.display = "flex";
                if (pasteBtn) pasteBtn.style.display = "none";
            } else {
                if (clearBtn) clearBtn.style.display = "none";
                if (pasteBtn) pasteBtn.style.display = "flex";
            }
        });

        if (clearBtn) {
            clearBtn.addEventListener("click", () => {
                input.value = "";
                clearBtn.style.display = "none";
                if (pasteBtn) pasteBtn.style.display = "flex";
                resultDiv.style.display = "none";
                errorDiv.style.display = "none";
                stepsContainer.style.display = "none";
                currentInfo = null;
                input.focus();
            });
        }

        if (pasteBtn) {
            pasteBtn.addEventListener("click", async () => {
                try {
                    const text = await navigator.clipboard.readText();
                    if (!text) {
                        showToast("Clipboard is empty", "error");
                        return;
                    }
                    input.value = text;
                    if (clearBtn) clearBtn.style.display = "flex";
                    pasteBtn.style.display = "none";
                    showToast("Link pasted!", "success");
                } catch (err) {
                    showToast("Could not access clipboard", "error");
                }
            });
        }

        async function handleGetInfo() {
            const url = input.value.trim();
            if (!url) {
                showToast("Please enter a Reddit URL", "error");
                return;
            }
            if (!isValidRedditUrl(url)) {
                showToast("Please enter a valid Reddit URL", "error");
                return;
            }

            currentUrl = url;
            hideError();
            resultDiv.style.display = "none";
            stepsContainer.style.display = "none";
            loader.style.display = "block";
            fetchBtn.disabled = true;
            fetchBtn.innerHTML = `
                <svg class="animate-spin text-white w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span class="text-sm font-bold">Fetching...</span>
            `;

            try {
                const response = await fetch(`${API_BASE}/api/video-info`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: url, platform: "reddit", audioOnly: false })
                });

                const data = await response.json();
                loader.style.display = "none";
                fetchBtn.disabled = false;
                fetchBtn.innerHTML = `
                    <svg class="w-[15px] h-[15px] text-white/95 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L13 21l-2.286-6.857L5 12l5.714-2.286L13 3z"/></svg>
                    <span class="text-sm font-bold">Get Video</span>
                `;

                if (!data.success) {
                    showError(formatErrorMessage(data.error || "Failed to fetch post"));
                    return;
                }

                currentInfo = data;
                renderResult(data);
                showToast("Content found!", "success");
            } catch (err) {
                loader.style.display = "none";
                fetchBtn.disabled = false;
                fetchBtn.innerHTML = `
                    <svg class="w-[15px] h-[15px] text-white/95 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L13 21l-2.286-6.857L5 12l5.714-2.286L13 3z"/></svg>
                    <span class="text-sm font-bold">Get Video</span>
                `;
                showError("Network error. Please try again.");
            }
        }

        function showError(msg) {
            if (errorMsg && errorDiv) {
                errorMsg.textContent = msg;
                errorDiv.style.display = "flex";
            }
        }

        function hideError() {
            if (errorDiv) errorDiv.style.display = "none";
        }

        function renderResult(data) {
            let html = `
                <div class="relative group mt-6">
                    <!-- Decorative gradient glow -->
                    <div class="absolute -inset-1 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-emerald-500/5 rounded-[2rem] blur-xl opacity-30 pointer-events-none"></div>

                    <div class="relative bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6">
                        <div class="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 bg-emerald-50/70 w-fit px-3 py-1.5 rounded-full border border-emerald-100">
                            <svg class="text-emerald-500 w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span>Media ready to download</span>
                        </div>

                        <!-- Media Display details -->
                        <div class="flex items-start gap-3 text-left">
            `;

            const isGenericLogo = data.thumbnail && (
                data.thumbnail.includes('redditstatic.com') ||
                data.thumbnail.includes('reddit.com/static') ||
                data.thumbnail.includes('no_thumbnail') ||
                data.thumbnail.includes('redditLogo') ||
                data.thumbnail === 'default' ||
                data.thumbnail === 'self' ||
                data.thumbnail === 'nsfw' ||
                data.thumbnail === 'image' ||
                !data.thumbnail.startsWith('http')
            );

            if (data.thumbnail && !isGenericLogo) {
                html += `
                    <div class="shrink-0 w-20 h-14 sm:w-28 sm:h-[4.5rem] relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <img src="${data.thumbnail}" alt="Thumbnail" class="w-full h-full object-cover" />
                    </div>
                `;
            } else {
                html += `
                    <div class="shrink-0 w-20 h-14 sm:w-28 sm:h-[4.5rem] relative rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400">
                        <svg class="w-5 h-5 text-slate-400/80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                `;
            }

            html += `
                            <div class="flex-1 min-w-0">
                                <p class="text-[13px] sm:text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
                                    ${data.title || 'Reddit Video'}
                                </p>
                                <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                                    <span class="text-[11px] text-slate-400 font-medium">u/${data.author || 'unknown'}</span>
                                    <span class="text-[11px] text-slate-300">·</span>
                                    <span class="text-[11px] text-slate-400 font-medium">r/${data.subreddit || 'reddit'}</span>
                                    ${data.duration ? `
                                        <span class="text-[11px] text-slate-300">·</span>
                                        <span class="text-[11px] text-slate-400 font-medium">${data.duration}s</span>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
            `;

            if (data.type === 'video' || data.type === 'audio') {
                html += `
                    <!-- Multiple Video Formats Selection -->
                    <div class="space-y-3 border-t border-slate-100 pt-4 text-left">
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">All Available Qualities</h4>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                `;

                if (data.formats && data.formats.length > 0) {
                    data.formats.forEach(f => {
                        const isAudio = f.quality.includes('audio');
                        const qualityLabel = isAudio ? 'Audio Only (MP3/M4A)' : `${f.quality} HD (MP4)`;
                        
                        html += `
                            <button type="button" 
                                    onclick="triggerDownload('${f.quality}', ${isAudio}, '${qualityLabel}')"
                                    class="flex items-center justify-center gap-2 px-3.5 py-3 bg-slate-50 hover:bg-brand-orange/5 border border-slate-200/60 hover:border-brand-orange/30 text-slate-700 hover:text-brand-orange rounded-xl text-xs font-bold transition-all disabled:opacity-50">
                                <svg class="w-[12px] h-[12px] text-slate-400 group-hover:text-brand-orange transition-colors" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                <span>${f.quality}</span>
                            </button>
                        `;
                    });
                } else {
                    html += `<p class="text-sm text-slate-500">No formats found.</p>`;
                }

                html += `
                        </div>
                    </div>
                `;
            } else if (data.type === 'gallery' && data.images && data.images.length > 0) {
                html += `
                    <!-- Gallery Image Grid -->
                    <div class="space-y-3 border-t border-slate-100 pt-4 text-left">
                        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Gallery Images (${data.images.length})</h4>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                `;

                data.images.forEach((img, idx) => {
                    html += `
                        <div class="relative group/img bg-slate-50 border border-slate-100 rounded-xl overflow-hidden aspect-square">
                            <img src="${img.url}" alt="Gallery image ${idx + 1}" class="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105" loading="lazy" referrerPolicy="no-referrer" />
                            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-2">
                                <a href="${img.url}" target="_blank" download="image_${idx + 1}.jpg" class="px-3 py-1.5 bg-white text-slate-900 rounded-lg text-[11px] font-bold shadow-md hover:bg-slate-100 transition-all flex items-center gap-1">
                                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                    <span>Download</span>
                                </a>
                            </div>
                        </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            } else {
                const finalUrl = data.externalUrl || data.formats?.[0]?.url || currentUrl;
                html += `
                    <div class="space-y-4 pt-4 border-t border-slate-100">
                        <a href="${finalUrl}" target="_blank" rel="noopener"
                           class="w-full py-4 bg-brand-orange text-white text-center font-extrabold rounded-xl shadow-md shadow-brand-orange/15 flex items-center justify-center gap-2 text-sm active:scale-[0.98] transition-transform">
                            <span>Download Media File</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        </a>
                    </div>
                `;
            }

            html += `
                    </div>
                </div>
            `;
            resultDiv.innerHTML = html;
            resultDiv.style.display = "block";
        }
    });

    window.triggerDownload = async function(quality, isAudio, label) {
        const stepsContainer = document.getElementById("rdt-steps-container");
        const stepText2 = document.getElementById("rdt-step-2-text");
        const stepStatus2 = document.getElementById("rdt-step-2-status");
        const progressBar = document.getElementById("rdt-progress-bar");
        const progressFill = document.getElementById("rdt-progress-fill");

        stepsContainer.style.display = "block";
        stepText2.textContent = isAudio ? "2. Extracting Audio Stream" : "2. Extracting Video & Audio Streams";
        stepStatus2.innerHTML = '<span class="text-brand-orange animate-pulse flex items-center gap-1"><svg class="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> In Progress...</span>';
        progressBar.style.display = "block";
        progressFill.style.width = "0%";

        let p = 0;
        const progressInterval = setInterval(() => {
            p += Math.floor(Math.random() * 8) + 4;
            if (p >= 98) {
                p = 98;
                clearInterval(progressInterval);
            }
            progressFill.style.width = `${p}%`;
        }, 150);

        try {
            const response = await fetch(`${API_BASE}/api/download`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: currentUrl.trim(),
                    quality: quality,
                    ext: "mp4",
                    audioOnly: isAudio
                })
            });

            const data = await response.json();
            clearInterval(progressInterval);

            if (data.success && data.downloadUrl) {
                progressFill.style.width = "100%";
                stepStatus2.innerHTML = '<span class="text-emerald-500 flex items-center gap-1 font-bold"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Done</span>';
                
                const fileName = currentInfo?.title 
                    ? `rdtvideodownloader.com_${currentInfo.title.slice(0, 50).replace(/[^a-z0-9]/gi, '_')}.${isAudio ? 'mp3' : 'mp4'}`
                    : `rdtvideodownloader.com_file_${Date.now()}.${isAudio ? 'mp3' : 'mp4'}`;

                // Trigger file download using a dynamic anchor element
                const a = document.createElement('a');
                a.href = data.downloadUrl + "&filename=" + encodeURIComponent(fileName);
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                
                setTimeout(() => {
                    a.remove();
                    stepsContainer.style.display = "none";
                }, 4000);
                
                showToast('Download started!', 'success');
            } else {
                stepStatus2.innerHTML = '<span class="text-rose-500 font-bold">Failed</span>';
                showToast(data.error || 'Download failed', 'error');
            }
        } catch (err) {
            clearInterval(progressInterval);
            stepStatus2.innerHTML = '<span class="text-rose-500 font-bold">Failed</span>';
            showToast('Download failed. Please try again.', 'error');
        }
    }

    function showToast(msg, type = "success") {
        const existing = document.getElementById("rdt-toast");
        if (existing) existing.remove();

        const toast = document.createElement("div");
        toast.id = "rdt-toast";
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.padding = "12px 20px";
        toast.style.borderRadius = "10px";
        toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        toast.style.fontSize = "14px";
        toast.style.fontWeight = "bold";
        toast.style.zIndex = "9999";
        toast.style.transition = "all 0.3s ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";

        if (type === "success") {
            toast.style.background = "#059669";
            toast.style.color = "#ffffff";
        } else {
            toast.style.background = "#dc2626";
            toast.style.color = "#ffffff";
        }

        toast.textContent = msg;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        }, 50);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
})();
