<?php
/**
 * RDT Video Downloader - Development Router for PHP Built-in Server
 */

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
error_reporting(E_ALL);

$request_uri = $_SERVER['REQUEST_URI'] ?? '/';
$parsed_url = parse_url($request_uri);
$path = $parsed_url['path'] ?? '/';
$query_str = $parsed_url['query'] ?? ($_SERVER['QUERY_STRING'] ?? '');
parse_str($query_str, $query_params);

// 301 Permanent Redirect to strip trailing slashes (except root '/')
if ($path !== '/' && substr($path, -1) === '/') {
    if (strpos($path, '/api/') !== 0) {
        $clean_path = rtrim($path, '/');
        unset($query_params['w']);
        $new_query = http_build_query($query_params);
        $redirect_url = $clean_path . ($new_query !== '' ? '?' . $new_query : '');
        header("Location: " . $redirect_url, true, 301);
        exit;
    }
}

// 301 Permanent Redirect to remove unwanted 'w' query parameter
if (array_key_exists('w', $query_params)) {
    if (strpos($path, '/api/') !== 0) {
        unset($query_params['w']);
        $new_query = http_build_query($query_params);
        $redirect_url = $path . ($new_query !== '' ? '?' . $new_query : '');
        header("Location: " . $redirect_url, true, 301);
        exit;
    }
}

// Serve existing static files directly from the parent root directory
$root_static_file = dirname(__DIR__) . $path;
if (file_exists($root_static_file) && !is_dir($root_static_file)) {
    return false; // let the built-in server serve the static file
}

// Route single blog posts: /blog/post-slug -> single-post.php?slug=post-slug
if (preg_match('/^\/blog\/([^\/]+)$/', $path, $matches)) {
    $_GET['slug'] = $matches[1];
    http_response_code(200);
    include __DIR__ . '/single-post.php';
    exit;
}

// Route legal pages: /legal/post-slug -> legal.php?slug=post-slug
if (preg_match('/^\/legal\/([^\/]+)$/', $path, $matches)) {
    $_GET['slug'] = $matches[1];
    http_response_code(200);
    include __DIR__ . '/legal.php';
    exit;
}

// Map clean URLs without .php extensions
$clean_pages = [
    '/reddit-to-mp4' => '/reddit-to-mp4.php',
    '/reddit-to-mp3' => '/reddit-to-mp3.php',
    '/reddit-to-gif' => '/reddit-to-gif.php',
    '/reddit-image-downloader' => '/reddit-image-downloader.php',
    '/about' => '/about.php',
    '/contact' => '/contact.php',
    '/blog' => '/blog.php',
    '/sitemap.xml' => '/sitemap.php',
    '/api/video-info' => '/video-info.php',
    '/api/download' => '/download.php',
    '/api/downloader' => '/downloader.php',
];

if (isset($clean_pages[$path])) {
    http_response_code(200);
    include __DIR__ . $clean_pages[$path];
    exit;
}

// Root page
if ($path === '/' || $path === '/index' || $path === '/index.php') {
    http_response_code(200);
    include __DIR__ . '/index.php';
    exit;
}

// Route dynamic root-level blog slugs: /post-slug -> single-post.php?slug=post-slug
if (preg_match('/^\/([a-zA-Z0-9\-]+)$/', $path, $matches)) {
    $requested_slug = $matches[1];
    require_once __DIR__ . '/includes/functions.php';
    $all_posts = rdt_get_posts(100);
    $post_exists = false;
    foreach ($all_posts as $post) {
        if ($post['slug'] === $requested_slug) {
            $post_exists = true;
            break;
        }
    }
    if ($post_exists) {
        // Blog posts live under /blog/ only: 301 old root-level URLs to avoid duplicate pages
        header("Location: /blog/" . $requested_slug, true, 301);
        exit;
    }
}

// Fallback: render 404 using single-post.php error handler
header("HTTP/1.1 404 Not Found");
$_GET['slug'] = ''; // force 404 block
include __DIR__ . '/single-post.php';
exit;
