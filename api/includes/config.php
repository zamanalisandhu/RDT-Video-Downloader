<?php
/**
 * RDT Video Downloader - Global Configuration
 */

// Detect protocol and host dynamically (supporting reverse proxies like Vercel/Cloudflare)
$is_https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
    || (!empty($_SERVER['HTTP_X_FORWARDED_SSL']) && $_SERVER['HTTP_X_FORWARDED_SSL'] === 'on');
$protocol = $is_https ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'] ?? 'rdtvideodownloader.com';
$current_url = $protocol . $host;

// Define site constants
define('SITE_URL', $current_url);
define('API_URL', 'https://rdtapidownload.techiesline.workers.dev');
define('WP_API_URL', 'https://admin.rdtvideodownloader.com/wp-json/wp/v2');
define('SITE_NAME', 'RDT Video Downloader');
define('ASSET_VERSION', '1.3.1');

// Default SEO values
define('DEFAULT_SEO_TITLE', 'Reddit Video Downloader - Download Reddit Video with Sound - Free HD MP4 | RDT');
define('DEFAULT_SEO_DESC', 'Download Reddit videos with audio in 1080p HD. Free MP4 downloader for videos, GIFs & galleries. No watermark, no signup. Works on iPhone, Android, PC.');
define('DEFAULT_SEO_KEYWORDS', 'reddit video downloader, save reddit videos, download reddit mp4, download reddit with audio, reddit downloader online');
?>
