<?php
/**
 * RDT Video Downloader - WordPress REST API Helper
 */

class WPApiHelper {
    private static $api_url = "https://admin.rdtvideodownloader.com/wp-json/wp/v2";

    /**
     * Decodes HTML entities to clean up text
     */
    public static function decode_html($str) {
        if (empty($str)) return '';
        return html_entity_decode($str, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }

    /**
     * Fetches post list from WordPress API
     */
    public static function get_posts($per_page = 100, $page = 1) {
        $url = self::$api_url . "/posts?_embed&per_page=" . intval($per_page) . "&page=" . intval($page);
        $response = self::fetch_url($url);
        if (!$response) return [];

        $wp_posts = json_decode($response, true);
        if (!is_array($wp_posts)) return [];

        $posts = [];
        foreach ($wp_posts as $post) {
            $posts[] = self::map_post_data($post);
        }
        return $posts;
    }

    /**
     * Fetches a single post by slug
     */
    public static function get_post_by_slug($slug) {
        $url = self::$api_url . "/posts?_embed&slug=" . urlencode($slug);
        $response = self::fetch_url($url);
        if (!$response) return null;

        $wp_posts = json_decode($response, true);
        if (!is_array($wp_posts) || empty($wp_posts)) return null;

        return self::map_post_data($wp_posts[0]);
    }

    /**
     * Helper to perform HTTP GET requests with timeout
     */
    private static function fetch_url($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 8);
        curl_setopt($ch, CURLOPT_USERAGENT, 'RDT-PHP-Downloader/1.0');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $output = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($http_code !== 200) {
            return false;
        }
        return $output;
    }

    /**
     * Maps raw WordPress API post object to a standard associative array
     */
    private static function map_post_data($wp_post) {
        $id = $wp_post['id'] ?? 0;
        $slug = $wp_post['slug'] ?? '';
        $raw_title = $wp_post['title']['rendered'] ?? '';
        $raw_excerpt = $wp_post['excerpt']['rendered'] ?? '';
        $raw_content = $wp_post['content']['rendered'] ?? '';
        $iso_date = $wp_post['date'] ?? date('Y-m-d\TH:i:s');
        
        $date = explode('T', $iso_date)[0];
        $title = self::decode_html($raw_title);
        
        // Excerpt cleanup
        $excerpt = strip_tags($raw_excerpt);
        $excerpt = trim(self::decode_html($excerpt));
        
        $content = self::decode_html($raw_content);
        $image = self::get_featured_image($wp_post);

        // Author parsing
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
                        $category_name = self::decode_html($term['name']);
                        break 2;
                    }
                }
            }
        }

        // Reading time
        $clean_text = strip_tags($raw_content);
        $words_count = str_word_count($clean_text);
        $reading_time = max(1, round($words_count / 200));

        // Meta tags / SEO tags
        $meta_title = $title;
        $meta_description = $excerpt;

        // Yoast SEO / RankMath parsing
        if (isset($wp_post['yoast_head_json'])) {
            $yoast = $wp_post['yoast_head_json'];
            if (isset($yoast['title'])) $meta_title = self::decode_html($yoast['title']);
            if (isset($yoast['description'])) $meta_description = self::decode_html($yoast['description']);
        }
        
        // Strip custom suffixes from meta title
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
     * Extracts featured image with fallbacks
     */
    private static function get_featured_image($wp_post) {
        $url = null;
        if (isset($wp_post['_embedded']['wp:featuredmedia'][0]['source_url'])) {
            $url = $wp_post['_embedded']['wp:featuredmedia'][0]['source_url'];
        }
        if (!$url && isset($wp_post['featured_image_url'])) {
            $url = $wp_post['featured_image_url'];
        }
        if (!$url && isset($wp_post['featured_image_src'])) {
            $url = $wp_post['featured_image_src'];
        }
        if (!$url && isset($wp_post['featured_media_src_url'])) {
            $url = $wp_post['featured_media_src_url'];
        }

        if (is_string($url) && strpos(trim($url), 'http') === 0) {
            return trim($url);
        }

        return 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800';
    }
}
?>
