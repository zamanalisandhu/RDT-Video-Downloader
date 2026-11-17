<?php
/**
 * RDT Video Downloader - Clean SEO XML Sitemap Generator
 */

header("Content-Type: text/xml; charset=utf-8");

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$baseUrl = 'https://rdtvideodownloader.com';
$api_dir = __DIR__;

$sitemap_entries = [];
$added_locs = [];

function add_sitemap_entry(&$sitemap_entries, &$added_locs, $loc, $lastmod = null) {
    if (empty($loc) || isset($added_locs[$loc])) {
        return;
    }
    // Exclude any query string or parameter URLs
    if (strpos($loc, '?') !== false) {
        return;
    }
    $added_locs[$loc] = true;
    $sitemap_entries[] = [
        'loc' => $loc,
        'lastmod' => $lastmod
    ];
}

// 1. Homepage & Main Pages with realistic lastmod dates
$static_pages = [
    '/' => ['file' => $api_dir . '/index.php', 'date' => '2026-08-15'],
    '/reddit-to-mp3' => ['file' => $api_dir . '/reddit-to-mp3.php', 'date' => '2026-08-15'],
    '/reddit-to-mp4' => ['file' => $api_dir . '/reddit-to-mp4.php', 'date' => '2026-08-15'],
    '/reddit-to-gif' => ['file' => $api_dir . '/reddit-to-gif.php', 'date' => '2026-08-15'],
    '/reddit-image-downloader' => ['file' => $api_dir . '/reddit-image-downloader.php', 'date' => '2026-08-15'],
    '/blog' => ['file' => $api_dir . '/blog.php', 'date' => '2026-07-23'],
    '/about' => ['file' => $api_dir . '/about.php', 'date' => '2026-07-22'],
    '/contact' => ['file' => $api_dir . '/contact.php', 'date' => '2026-07-22'],
];

foreach ($static_pages as $path => $info) {
    $loc = ($path === '/') ? $baseUrl . '/' : $baseUrl . $path;
    $lastmod = $info['date'] ?? null;
    // Fallback to filemtime if newer and valid
    if (file_exists($info['file'])) {
        $mtime = filemtime($info['file']);
        if ($mtime && $mtime > 1700000000) {
            $lastmod = date('Y-m-d', $mtime);
        }
    }
    add_sitemap_entry($sitemap_entries, $added_locs, $loc, $lastmod);
}

// 2. Published Blog Posts
try {
    $blogPosts = rdt_get_posts(100);
    foreach ($blogPosts as $post) {
        if (!empty($post['slug'])) {
            $loc = $baseUrl . '/blog/' . trim($post['slug']);
            $lastmod = !empty($post['date']) ? $post['date'] : null;
            add_sitemap_entry($sitemap_entries, $added_locs, $loc, $lastmod);
        }
    }
} catch (Exception $e) {
    // Ignore API errors gracefully
}

// 3. Legal Pages
$legal_dir = $api_dir . '/content/legal';
$legal_items = ['privacy-policy', 'terms-of-service', 'dmca'];
foreach ($legal_items as $slug) {
    $file = $legal_dir . '/' . $slug . '.md';
    if (file_exists($file)) {
        $loc = $baseUrl . '/legal/' . $slug;
        $lastmod = null;
        $raw = file_get_contents($file);
        if (preg_match('/date:\s*["\']?(\d{4}-\d{2}-\d{2})["\']?/i', $raw, $m)) {
            $lastmod = $m[1];
        } else {
            $lastmod = date('Y-m-d', filemtime($file));
        }
        add_sitemap_entry($sitemap_entries, $added_locs, $loc, $lastmod);
    }
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($sitemap_entries as $entry): ?>
    <url>
        <loc><?php echo htmlspecialchars($entry['loc']); ?></loc>
<?php if (!empty($entry['lastmod'])): ?>
        <lastmod><?php echo htmlspecialchars($entry['lastmod']); ?></lastmod>
<?php endif; ?>
    </url>
<?php endforeach; ?>
</urlset>
