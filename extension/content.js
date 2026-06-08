/* ============================================================================
 * RDT Video Downloader — Content Script
 * Adds a download button below each Reddit video post
 * Works with Modern Reddit (shreddit), New Reddit, Old Reddit
 * ========================================================================= */

(() => {
  'use strict';

  const API_BASE = 'https://rdtapidownload.techiesline.workers.dev';
  const PROCESSED_ATTR = 'data-rdt-dl-processed';

  // ── Helpers ──────────────────────────────────────────────────────────────

  function getPostUrl(post) {
    // shreddit-post
    const permalink = post.getAttribute('permalink');
    if (permalink) return `https://www.reddit.com${permalink}`;

    const contentHref = post.getAttribute('content-href');
    if (contentHref) return contentHref;

    // data-permalink (old reddit)
    const dp = post.getAttribute('data-permalink');
    if (dp) return `https://www.reddit.com${dp}`;

    // Search for /comments/ links
    const link = post.querySelector('a[href*="/comments/"]');
    if (link) {
      const href = link.getAttribute('href');
      return href.startsWith('http') ? href : `https://www.reddit.com${href}`;
    }

    return null;
  }

  // ── Create Download Bar ─────────────────────────────────────────────────

  function createDownloadBar(postUrl) {
    const bar = document.createElement('div');
    bar.className = 'rdt-dl-bar';

    const btn = document.createElement('button');
    btn.className = 'rdt-dl-btn';
    btn.setAttribute('data-url', postUrl);

    btn.innerHTML = `
      <svg class="rdt-dl-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      <span class="rdt-dl-text">Download Video</span>
    `;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleDownload(btn, postUrl);
    });

    bar.appendChild(btn);
    return bar;
  }

  // ── Download Logic ─────────────────────────────────────────────────────

  async function handleDownload(btn, postUrl) {
    if (btn.classList.contains('rdt-dl-loading')) return;
    btn.classList.add('rdt-dl-loading');
    btn.classList.remove('rdt-dl-success', 'rdt-dl-error');
    btn.querySelector('.rdt-dl-text').textContent = 'Fetching video...';

    try {
      const infoRes = await fetch(`${API_BASE}/api/video-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ url: postUrl, platform: 'reddit', audioOnly: false }),
      });

      if (!infoRes.ok) throw new Error(`API error: ${infoRes.status}`);
      const info = await infoRes.json();
      if (!info.success) throw new Error(info.error || 'Could not fetch video info');

      btn.querySelector('.rdt-dl-text').textContent = 'Processing...';

      let quality = 720;
      if (info.formats && info.formats.length > 0) {
        const sorted = info.formats.filter(f => f.height).sort((a, b) => (b.height || 0) - (a.height || 0));
        if (sorted.length > 0) quality = sorted[0].height;
      }

      if (info.type === 'image' || info.type === 'gallery') {
        const imgUrl = info.images?.[0]?.url || info.thumbnail || info.externalUrl;
        if (imgUrl) {
          window.open(imgUrl, '_blank');
          showSuccess(btn);
          return;
        }
      }

      const dlRes = await fetch(`${API_BASE}/api/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ url: postUrl, quality, ext: 'mp4', audioOnly: false }),
      });

      if (!dlRes.ok) throw new Error(`Download error: ${dlRes.status}`);
      const dlData = await dlRes.json();
      if (!dlData.success || !dlData.downloadUrl) throw new Error(dlData.error || 'No download URL');

      const title = info.title || 'reddit_video';
      const safeTitle = title.slice(0, 50).replace(/[^a-z0-9]/gi, '_');
      const fileName = `rdtvideodownloader.com_${safeTitle}.mp4`;
      const downloadUrl = `${dlData.downloadUrl}&filename=${encodeURIComponent(fileName)}`;

      const triggerDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage(
          { action: 'download', url: downloadUrl, filename: fileName },
          (response) => {
            const err = chrome.runtime.lastError;
            if (err || (response && !response.success)) {
              console.warn('[RDT Downloader] Background download failed, trying fallback:', err?.message || response?.error);
              triggerDownload(downloadUrl);
            }
          }
        );
      } else {
        triggerDownload(downloadUrl);
      }

      showSuccess(btn);
    } catch (err) {
      console.error('[RDT Downloader]', err);
      btn.classList.remove('rdt-dl-loading');
      btn.classList.add('rdt-dl-error');
      btn.querySelector('.rdt-dl-text').textContent = err.message || 'Download failed';
      setTimeout(() => resetBtn(btn), 4000);
    }
  }

  function showSuccess(btn) {
    btn.classList.remove('rdt-dl-loading');
    btn.classList.add('rdt-dl-success');
    btn.querySelector('.rdt-dl-text').textContent = 'Download started!';
    setTimeout(() => resetBtn(btn), 3500);
  }

  function resetBtn(btn) {
    btn.classList.remove('rdt-dl-loading', 'rdt-dl-success', 'rdt-dl-error');
    btn.querySelector('.rdt-dl-text').textContent = 'Download Video';
  }

  // ── Scan & Inject ──────────────────────────────────────────────────────

  function scanAndInject() {

    // ── Modern Reddit: shreddit-post ──
    document.querySelectorAll('shreddit-post').forEach(post => {
      if (post.hasAttribute(PROCESSED_ATTR)) return;
      post.setAttribute(PROCESSED_ATTR, 'true');

      // Check if it's a video or gif post
      const postType = post.getAttribute('post-type');
      if (postType !== 'video' && postType !== 'gif') return;

      const postUrl = getPostUrl(post);
      if (!postUrl) return;

      const bar = createDownloadBar(postUrl);

      // Insert the bar right AFTER the shreddit-post element
      post.insertAdjacentElement('afterend', bar);
    });

    // ── New Reddit: div post containers ──
    document.querySelectorAll('div[data-testid="post-container"]').forEach(post => {
      if (post.hasAttribute(PROCESSED_ATTR)) return;
      post.setAttribute(PROCESSED_ATTR, 'true');

      // Check for video content
      if (!post.querySelector('video, [data-hls-url], a[href*="v.redd.it"]')) return;

      const postUrl = getPostUrl(post);
      if (!postUrl) return;

      const bar = createDownloadBar(postUrl);
      post.insertAdjacentElement('afterend', bar);
    });

    // ── Old Reddit: div.thing ──
    document.querySelectorAll('div.thing[data-domain="v.redd.it"]').forEach(post => {
      if (post.hasAttribute(PROCESSED_ATTR)) return;
      post.setAttribute(PROCESSED_ATTR, 'true');

      const postUrl = getPostUrl(post);
      if (!postUrl) return;

      // For old reddit, insert as a list item in the flat-list
      const flatList = post.querySelector('ul.flat-list.buttons');
      if (flatList) {
        const li = document.createElement('li');
        li.className = 'rdt-dl-li';
        const btn = createDownloadBar(postUrl).querySelector('.rdt-dl-btn');
        btn.classList.add('rdt-dl-btn-old');
        li.appendChild(btn);
        flatList.appendChild(li);
      } else {
        const bar = createDownloadBar(postUrl);
        post.insertAdjacentElement('afterend', bar);
      }
    });
  }

  // ── Observer ────────────────────────────────────────────────────────────

  let scanTimer = null;

  function debouncedScan() {
    clearTimeout(scanTimer);
    scanTimer = setTimeout(scanAndInject, 400);
  }

  // ── Init ────────────────────────────────────────────────────────────────

  function init() {
    scanAndInject();
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.addedNodes.length > 0) { debouncedScan(); break; }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // SPA navigation
    let lastUrl = location.href;
    setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setTimeout(scanAndInject, 600);
      }
    }, 1000);
  }

  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

})();
