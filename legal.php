<?php
/**
 * RDT Video Downloader - Dynamic Legal Documents Template
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$slug = $_GET['slug'] ?? '';
if (empty($slug)) {
    header("Location: /");
    exit;
}

$filepath = __DIR__ . "/content/legal/{$slug}.md";

if (!file_exists($filepath)) {
    header("HTTP/1.1 404 Not Found");
    $page_title = "404 - Page Not Found";
    require_once __DIR__ . '/includes/header.php';
    ?>
    <section class="py-20 text-center flex-grow flex items-center justify-center bg-white">
        <div class="max-w-md mx-auto px-4 text-center">
            <h1 class="text-6xl font-black text-slate-200 mb-4">404</h1>
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Document Not Found</h2>
            <p class="text-slate-500 mb-8 text-sm">The legal document you are looking for does not exist or has been moved.</p>
            <a href="/" class="px-5 py-2.5 bg-brand-orange text-white font-extrabold rounded-xl text-sm active:scale-[0.98] transition-transform">Back to Home</a>
        </div>
    </section>
    <?php
    require_once __DIR__ . '/includes/footer.php';
    exit;
}

// Read and parse markdown file
$raw_content = file_get_contents($filepath);
$parts = explode('---', $raw_content, 3);

$title = "";
$date = "";
$md_content = "";

if (count($parts) >= 3) {
    $frontmatter = trim($parts[1]);
    $md_content = trim($parts[2]);
    
    // Parse frontmatter yaml-like variables
    $fm_lines = explode("\n", $frontmatter);
    foreach ($fm_lines as $line) {
        if (strpos($line, ':') !== false) {
            list($key, $value) = explode(':', $line, 2);
            $key = trim($key);
            $value = trim($value, " \t\n\r\0\x0B\"'");
            if ($key === 'title') $title = $value;
            if ($key === 'date') $date = $value;
        }
    }
} else {
    $md_content = trim($raw_content);
}

// Parse markdown to HTML
$html_content = rdt_parse_markdown($md_content);

// Set SEO Metadata matching Next.js page SEO setup
$LEGAL_METADATA = [
    'dmca' => [
        'title' => "DMCA Notice — Copyright Policy | RDT Video Downloader",
        'description' => "Read RDT Video Downloader's DMCA policy. Learn how to file a takedown notice for copyrighted content and our process for handling infringement claims."
    ],
    'privacy-policy' => [
        'title' => "Privacy Policy — How We Handle Your Data | RDT Video Downloader",
        'description' => "Our privacy policy explains what data we collect (none), how we process requests (real-time, no logs), and your rights. We don't store URLs, files, or personal identifiers."
    ],
    'terms-of-service' => [
        'title' => "Terms of Service — Usage Agreement | RDT Video Downloader",
        'description' => "Review the terms of service for using RDT Video Downloader. Acceptable use, intellectual property, fair use guidelines, and limitation of liability."
    ]
];

$meta = $LEGAL_METADATA[$slug] ?? [
    'title' => "Legal — " . ($title ?: $slug) . " | RDT Video Downloader",
    'description' => "RDT Video Downloader legal document."
];

$page_title = $meta['title'];
$page_desc = $meta['description'];
$page_path = "/legal/{$slug}";

require_once __DIR__ . '/includes/header.php';

// Sidebar items list
$all_legal_items = [
    ['slug' => 'dmca', 'title' => 'DMCA Notice'],
    ['slug' => 'privacy-policy', 'title' => 'Privacy Policy'],
    ['slug' => 'terms-of-service', 'title' => 'Terms of Service']
];
?>

<main class="min-h-screen flex flex-col flex-grow bg-slate-50/30">
    <!-- Legal Header -->
    <header class="pt-10 pb-6 bg-white border-b border-slate-100">
        <div class="container mx-auto px-4 max-w-6xl text-left">
            <a href="/" class="inline-flex items-center gap-2 text-slate-500 hover:text-brand-orange font-bold text-sm mb-5 transition-colors group">
                <svg class="group-hover:-translate-x-1 transition-transform w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
                <span>Back to Home</span>
            </a>
            
            <div class="flex items-center gap-3 text-brand-orange mb-6">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span class="font-bold tracking-widest uppercase text-sm">Legal Documentation</span>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                <?php echo htmlspecialchars($title); ?>
            </h1>
            
            <div class="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>Last updated: <?php echo htmlspecialchars($date); ?></span>
                </span>
                <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <span>Official Policy</span>
                </span>
            </div>
        </div>
    </header>

    <article class="flex-grow py-8 text-left">
        <div class="container mx-auto px-4 max-w-6xl">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <!-- Sidebar Navigation -->
                <aside class="lg:col-span-1">
                    <nav class="sticky top-24 space-y-2">
                        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">All Policies</h3>
                        <ul class="space-y-2 list-none pl-0 m-0">
                            <?php foreach ($all_legal_items as $item): ?>
                                <li>
                                    <a href="/legal/<?php echo $item['slug']; ?>"
                                       class="group flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all <?php
                                            echo ($slug === $item['slug']) 
                                                ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                                                : 'bg-white text-slate-600 hover:bg-white hover:text-brand-orange border border-transparent hover:border-slate-100 shadow-sm';
                                       ?>">
                                        <span><?php echo $item['title']; ?></span>
                                        <svg class="w-3.5 h-3.5 transition-opacity <?php echo ($slug === $item['slug']) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'; ?>" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        
                        <div class="mt-8 pt-8 border-t border-slate-100">
                            <a href="/contact" 
                               class="flex flex-col gap-2 p-6 bg-slate-900 rounded-[32px] text-white group hover:bg-brand-orange transition-all shadow-xl shadow-slate-900/10">
                                <span class="text-sm font-bold opacity-80">Need help?</span>
                                <span class="text-lg font-black leading-tight">Contact Our Legal Team</span>
                            </a>
                        </div>
                    </nav>
                </aside>

                <!-- Main Content -->
                <div class="lg:col-span-3">
                    <div class="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100">
                        <div class="prose prose-slate lg:prose-lg max-w-none text-slate-600">
                            <?php echo $html_content; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</main>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
