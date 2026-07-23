<?php
/**
 * RDT Video Downloader - Reusable Helper Functions
 */

require_once __DIR__ . '/config.php';

/**
 * Sanitize inputs for secure HTML rendering (XSS Protection)
 */
function rdt_clean($input) {
    if (is_array($input)) {
        foreach ($input as $key => $value) {
            $input[$key] = rdt_clean($value);
        }
        return $input;
    }
    return htmlspecialchars(trim((string)$input), ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

/**
 * Decodes HTML entities robustly
 */
function rdt_decode_html($str) {
    if (empty($str)) return '';
    return html_entity_decode($str, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

/**
 * Fetches data from WordPress API with file-based caching (30-60 mins)
 * Falls back to expired cache if API is offline/slow.
 */
function rdt_fetch_wp_api($endpoint, $ttl = 3600) {
    $cache_dir = __DIR__ . '/../cache/';
    if (getenv('VERCEL') || !is_writable($cache_dir)) {
        $cache_dir = sys_get_temp_dir() . '/rdt_cache/';
    }
    if (!is_dir($cache_dir)) {
        @mkdir($cache_dir, 0755, true);
    }

    $cache_file = $cache_dir . md5($endpoint) . '.json';
    $cache_exists = file_exists($cache_file);

    // If cache is fresh, load it
    if ($cache_exists && (time() - filemtime($cache_file) < $ttl)) {
        $data = json_decode(file_get_contents($cache_file), true);
        if (is_array($data)) return $data;
    }

    // Otherwise, fetch from API
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    curl_setopt($ch, CURLOPT_USERAGENT, 'RDT-PHP-Downloader/1.0');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $output = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code === 200 && !empty($output)) {
        // Save to cache
        file_put_contents($cache_file, $output);
        $data = json_decode($output, true);
        if (is_array($data)) return $data;
    }

    // Fallback to expired cache if API is down
    if ($cache_exists) {
        $data = json_decode(file_get_contents($cache_file), true);
        if (is_array($data)) return $data;
    }

    return [];
}

/**
 * Live HTML Crawler to scrape SEO metadata from original WordPress post link (Technical SEO backup)
 */
function rdt_fetch_html_seo($url) {
    if (empty($url)) return [];
    
    $cache_dir = __DIR__ . '/../cache/';
    if (getenv('VERCEL') || !is_writable($cache_dir)) {
        $cache_dir = sys_get_temp_dir() . '/rdt_cache/';
    }
    if (!is_dir($cache_dir)) {
        @mkdir($cache_dir, 0755, true);
    }
    
    $cache_file = $cache_dir . md5($url) . '_seo.json';
    if (file_exists($cache_file) && (time() - filemtime($cache_file) < 1800)) {
        $data = json_decode(file_get_contents($cache_file), true);
        if (is_array($data)) return $data;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 4);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $html = curl_exec($ch);
    curl_close($ch);

    $meta_title = '';
    $meta_description = '';

    if (!empty($html)) {
        // Scrape title
        if (preg_match('/<title>([\s\S]*?)<\/title>/i', $html, $title_match)) {
            $meta_title = html_entity_decode(trim($title_match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        }
        // Scrape description
        if (preg_match('/<meta\s+name=["\']description["\']\s+content=["\']([\s\S]*?)["\']/i', $html, $desc_match)) {
            $meta_description = html_entity_decode(trim($desc_match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        }
        if (empty($meta_description) && preg_match('/<meta\s+property=["\']og:description["\']\s+content=["\']([\s\S]*?)["\']/i', $html, $desc_match)) {
            $meta_description = html_entity_decode(trim($desc_match[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        }
    }

    $seo_data = [
        'title' => $meta_title,
        'description' => $meta_description
    ];

    file_put_contents($cache_file, json_encode($seo_data));
    return $seo_data;
}

/**
 * Maps WordPress post format to structured array
 */
function rdt_map_post($wp_post) {
    $id = $wp_post['id'] ?? 0;
    $slug = $wp_post['slug'] ?? '';
    $raw_title = $wp_post['title']['rendered'] ?? '';
    $raw_excerpt = $wp_post['excerpt']['rendered'] ?? '';
    $raw_content = $wp_post['content']['rendered'] ?? '';
    $iso_date = $wp_post['date'] ?? date('Y-m-d\TH:i:s');
    
    $date = explode('T', $iso_date)[0];
    $title = rdt_decode_html($raw_title);
    
    // Clean excerpt
    $excerpt = strip_tags($raw_excerpt);
    $excerpt = trim(rdt_decode_html($excerpt));
    
    $content = rdt_decode_html($raw_content);
    
    // Extract Image
    $image = '';
    if (isset($wp_post['_embedded']['wp:featuredmedia'][0]['source_url'])) {
        $image = $wp_post['_embedded']['wp:featuredmedia'][0]['source_url'];
    } elseif (isset($wp_post['featured_image_url'])) {
        $image = $wp_post['featured_image_url'];
    } elseif (isset($wp_post['yoast_head_json']['og_image'][0]['url'])) {
        $image = $wp_post['yoast_head_json']['og_image'][0]['url'];
    } elseif (isset($wp_post['yoast_head_json']['twitter_image'])) {
        $image = $wp_post['yoast_head_json']['twitter_image'];
    } elseif (isset($wp_post['jetpack_featured_media_url'])) {
        $image = $wp_post['jetpack_featured_media_url'];
    }

    if (empty($image)) {
        $image = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800';
    }

    // Author
    $author = 'RDT Editorial Team';
    if (isset($wp_post['_embedded']['author'][0]['name'])) {
        $raw_author = $wp_post['_embedded']['author'][0]['name'];
        if (strtolower($raw_author) !== 'admin' && strtolower($raw_author) !== 'rdt admin') {
            $author = $raw_author;
        }
    }

    // Category
    $category_name = 'Blog';
    if (isset($wp_post['_embedded']['wp:term'])) {
        foreach ($wp_post['_embedded']['wp:term'] as $terms) {
            foreach ($terms as $term) {
                if (isset($term['taxonomy']) && $term['taxonomy'] === 'category' && $term['name'] !== 'Uncategorized') {
                    $category_name = rdt_decode_html($term['name']);
                    break 2;
                }
            }
        }
    }

    // Reading time
    $clean_text = strip_tags($raw_content);
    $words_count = str_word_count($clean_text);
    $reading_time = max(1, round($words_count / 200));

    // SEO Meta Tags
    $meta_title = '';
    $meta_description = '';

    // 0. Crawl live WordPress link to fetch exact SEO fields configured by RankMath/Yoast
    $wp_link = $wp_post['link'] ?? '';
    if (!empty($wp_link)) {
        $live_seo = rdt_fetch_html_seo($wp_link);
        if (!empty($live_seo['title'])) $meta_title = $live_seo['title'];
        if (!empty($live_seo['description'])) $meta_description = $live_seo['description'];
    }

    // 1. Try generic/RankMath head_json structure
    if (isset($wp_post['head_json']) && is_array($wp_post['head_json'])) {
        $head = $wp_post['head_json'];
        if (isset($head['title'])) $meta_title = rdt_decode_html($head['title']);
        if (isset($head['description'])) $meta_description = rdt_decode_html($head['description']);
        
        // Fallbacks inside head_json
        if (empty($meta_title) && isset($head['og_title'])) $meta_title = rdt_decode_html($head['og_title']);
        if (empty($meta_description) && isset($head['og_description'])) $meta_description = rdt_decode_html($head['og_description']);
    }

    // 2. Try Yoast SEO JSON-LD structure
    if (empty($meta_title) && isset($wp_post['yoast_head_json']) && is_array($wp_post['yoast_head_json'])) {
        $yoast = $wp_post['yoast_head_json'];
        if (isset($yoast['title'])) $meta_title = rdt_decode_html($yoast['title']);
        if (isset($yoast['description'])) $meta_description = rdt_decode_html($yoast['description']);
        
        // Fallbacks inside Yoast
        if (empty($meta_title) && isset($yoast['og_title'])) $meta_title = rdt_decode_html($yoast['og_title']);
        if (empty($meta_description) && isset($yoast['og_description'])) $meta_description = rdt_decode_html($yoast['og_description']);
    }

    // 3. Fallback: Parse raw head/yoast_head HTML strings via regex
    $raw_head_string = $wp_post['head'] ?? $wp_post['yoast_head'] ?? '';
    if (!empty($raw_head_string) && is_string($raw_head_string)) {
        if (empty($meta_title) && preg_match('/<title>([\s\S]*?)<\/title>/i', $raw_head_string, $title_match)) {
            $meta_title = rdt_decode_html(trim($title_match[1]));
        }
        if (empty($meta_description) && preg_match('/<meta\s+name=["\']description["\']\s+content=["\']([\s\S]*?)["\']/i', $raw_head_string, $desc_match)) {
            $meta_description = rdt_decode_html(trim($desc_match[1]));
        }
        if (empty($meta_description) && preg_match('/<meta\s+property=["\']og:description["\']\s+content=["\']([\s\S]*?)["\']/i', $raw_head_string, $desc_match)) {
            $meta_description = rdt_decode_html(trim($desc_match[1]));
        }
    }

    // 4. Try legacy/fallback properties
    if (empty($meta_title) && isset($wp_post['rank_math_title'])) {
        $meta_title = rdt_decode_html($wp_post['rank_math_title']);
    }
    if (empty($meta_description) && isset($wp_post['rank_math_description'])) {
        $meta_description = rdt_decode_html($wp_post['rank_math_description']);
    }

    // 5. Default post title and excerpt fallback
    if (empty($meta_title)) {
        $meta_title = $title;
    }
    if (empty($meta_description)) {
        $meta_description = $excerpt;
    }

    $meta_title = preg_replace('/\s*-\s*My\s*Blog/i', '', $meta_title);
    $meta_title = preg_replace('/\s*-\s*admin/i', '', $meta_title);
    $meta_title = trim($meta_title);

    $faqs = $wp_post['faqs'] ?? [];

    return [
        'id' => $id,
        'slug' => $slug,
        'title' => $title,
        'date' => $date,
        'excerpt' => $excerpt,
        'author' => $author,
        'image' => $image,
        'content' => $content,
        'category_name' => $category_name,
        'reading_time' => $reading_time,
        'meta_title' => $meta_title,
        'meta_description' => $meta_description,
        'faqs' => $faqs
    ];
}

/**
 * Fetches list of posts
 */
function rdt_get_posts($per_page = 100, $page = 1) {
    $endpoint = WP_API_URL . "/posts?_embed&per_page=" . intval($per_page) . "&page=" . intval($page);
    $wp_posts = rdt_fetch_wp_api($endpoint, 3600); // Cache for 1 hour
    
    if (!is_array($wp_posts)) return [];
    
    $posts = [];
    foreach ($wp_posts as $post) {
        $posts[] = rdt_map_post($post);
    }
    return $posts;
}

/**
 * Fetches single post by slug
 */
function rdt_get_post_by_slug($slug) {
    $endpoint = WP_API_URL . "/posts?_embed&slug=" . urlencode($slug);
    $wp_posts = rdt_fetch_wp_api($endpoint, 1800); // Cache for 30 minutes
    
    if (!is_array($wp_posts) || empty($wp_posts)) return null;
    
    return rdt_map_post($wp_posts[0]);
}

/**
 * Custom Simple Markdown Parser for legal pages
 */
function rdt_parse_markdown($markdown) {
    if (empty($markdown)) return '';

    // Convert newlines to standard LF
    $markdown = str_replace("\r\n", "\n", $markdown);

    // Parse blockquotes and custom Github alerts (like > [!WARNING])
    $lines = explode("\n", $markdown);
    $in_blockquote = false;
    $blockquote_type = 'standard';
    $blockquote_lines = [];
    $parsed_lines = [];

    foreach ($lines as $line) {
        if (preg_match('/^>\s*(.*)$/', $line, $matches)) {
            $content = trim($matches[1]);
            if (strpos($content, '[!WARNING]') !== false) {
                $blockquote_type = 'warning';
                continue;
            }
            $blockquote_lines[] = $content;
            $in_blockquote = true;
        } else {
            if ($in_blockquote) {
                $bq_body = implode("\n", $blockquote_lines);
                $bq_body = rdt_parse_inline_markdown($bq_body);
                if ($blockquote_type === 'warning') {
                    $parsed_lines[] = '<div class="p-5 bg-orange-50 border-l-4 border-[#FF4500] text-slate-700 rounded-r-2xl my-6 text-sm font-medium"><p class="font-extrabold text-[#FF4500] uppercase tracking-wider text-xs mb-1.5 flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>Warning</p>' . $bq_body . '</div>';
                } else {
                    $parsed_lines[] = '<blockquote class="border-l-4 border-slate-200 pl-4 italic text-slate-500 my-6">' . $bq_body . '</blockquote>';
                }
                $blockquote_lines = [];
                $in_blockquote = false;
                $blockquote_type = 'standard';
            }
            $parsed_lines[] = $line;
        }
    }
    
    if ($in_blockquote) {
        $bq_body = implode("\n", $blockquote_lines);
        $bq_body = rdt_parse_inline_markdown($bq_body);
        if ($blockquote_type === 'warning') {
            $parsed_lines[] = '<div class="p-5 bg-orange-50 border-l-4 border-[#FF4500] text-slate-700 rounded-r-2xl my-6 text-sm font-medium"><p class="font-extrabold text-[#FF4500] uppercase tracking-wider text-xs mb-1.5 flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>Warning</p>' . $bq_body . '</div>';
        } else {
            $parsed_lines[] = '<blockquote class="border-l-4 border-slate-200 pl-4 italic text-slate-500 my-6">' . $bq_body . '</blockquote>';
        }
    }

    $html = implode("\n", $parsed_lines);

    $blocks = explode("\n\n", $html);
    $output = [];
    $in_ul = false;
    $in_ol = false;

    foreach ($blocks as $block) {
        $block = trim($block);
        if (empty($block)) continue;

        if ($block === '---') {
            if ($in_ul) { $output[] = '</ul>'; $in_ul = false; }
            if ($in_ol) { $output[] = '</ol>'; $in_ol = false; }
            $output[] = '<hr class="border-slate-100 my-8" />';
            continue;
        }

        if (preg_match('/^##\s+(.*)$/', $block, $matches)) {
            if ($in_ul) { $output[] = '</ul>'; $in_ul = false; }
            if ($in_ol) { $output[] = '</ol>'; $in_ol = false; }
            $output[] = '<h2 class="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">' . rdt_parse_inline_markdown($matches[1]) . '</h2>';
            continue;
        }
        if (preg_match('/^###\s+(.*)$/', $block, $matches)) {
            if ($in_ul) { $output[] = '</ul>'; $in_ul = false; }
            if ($in_ol) { $output[] = '</ol>'; $in_ol = false; }
            $output[] = '<h3 class="text-lg font-bold text-slate-800 mt-6 mb-3">' . rdt_parse_inline_markdown($matches[1]) . '</h3>';
            continue;
        }

        $lines = explode("\n", $block);
        $first_line = trim($lines[0]);

        if (preg_match('/^[\*\-]\s+(.*)$/', $first_line)) {
            if ($in_ol) { $output[] = '</ol>'; $in_ol = false; }
            if (!$in_ul) { $output[] = '<ul class="list-disc pl-6 space-y-2 text-slate-600 mb-6">'; $in_ul = true; }
            foreach ($lines as $line) {
                if (preg_match('/^[\*\-]\s+(.*)$/', trim($line), $l_matches)) {
                    $output[] = '<li>' . rdt_parse_inline_markdown($l_matches[1]) . '</li>';
                }
            }
            continue;
        }

        if (preg_match('/^\d+\.\s+(.*)$/', $first_line)) {
            if ($in_ul) { $output[] = '</ul>'; $in_ul = false; }
            if (!$in_ol) { $output[] = '<ol class="list-decimal pl-6 space-y-4 text-slate-600 mb-6">'; $in_ol = true; }
            foreach ($lines as $line) {
                if (preg_match('/^\d+\.\s+(.*)$/', trim($line), $l_matches)) {
                    $output[] = '<li>' . rdt_parse_inline_markdown($l_matches[1]) . '</li>';
                }
            }
            continue;
        }

        if ($in_ul) { $output[] = '</ul>'; $in_ul = false; }
        if ($in_ol) { $output[] = '</ol>'; $in_ol = false; }

        if (strpos($block, '<div class="p-5') === 0 || strpos($block, '<blockquote') === 0) {
            $output[] = $block;
        } else {
            $output[] = '<p class="leading-relaxed text-slate-600 mb-5">' . rdt_parse_inline_markdown($block) . '</p>';
        }
    }

    if ($in_ul) { $output[] = '</ul>'; }
    if ($in_ol) { $output[] = '</ol>'; }

    return implode("\n", $output);
}

function rdt_parse_inline_markdown($text) {
    // Bold: **text**
    $text = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $text);
    // Links: [text](url)
    $text = preg_replace('/\[(.*?)\]\((.*?)\)/', '<a href="$2" class="text-brand-orange underline hover:text-brand-orange-light">$1</a>', $text);
    // Inline code: `code`
    $text = preg_replace('/`(.*?)`/', '<code class="bg-slate-100 text-[#FF4500] px-2 py-0.5 rounded font-mono text-xs">$1</code>', $text);
    return $text;
}
?>
