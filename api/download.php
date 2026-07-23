<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Check if it is a GET request (direct download stream)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $url = $_GET['url'] ?? '';
    $quality = $_GET['quality'] ?? '720';
    $audioOnly = isset($_GET['audioOnly']) && ($_GET['audioOnly'] === 'true' || $_GET['audioOnly'] === '1');
    $title = $_GET['title'] ?? 'video';

    if (empty($url)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "URL parameter is required."]);
        exit;
    }

    // 1. Resolve downloadUrl from Cloudflare Worker using a POST request
    $payload = [
        'url' => trim($url),
        'quality' => preg_match('/^\d+$/', $quality) ? intval($quality) : $quality,
        'ext' => 'mp4',
        'audioOnly' => $audioOnly
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://rdtapidownload.techiesline.workers.dev/api/download');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $data = json_decode($response, true);

    if (empty($data['success']) || empty($data['downloadUrl'])) {
        // Fallback: If worker fails, redirect browser to input URL to let user view/save it
        header("Location: " . $url);
        exit;
    }

    $downloadUrl = $data['downloadUrl'];
    $ext = $audioOnly ? 'mp3' : 'mp4';
    $contentType = $audioOnly ? 'audio/mpeg' : 'video/mp4';
    
    // Format a clean filename
    $cleanTitle = preg_replace('/[^a-zA-Z0-9_]/', '_', $title);
    $filename = 'rdtvideodownloader.com_' . substr($cleanTitle, 0, 50) . '.' . $ext;

    // 2. Set headers for direct file attachment stream
    header('Content-Description: File Transfer');
    header('Content-Type: ' . $contentType);
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');

    // 3. Stream the file from the resolved downloadUrl directly to output buffer
    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_URL, $downloadUrl);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, false); // Output directly
    curl_setopt($ch2, CURLOPT_WRITEFUNCTION, function($ch, $chunk) {
        echo $chunk;
        flush();
        return strlen($chunk);
    });
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, false);
    curl_exec($ch2);
    curl_close($ch2);
    exit;
}

// Otherwise handle POST request (AJAX JSON request)
$input = file_get_contents("php://input");

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://rdtapidownload.techiesline.workers.dev/api/download');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
$output = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($http_code);
echo $output;
