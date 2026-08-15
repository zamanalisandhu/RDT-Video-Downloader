<?php
/**
 * RDT Video Downloader - Homepage
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$page_title = "Reddit Video Downloader — Download Reddit Videos with Sound";
$page_desc = "Download Reddit videos with sound in high quality. Paste a Reddit post link, choose the available video quality, and save media as MP4. Works on iPhone, Android, Windows, and Mac.";
$page_path = '/';

// JSON-LD Structured Data Schema Markup
$siteUrl = 'https://rdtvideodownloader.com';

$webAppSchema = [
    "@context" => "https://schema.org",
    "@type" => "WebApplication",
    "name" => "RDT Video Downloader",
    "url" => $siteUrl,
    "description" => "Download Reddit videos with sound in high quality. Save Reddit media as MP4 files directly in your browser on iPhone, Android, Windows, and Mac.",
    "applicationCategory" => "MultimediaApplication",
    "operatingSystem" => "Web, iOS, Android, Windows, Mac",
    "offers" => [
        "@type" => "Offer",
        "price" => "0",
        "priceCurrency" => "USD"
    ]
];

$organizationSchema = [
    "@context" => "https://schema.org",
    "@type" => "Organization",
    "name" => "RDT Video Downloader",
    "url" => $siteUrl,
    "logo" => $siteUrl . "/logo.png"
];

$faqSchema = [
    "@context" => "https://schema.org",
    "@type" => "FAQPage",
    "mainEntity" => [
        [
            "@type" => "Question",
            "name" => "How do I download a Reddit video?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Copy the link to the Reddit post, paste it into the downloader above, click Get Video, select an available quality, and download the resulting file."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "Can I download Reddit videos with sound?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Yes. When Reddit provides separate audio and video streams, RDT combines them into a single video file with sound."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "What quality can I download?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "The available quality depends on the original media. RDT displays the formats and resolutions available for the Reddit post instead of artificially increasing the source resolution."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "Does RDT require an app?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "No. RDT works through a modern web browser, so there is no required desktop or mobile application."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "Can I use RDT on my phone?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Yes. You can use RDT through a supported browser on iPhone, iPad, and Android devices."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "Is an account required?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "No. You can use the downloader without creating an account."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "Can I download Reddit images and GIFs?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Yes. Use the dedicated Reddit Image Downloader or Reddit GIF Downloader tools when the post contains supported media."
            ]
        ],
        [
            "@type" => "Question",
            "name" => "Why does a Reddit video sometimes have no audio?",
            "acceptedAnswer" => [
                "@type" => "Answer",
                "text" => "Some Reddit videos store audio and video as separate streams. If your browser or downloader retrieves only the video stream, the resulting file can be silent. RDT attempts to combine the available streams when both are accessible."
            ]
        ]
    ]
];

$schema_markups = [$webAppSchema, $organizationSchema, $faqSchema];

require_once __DIR__ . '/includes/header.php';
?>

<!-- Hero Section -->
<section id="hero" class="pt-10 pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
    <!-- Premium Background Grid Pattern -->
    <div class="absolute inset-0 opacity-[0.35] pointer-events-none" 
         style="background-image: radial-gradient(#ff4500 1px, transparent 1px); background-size: 24px 24px;"></div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10 text-center">
        <!-- Hero Headline -->
        <h1 class="text-[28px] min-[375px]:text-[32px] sm:text-[44px] md:text-[54px] font-black text-slate-900 tracking-tight leading-[1.1] mb-5 max-w-5xl mx-auto" style="font-family: var(--font-title);">
            Reddit Video Downloader
        </h1>
        <p class="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Download Reddit videos with sound in high quality. Paste a Reddit post link, choose the available video quality, and save the media as an MP4 file. RDT Video Downloader works directly in your browser on iPhone, Android, Windows, and Mac — no software or account required.
        </p>

        <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange font-bold text-xs sm:text-sm rounded-full mb-8">
            <span>Paste Reddit Video URL</span>
            <span>→</span>
            <span>Get Video</span>
            <span>→</span>
            <span>Download</span>
        </div>

        <!-- Downloader Tool Form Component Card -->
        <?php require_once __DIR__ . '/includes/downloader-tool.php'; ?>

        <!-- Disclaimer -->
        <p class="text-[12px] text-slate-400 font-medium mb-10">
            By using our service you agree to our <a href="/legal/terms-of-service" class="underline hover:text-slate-600">Terms of Service</a> and <a href="/legal/privacy-policy" class="underline hover:text-slate-600">Privacy Policy</a>.
        </p>

        <!-- Chrome Extension Banner -->
        <div class="inline-flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-100 rounded-2xl md:rounded-[20px] max-w-2xl mx-auto shadow-sm text-left w-full">
            <div class="flex items-center gap-3.5 w-full sm:w-auto">
                <div class="w-12 h-12 shrink-0 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                    <svg style="width: 24px; height: 24px; display: block;" class="text-slate-700" viewBox="0 0 24 24" fill="currentColor">
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
            <a href="https://chromewebstore.google.com/detail/reddit-video-downloader-r/mjphhkbhfkiffmlldcjcapkmninehbej" target="_blank" rel="noopener noreferrer" class="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs sm:text-[13px] px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shrink-0 w-full sm:w-auto justify-center">
                <span>Add to Chrome (Free)</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </a>
        </div>
    </div>
</section>

<!-- 3 Steps Section -->
<section class="py-12 bg-white border-t border-b border-slate-100">
    <div class="container mx-auto px-4 max-w-4xl text-left">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">Download Reddit Videos in 3 Simple Steps</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 flex flex-col">
                <div class="w-9 h-9 bg-brand-orange/10 text-brand-orange font-bold text-lg rounded-lg flex items-center justify-center mb-4 shadow-sm select-none">1</div>
                <h3 class="font-bold text-slate-900 text-lg mb-2">Copy the Reddit Link</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                    Open Reddit and find the post containing the video you want to save. Tap Share and select Copy Link. On desktop, you can copy the URL directly from your browser.
                </p>
            </div>

            <div class="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 flex flex-col">
                <div class="w-9 h-9 bg-brand-orange/10 text-brand-orange font-bold text-lg rounded-lg flex items-center justify-center mb-4 shadow-sm select-none">2</div>
                <h3 class="font-bold text-slate-900 text-lg mb-2">Paste the Link</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                    Return to RDT Video Downloader and paste the Reddit post URL into the downloader above. Click Get Video and wait while the available media is prepared.
                </p>
            </div>

            <div class="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 flex flex-col">
                <div class="w-9 h-9 bg-brand-orange/10 text-brand-orange font-bold text-lg rounded-lg flex items-center justify-center mb-4 shadow-sm select-none">3</div>
                <h3 class="font-bold text-slate-900 text-lg mb-2">Choose Your Quality</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                    Select the available video quality and click Download. When Reddit provides separate audio and video streams, RDT combines them into a single playable file.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Why Use Section -->
<section class="py-12 bg-slate-50/50">
    <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-10">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Why Use RDT Video Downloader?</h2>
            <p class="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                RDT is designed to make saving publicly accessible Reddit media simple and convenient.
            </p>
        </div>

        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none pl-0 m-0">
            <li class="bg-white border border-slate-200/60 rounded-2xl p-6">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">Video With Sound</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    Some Reddit videos use separate audio and video streams. When both streams are available, RDT combines them into one MP4 file so you don't have to process the audio separately.
                </p>
            </li>

            <li class="bg-white border border-slate-200/60 rounded-2xl p-6">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">High-Quality Downloads</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    The available resolution depends on the original Reddit media and source quality. Select the highest available option when you want the best possible result.
                </p>
            </li>

            <li class="bg-white border border-slate-200/60 rounded-2xl p-6">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">No Software Required</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    RDT works in a standard web browser. You don't need to install a desktop program or mobile application to use the downloader.
                </p>
            </li>

            <li class="bg-white border border-slate-200/60 rounded-2xl p-6">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751A11.956 11.956 0 0112 2.714z"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">No Account Required</h3>
                <p class="text-slate-500 leading-relaxed text-sm">
                    Paste a Reddit link and start downloading without creating an account or providing an email address.
                </p>
            </li>

            <li class="bg-white border border-slate-200/60 rounded-2xl p-6 lg:col-span-2">
                <div class="w-9 h-9 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <svg class="text-brand-orange w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3M9 18h6"/></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 tracking-tight">Works Across Devices</h3>
                <p class="text-slate-500 leading-relaxed text-sm mb-3">
                    Use RDT from Safari, Chrome, Firefox, or another modern browser on:
                </p>
                <ul class="grid grid-cols-2 gap-2 text-slate-700 text-sm font-medium list-disc pl-5">
                    <li>iPhone and iPad</li>
                    <li>Android phones and tablets</li>
                    <li>Windows PCs</li>
                    <li>Mac computers</li>
                </ul>
            </li>
        </ul>
    </div>
</section>

<!-- More Reddit Download Tools Section -->
<section class="py-12 bg-white">
    <div class="container mx-auto px-4 max-w-4xl text-center">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2.5">More Reddit Download Tools</h2>
        <p class="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Different Reddit posts contain different types of media. RDT provides dedicated tools for common formats.
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/50 flex flex-col justify-between">
                <div>
                    <div class="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mb-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 class="font-bold text-slate-900 text-base mb-1.5">
                        <a href="/reddit-to-mp4" class="hover:text-brand-orange transition-colors">Reddit to MP4</a>
                    </h3>
                    <p class="text-slate-500 text-xs leading-relaxed mb-4">Convert a Reddit video post into a downloadable MP4 file with the available audio and video streams combined when supported.</p>
                </div>
                <a href="/reddit-to-mp4" class="text-brand-orange font-bold text-xs flex items-center gap-1 hover:underline">Explore Reddit to MP4 →</a>
            </div>

            <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/50 flex flex-col justify-between">
                <div>
                    <div class="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mb-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
                    </div>
                    <h3 class="font-bold text-slate-900 text-base mb-1.5">
                        <a href="/reddit-to-mp3" class="hover:text-brand-orange transition-colors">Reddit to MP3</a>
                    </h3>
                    <p class="text-slate-500 text-xs leading-relaxed mb-4">Extract the available audio from supported Reddit video posts and save it as an MP3 file.</p>
                </div>
                <a href="/reddit-to-mp3" class="text-brand-orange font-bold text-xs flex items-center gap-1 hover:underline">Explore Reddit to MP3 →</a>
            </div>

            <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/50 flex flex-col justify-between">
                <div>
                    <div class="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mb-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 class="font-bold text-slate-900 text-base mb-1.5">
                        <a href="/reddit-to-gif" class="hover:text-brand-orange transition-colors">Reddit GIF Downloader</a>
                    </h3>
                    <p class="text-slate-500 text-xs leading-relaxed mb-4">Save Reddit GIF-style video posts as MP4 files for easier playback and sharing.</p>
                </div>
                <a href="/reddit-to-gif" class="text-brand-orange font-bold text-xs flex items-center gap-1 hover:underline">Explore Reddit GIF Downloader →</a>
            </div>

            <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200/50 flex flex-col justify-between">
                <div>
                    <div class="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mb-3">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                    <h3 class="font-bold text-slate-900 text-base mb-1.5">
                        <a href="/reddit-image-downloader" class="hover:text-brand-orange transition-colors">Reddit Image Downloader</a>
                    </h3>
                    <p class="text-slate-500 text-xs leading-relaxed mb-4">Download images from Reddit posts and galleries without saving each image individually.</p>
                </div>
                <a href="/reddit-image-downloader" class="text-brand-orange font-bold text-xs flex items-center gap-1 hover:underline">Explore Reddit Image Downloader →</a>
            </div>
        </div>
    </div>
</section>

<!-- Device Guide Section -->
<section class="py-12 bg-slate-50 text-left">
    <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">Download Reddit Videos on iPhone, Android, and PC</h2>
        
        <div class="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed">
            <div class="bg-white p-6 rounded-2xl border border-slate-200/60">
                <h3 class="font-bold text-slate-900 text-lg mb-2">iPhone and iPad</h3>
                <p>Copy the Reddit post link, open RDT in Safari, paste the URL, and start the download. Depending on your browser and iOS version, the downloaded file may be available through the Files app before being moved to Photos.</p>
            </div>
            
            <div class="bg-white p-6 rounded-2xl border border-slate-200/60">
                <h3 class="font-bold text-slate-900 text-lg mb-2">Android</h3>
                <p>Copy the Reddit link, open RDT in Chrome or another supported browser, paste the URL, and download the available file. Downloads are normally stored in your device's Downloads folder.</p>
            </div>
            
            <div class="bg-white p-6 rounded-2xl border border-slate-200/60">
                <h3 class="font-bold text-slate-900 text-lg mb-2">Windows and Mac</h3>
                <p>Copy the Reddit post URL, paste it into RDT, select the available quality, and download the file directly through your browser.</p>
            </div>
        </div>
    </div>
</section>

<!-- What Types Section -->
<section class="py-12 bg-white text-left">
    <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 text-center">What Types of Reddit Media Can You Download?</h2>
        <p class="text-slate-600 text-sm text-center mb-8 max-w-2xl mx-auto">
            RDT supports several common types of publicly accessible Reddit media, depending on the source post and hosting format.
        </p>

        <div class="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200/60 mb-6">
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 text-sm font-medium list-disc pl-5 m-0">
                <li>Reddit video posts</li>
                <li>Videos with separate audio streams</li>
                <li>GIF-style video posts</li>
                <li>Reddit images</li>
                <li>Reddit gallery posts</li>
                <li>Supported Reddit media hosted through external sources</li>
            </ul>
        </div>

        <p class="text-slate-500 text-xs italic text-center">
            Availability and quality can vary depending on the original post, Reddit's media format, and whether the content is publicly accessible.
        </p>
    </div>
</section>

<!-- FAQ Section -->
<section id="faq" class="py-12 bg-slate-50 scroll-mt-20">
    <div class="container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-10">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Frequently Asked Questions</h2>
        </div>
        
        <div class="space-y-4 text-left">
            <?php
            $faqs = [
                [
                    'question' => 'How do I download a Reddit video?',
                    'answer' => 'Copy the link to the Reddit post, paste it into the downloader above, click Get Video, select an available quality, and download the resulting file.'
                ],
                [
                    'question' => 'Can I download Reddit videos with sound?',
                    'answer' => 'Yes. When Reddit provides separate audio and video streams, RDT combines them into a single video file with sound.'
                ],
                [
                    'question' => 'What quality can I download?',
                    'answer' => 'The available quality depends on the original media. RDT displays the formats and resolutions available for the Reddit post instead of artificially increasing the source resolution.'
                ],
                [
                    'question' => 'Does RDT require an app?',
                    'answer' => 'No. RDT works through a modern web browser, so there is no required desktop or mobile application.'
                ],
                [
                    'question' => 'Can I use RDT on my phone?',
                    'answer' => 'Yes. You can use RDT through a supported browser on iPhone, iPad, and Android devices.'
                ],
                [
                    'question' => 'Is an account required?',
                    'answer' => 'No. You can use the downloader without creating an account.'
                ],
                [
                    'question' => 'Can I download Reddit images and GIFs?',
                    'answer' => 'Yes. Use the dedicated Reddit Image Downloader or Reddit GIF Downloader tools when the post contains supported media.'
                ],
                [
                    'question' => 'Why does a Reddit video sometimes have no audio?',
                    'answer' => 'Some Reddit videos store audio and video as separate streams. If your browser or downloader retrieves only the video stream, the resulting file can be silent. RDT attempts to combine the available streams when both are accessible.'
                ]
            ];

            foreach ($faqs as $faq): ?>
                <div class="faq-item border border-slate-200 rounded-2xl overflow-hidden transition-colors hover:border-brand-orange/20 bg-white">
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

<!-- Download Reddit Media Online Section -->
<section class="py-16 bg-white text-center border-t border-slate-100">
    <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Download Reddit Media Online</h2>
        <p class="text-slate-600 text-base leading-relaxed mb-4">
            RDT Video Downloader provides a simple browser-based way to save publicly accessible Reddit videos and other supported media. Paste a Reddit post URL above and let the downloader identify the available formats.
        </p>
        <p class="text-slate-500 text-sm font-medium mb-8">
            No complicated setup. No desktop software. Just copy, paste, and download.
        </p>
        <a href="#hero" id="start-downloading-btn" class="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-light text-white font-extrabold text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30">
            <span>Start Downloading</span>
            <span>→</span>
        </a>
    </div>
</section>

<!-- Important Section -->
<section class="py-10 bg-slate-50 border-t border-slate-200/60 text-slate-600 text-sm text-center">
    <div class="container mx-auto px-4 max-w-3xl space-y-3">
        <h2 class="text-xl font-bold text-slate-900">Important</h2>
        <p class="leading-relaxed">
            RDT Video Downloader is an independent service and is not affiliated with Reddit Inc. Reddit and related trademarks belong to their respective owners.
        </p>
        <p class="leading-relaxed text-slate-500">
            Only download content that you have permission to save or use, and respect the rights of the original content creators.
        </p>
    </div>
</section>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
