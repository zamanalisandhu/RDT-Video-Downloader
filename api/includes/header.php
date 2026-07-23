<?php
/**
 * RDT Video Downloader - Site Header Template
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

// Safe fallbacks for metadata
$title = rdt_clean($page_title ?? DEFAULT_SEO_TITLE);
$desc = rdt_clean($page_desc ?? DEFAULT_SEO_DESC);
$path = rdt_clean($page_path ?? '/');
$canonical = 'https://rdtvideodownloader.com' . $path;

// Auto-detect and generate structured schemas (technical SEO optimization)
if (!isset($schema_markups)) {
    $schema_markups = [];
}

// 1. Generate FAQ Schema if FAQs exist on the page
$faqs_detected = $mp4Faqs ?? $mp3Faqs ?? $gifFaqs ?? $imgFaqs ?? null;
if (!empty($faqs_detected) && is_array($faqs_detected)) {
    $schema_faq = [
        "@context" => "https://schema.org",
        "@type" => "FAQPage",
        "mainEntity" => []
    ];
    foreach ($faqs_detected as $faq) {
        $q = $faq['q'] ?? $faq['question'] ?? '';
        $a = $faq['a'] ?? $faq['answer'] ?? '';
        if (!empty($q) && !empty($a)) {
            $schema_faq['mainEntity'][] = [
                "@type" => "Question",
                "name" => $q,
                "acceptedAnswer" => [
                    "@type" => "Answer",
                    "text" => $a
                ]
            ];
        }
    }
    $schema_markups[] = $schema_faq;
}

// 2. Generate WebApplication Schema for specialized tool landing pages
if ($path !== '/' && in_array($path, ['/reddit-to-mp4', '/reddit-to-mp3', '/reddit-to-gif', '/reddit-image-downloader'])) {
    $clean_tool_title = str_replace(' — ', ' ', $title);
    $schema_tool = [
        "@context" => "https://schema.org",
        "@type" => "WebApplication",
        "name" => $clean_tool_title,
        "url" => $canonical,
        "description" => $desc,
        "applicationCategory" => "MultimediaApplication",
        "operatingSystem" => "Web, iOS, Android, Windows, Mac",
        "offers" => [
            "@type" => "Offer",
            "price" => "0",
            "priceCurrency" => "USD"
        ]
    ];
    $schema_markups[] = $schema_tool;
}

// Nav links definition
$nav_links = [
    ['name' => 'Home', 'href' => '/'],
    ['name' => 'MP4', 'href' => '/reddit-to-mp4'],
    ['name' => 'MP3', 'href' => '/reddit-to-mp3'],
    ['name' => 'GIF', 'href' => '/reddit-to-gif'],
    ['name' => 'Image', 'href' => '/reddit-image-downloader'],
    ['name' => 'Blog', 'href' => '/blog'],
    ['name' => 'About', 'href' => '/about'],
];

function is_active_route($href) {
    $uri = $_SERVER['REQUEST_URI'];
    $uri = strtok($uri, '?'); // strip query parameters
    
    if ($href === '/') {
        return $uri === '/' || $uri === '/index.php' || $uri === '/index';
    }
    return strpos($uri, $href) === 0;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
    <meta name="description" content="<?php echo $desc; ?>">
    <meta name="keywords" content="<?php echo DEFAULT_SEO_KEYWORDS; ?>">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="<?php echo $canonical; ?>">
    
    <!-- OpenGraph Metadata -->
    <meta property="og:title" content="<?php echo $title; ?>">
    <meta property="og:description" content="<?php echo $desc; ?>">
    <meta property="og:url" content="<?php echo $canonical; ?>">
    <meta property="og:type" content="website">
    <meta property="og:image" content="<?php echo SITE_URL; ?>/og-image.png">
    <meta property="og:site_name" content="<?php echo SITE_NAME; ?>">
    
    <!-- Twitter Cards Metadata -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo $title; ?>">
    <meta name="twitter:description" content="<?php echo $desc; ?>">
    <meta name="twitter:image" content="<?php echo SITE_URL; ?>/twitter-card.png">

    <!-- Favicons -->
    <link rel="icon" href="/logo.png" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- Google Fonts API -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">

    <!-- Custom CSS (compiled Tailwind & Downloader layouts) -->
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="/assets/css/downloader.css?v=<?php echo time(); ?>">

    <!-- Structured Data Schema Markup -->
    <?php if (!empty($schema_markups)): ?>
        <?php foreach ($schema_markups as $schema): ?>
            <script type="application/ld+json">
<?php echo json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); ?>
            </script>
        <?php endforeach; ?>
    <?php endif; ?>
</head>
<body class="min-h-screen flex flex-col bg-slate-50/30">

    <div class="relative z-[100] w-full px-4 pt-3 pb-1">
        <header class="max-w-6xl mx-auto w-full py-4 px-1 flex items-center justify-between bg-transparent">
            <!-- Brand Logo -->
            <div class="flex items-center gap-2">
                <a href="/" class="flex items-center gap-2.5 z-[110] group">
                    <div class="relative w-8 h-8 md:w-9 md:h-9 rounded-lg overflow-hidden shadow-sm shadow-brand-orange/10 transition-transform duration-200 group-hover:scale-105">
                        <img src="/logo.png" alt="RDT Video Downloader Logo" class="object-cover w-full h-full" width="36" height="36" />
                    </div>
                    <span class="text-base sm:text-lg md:text-[19px] font-extrabold text-slate-900 tracking-tight transition-colors">
                        RDT<span class="text-brand-orange">Video</span>Downloader
                    </span>
                </a>
            </div>

            <!-- Desktop Links (Centered Navigation) -->
            <nav class="hidden md:flex items-center gap-6">
                <ul class="flex items-center gap-6 list-none p-0 m-0">
                    <?php foreach ($nav_links as $link): ?>
                        <li>
                            <a href="<?php echo htmlspecialchars($link['href']); ?>" 
                               class="text-[14px] md:text-[14.5px] font-semibold transition-all py-1.5 relative block <?php echo is_active_route($link['href']) ? 'text-brand-orange font-bold' : 'text-slate-500 hover:text-brand-orange'; ?>">
                                <span><?php echo htmlspecialchars($link['name']); ?></span>
                                <?php if (is_active_route($link['href'])): ?>
                                    <span class="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange rounded-full animate-fade-in" />
                                <?php endif; ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </nav>

            <!-- Extension Link / Chrome Store Call to Action -->
            <div class="hidden md:flex items-center">
                <a href="https://chromewebstore.google.com/detail/rdt-video-downloader-save/mjphhkbhfkiffmlldcjcapkmninehbej"
                   target="_blank" rel="noopener noreferrer" 
                   class="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-light text-white font-extrabold rounded-xl text-[13.5px] md:text-[14px] shadow-sm transition-all active:scale-[0.98]">
                    Extension
                </a>
            </div>

            <!-- Mobile Drawer Menu Toggle -->
            <div class="md:hidden flex items-center">
                <button type="button" id="mobile-menu-toggle" class="z-[140] p-2 text-slate-800 focus:outline-none rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors relative w-9 h-9 flex items-center justify-center overflow-hidden" aria-label="Toggle Navigation Drawer">
                    <div class="relative w-5 h-5 flex items-center justify-center">
                        <span id="menu-open-icon" class="absolute transition-all duration-300 transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg></span>
                        <span id="menu-close-icon" class="absolute transition-all duration-300 transform hidden"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></span>
                    </div>
                </button>
            </div>
        </header>
    </div>

    <!-- Mobile Navigation Overlay Drawer -->
    <div id="mobile-drawer" class="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[120] hidden" style="opacity: 0; transition: opacity 0.3s ease;">
        <div id="mobile-drawer-content" class="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[130] shadow-2xl flex flex-col" style="transform: translateX(100%); transition: transform 0.3s ease; height: 100vh;">
            <div class="p-5 flex items-center justify-between border-b border-slate-50">
                <div class="flex items-center gap-2">
                    <div class="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm shadow-brand-orange/20">
                        <img src="/logo.png" alt="Logo" class="object-cover w-full h-full" width="32" height="32" />
                    </div>
                    <span class="font-extrabold text-slate-800 text-sm">
                        RDT <span class="text-brand-orange">Video</span> Downloader
                    </span>
                </div>
            </div>

            <!-- Drawer Links List -->
            <div class="p-5 flex-grow overflow-y-auto">
                <ul class="flex flex-col list-none p-0 m-0">
                    <?php foreach ($nav_links as $link): ?>
                        <li class="border-b border-slate-50 last:border-none">
                            <a href="<?php echo htmlspecialchars($link['href']); ?>" 
                               class="flex items-center justify-between py-4 text-[14.5px] font-bold transition-all <?php echo is_active_route($link['href']) ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'; ?>">
                                <span><?php echo htmlspecialchars($link['name']); ?></span>
                                <svg class="w-4 h-4 <?php echo is_active_route($link['href']) ? 'text-brand-orange' : 'text-slate-300'; ?>" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <!-- Drawer Extension Prompt -->
            <div class="p-5 border-t border-slate-100 bg-slate-50/50">
                <a href="https://chromewebstore.google.com/detail/rdt-video-downloader-save/mjphhkbhfkiffmlldcjcapkmninehbej"
                   target="_blank" rel="noopener noreferrer"
                   class="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-light text-white text-center font-extrabold rounded-xl shadow-md shadow-brand-orange/15 flex items-center justify-center gap-2 text-sm active:scale-[0.98] transition-transform">
                    Install Extension
                </a>
                <div class="mt-6 flex justify-center gap-6">
                    <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Premium Quality</span>
                    <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fast Speed</span>
                </div>
            </div>
        </div>
    </div>
