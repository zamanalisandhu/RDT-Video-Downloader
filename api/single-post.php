<?php
/**
 * RDT Video Downloader - Single Blog Article Template
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$slug = $_GET['slug'] ?? '';
if (empty($slug)) {
    header("Location: /blog");
    exit;
}

// Fetch single post (cached)
$post = rdt_get_post_by_slug($slug);

if (!$post) {
    header("HTTP/1.1 404 Not Found");
    $page_title = "404 - Page Not Found";
    require_once __DIR__ . '/includes/header.php';
    ?>
    <section class="py-20 text-center flex-grow flex items-center justify-center bg-white">
        <div class="max-w-md mx-auto px-4 text-center">
            <h1 class="text-6xl font-black text-slate-200 mb-4">404</h1>
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Guide Not Found</h2>
            <p class="text-slate-500 mb-8 text-sm">The guide you are looking for has been removed, renamed, or is temporarily unavailable.</p>
            <a href="/blog" class="px-5 py-2.5 bg-brand-orange text-white font-extrabold rounded-xl text-sm active:scale-[0.98] transition-transform">Back to Blog</a>
        </div>
    </section>
    <?php
    require_once __DIR__ . '/includes/footer.php';
    exit;
}

// Fetch list of posts for related/next/prev (cached)
$all_posts = rdt_get_posts(100);

$current_index = -1;
foreach ($all_posts as $idx => $p) {
    if ($p['slug'] === $slug) {
        $current_index = $idx;
        break;
    }
}

$next_post = ($current_index > 0) ? $all_posts[$current_index - 1] : null;
$prev_post = ($current_index !== -1 && $current_index < count($all_posts) - 1) ? $all_posts[$current_index + 1] : null;

$other_posts = [];
foreach ($all_posts as $p) {
    if ($p['slug'] !== $slug) {
        $other_posts[] = $p;
    }
}
$same_cat = [];
$diff_cat = [];
foreach ($other_posts as $p) {
    if (isset($p['category_name']) && isset($post['category_name']) && $p['category_name'] === $post['category_name']) {
        $same_cat[] = $p;
    } else {
        $diff_cat[] = $p;
    }
}
$related_guides = array_slice(array_merge($same_cat, $diff_cat), 0, 2);

// Accordion FAQ Parsing Helper
function parse_post_faqs($html) {
    $faqs = [];
    if (empty($html)) return $faqs;

    // 1. Kadence Accordion Pane parsing
    $pane_parts = preg_split('/class="[^"]*kt-accordion-pane/i', $html);
    if (count($pane_parts) > 1) {
        for ($i = 1; $i < count($pane_parts); $i++) {
            $pane_html = $pane_parts[$i];
            preg_match('/class="[^"]*kt-blocks-accordion-title[^"]*"[^>]*>([\s\S]*?)<\/(?:button|div|span|h[1-6])/i', $pane_html, $title_match);
            preg_match('/class="[^"]*(?:kt-accordion-panel-inner|kt-accordion-panel)[^"]*"[^>]*>([\s\S]*?)<\/div/i', $pane_html, $panel_match);
            if (!empty($title_match[1]) && !empty($panel_match[1])) {
                $question = trim(preg_replace('/\s+/', ' ', strip_tags($title_match[1])));
                $answer = trim(preg_replace('/\s+/', ' ', strip_tags($panel_match[1])));
                if (!empty($question) && !empty($answer)) {
                    $faqs[] = ['question' => $question, 'answer' => $answer];
                }
            }
        }
    }

    // 2. RankMath list items parsing
    $rm_parts = preg_split('/class="[^"]*rank-math-list-item/i', $html);
    if (count($rm_parts) > 1) {
        for ($i = 1; $i < count($rm_parts); $i++) {
            $rm_html = $rm_parts[$i];
            preg_match('/class="[^"]*rank-math-question[^"]*"[^>]*>([\s\S]*?)<\/(?:h[1-6]|div|span|p)/i', $rm_html, $q_match);
            preg_match('/class="[^"]*rank-math-answer[^>]*>([\s\S]*?)<\/div/i', $rm_html, $a_match);
            if (!empty($q_match[1]) && !empty($a_match[1])) {
                $question = trim(preg_replace('/\s+/', ' ', strip_tags($q_match[1])));
                $answer = trim(preg_replace('/\s+/', ' ', strip_tags($a_match[1])));
                if (!empty($question) && !empty($answer)) {
                    $faqs[] = ['question' => $question, 'answer' => $answer];
                }
            }
        }
    }

    // 3. Yoast section parsing
    $yoast_parts = preg_split('/class="[^"]*schema-faq-section/i', $html);
    if (count($yoast_parts) > 1) {
        for ($i = 1; $i < count($yoast_parts); $i++) {
            $yoast_html = $yoast_parts[$i];
            preg_match('/class="[^"]*schema-faq-question[^"]*"[^>]*>([\s\S]*?)<\/(?:strong|h[1-6]|div|span|p)/i', $yoast_html, $q_match);
            preg_match('/class="[^"]*schema-faq-answer[^"]*"[^>]*>([\s\S]*?)<\/div/i', $yoast_html, $a_match);
            if (!empty($q_match[1]) && !empty($a_match[1])) {
                $question = trim(preg_replace('/\s+/', ' ', strip_tags($q_match[1])));
                $answer = trim(preg_replace('/\s+/', ' ', strip_tags($a_match[1])));
                if (!empty($question) && !empty($answer)) {
                    $faqs[] = ['question' => $question, 'answer' => $answer];
                }
            }
        }
    }

    return $faqs;
}

// Clean Gutenberg markup
function clean_post_content_html($html) {
    if (empty($html)) return '';
    $html = preg_replace('/<!--[\s\S]*?-->/', '', $html);
    $html = preg_replace('/<style[\s\S]*?<\/style>/i', '', $html);
    $html = preg_replace('/<script[\s\S]*?<\/script>/i', '', $html);
    return $html;
}

function inject_lazy_loading_images($html) {
    if (empty($html)) return '';
    return preg_replace_callback('/<img([^>]*?)>/i', function($matches) {
        $attributes = $matches[1];
        if (preg_match('/loading=/i', $attributes)) {
            $attributes = preg_replace('/loading=["\'][^"\']*["\']/i', 'loading="lazy"', $attributes);
        } else {
            $attributes .= ' loading="lazy"';
        }
        if (preg_match('/decoding=/i', $attributes)) {
            $attributes = preg_replace('/decoding=["\'][^"\']*["\']/i', 'decoding="async"', $attributes);
        } else {
            $attributes .= ' decoding="async"';
        }
        return "<img" . $attributes . ">";
    }, $html);
}

$parsed_faqs = parse_post_faqs($post['content']);
$combined_faqs = array_merge($post['faqs'] ?? [], $parsed_faqs);
$has_faqs = count($combined_faqs) > 0;

$cleaned_content = clean_post_content_html($post['content']);
$final_content = inject_lazy_loading_images($cleaned_content);

// SEO setup
$page_title = $post['meta_title'];
if (strpos($page_title, 'RDT Video Downloader') === false) {
    $page_title = $page_title . " | RDT Video Downloader";
}
$page_desc = $post['meta_description'];
$page_path = "/blog/" . $slug;

// Redirect 301 from legacy root path /slug to /blog/slug
$request_uri = $_SERVER['REQUEST_URI'] ?? '';
$clean_request_path = strtok($request_uri, '?');
if (strpos($clean_request_path, '/blog/') === false && !empty($slug)) {
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: /blog/" . $slug);
    exit;
}

// JSON-LD Structured Data Schema Markup
$siteUrl = 'https://rdtvideodownloader.com';
$absoluteImageUrl = !empty($post['image']) ? $post['image'] : $siteUrl . '/og-image.jpg';

// Calculate word count
$cleanText = strip_tags($post['content']);
$wordCount = str_word_count($cleanText);

$authorSchema = [
    '@type' => 'Organization',
    'name' => 'RDT Editorial Team',
    'url' => $siteUrl . '/blog',
    'logo' => [
        '@type' => 'ImageObject',
        'url' => $siteUrl . '/logo.png'
    ],
    'description' => 'The official editorial team of RDT Video Downloader. We provide reliable guides, tips, and insights for downloading and saving media from platforms like Reddit.',
    'sameAs' => [
        $siteUrl,
        'https://twitter.com/rdtdownloader',
        'https://facebook.com/rdtdownloader'
    ]
];

$blogPostingSchema = [
    '@context' => 'https://schema.org',
    '@type' => 'BlogPosting',
    'headline' => $post['title'],
    'image' => $absoluteImageUrl,
    'datePublished' => $post['date'],
    'dateModified' => $post['date'],
    'author' => $authorSchema,
    'publisher' => [
        '@type' => 'Organization',
        'name' => 'RDT Video Downloader',
        'logo' => [
            '@type' => 'ImageObject',
            'url' => $siteUrl . '/logo.png'
        ]
    ],
    'mainEntityOfPage' => [
        '@type' => 'WebPage',
        '@id' => $siteUrl . '/' . $slug
    ],
    'wordCount' => $wordCount,
    'inLanguage' => 'en-US',
    'articleSection' => $post['category_name'] ?: 'Blog'
];

$breadcrumbSchema = [
    '@context' => 'https://schema.org',
    '@type' => 'BreadcrumbList',
    'itemListElement' => [
        [
            '@type' => 'ListItem',
            'position' => 1,
            'name' => 'Home',
            'item' => $siteUrl
        ],
        [
            '@type' => 'ListItem',
            'position' => 2,
            'name' => 'Blog',
            'item' => $siteUrl . '/blog'
        ],
        [
            '@type' => 'ListItem',
            'position' => 3,
            'name' => $post['title'],
            'item' => $siteUrl . '/' . $slug
        ]
    ]
];

$schema_markups = [$blogPostingSchema, $breadcrumbSchema];

if ($has_faqs) {
    $faqSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => []
    ];
    foreach ($combined_faqs as $faq) {
        $faqSchema['mainEntity'][] = [
            '@type' => 'Question',
            'name' => $faq['question'],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => $faq['answer']
            ]
        ];
    }
    $schema_markups[] = $faqSchema;
}

require_once __DIR__ . '/includes/header.php';
?>

<main class="min-h-screen flex flex-col bg-white text-left">
    <article class="flex-grow py-12 bg-white">
        <div class="container mx-auto px-4 max-w-[850px]">
            
            <!-- Back to Guides -->
            <div class="mb-6">
                <a href="/blog" class="text-brand-orange hover:text-brand-orange-light font-bold text-sm inline-flex items-center gap-1.5 transition-colors group">
                    &lt; Back to Guides
                </a>
            </div>

            <!-- Category Badge -->
            <div class="text-center mb-4">
                <span class="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/5 border border-brand-orange/10 rounded-full">
                    <?php echo htmlspecialchars($post['category_name'] ?: 'Blog'); ?>
                </span>
            </div>

            <!-- Title -->
            <h1 class="text-center font-black text-slate-900 leading-[1.25] tracking-tight mb-5 text-[32px] md:text-[2.6rem]">
                <?php echo htmlspecialchars($post['title']); ?>
            </h1>

            <!-- Metadata -->
            <div class="flex items-center justify-center flex-wrap gap-2.5 text-[13px] font-medium text-slate-500 mb-8 tracking-normal">
                <span>By RDT Editorial Team</span>
                <span class="text-slate-300">•</span>
                <time datetime="<?php echo $post['date']; ?>"><?php echo $post['date']; ?></time>
                <span class="text-slate-300">•</span>
                <span><?php echo htmlspecialchars($post['reading_time'] ?? 5); ?> min read</span>
            </div>

            <!-- Featured Image -->
            <?php if (!empty($post['image'])): ?>
                <div class="blog-image-wrapper aspect-[1200/628] w-full overflow-hidden rounded-[16px] border border-slate-100 bg-slate-50 shadow-xl shadow-slate-200/40 mb-10">
                    <img src="<?php echo htmlspecialchars($post['image']); ?>" alt="<?php echo htmlspecialchars($post['title']); ?>" class="w-full h-full object-cover" width="1200" height="628" loading="eager" />
                </div>
            <?php endif; ?>

            <!-- Article Content -->
            <div class="prose prose-slate max-w-none 
                prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-600 prose-p:leading-[1.65] prose-p:text-[1.05rem] prose-p:mb-6
                prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline font-semibold
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-img:rounded-2xl prose-img:border prose-img:border-slate-100 prose-img:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-brand-orange prose-blockquote:bg-slate-50/50 
                prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-600
                prose-li:text-slate-600 prose-li:text-[1.05rem] prose-li:leading-[1.65]">
                <?php echo $final_content; ?>
            </div>

            <!-- Injected FAQ section -->
            <?php if ($has_faqs): ?>
                <div class="faq-section mt-12 pt-10 border-t border-slate-100">
                    <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">Frequently Asked Questions</h2>
                    <dl class="space-y-4">
                        <?php foreach ($combined_faqs as $faq): ?>
                            <div class="wp-block-kadence-pane border border-slate-200 hover:border-slate-300 hover:shadow-sm rounded-[16px] transition-all duration-300 overflow-hidden mb-3.5 bg-white faq-item">
                                <dt>
                                    <button type="button" class="kt-blocks-accordion-header w-full flex items-center justify-between p-5 text-left cursor-pointer select-none focus:outline-none faq-btn">
                                        <span class="text-[17px] font-semibold text-slate-900 pr-4">
                                            <?php echo htmlspecialchars($faq['question']); ?>
                                        </span>
                                        <div class="kt-blocks-accordion-icon-trigger relative w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 bg-slate-100 text-slate-500">
                                            <span class="absolute w-3 h-0.5 rounded transition-colors duration-300 bg-slate-600"></span>
                                            <span class="absolute w-0.5 h-3 rounded transition-colors duration-300 bg-slate-600"></span>
                                        </div>
                                    </button>
                                </dt>
                                <dd class="kt-accordion-panel transition-all duration-300 ease-in-out overflow-hidden faq-panel" style="max-height: 0px; opacity: 0;">
                                    <div class="px-6 pb-5 pt-0 text-slate-600 leading-relaxed text-[15px] faq-panel-content">
                                        <?php echo htmlspecialchars($faq['answer']); ?>
                                    </div>
                                </dd>
                            </div>
                        <?php endforeach; ?>
                    </dl>
                </div>
            <?php endif; ?>

            <!-- CTA Section -->
            <div class="mt-12 p-6 bg-slate-900 rounded-3xl text-white text-center relative overflow-hidden group">
                <div class="relative z-10 py-2">
                    <h3 class="text-2xl font-extrabold mb-2 tracking-tight">Try Our Reddit Downloader</h3>
                    <p class="text-slate-400 mb-6 text-sm max-w-lg mx-auto leading-relaxed">
                        Download any Reddit video with sound in high definition. Fast, free, and no registration required.
                    </p>
                    <a href="/" 
                       class="inline-flex items-center gap-1.5 px-6 py-3 bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-orange/10 hover:-translate-y-0.5 transition-all">
                        Download Now <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                    </a>
                </div>
            </div>

            <!-- Author Section -->
            <div class="mt-12 pt-8 border-t border-slate-100 flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg shrink-0 border border-slate-200">
                    R
                </div>
                <div>
                    <div class="font-bold text-base text-slate-900">RDT Editorial Team</div>
                    <div class="text-slate-500 text-sm mt-1 max-w-xl leading-relaxed">The official editorial team of RDT Video Downloader. We provide reliable guides, tips, and insights for downloading and saving media from platforms like Reddit.</div>
                </div>
            </div>

            <!-- Previous / Next Navigation -->
            <?php if ($prev_post || $next_post): ?>
                <div class="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-stretch justify-between gap-4">
                    <?php if ($prev_post): ?>
                        <a href="/blog/<?php echo htmlspecialchars($prev_post['slug']); ?>"
                           class="group flex flex-col items-start gap-1 w-full sm:w-1/2 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-brand-orange/20 transition-all text-left">
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <svg class="group-hover:-translate-x-0.5 transition-transform w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
                                Previous Guide
                            </span>
                            <span class="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-orange transition-colors">
                                <?php echo htmlspecialchars($prev_post['title']); ?>
                            </span>
                        </a>
                    <?php else: ?>
                        <div class="hidden sm:block w-1/2"></div>
                    <?php endif; ?>

                    <?php if ($next_post): ?>
                        <a href="/blog/<?php echo htmlspecialchars($next_post['slug']); ?>"
                           class="group flex flex-col items-end gap-1 w-full sm:w-1/2 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-brand-orange/20 transition-all text-right">
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                Next Guide
                                <svg class="group-hover:translate-x-0.5 transition-transform w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                            </span>
                            <span class="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-orange transition-colors">
                                <?php echo htmlspecialchars($next_post['title']); ?>
                            </span>
                        </a>
                    <?php else: ?>
                        <div class="hidden sm:block w-1/2"></div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <!-- Recommended Guides -->
            <?php if (!empty($related_guides)): ?>
                <div class="mt-16 pt-10 border-t border-slate-100">
                    <h3 class="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Recommended Guides</h3>
                    <div class="blog-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <?php foreach ($related_guides as $guide): ?>
                            <a href="/blog/<?php echo htmlspecialchars($guide['slug']); ?>" 
                               class="blog-card group flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:border-brand-orange/20 hover:shadow-xl hover:shadow-slate-100/40 transition-all duration-300 text-left">
                                <?php if (!empty($guide['image'])): ?>
                                    <div class="blog-image-wrapper aspect-[1200/628] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                                        <img src="<?php echo htmlspecialchars($guide['image']); ?>" 
                                             alt="<?php echo htmlspecialchars($guide['title']); ?>" 
                                             class="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                                             width="400"
                                             height="209"
                                             loading="lazy" />
                                    </div>
                                <?php endif; ?>
                                <div class="p-5 flex flex-col flex-grow">
                                    <div class="flex items-center gap-2 mb-2.5">
                                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-orange/5 text-brand-orange border border-brand-orange/10">
                                            <?php echo htmlspecialchars($guide['category_name'] ?: 'Guide'); ?>
                                        </span>
                                        <span class="text-[11px] font-medium text-slate-400"><?php echo htmlspecialchars($guide['date']); ?></span>
                                    </div>
                                    <h4 class="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors mb-2 line-clamp-2 leading-snug">
                                        <?php echo htmlspecialchars($guide['title']); ?>
                                    </h4>
                                    <p class="text-slate-500 text-[13px] leading-relaxed line-clamp-3 mb-4 mt-auto">
                                        <?php echo htmlspecialchars($guide['excerpt']); ?>
                                    </p>
                                </div>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>

        </div>
    </article>
</main>

<!-- Injected FAQ Accordion JavaScript -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        const panel = item.querySelector('.faq-panel');
        const icon = item.querySelector('.kt-blocks-accordion-icon-trigger');

        btn.addEventListener('click', () => {
            const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px';
            
            // Close other items
            faqItems.forEach(other => {
                const otherPanel = other.querySelector('.faq-panel');
                const otherIcon = other.querySelector('.kt-blocks-accordion-icon-trigger');
                if (otherPanel !== panel) {
                    otherPanel.style.maxHeight = '0px';
                    otherPanel.style.opacity = '0';
                    if (otherIcon) otherIcon.style.transform = 'none';
                }
            });

            if (isOpen) {
                panel.style.maxHeight = '0px';
                panel.style.opacity = '0';
                if (icon) icon.style.transform = 'none';
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
                panel.style.opacity = '1';
                if (icon) icon.style.transform = 'rotate(45deg)';
            }
        });
    });
});
</script>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
