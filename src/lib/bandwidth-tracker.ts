/**
 * Track bandwidth usage on client-side
 * Helps verify Vercel isn't proxying video data
 */
export function trackBandwidth() {
  if (typeof window === 'undefined') return;
  
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const resource = entry as PerformanceResourceTiming;
      const url = resource.name;
      const size = resource.transferSize || 0;
      
      // Log large transfers (>1MB)
      if (size > 1024 * 1024) {
        console.log(`[Bandwidth] ${(size / 1024 / 1024).toFixed(2)}MB from ${url}`);
        
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        if (siteUrl && url.includes(siteUrl)) {
          console.warn('[WARNING] Large file served from Vercel:', url);
        }
      }
    });
  });
  
  observer.observe({ entryTypes: ['resource'] });
}
