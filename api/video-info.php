<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!empty($data['url'])) {
    $target_url = trim($data['url']);
    
    // Automatically resolve Reddit mobile share links (/s/) or redd.it redirects
    if (strpos($target_url, '/s/') !== false || strpos($target_url, 'redd.it/') !== false) {
        $ch_expand = curl_init($target_url);
        curl_setopt($ch_expand, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch_expand, CURLOPT_FOLLOWLOCATION, false);
        curl_setopt($ch_expand, CURLOPT_TIMEOUT, 6);
        curl_setopt($ch_expand, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch_expand, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch_expand, CURLOPT_HTTPHEADER, [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        ]);
        curl_exec($ch_expand);
        $redirectUrl = curl_getinfo($ch_expand, CURLINFO_REDIRECT_URL);
        curl_close($ch_expand);

        if (!empty($redirectUrl)) {
            $data['url'] = strtok($redirectUrl, '?');
            $input = json_encode($data);
        }
    }
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://rdtapidownload.techiesline.workers.dev/api/video-info');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
$output = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($http_code ?: 200);
echo $output;
