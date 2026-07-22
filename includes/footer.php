<?php
/**
 * RDT Video Downloader - Site Footer Template
 */
$current_year = date('Y');
?>
    <footer class="bg-white pt-9 pb-7 border-t border-slate-200 mt-auto">
        <div class="container mx-auto px-4 max-w-6xl">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                <div class="max-w-sm sm:col-span-2 md:col-span-1">
                    <a href="/" class="flex items-center gap-2 mb-4 group">
                        <div class="relative w-8 h-8 rounded-lg overflow-hidden transition-transform group-hover:scale-105 shadow-lg shadow-brand-orange/20">
                            <img src="/logo.png" alt="RDT Video Downloader Logo" class="object-cover w-full h-full" width="32" height="32" />
                        </div>
                        <span class="text-xl font-bold text-slate-900 tracking-tight">RDT Video Downloader</span>
                    </a>
                    <p class="text-slate-600 leading-relaxed text-sm">
                        The fastest way to download videos, images, and GIFs from Reddit. 
                        No watermarks, no limits.
                    </p>
                    <div class="mt-6 flex flex-wrap gap-3 items-center">
                        <!-- Fazier Launch Badge -->
                        <a href="https://fazier.com/launches/rdtvideodownloader.com" target="_blank" rel="nofollow noopener noreferrer" class="hover:opacity-90 transition-opacity">
                            <img src="https://fazier.com/api/v1/public/badges/launch_badges.svg?badge_type=launched&theme=neutral" alt="Fazier badge" class="h-6 w-auto" width="80" height="24" loading="lazy" />
                        </a>

                        <!-- Startup Fame Badge -->
                        <a href="https://startupfa.me/s/rdt?utm_source=rdtvideodownloader.com" target="_blank" rel="nofollow noopener noreferrer" class="hover:opacity-90 transition-opacity">
                            <img src="https://startupfa.me/badges/featured-badge.webp" alt="RTD Video Downloader - Featured on Startup Fame" class="h-6 w-auto" width="84" height="24" loading="lazy" />
                        </a>

                        <!-- Plug Your Build Badge -->
                        <a href="https://plugyourbuild.com/listing/rdt-video-downloader-24b2e0" target="_blank" rel="nofollow noopener noreferrer" class="hover:opacity-90 transition-opacity">
                            <img src="https://plugyourbuild.com/api/badge/rdt-video-downloader-24b2e0?style=dark" alt="Listed on Plug Your Build" class="h-6 w-auto" width="124" height="24" loading="lazy" />
                        </a>
                    </div>
                </div>

                <div>
                    <p class="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Free Tools</p>
                    <ul class="space-y-2 text-sm list-none p-0 m-0">
                        <li>
                            <a href="/reddit-to-mp4" class="text-slate-600 hover:text-brand-orange transition-colors">
                                Reddit to MP4
                            </a>
                        </li>
                        <li>
                            <a href="/reddit-to-mp3" class="text-slate-600 hover:text-brand-orange transition-colors">
                                Reddit to MP3
                            </a>
                        </li>
                        <li>
                            <a href="/reddit-to-gif" class="text-slate-600 hover:text-brand-orange transition-colors">
                                Reddit GIF Downloader
                            </a>
                        </li>
                        <li>
                            <a href="/reddit-image-downloader" class="text-slate-600 hover:text-brand-orange transition-colors">
                                Reddit Image Downloader
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div>
                    <p class="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Navigation</p>
                    <ul class="space-y-2 text-sm list-none p-0 m-0">
                        <li>
                            <a href="/" class="text-slate-600 hover:text-brand-orange transition-colors">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" class="text-slate-600 hover:text-brand-orange transition-colors">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/contact" class="text-slate-600 hover:text-brand-orange transition-colors">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/blog" class="text-slate-600 hover:text-brand-orange transition-colors">
                                Blog
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p class="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Legal</p>
                    <ul class="space-y-2 text-sm list-none p-0 m-0">
                        <li>
                            <a href="/legal/privacy-policy" class="text-slate-600 hover:text-brand-orange transition-colors">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/legal/terms-of-service" class="text-slate-600 hover:text-brand-orange transition-colors">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="/legal/dmca" class="text-slate-600 hover:text-brand-orange transition-colors">
                                DMCA Notice
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="pt-6 border-t border-slate-200 text-center">
                <p class="text-sm text-slate-500 mb-4 max-w-4xl mx-auto">
                    Disclaimer: RDT Video Downloader is not affiliated with Reddit Inc. All trademarks belong to their respective owners. Please respect content creators and copyright laws when downloading.
                </p>
                <p class="text-sm text-slate-500">
                    © <span><?php echo $current_year; ?></span> RDT Video Downloader. All rights reserved.
                </p>
            </div>
        </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button id="scroll-to-top" aria-label="Scroll to top" class="fixed bottom-6 right-6 z-[999] p-3 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white shadow-lg active:scale-95 transition-all duration-300 opacity-0 pointer-events-none translate-y-3 cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
    </button>

    <!-- App Scripts (Split ES6 Javascripts) -->
    <script src="/assets/js/theme.js" defer></script>
    <script src="/assets/js/downloader.js" defer></script>
    <script src="/assets/js/main.js" defer></script>
</body>
</html>
