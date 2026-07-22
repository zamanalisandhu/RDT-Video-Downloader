<?php
/**
 * RDT Video Downloader - Reddit to MP4 Tool Page
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$page_title = "Reddit to MP4 Converter — Convert Reddit Video to MP4 with Sound";
$page_desc = "Free online Reddit to MP4 converter. Convert Reddit links, posts, and v.redd.it videos to high-quality MP4 with audio restored automatically. Try it now.";
$page_path = "/reddit-to-mp4";

$mp4Faqs = [
    [
        "q" => "How do I convert a Reddit URL to MP4 with audio?",
        "a" => "To convert a Reddit URL to MP4, copy the post link from the Reddit app or web browser, paste it into our search box, and click Get Video. RDT retrieves the split video and audio streams from v.redd.it, merges them server-side into a single MP4, and displays download options. Choose your desired quality and click the download button to save it."
    ],
    [
        "q" => "Why do downloaded Reddit MP4 files have no sound elsewhere?",
        "a" => "Reddit delivers media using MPEG-DASH streaming, separating the H.264 video track from the audio stream (AAC) on their CDN servers. Basic online downloaders only capture the visual file, resulting in a silent MP4. RDT solves this by running a server-side FFmpeg muxing process that joins both audio and video tracks into a unified MP4 container before you save it."
    ],
    [
        "q" => "Can I convert Reddit links to MP4 on my iPhone?",
        "a" => "Yes. Open Safari on iOS, paste the Reddit link into RDT, and click Get Video. Tap and hold the Download button next to your resolution choice, then select 'Download Linked File'. The video will save to Safari's Downloads folder. Open the Files app, tap the downloaded file, select the share sheet icon, and tap 'Save Video' to move it to your Photos Camera Roll."
    ],
    [
        "q" => "Does your converter compress the original video quality?",
        "a" => "No. RDT processes raw streams directly from Reddit's media servers. If the original post was uploaded in 1080p Full HD or 4K, our engine will deliver the exact source file at its original bitrate and resolution without adding extra compression, watermarks, or logos."
    ],
    [
        "q" => "Is RDT Reddit to MP4 downloader completely free?",
        "a" => "Yes. Our web application is 100% free with no premium paywalls, daily conversion limits, or required user registration. You can convert as many video links as you need without signup or software installation."
    ],
    [
        "q" => "Which browsers are compatible with the MP4 converter?",
        "a" => "RDT is built using standard modern web protocols and is fully compatible with Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, and Opera on all operating systems (Windows, macOS, iOS, Android, Linux)."
    ]
];

require_once __DIR__ . '/includes/header.php';
?>

<!-- Hero Section -->
<section class="pt-10 pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
    <!-- Premium Background Grid Pattern -->
    <div class="absolute inset-0 opacity-[0.35] pointer-events-none" 
         style="background-image: radial-gradient(#ff4500 1px, transparent 1px); background-size: 24px 24px;"></div>

    <!-- Decorative Glowing Orbs -->
    <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-[#FF4500]/10 to-orange-400/5 rounded-full blur-[140px] pointer-events-none animate-pulse" style="animation-duration: 8s;"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-gradient-to-br from-[#0079D3]/8 to-[#0079D3]/3 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="container mx-auto px-4 relative z-10 text-center">
        <!-- Main Hero Header -->
        <div class="max-w-4xl mx-auto mb-6">
            <h1 class="text-2xl sm:text-4xl md:text-[46px] font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
                Reddit to MP4 Converter — Convert Reddit Video to MP4
            </h1>
            <p class="text-sm sm:text-base md:text-lg text-slate-500 font-semibold max-w-2xl mx-auto leading-relaxed">
                Convert any Reddit post URL to standard MP4 with sound. Fast, unlimited, watermark-free, and works across all devices in under 3 seconds.
            </p>
        </div>

        <!-- Downloader Tool Widget -->
        <div class="relative z-20">
            <?php require_once __DIR__ . '/includes/downloader-tool.php'; ?>
        </div>
    </div>
</section>

<!-- How to Convert Reddit to MP4 Online -->
<section class="py-12 bg-white border-b border-slate-100 text-left">
    <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            How to Convert Reddit to MP4 Online
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-center mb-3">1</div>
                <h3 class="font-bold text-slate-900 mb-1.5">Copy Reddit Link</h3>
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Open the Reddit post containing the video clip. Tap the Share button and select Copy Link.
                </p>
            </div>
            
            <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-center mb-3">2</div>
                <h3 class="font-bold text-slate-900 mb-1.5">Paste &amp; Convert</h3>
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Paste the URL into our Reddit to MP4 downloader and click the convert button to parse the streams.
                </p>
            </div>

            <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-center mb-3">3</div>
                <h3 class="font-bold text-slate-900 mb-1.5">Download MP4 File</h3>
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Choose 1080p, 720p, or 480p resolution and click Download to save the MP4 with audio.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Detailed MP4 Explanation -->
<section class="py-12 bg-slate-50/50 border-t border-b border-slate-100 text-left">
    <div class="container mx-auto px-4 max-w-4xl space-y-12">
        
        <!-- Part 1: Why Use a Dedicated Converter -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Why Use a Dedicated Reddit MP4 Downloader?
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    MP4 is the universal standard for digital video playback. It offers high compatibility across smartphones, tablets, smart TVs, game consoles, and video editing applications like Adobe Premiere Pro, CapCut, and DaVinci Resolve. When you convert a Reddit video to MP4 using RDT, you are guaranteed a clean, compliant stream that doesn't suffer from missing format issues, playback jitter, or codec errors.
                </p>
                <p>
                    Other generic web-based extraction utilities often save videos as raw, unmerged transport streams (`.ts`), or compress the original file to a degree where it becomes blurry and useless for archiving or content creation. RDT acts as a lossless wrapper that directly grabs the original file streams from Reddit's content delivery networks, packages them cleanly, and hands over the complete media file.
                </p>
            </div>
        </div>

        <!-- Part 2: DASH Muxing Deep Dive -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Solving the Silent Video Issue with MPEG-DASH Muxing
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    The reason most online save-methods fail is because Reddit serves its media streams via Dynamic Adaptive Streaming over HTTP (MPEG-DASH). When a user uploads a video file, Reddit splits the asset into an isolated, silent video channel and an isolated audio stream. The official web player fetches these files on the fly and stitches them together in memory as you watch.
                </p>
                <p>
                    If you try to right-click and save the video directly from the web browser, you only fetch the silent visual track. Our converter fixes this by analyzing the underlying DASH manifest (`.mpd`), extracting the direct URLs for both the high-quality H.264 video file and the AAC audio stream, and merging them on our servers using FFmpeg. This muxing process ensures your saved MP4 contains perfectly synchronized stereo audio.
                </p>
            </div>
        </div>

        <!-- Part 3: Step-by-Step mobile guides -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                How to Save Reddit MP4s on Mobile Devices
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    Downloading media can be challenging on mobile devices due to operating system restrictions. Here is a clear guide on how to save Reddit videos to your phone.
                </p>
                <p>
                    <strong>iOS (iPhone and iPad):</strong> Apple's Safari handles file downloads differently from desktop. Copy the Reddit post link, launch Safari, and visit our downloader. Paste the URL and click Get Video. Once the resolution menu loads, tap and hold the Download button for the 1080p version. Select 'Download Linked File' from the context menu. You can track progress via the downloads manager icon in Safari's address bar. Once the download is complete, open the iOS Files app, tap the downloaded file, select the Share button, and click 'Save Video' to export it straight to your Camera Roll.
                </p>
                <p>
                    <strong>Android:</strong> The process is much simpler. Copy the URL from the official Reddit application, open Google Chrome, and navigate to our page. Paste the URL and tap Get Video. Tap the Download button next to your desired resolution. The file will save directly to your Downloads folder and index automatically inside Google Photos, Gallery, and VLC players.
                </p>
            </div>
        </div>

        <!-- Part 4: Technical Benefits for Content Creators -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Benefits for Video Editors and Content Creators
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    Content curators, commentary channels, and video editors require clean source files. Screen recording your phone or desktop is an outdated workflow that results in visible UI overlays, notifications, low bitrates, and variable frame rates that cause audio desync in editing timelines.
                </p>
                <p>
                    By extracting the original MP4 directly from Reddit's media databases, RDT provides a clean master file. You get constant frame rate video files with no branding logos, watermarks, or visual distractions, allowing you to drag-and-drop the file directly into your editing software.
                </p>
            </div>
        </div>

    </div>
</section>

<!-- Related Tools Section Component -->
<?php require_once __DIR__ . '/includes/related-tools-component.php'; ?>

<!-- Dedicated MP4 FAQs -->
<section id="faq" class="py-12 bg-white scroll-mt-20 text-left">
    <div class="container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">
                Reddit to MP4 Converter FAQs
            </h2>
            <p class="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Frequently asked questions about downloading Reddit videos in MP4 format.
            </p>
        </div>

        <div class="space-y-4">
            <?php foreach ($mp4Faqs as $faq): ?>
                <div class="bg-slate-50 border border-slate-200/70 rounded-xl p-5">
                    <h3 class="font-bold text-slate-900 text-base md:text-lg mb-2 flex items-center gap-2">
                        <svg class="text-[#FF4500] shrink-0 w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                        <span><?php echo htmlspecialchars($faq['q']); ?></span>
                    </h3>
                    <p class="text-slate-600 text-sm md:text-base leading-relaxed pl-7">
                        <?php echo htmlspecialchars($faq['a']); ?>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
