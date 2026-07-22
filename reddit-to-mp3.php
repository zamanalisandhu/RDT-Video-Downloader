<?php
/**
 * RDT Video Downloader - Reddit to MP3 Tool Page
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$page_title = "Reddit to MP3 Converter — Extract Audio from Reddit Video";
$page_desc = "Free online Reddit to MP3 converter. Extract audio tracks, songs, and voiceovers from any Reddit video link as high-quality MP3 files.";
$page_path = "/reddit-to-mp3";

$mp3Faqs = [
    [
        "q" => "How do I convert a Reddit video to MP3?",
        "a" => "Simply copy the Reddit post link containing the audio or video, paste it into our search bar, and click Get Video. RDT will analyze the post and display the MP3 extraction option. Click the download button next to it to save the audio file instantly."
    ],
    [
        "q" => "What audio quality bitrate do you support?",
        "a" => "We extract the raw audio stream from Reddit's media servers without adding lossy compression. Typically, this yields a clean, high-fidelity MP3/M4A file up to 128kbps or 256kbps depending on the original uploaded video bitrate."
    ],
    [
        "q" => "Can I extract MP3s from Reddit on my phone?",
        "a" => "Yes. The extractor runs entirely online. Copy the link from the Reddit app, open Safari (iOS) or Chrome (Android), and use our converter to save the audio file."
    ],
    [
        "q" => "Is it possible to extract audio from silent Reddit videos?",
        "a" => "No. If the original poster uploaded a silent clip or image without audio metadata, there is no sound track available to extract."
    ],
    [
        "q" => "Do I need to sign up or pay to extract audio?",
        "a" => "No. RDT is a 100% free web service. There are no registration walls, paywalls, daily conversion limits, or software installations required."
    ],
    [
        "q" => "What devices support playing the extracted MP3 files?",
        "a" => "MP3 is a universally supported audio container. The downloaded files will play correctly on Windows, macOS, Android, iOS, smart TVs, and all standalone music player applications."
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
                Reddit to MP3 Converter — Extract Reddit Audio
            </h1>
            <p class="text-sm sm:text-base md:text-lg text-slate-500 font-semibold max-w-2xl mx-auto leading-relaxed">
                Extract clean, high-quality audio tracks from any Reddit video post. Fast, unlimited, free, and works on all devices without signup.
            </p>
        </div>

        <!-- Downloader Tool Widget -->
        <div class="relative z-20">
            <?php require_once __DIR__ . '/includes/downloader-tool.php'; ?>
        </div>
    </div>
</section>

<!-- How to Extract Reddit Audio to MP3 -->
<section class="py-12 bg-white border-b border-slate-100 text-left">
    <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            How to Extract Reddit Audio to MP3
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-center mb-3">1</div>
                <h3 class="font-bold text-slate-900 mb-1.5">Copy Post URL</h3>
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Find the Reddit video containing the sound track. Tap Share and select Copy Link.
                </p>
            </div>
            
            <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-center mb-3">2</div>
                <h3 class="font-bold text-slate-900 mb-1.5">Paste &amp; Fetch</h3>
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Paste the link into the RDT Audio Extractor input field and click the processing button.
                </p>
            </div>

            <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-center mb-3">3</div>
                <h3 class="font-bold text-slate-900 mb-1.5">Save MP3 File</h3>
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Click the download option next to the extracted audio track to save the MP3 directly.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Detailed MP3 Explanation -->
<section class="py-12 bg-slate-50/50 border-t border-b border-slate-100 text-left">
    <div class="container mx-auto px-4 max-w-4xl space-y-12">
        
        <!-- Part 1: Why Extract Audio Only -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Why Use an Audio Extractor for Reddit Posts?
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    There are many scenarios where saving the visual element of a post is unnecessary. If you are listening to a podcast clip, an interview on r/IAmA, a cover song on r/music, or a funny soundbite from a meme, downloading the full 1080p MP4 file uses excessive bandwidth and storage space.
                </p>
                <p>
                    By extracting only the sound track as an MP3 or M4A file, you save up to 90% of the download file size. A 100MB HD video file is often reduced to a clean 3MB audio file. This makes it perfect for archiving spoken-word tutorials, sound effects libraries, and ringtones.
                </p>
            </div>
        </div>

        <!-- Part 2: Technical Isolation Flow -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                The Technology Behind Reddit Audio Extraction
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    Reddit hosts uploads on its media server array under the `v.redd.it` domain. Under the MPEG-DASH streaming protocol, video and audio are kept completely isolated. Standard downloaders fetch the video stream first and ignore the audio segment entirely, leading to silent videos.
                </p>
                <p>
                    Our specialized <strong>reddit audio extractor</strong> does the opposite. It parses the Media Presentation Description manifest (`.mpd`), skips the visual resolution lists, and grabs the direct source URL of the AAC audio stream. The engine then repackages this raw audio track into a standard, highly compatible MP3 file server-side in under a second.
                </p>
            </div>
        </div>

        <!-- Part 3: Mobile Guide for MP3s -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                How to Save Reddit MP3s on iOS and Android
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    <strong>iPhone and iPad:</strong> Open Safari, paste the Reddit post link, and click Get Video. Locate the MP3 download button. Tap and hold the button, then select 'Download Linked File'. Safari will download the file directly to your iOS Files application. You can access it by opening the Files app and navigating to the 'Downloads' folder.
                </p>
                <p>
                    <strong>Android:</strong> Copy the Reddit post link, launch Google Chrome, and paste it into our search bar. Click the processing button, then tap Download next to the MP3 format options. The audio file saves directly to your device's Downloads directory and will show up in any media player or files manager app.
                </p>
            </div>
        </div>

        <!-- Part 4: Quality & Integrity Preservation -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Original Bitrate &amp; Quality Preservation
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    RDT respects the quality of the content. We do not re-encode or down-sample the audio stream unless necessary. If the original creator uploaded high-fidelity sound, our tool extracts it at that exact bitrate (typically up to 256kbps or 320kbps in AAC format).
                </p>
                <p>
                    This is ideal for musicians, sample editors, and podcast curators who require high-quality audio tracks without compression hiss, phase issues, or background noise introduced by low-quality transcoders.
                </p>
            </div>
        </div>

    </div>
</section>

<!-- Related Tools Section Component -->
<?php require_once __DIR__ . '/includes/related-tools-component.php'; ?>

<!-- Dedicated MP3 FAQs -->
<section id="faq" class="py-12 bg-white scroll-mt-20 text-left">
    <div class="container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">
                Reddit to MP3 Converter FAQs
            </h2>
            <p class="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Frequently asked questions about extracting audio tracks from Reddit videos.
            </p>
        </div>

        <div class="space-y-4">
            <?php foreach ($mp3Faqs as $faq): ?>
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
