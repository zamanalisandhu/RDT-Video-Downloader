<?php
/**
 * RDT Video Downloader - Homepage
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$page_title = "Reddit Video Downloader — Download Reddit Video with Sound Free (2026)";
$page_desc = "Free Reddit video downloader with audio. Download Reddit videos, GIFs & galleries in 1080p HD — no watermark, no signup, no app. Works on iPhone, Android & PC. Try it now.";
$page_path = '/';

// JSON-LD Structured Data Schema Markup
$siteUrl = 'https://rdtvideodownloader.com';

$webAppSchema = [
    "@context" => "https://schema.org",
    "@type" => "WebApplication",
    "name" => "RDT Video Downloader",
    "url" => $siteUrl,
    "description" => "Free Reddit video downloader with audio. Download Reddit videos, GIFs and galleries in 1080p HD — no watermark, no signup.",
    "applicationCategory" => "MultimediaApplication",
    "operatingSystem" => "Web, iOS, Android, Windows, Mac",
    "offers" => [
        "@type" => "Offer",
        "price" => "0",
        "priceCurrency" => "USD"
    ],
    "aggregateRating" => [
        "@type" => "AggregateRating",
        "ratingValue" => "4.9",
        "reviewCount" => "10000"
    ]
];

$organizationSchema = [
    "@context" => "https://schema.org",
    "@type" => "Organization",
    "name" => "RDT Video Downloader",
    "url" => $siteUrl,
    "logo" => $siteUrl . "/logo.png",
    "sameAs" => [
        "https://twitter.com/rdtdownloader",
        "https://facebook.com/rdtdownloader"
    ]
];

$faqSchema = [
    "@context" => "https://schema.org",
    "@type" => "FAQPage",
    "mainEntity" => [
        [
            "@type" => "Question",
            "name" => "How do I download Reddit videos with sound?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Copy the Reddit post URL, paste it into rdtvideodownloader.com, click Get Video, select your quality, and click Download. RDT automatically merges the separate audio and video streams from Reddit's v.redd.it servers — giving you a complete MP4 with sound in under 3 seconds. No silent files, no extra steps."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "How do I download a Reddit video to MP4?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Paste any Reddit post URL into RDT and click Get Video. The tool converts the Reddit video to MP4 format with audio merged automatically. Choose 1080p, 720p, or 480p and click Download — the MP4 saves directly to your device. No software, no conversion app, no account required."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "Can I download Reddit videos in 4K?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Yes. If the original Reddit post was uploaded in 4K, RDT delivers the 4K version. RDT is one of the few Reddit video downloaders with 4K support — most tools cap at 1080p. Select the highest quality option on the results page to get the maximum resolution available."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "Is RDT a free Reddit video downloader without watermark?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Yes — completely free, no watermarks, no daily limits, no signup. Downloaded videos are clean original files with no RDT logo or overlay. Save as many Reddit videos as you want, every day, for free. No premium tier, no subscription, no hidden cost."
            ]
        ]
    ]
];

$schema_markups = [$webAppSchema, $organizationSchema, $faqSchema];

require_once __DIR__ . '/includes/header.php';

// Fetch latest blog posts (cached for 1 hour)
$posts = rdt_get_posts(3);
?>

<!-- Hero Section -->
<section id="hero" class="pt-10 pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
    <!-- Background decorative blur shapes -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -translate-y-12 -translate-x-12 pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl translate-y-12 translate-x-12 pointer-events-none"></div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10 text-center">
        <!-- Hero Headline -->
        <h1 class="text-[34px] sm:text-[42px] md:text-[52px] font-black text-slate-900 tracking-tight leading-[1.1] mb-5 max-w-5xl mx-auto" style="font-family: var(--font-title);">
            Reddit Video Downloader
        </h1>
        <p class="text-base sm:text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed mb-10">
            Download any Reddit video to MP4 with audio — free, unlimited, no watermark. Supports 1080p HD, 4K, GIFs, and gallery posts. Works on iPhone, Android, and PC in under 3 seconds.
        </p>

        <!-- Downloader Tool Form Component Card -->
        <?php require_once __DIR__ . '/includes/downloader-tool.php'; ?>

        <!-- Small disclaimer info text below card -->
        <p class="text-[12px] text-slate-400 font-medium mb-10">
            By using our service you agree to our <a href="/legal/terms-of-service" class="underline hover:text-slate-600">Terms of Service</a> and <a href="/legal/privacy-policy" class="underline hover:text-slate-600">Privacy Policy</a>.
        </p>

        <!-- Chrome Extension Live Notification Strip -->
        <div class="inline-flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-100 rounded-2xl md:rounded-[20px] max-w-2xl mx-auto shadow-sm shadow-slate-100/50 text-left w-full animate-fade-in">
            <div class="flex items-center gap-3.5 w-full sm:w-auto">
                <div class="w-12 h-12 shrink-0 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c1.373 0 2.623.447 3.633 1.2L9.58 16.48C7.11 15.68 5.3 13.56 5.3 11c0-3.42 2.78-6.2 6.7-6.2zm.48 9.38l6.05-6.05C19.13 9.29 19.7 10.58 19.7 12c0 3.42-2.78 6.2-6.7 6.2-.28 0-.55-.02-.82-.06l.3-3.96zm-.48 4.22c-2.42 0-4.47-1.55-5.2-3.73l6.05-6.05c.23.23.4.52.48.86l-1.33 8.92z"/>
                    </svg>
                </div>
                <div>
                    <div class="flex items-center flex-wrap gap-2">
                        <h2 class="text-[#0F172A] font-extrabold text-[15px] sm:text-base leading-tight">Our Chrome Extension is Live!</h2>
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E6F8F0] text-[#059669] border border-[#A7F3D0]/30 select-none">OFFICIAL</span>
                    </div>
                    <p class="text-slate-500 text-xs sm:text-sm mt-0.5 leading-tight">Download Reddit videos directly from the page with a single click.</p>
                </div>
            </div>
            <a href="https://chromewebstore.google.com/detail/reddit-video-downloader-r/mjphhkbhfkiffmlldcjcapkmninehbej" target="_blank" rel="noopener noreferrer" class="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs sm:text-[13px] px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-98 shrink-0 w-full sm:w-auto justify-center">
                <span>Add to Chrome (Free)</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </a>
        </div>
    </div>
</section>

<!-- How it works Section -->
<section class="py-12 bg-white border-t border-b border-slate-100">
    <div class="container mx-auto px-4 max-w-4xl text-left">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">How to Download Reddit Videos with Sound — 3 Steps</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-slate-50 border border-slate-200/50 hover:border-brand-orange/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/5 hover:ring-4 hover:ring-brand-orange/[0.01] group flex flex-col">
                <div class="w-9 h-9 bg-brand-orange/10 text-brand-orange font-bold text-lg rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 select-none">1</div>
                <h3 class="font-bold text-slate-900 text-lg mb-2 group-hover:text-brand-orange transition-colors">Copy the Reddit Post URL</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                    Open Reddit and find the video, GIF, or gallery you want to save. Tap the Share button and select Copy Link — works the same on iPhone, Android, and desktop. On a PC, simply copy the URL from your browser address bar. The Reddit post URL looks like: <code class="bg-slate-50 text-slate-700 px-1 py-0.5 rounded text-[11px] font-mono select-all break-all">reddit.com/r/subreddit/comments/xxxxx/post_title/</code>
                </p>
            </div>

            <div class="bg-slate-50 border border-slate-200/50 hover:border-brand-orange/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/5 hover:ring-4 hover:ring-brand-orange/[0.01] group flex flex-col">
                <div class="w-9 h-9 bg-brand-orange/10 text-brand-orange font-bold text-lg rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 select-none">2</div>
                <h3 class="font-bold text-slate-900 text-lg mb-2 group-hover:text-brand-orange transition-colors">Paste and Process</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                    Paste the Reddit link into the box above and click Get Video. RDT fetches both the video stream and the separate audio stream from Reddit's <code class="bg-slate-50 text-[#FF4500] px-1 py-0.5 rounded text-[11px] font-mono">v.redd.it</code> servers, then merges them into a single MP4 file with sound — usually in under 2 seconds. No silent videos, no missing audio, no second tool needed.
                </p>
            </div>

            <div class="bg-slate-50 border border-slate-200/50 hover:border-brand-orange/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/5 hover:ring-4 hover:ring-brand-orange/[0.01] group flex flex-col">
                <div class="w-9 h-9 bg-brand-orange/10 text-brand-orange font-bold text-lg rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 select-none">3</div>
                <h3 class="font-bold text-slate-900 text-lg mb-2 group-hover:text-brand-orange transition-colors">Choose Quality and Download</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                    Pick your preferred resolution — 1080p, 720p, or 480p — and click Download. The complete MP4 file saves directly to your device. On iPhone, tap Save Video to move it to your Camera Roll. On Android, it appears in your Gallery automatically. On PC, it lands in your Downloads folder ready to play.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="py-12 bg-slate-50/50">
    <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-10">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Why Redditors Choose RDT Video Downloader</h2>
            <p class="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Save Reddit videos, galleries, and GIFs in maximum quality with sound restored automatically.
            </p>
        </div>

        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none pl-0 m-0">
            <li class="bg-white border border-slate-200/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/5 hover:border-brand-orange/30 hover:ring-4 hover:ring-brand-orange/[0.01] group">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">Audio Merged Automatically</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    Reddit stores video and audio as two completely separate MPEG-DASH streams on v.redd.it. Most downloaders only grab the video stream — leaving you with a Reddit video no sound problem. RDT fetches both streams simultaneously and merges them server-side using FFmpeg, giving you a Reddit video with sound on the very first try. No silent files, no workarounds, no second tool required.
                </p>
            </li>

            <li class="bg-white border border-slate-200/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/5 hover:border-brand-orange/30 hover:ring-4 hover:ring-brand-orange/[0.01] group">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">Download Reddit Videos in 1080p HD and 4K</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    RDT delivers the highest resolution the original poster uploaded — up to 1080p Full HD with no re-encoding or compression on our end. Planning to download a Reddit video in 4K? If the uploader posted in 4K, you get 4K. We never stretch, upscale, or downgrade the source quality to save bandwidth. What Reddit has is exactly what you get.
                </p>
            </li>

            <li class="bg-white border border-slate-200/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/5 hover:border-brand-orange/30 hover:ring-4 hover:ring-brand-orange/[0.01] group">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">Reddit to MP4 Converter — Instant &amp; Free</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    Every Reddit video downloads as a clean, universal MP4 file — compatible with every device, every media player, and every platform. No obscure formats, no codec issues. Our Reddit to MP4 converter handles v.redd.it videos, Imgur-hosted GIFs, crossposted content, and gallery posts — all in one place.
                </p>
            </li>

            <li class="bg-white border border-slate-200/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/5 hover:border-brand-orange/30 hover:ring-4 hover:ring-brand-orange/[0.01] group">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751A11.956 11.956 0 0112 2.714z"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">No Watermark, No Limits, No Signup</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    Downloaded videos are clean originals — no RDT logo, no watermark burned into the corner, no end-card overlays. No daily download limits. No account required. No email verification. This is a Reddit video downloader free forever — save five videos or five hundred, the tool works exactly the same way every time.
            <li class="bg-white border border-slate-200/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/5 hover:border-brand-orange/30 hover:ring-4 hover:ring-brand-orange/[0.01] group">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l4.03 3.359a1.125 1.125 0 010 1.721l-4.03 3.358a1.125 1.125 0 01-1.405 0L7.72 9.542a1.125 1.125 0 010-1.721l4.03-3.359a1.125 1.125 0 01.405-.864V3.03m0 0a11.97 11.97 0 00-4.5 1.035M12.75 3.03a11.97 11.97 0 014.5 1.035m-4.5 16.94v-.569c0-.334-.148-.65-.405-.864l-4.03-3.359a1.125 1.125 0 010-1.72l4.03-3.359a1.125 1.125 0 011.405 0l4.03 3.359a1.125 1.125 0 010 1.72l-4.03 3.359a1.125 1.125 0 01-.405.864v.569m0 0a11.97 11.97 0 004.5-1.035m-4.5 1.035a11.97 11.97 0 01-4.5-1.035"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">Reddit GIF Downloader with Sound</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    Reddit GIFs are technically short MP4 files — Reddit converts every GIF upload to MP4 format automatically. Our Reddit GIF downloader saves them in native MP4 format — up to 10x smaller than a true .gif file at the same visual quality. Some Reddit GIFs have audio too — RDT captures the sound automatically so you never miss it.
                </p>
            </li>

            <li class="bg-white border border-slate-200/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-orange/5 hover:border-brand-orange/30 hover:ring-4 hover:ring-brand-orange/[0.01] group">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3M9 18h6"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">Works on Every Device</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    RDT works as a Reddit video downloader on iPhone and iPad through Safari, on Android through Chrome or Firefox, and on Windows and Mac through any desktop browser. No app to install, no plugin to enable. The same tool, the same process, the same results — on every device you own.
                </p>
            </li>
        </ul>
    </div>
</section>

<section class="py-12 bg-white text-left">
    <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">Download Any Reddit Media Format</h2>
        
        <div class="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1">Reddit Videos (v.redd.it)</h3>
                <p>Every video uploaded directly to Reddit is hosted on v.redd.it using MPEG-DASH streaming. RDT pulls both the video and audio streams and delivers a single merged Reddit MP4 with sound — in your chosen resolution up to 1080p or 4K.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1">Reddit to MP4</h3>
                <p>Convert any Reddit video link to MP4 instantly. Paste the Reddit URL, pick your quality, and download. No software, no conversion waiting time — the Reddit to MP4 process happens in under 3 seconds on our servers.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1">Reddit GIFs</h3>
                <p>Download Reddit GIFs as compact, high-quality MP4 files. Our Reddit GIF downloader supports native Reddit GIFs, Imgur .gifv embeds, and GIFs with audio. Output MP4 files play inline in WhatsApp, Telegram, iMessage, and Discord.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1">Reddit Galleries</h3>
                <p>Download all images from a Reddit gallery post at once. RDT extracts every image at full original resolution and bundles them into a single ZIP download — no more saving images one by one.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1">Reddit Audio (MP3)</h3>
                <p>Need only the audio? Our Reddit to MP3 tool strips the video and delivers a clean MP3 at the source's original bitrate. Perfect for podcasts, interviews, music clips, and spoken-word content on Reddit.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1">NSFW Reddit Videos</h3>
                <p>RDT processes publicly accessible NSFW Reddit content the same way as any other post — with audio merged automatically. No login required, no content filtering. The only requirement is that the post is publicly viewable without a Reddit account.</p>
            </div>
        </div>
    </div>
</section>

<!-- Supported formats display strip -->
<section class="py-6 bg-slate-900 text-white">
    <div class="container mx-auto px-4 max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 justify-items-center items-center">
        <div class="flex items-center gap-2.5">
            <div class="w-2 h-2 rounded-full bg-brand-orange"></div>
            <span class="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-300">MP4 Video</span>
        </div>
        <div class="flex items-center gap-2.5">
            <div class="w-2 h-2 rounded-full bg-brand-orange"></div>
            <span class="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-300">M4A / MP3 Audio</span>
        </div>
        <div class="flex items-center gap-2.5">
            <div class="w-2 h-2 rounded-full bg-brand-orange"></div>
            <span class="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-300">GIF Animations</span>
        </div>
        <div class="flex items-center gap-2.5">
            <div class="w-2 h-2 rounded-full bg-brand-orange"></div>
            <span class="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-slate-300">JPG/PNG Images</span>
        </div>
    </div>
</section>

<!-- Use Cases Section -->
<section class="py-12 bg-slate-50 text-left">
    <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">How People Use RDT to Download Reddit Videos</h2>
        
        <div class="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1.5">Download Reddit Videos for Offline Viewing</h3>
                <p>Save Reddit videos to watch on flights, commutes, or anywhere without internet. Pre-download over Wi-Fi before you travel and watch later — no buffering, no data usage, no autoplay interruptions.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1.5">Download Reddit Video with Sound for Sharing</h3>
                <p>Send Reddit videos on WhatsApp, Telegram, or Discord in full quality with audio. Download Reddit video with sound using RDT and share the MP4 file directly — no compression, no silent clips, no link sharing that breaks when the post gets deleted.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1.5">Save Reddit Videos Without Watermark for Editing</h3>
                <p>Content creators and video editors need clean source files. RDT downloads Reddit videos without watermark in 1080p HD — ready to drop into Premiere Pro, CapCut, or DaVinci Resolve with no cropping or cleanup. Always credit the original poster when sharing.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1.5">Archive Reddit Videos Before They Get Deleted</h3>
                <p>Reddit posts disappear — users delete them, subreddits get quarantined, accounts get suspended. Save a local copy of anything important before it vanishes. RDT gives you the original file at original quality — a permanent copy you control.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1.5">Download Reddit HD Videos for Education</h3>
                <p>Teachers and students use RDT to save educational clips from r/Documentaries, r/lectures, and r/science. A downloaded MP4 plays offline with zero buffering and no risk of the source being removed mid-semester.</p>
            </div>
        </div>
    </div>
</section>

<!-- Device Guide Section -->
<section class="py-12 bg-white text-left">
    <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">Download Reddit Videos on Any Device — Quick Guide</h2>
        
        <div class="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1.5">On iPhone / iPad</h3>
                <p>Open Reddit → tap Share → Copy Link → open Safari → go to rdtvideodownloader.com → paste URL → tap Get Video → select quality → tap and hold Download → tap Download Linked File → find video in Files app → share to Camera Roll.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1.5">On Android</h3>
                <p>Open Reddit → tap Share → Copy Link → open Chrome → go to rdtvideodownloader.com → paste URL → tap Get Video → select 1080p → tap Download → video saves to Downloads folder and Gallery automatically.</p>
            </div>
            
            <div>
                <h3 class="font-bold text-slate-900 text-lg mb-1.5">On PC / Mac</h3>
                <p>Copy the Reddit post URL from your browser address bar → open rdtvideodownloader.com in a new tab → paste and click Get Video → click Download next to 1080p → MP4 saves to your Downloads folder. Or install the Chrome Extension for 1-click downloads directly from Reddit.</p>
            </div>
        </div>
    </div>
</section>

<!-- Power users comparison grid -->
<section class="py-12 bg-slate-50/50">
    <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-6">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">RDT vs Other Reddit Video Downloaders (2026)</h2>
            <p class="text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Whether you're downloading one video or managing multiple content archives, here's how RDT compares to other workflows.
            </p>
        </div>

        <div class="overflow-x-auto border border-slate-200/80 rounded-2xl shadow-sm bg-white">
            <table class="w-full text-left text-sm border-collapse">
                <thead>
                    <tr class="bg-slate-50 border-b border-slate-200">
                        <th class="p-4 font-bold text-slate-700">Feature</th>
                        <th class="p-4 font-bold text-slate-700 text-center">RDT Video Downloader</th>
                        <th class="p-4 font-bold text-slate-700 text-center">RedditSave</th>
                        <th class="p-4 font-bold text-slate-700 text-center">Viddit</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-600">
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">Audio merged automatically</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-green-500 font-bold">✅ Yes</td>
                        <td class="p-4 text-center text-amber-500 font-bold">⚠️ Sometimes</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">1080p HD support</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-green-500 font-bold">✅ Yes</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ No</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">4K support</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ No</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ No</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">Gallery ZIP download</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-green-500 font-bold">✅ Yes</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ No</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">Reddit GIF downloader</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-amber-500 font-bold">⚠️ Limited</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ No</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">No watermark</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-green-500 font-bold">✅ Yes</td>
                        <td class="p-4 text-center text-amber-500 font-bold">⚠️ Sometimes</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">No daily limits</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Unlimited</td>
                        <td class="p-4 text-center text-amber-500 font-bold">⚠️ Limited</td>
                        <td class="p-4 text-center text-amber-500 font-bold">⚠️ Limited</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">No signup required</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-green-500 font-bold">✅ Yes</td>
                        <td class="p-4 text-center text-green-500 font-bold">✅ Yes</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">Chrome Extension</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ No</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ No</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">Reddit to MP3</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ No</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ No</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">Privacy (zero logs)</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">✅ Yes</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ Unknown</td>
                        <td class="p-4 text-center text-red-500 font-bold">❌ Unknown</td>
                    </tr>
                    <tr>
                        <td class="p-4 font-semibold text-slate-900">Processing speed</td>
                        <td class="p-4 text-center text-green-500 font-bold bg-brand-orange/5">⚡ Under 2s</td>
                        <td class="p-4 text-center text-slate-500">3–5s</td>
                        <td class="p-4 text-center text-slate-500">4–6s</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- Specialized Pages Section -->
<section class="py-12 bg-white">
    <div class="container mx-auto px-4 max-w-4xl text-center">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8">Free Reddit Downloader Tools</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/reddit-to-mp4" class="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5 hover:-translate-y-1 hover:ring-4 hover:ring-brand-orange/[0.01] transition-all duration-300 flex flex-col items-center group">
                <div class="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </div>
                <span class="font-bold text-slate-800 text-sm">Reddit to MP4</span>
                <span class="text-slate-400 text-xs mt-1">Convert Reddit to MP4 with audio</span>
            </a>

            <a href="/reddit-to-mp3" class="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5 hover:-translate-y-1 hover:ring-4 hover:ring-brand-orange/[0.01] transition-all duration-300 flex flex-col items-center group">
                <div class="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
                </div>
                <span class="font-bold text-slate-800 text-sm">Reddit to MP3</span>
                <span class="text-slate-400 text-xs mt-1">Extract audio tracks as MP3</span>
            </a>

            <a href="/reddit-to-gif" class="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5 hover:-translate-y-1 hover:ring-4 hover:ring-brand-orange/[0.01] transition-all duration-300 flex flex-col items-center group">
                <div class="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <span class="font-bold text-slate-800 text-sm">Reddit GIF Downloader</span>
                <span class="text-slate-400 text-xs mt-1">Save GIFs as MP4 loops with sound</span>
            </a>

            <a href="/reddit-image-downloader" class="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/50 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5 hover:-translate-y-1 hover:ring-4 hover:ring-brand-orange/[0.01] transition-all duration-300 flex flex-col items-center group">
                <div class="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <span class="font-bold text-slate-800 text-sm">Reddit Image Downloader</span>
                <span class="text-slate-400 text-xs mt-1">Download images and full galleries</span>
            </a>
        </div>
    </div>
</section>

<!-- FAQ Section -->
<section id="faq" class="py-12 bg-slate-50 scroll-mt-20">
    <div class="container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-10">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Frequently Asked Questions</h2>
            <p class="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about downloading high-quality Reddit media.
            </p>
        </div>
        
        <div class="space-y-4 text-left">
            <?php
            $faqs = [
                [
                    'question' => 'How do I download Reddit videos with sound?',
                    'answer' => 'Copy the Reddit post URL, paste it into rdtvideodownloader.com, click Get Video, select your quality, and click Download. RDT automatically merges the separate audio and video streams from Reddit\'s v.redd.it servers — giving you a complete MP4 with sound in under 3 seconds. No silent files, no extra steps.'
                ],
                [
                    'question' => 'How do I download a Reddit video to MP4?',
                    'answer' => 'Paste any Reddit post URL into RDT and click Get Video. The tool converts the Reddit video to MP4 format with audio merged automatically. Choose 1080p, 720p, or 480p and click Download — the MP4 saves directly to your device. No software, no conversion app, no account required.'
                ],
                [
                    'question' => 'Can I download Reddit videos in 4K?',
                    'answer' => 'Yes. If the original Reddit post was uploaded in 4K, RDT delivers the 4K version. RDT is one of the few Reddit video downloaders with 4K support — most tools cap at 1080p. Select the highest quality option on the results page to get the maximum resolution available.'
                ],
                [
                    'question' => 'Is RDT a free Reddit video downloader without watermark?',
                    'answer' => 'Yes — completely free, no watermarks, no daily limits, no signup. Downloaded videos are clean original files with no RDT logo or overlay. Save as many Reddit videos as you want, every day, for free. No premium tier, no subscription, no hidden cost.'
                ],
                [
                    'question' => 'How do I download Reddit videos without watermark?',
                    'answer' => 'Use RDT Video Downloader — paste the Reddit post URL, select your quality, and download. Every file you get is a clean, watermark-free MP4 — the original Reddit video exactly as posted. No logo, no overlay, no branding burned into your video.'
                ],
                [
                    'question' => 'How do I save Reddit videos on iPhone?',
                    'answer' => 'Open Reddit, tap Share → Copy Link. Open Safari and go to rdtvideodownloader.com. Paste the URL, tap Get Video, then tap and hold the Download button and select Download Linked File. The video saves to your Files app. To move it to your Camera Roll, tap the file in Files → Share → Save Video.'
                ],
                [
                    'question' => 'How do I download Reddit HD videos?',
                    'answer' => 'Paste the Reddit post URL into RDT. On the results page, select the 1080p option for HD quality. RDT fetches the highest resolution DASH stream from v.redd.it and merges it with the audio stream — giving you a full HD Reddit video download with sound.'
                ],
                [
                    'question' => 'Can I download Reddit GIFs with sound?',
                    'answer' => 'Yes. Reddit GIFs that have audio (uploaded as video-GIF hybrids) will download with sound using RDT. Standard silent GIFs download as compact, high-quality MP4 files — up to 10x smaller than true .gif format. Paste the GIF post URL into RDT and download — no extra steps needed.'
                ],
                [
                    'question' => 'What is the fastest Reddit video downloader in 2026?',
                    'answer' => 'RDT Video Downloader processes most Reddit videos in under 2 seconds — faster than RedditSave (3–5s) and Viddit (4–6s). The speed comes from parallel stream fetching — RDT downloads both the video and audio streams simultaneously rather than sequentially, then muxes them instantly using FFmpeg.'
                ]
            ];

            foreach ($faqs as $faq): ?>
                <div class="faq-item border border-slate-200 rounded-2xl overflow-hidden transition-colors hover:border-brand-orange/20">
                    <button type="button" class="faq-btn w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 text-[15px] sm:text-base cursor-pointer focus:outline-none select-none">
                        <span><?php echo htmlspecialchars($faq['question']); ?></span>
                        <span class="faq-icon text-lg text-slate-400 font-bold shrink-0 ml-4">+</span>
                    </button>
                    <div class="faq-panel max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-slate-50/30">
                        <p class="p-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            <?php echo htmlspecialchars($faq['answer']); ?>
                        </p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php
require_once __DIR__ . '/includes/footer.php';
?>
