<?php
/**
 * RDT Video Downloader - Global Configuration
 */

// Detect protocol and host dynamically
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost:8000';
$current_url = $protocol . $host;

// Define site constants
define('SITE_URL', $current_url);
define('API_URL', 'https://rdtapidownload.techiesline.workers.dev');
define('WP_API_URL', 'https://admin.rdtvideodownloader.com/wp-json/wp/v2');
define('SITE_NAME', 'RDT Video Downloader');

// Default SEO values
define('DEFAULT_SEO_TITLE', 'Reddit Video Downloader - Download Reddit Video with Sound - Free HD MP4 | RDT');
define('DEFAULT_SEO_DESC', 'Download Reddit videos with audio in 1080p HD. Free MP4 downloader for videos, GIFs & galleries. No watermark, no signup. Works on iPhone, Android, PC.');
define('DEFAULT_SEO_KEYWORDS', 'reddit video downloader, save reddit videos, download reddit mp4, download reddit with audio, reddit downloader online');
?>
