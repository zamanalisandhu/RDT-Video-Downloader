/* ============================================================================
 * RDT Video Downloader — Background Service Worker
 * Handles file downloads triggered by the content script
 * ========================================================================= */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'download' && message.url) {
    chrome.downloads.download({
      url: message.url,
      filename: message.filename || 'rdtvideodownloader_video.mp4',
      saveAs: false
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error('[RDT Background] Download error:', chrome.runtime.lastError.message);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        console.log('[RDT Background] Download started, ID:', downloadId);
        sendResponse({ success: true, downloadId });
      }
    });

    // Return true to indicate async sendResponse
    return true;
  }
});

// Open local thank you page upon installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('thankyou.html')
    });
  }
});
