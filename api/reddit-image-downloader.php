<?php
/**
 * RDT Video Downloader - Reddit Image Downloader Tool Page
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$page_title = "Reddit Image Downloader — Save Reddit Gallery & Photos";
$page_desc = "Free online Reddit image downloader. Download full resolution photos, wallpapers, and multi-image galleries as a single ZIP file.";
$page_path = "/reddit-image-downloader";

$imgFaqs = [
    [
        "q" => "How do I download images from Reddit?",
        "a" => "Copy the link of the Reddit post containing the photo or album, paste it into our search bar, and click Get Video. RDT will crawl the image source link and present download buttons for instant saving."
    ],
    [
        "q" => "Does RDT support multi-image gallery posts?",
        "a" => "Yes. RDT is a full-featured Reddit gallery downloader. It automatically extracts every image in the gallery slideshow and allows you to download them individually or package them into a single ZIP file."
    ],
    [
        "q" => "Are the saved images original quality?",
        "a" => "Yes. We crawl the metadata directly and redirect you to the uncompressed source file hosted on Reddit's static servers (like i.redd.it). We never compress, resize, or alter the files."
    ],
    [
        "q" => "Can I use RDT on iPhone to save photos?",
        "a" => "Yes. Copy the link from the Reddit app, open Safari, paste the link on rdtvideodownloader.com, and tap Download. You can hold down the image to add it directly to your Photos app."
    ],
    [
        "q" => "Is there a limit on how many images I can download in a ZIP?",
        "a" => "No. Our script dynamically extracts all slides. Whether a gallery contains 2 images or 20, RDT bundles them into a ZIP container without caps or daily limits."
    ],
    [
        "q" => "Can I download images from NSFW subreddits?",
        "a" => "Yes. As long as the NSFW post is publicly viewable without requiring an account login, our backend crawler will parse the layout and retrieve the source image URLs."
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
                Reddit Image Downloader — Save Galleries &amp; Photos
            </h1>
            <p class="text-sm sm:text-base md:text-lg text-slate-500 font-semibold max-w-2xl mx-auto leading-relaxed">
                Extract high-resolution images, wallpapers, and slide albums from any Reddit post URL. Fast, unlimited, and watermark-free.
            </p>
        </div>

        <!-- Downloader Tool Widget -->
        <div class="relative z-20">
            <?php require_once __DIR__ . '/includes/downloader-tool.php'; ?>
        </div>
    </div>
</section>

<!-- How to Download Reddit Galleries & Photos -->
<section class="py-12 bg-white border-b border-slate-100 text-left">
    <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            How to Download Reddit Galleries &amp; Photos
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-center mb-3">1</div>
                <h3 class="font-bold text-slate-900 mb-1.5">Copy Post Link</h3>
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Navigate to the Reddit post containing the photo, wallpaper, or image collection, and copy the link.
                </p>
            </div>
            
            <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-center mb-3">2</div>
                <h3 class="font-bold text-slate-900 mb-1.5">Paste on RDT</h3>
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Paste the link into the Image Downloader form and click Get Video to crawl the asset metadata.
                </p>
            </div>

            <div class="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                <div class="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-center mb-3">3</div>
                <h3 class="font-bold text-slate-900 mb-1.5">Download High-Res</h3>
                <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Select the high-resolution source option, or download the entire slideshow collection as a single ZIP file.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Detailed Image Explanation -->
<section class="py-12 bg-slate-50/50 border-t border-b border-slate-100 text-left">
    <div class="container mx-auto px-4 max-w-4xl space-y-12">
        
        <!-- Part 1: Full-resolution downloads -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Full-Resolution Photo &amp; Gallery Downloader
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    Reddit users frequently share stunning digital art, high-resolution photography, desktop wallpapers, and infographic guides. Our <strong>reddit image downloader</strong> resolves the raw file link directly, bypassing the compressed versions displayed on the browser player feed.
                </p>
                <p>
                    By retrieving files directly from the static CDN (using paths like `i.redd.it` and `preview.redd.it`), RDT preserves the original file formats, colors, and metadata without adding compression artifacts or visual noise. What the artist uploaded is exactly what you save.
                </p>
            </div>
        </div>

        <!-- Part 2: Gallery Crawler & ZIP -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Save Multi-Image Slideshows as a Single ZIP File
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    Saving twenty images from an album slideshow individually is time-consuming. Our specialized <strong>reddit gallery downloader</strong> crawls the metadata API, detects all image objects in the array, and lets you download them all in a single click wrapped in a ZIP archive.
                </p>
                <p>
                    Whether you are archiving educational slides, infographic series, r/comics illustrations, or travel albums, RDT handles the parsing in under 2 seconds. The client-side ZIP engine processes files directly, so you don't have to wait for heavy server-side packaging.
                </p>
            </div>
        </div>

        <!-- Part 3: Image hosting & preview bypass -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Bypassing Compressed Previews and WebP Formatting
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    Reddit uses modern WebP and preview scaling formats to save bandwidth on mobile feeds. If you try to save a photo by right-clicking or tapping in the app feed, you often save a compressed, low-resolution thumbnail instead of the original.
                </p>
                <p>
                    Our engine reads the post's JSON metadata to locate the master asset file. If the original image was uploaded as a high-density PNG or JPG, RDT retrieves that exact master URL. This ensures you get crisp wallpapers and readable infographics without pixelation.
                </p>
            </div>
        </div>

        <!-- Part 4: Phone Guides -->
        <div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                How to Download Reddit Photos on Mobile Devices
            </h2>
            <div class="prose prose-slate max-w-none text-sm md:text-base text-slate-600 space-y-4 leading-relaxed">
                <p>
                    <strong>iPhone and iPad:</strong> Open Reddit, tap the Share button, and copy the link. Launch Safari, paste the link on our page, and tap Get Video. Tap the high-resolution image links. Safari will load the full-res file in a new tab. Long-press on the photo and select 'Add to Photos' to save it. For albums, you can tap 'Download ZIP' to save the collection directly to your Files downloads list.
                </p>
                <p>
                    <strong>Android:</strong> Copy the link, launch Chrome, and paste it on RDT. Tap Get Video. Tap the download link next to your desired image or click 'Download ZIP'. Chrome writes the file directly to your Downloads folder, and it will instantly show up in your Gallery and Google Photos.
                </p>
            </div>
        </div>

    </div>
</section>

<!-- Related Tools Section Component -->
<?php require_once __DIR__ . '/includes/related-tools-component.php'; ?>

<!-- Dedicated Image FAQs -->
<section id="faq" class="py-12 bg-white scroll-mt-20 text-left">
    <div class="container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-8">
            <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">
                Reddit Image Downloader FAQs
            </h2>
            <p class="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Frequently asked questions about downloading Reddit photos, galleries, and wallpapers.
            </p>
        </div>

        <div class="space-y-4">
            <?php foreach ($imgFaqs as $faq): ?>
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
