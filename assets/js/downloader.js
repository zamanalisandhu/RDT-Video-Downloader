/**
 * RDT Video Downloader - Downloader Logic Script
 * Direct integration with Cloudflare Worker Backend.
 */

(function() {
    const API_ENDPOINT = "/api/video-info";
    
    let currentInfo = null;
    let currentUrl = "";

    function isValidRedditUrl(url) {
        if (!url || typeof url !== 'string') return false;
        if (url.includes("permalink=http")) return true;
        const patterns = [
            /^https?:\/\/(www\.|old\.|m\.|np\.)?reddit\.com\//i,
            /^https?:\/\/redd\.it\//i,
            /^https?:\/\/v\.redd\.it\//i
        ];
        return patterns.some(pattern => pattern.test(url.trim()));
    }

    function extractRedditUrl(url) {
        if (!url || typeof url !== 'string') return url;
        try {
            const parsed = new URL(url.trim());
            if (parsed.searchParams.has("permalink")) {
                const permalink = parsed.searchParams.get("permalink");
                if (isValidRedditUrl(permalink)) {
                    return permalink;
                }
            }
        } catch (_) {
            return url;
        }
        return url;
    }

    function formatDuration(secondsStr) {
        const seconds = parseInt(secondsStr, 10);
        if (isNaN(seconds) || seconds < 0) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
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
        const input = document.getElementById("reddit-url");
        const clearBtn = document.getElementById("clear-btn");
        const fetchBtn = document.getElementById("fetch-btn");
        const loader = document.getElementById("loader");
        const errorCard = document.getElementById("error-card");
        const errorText = document.getElementById("error-text");
        const resultBox = document.getElementById("result-box");
        const mediaThumb = document.getElementById("media-thumb");
        const mediaTitle = document.getElementById("media-title");
        const qualitiesBlock = document.getElementById("qualities-block");
        const qualitiesGrid = document.getElementById("qualities-grid");
        const singleMediaBlock = document.getElementById("single-media-block");
        const singleMediaLink = document.getElementById("single-media-link");
        const bestDlBtn = document.getElementById("best-dl-btn");
        const resetBtn = document.getElementById("reset-btn");
        const toast = document.getElementById("toast");

        if (!input || !fetchBtn) return;

        function showToast(msg, type = "success") {
            if (!toast) return;
            toast.textContent = msg;
            toast.style.background = type === "success" ? "#10B981" : (type === "error" ? "#EF4444" : "#4B5563");
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
            toast.style.pointerEvents = "auto";
            setTimeout(() => {
                toast.style.opacity = "0";
                toast.style.transform = "translateY(20px)";
                toast.style.pointerEvents = "none";
            }, 3000);
        }

        function decodeHTMLEntities(text) {
            if (!text) return "";
            const txt = document.createElement("textarea");
            txt.innerHTML = text;
            return txt.value;
        }

        const pasteBtn = document.getElementById("paste-btn");

        input.addEventListener("input", () => {
            const hasText = input.value.trim().length > 0;
            if (clearBtn) clearBtn.style.display = hasText ? "block" : "none";
            if (pasteBtn) pasteBtn.style.display = hasText ? "none" : "flex";
            if (errorCard) errorCard.style.display = "none";
        });

        if (pasteBtn) {
            pasteBtn.addEventListener("click", async () => {
                try {
                    const text = await navigator.clipboard.readText();
                    if (text) {
                        input.value = text;
                        if (clearBtn) clearBtn.style.display = "block";
                        if (pasteBtn) pasteBtn.style.display = "none";
                        input.focus();
                        showToast("Pasted from clipboard!", "success");
                    } else {
                        showToast("Clipboard is empty.", "info");
                    }
                } catch (err) {
                    showToast("Paste permission denied. Please paste manually.", "error");
                }
            });
        }

        function resetDownloader() {
            input.value = "";
            if (clearBtn) clearBtn.style.display = "none";
            if (pasteBtn) pasteBtn.style.display = "flex";
            if (resultBox) resultBox.style.display = "none";
            if (errorCard) errorCard.style.display = "none";
            currentInfo = null;
            currentUrl = "";
            input.focus();
        }

        if (clearBtn) clearBtn.addEventListener("click", resetDownloader);
        if (resetBtn) resetBtn.addEventListener("click", resetDownloader);

        fetchBtn.addEventListener("click", async () => {
            let url = input.value.trim();
            if (!url) {
                if (errorText) errorText.textContent = "Please paste a Reddit link first.";
                if (errorCard) errorCard.style.display = "flex";
                return;
            }
            if (!isValidRedditUrl(url)) {
                if (errorText) errorText.textContent = "Please enter a valid Reddit URL.";
                if (errorCard) errorCard.style.display = "flex";
                return;
            }
            url = extractRedditUrl(url);

            if (errorCard) errorCard.style.display = "none";
            if (resultBox) resultBox.style.display = "none";
            if (loader) loader.style.display = "flex";
            fetchBtn.disabled = true;
            fetchBtn.innerHTML = `
                <svg class="animate-spin text-white w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Fetching...</span>
            `;

            try {
                const response = await fetch(API_ENDPOINT, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Accept": "application/json" },
                    body: JSON.stringify({ url: url, action: "info", platform: "reddit", audioOnly: false })
                });

                const data = await response.json();
                if (loader) loader.style.display = "none";
                fetchBtn.disabled = false;
                fetchBtn.innerHTML = `
                    <span>Get Video</span>
                    <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                `;

                if (!data.success) {
                    if (errorText) errorText.textContent = formatErrorMessage(data.error || "Failed to fetch post.");
                    if (errorCard) errorCard.style.display = "flex";
                    return;
                }

                currentInfo = data;
                currentUrl = url;
                renderResult(data);
                showToast("Video info loaded!", "success");
            } catch (err) {
                if (loader) loader.style.display = "none";
                fetchBtn.disabled = false;
                fetchBtn.innerHTML = `
                    <span>Get Video</span>
                    <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                `;
                if (errorText) errorText.textContent = "Network error. Please try again.";
                if (errorCard) errorCard.style.display = "flex";
            }
        });

        function renderResult(data) {
            const mediaMeta = document.getElementById("media-meta");
            const mediaSubreddit = document.getElementById("media-subreddit");
            
            if (mediaTitle) mediaTitle.textContent = decodeHTMLEntities(data.title || "Reddit Post");
            if (mediaMeta) mediaMeta.textContent = data.author ? `u/${data.author}` : "Reddit Post";
            
            if (mediaSubreddit) {
                if (data.subreddit) {
                    mediaSubreddit.textContent = `r/${data.subreddit}`;
                    mediaSubreddit.style.display = "inline";
                } else if (currentUrl && currentUrl.includes("/r/")) {
                    try {
                        const parts = currentUrl.split("/r/");
                        if (parts.length > 1) {
                            const subName = parts[1].split("/")[0];
                            mediaSubreddit.textContent = `r/${subName}`;
                            mediaSubreddit.style.display = "inline";
                        } else {
                            mediaSubreddit.style.display = "none";
                        }
                    } catch (_) {
                        mediaSubreddit.style.display = "none";
                    }
                } else {
                    mediaSubreddit.style.display = "none";
                }
            }

            if (mediaThumb) {
                mediaThumb.src = data.thumbnail || "";
                mediaThumb.style.display = data.thumbnail ? "block" : "none";
            }

            const durationBadge = document.getElementById("duration-badge");
            if (durationBadge) {
                if (data.duration) {
                    durationBadge.textContent = formatDuration(data.duration);
                    durationBadge.style.display = "block";
                } else {
                    durationBadge.style.display = "none";
                }
            }

            if (qualitiesGrid) qualitiesGrid.innerHTML = "";
            if (qualitiesBlock) qualitiesBlock.style.display = "none";
            if (singleMediaBlock) singleMediaBlock.style.display = "none";

            const domain = (window.location.hostname && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
                ? window.location.hostname
                : "rdtvideodownloader.com";

            if (data.formats && data.formats.length > 0) {
                if (qualitiesBlock) qualitiesBlock.style.display = "block";
                
                data.formats.forEach(f => {
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.className = "rdt-quality-btn";
                    btn.innerHTML = `
                        <svg style="width: 14px; height: 14px; display: block;" class="text-slate-400 group-hover:text-brand-orange" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        <span>${f.quality}</span>
                    `;
                    const isAudio = f.quality.includes('audio');
                    btn.onclick = () => triggerDownload(f.download_url, isAudio);
                    if (qualitiesGrid) qualitiesGrid.appendChild(btn);
                });

                // Best quality
                const sortedFormats = [...data.formats].sort((a, b) => {
                    const heightA = parseInt(a.height) || 0;
                    const heightB = parseInt(b.height) || 0;
                    return heightB - heightA;
                });
                const bestFormatObj = sortedFormats[0];
                
                if (bestFormatObj) {
                    if (bestDlBtn) {
                        bestDlBtn.style.display = "flex";
                        const bestIsAudio = bestFormatObj.quality ? bestFormatObj.quality.includes('audio') : false;
                        bestDlBtn.onclick = () => triggerDownload(bestFormatObj.download_url, bestIsAudio);
                    }
                } else {
                    if (bestDlBtn) bestDlBtn.style.display = "none";
                }
            } else {
                if (singleMediaBlock) singleMediaBlock.style.display = "block";
                if (bestDlBtn) bestDlBtn.style.display = "none";
                const finalUrl = data.externalUrl || data.url || currentUrl;
                if (singleMediaLink) {
                    singleMediaLink.onclick = (e) => {
                        e.preventDefault();
                        triggerDownload(finalUrl, false);
                    };
                }
            }

            if (resultBox) resultBox.style.display = "block";
        }

        let progressInterval = null;

        // --- DIRECT DOWNLOAD ACTION via API Proxy (matching Extension behavior) ---
        function triggerDownload(rawDownloadUrl, isAudio = false) {
            if (!rawDownloadUrl) {
                showToast("Download URL is missing.", "error");
                return;
            }

            const domain = (window.location.hostname && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
                ? window.location.hostname
                : "rdtvideodownloader.com";
            
            const titleSlug = currentInfo?.title 
                ? currentInfo.title.slice(0, 50).replace(/[^a-z0-9]/gi, '_').toLowerCase() 
                : 'reddit_file';
            const extension = isAudio ? 'mp3' : 'mp4';
            const fileName = `${domain}_${titleSlug}.${extension}`;

            // Ensure proper proxy URL with filename attached (matching Chrome extension logic)
            let directDownloadUrl = rawDownloadUrl;
            if (!directDownloadUrl.startsWith("https://rdtapidownload.techiesline.workers.dev")) {
                directDownloadUrl = "https://rdtapidownload.techiesline.workers.dev?download=" + encodeURIComponent(rawDownloadUrl);
            }
            if (!directDownloadUrl.includes("filename=")) {
                directDownloadUrl += (directDownloadUrl.includes("?") ? "&" : "?") + "filename=" + encodeURIComponent(fileName);
            }

            // Show and animate progress bar
            const progressBar = document.getElementById("download-progress-bar");
            const progressFill = document.getElementById("download-progress-fill");
            if (progressBar && progressFill) {
                progressBar.style.display = "block";
                progressFill.style.width = "0%";
                
                let width = 0;
                if (progressInterval) clearInterval(progressInterval);
                progressInterval = setInterval(() => {
                    if (width < 95) {
                        width += Math.random() * 20 + 10;
                        if (width > 95) width = 95;
                        progressFill.style.width = `${width}%`;
                    }
                }, 50);
            }

            showToast("Starting download...", "info");

            setTimeout(() => {
                if (progressInterval) clearInterval(progressInterval);
                if (progressFill) progressFill.style.width = "100%";
                
                setTimeout(() => {
                    if (progressBar) progressBar.style.display = "none";
                }, 500);

                // Trigger file download directly without failing on CORS HEAD preflight
                try {
                    const a = document.createElement("a");
                    a.href = directDownloadUrl;
                    a.setAttribute("download", fileName);
                    a.setAttribute("target", "_blank");
                    a.rel = "noopener noreferrer";
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        if (a.parentNode) a.parentNode.removeChild(a);
                    }, 200);
                } catch (e) {
                    window.location.href = directDownloadUrl;
                }

                showToast("Download started!", "success");
            }, 250);
        }

        window.triggerDownload = triggerDownload;
    });
})();
