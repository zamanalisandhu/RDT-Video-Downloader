<?php
/**
 * RDT Video Downloader - Dynamic Sitemap Generator
 */

header("Content-Type: text/xml; charset=utf-8");

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

// Base URL (without trailing slash)
$baseUrl = 'https://rdtvideodownloader.com';
$currentDate = date('Y-m-d');

echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Main Pages -->
    <url>
        <loc><?php echo $baseUrl; ?></loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc><?php echo $baseUrl; ?>/contact</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc><?php echo $baseUrl; ?>/about</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc><?php echo $baseUrl; ?>/blog</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>

    <!-- Target Category Landing Pages -->
    <url>
        <loc><?php echo $baseUrl; ?>/reddit-to-mp4</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc><?php echo $baseUrl; ?>/reddit-to-mp3</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc><?php echo $baseUrl; ?>/reddit-to-gif</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc><?php echo $baseUrl; ?>/reddit-image-downloader</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>

    <!-- WordPress Blog Posts -->
    <?php
    try {
        $blogPosts = rdt_get_posts(100);
        foreach ($blogPosts as $post) {
            $postDate = !empty($post['date']) ? $post['date'] : $currentDate;
            ?>
    <url>
        <loc><?php echo $baseUrl; ?>/blog/<?php echo htmlspecialchars($post['slug']); ?></loc>
        <lastmod><?php echo htmlspecialchars($postDate); ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
            <?php
        }
    } catch (Exception $e) {
        // Fallback silently if WordPress API fails
    }
    ?>

    <!-- Legal Pages -->
    <url>
        <loc><?php echo $baseUrl; ?>/legal/privacy-policy</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc><?php echo $baseUrl; ?>/legal/terms-of-service</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc><?php echo $baseUrl; ?>/legal/dmca</loc>
        <lastmod><?php echo $currentDate; ?></lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
</urlset>
