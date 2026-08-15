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

// 1. Homepage & Main Pages
$static_pages = [
    '/' => $api_dir . '/index.php',
    '/about' => $api_dir . '/about.php',
    '/contact' => $api_dir . '/contact.php',
    '/blog' => $api_dir . '/blog.php',
    '/reddit-to-mp4' => $api_dir . '/reddit-to-mp4.php',
    '/reddit-to-mp3' => $api_dir . '/reddit-to-mp3.php',
    '/reddit-to-gif' => $api_dir . '/reddit-to-gif.php',
    '/reddit-image-downloader' => $api_dir . '/reddit-image-downloader.php',
];

foreach ($static_pages as $path => $file) {
    $loc = ($path === '/') ? $baseUrl . '/' : $baseUrl . $path;
    $lastmod = null;
    if (file_exists($file)) {
        $lastmod = date('Y-m-d', filemtime($file));
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
