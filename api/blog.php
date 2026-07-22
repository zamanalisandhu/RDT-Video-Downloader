<?php
/**
 * RDT Video Downloader - Blog Listing Page
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$page_title = "Blog — Reddit Saving Tips, Guides & Tutorials | RDT";
$page_desc = "Weekly guides on downloading Reddit videos with sound, saving Reddit GIFs as MP4, archiving gallery posts, and fixing silent video issues. Step-by-step tutorials for iPhone, Android, and PC.";
$page_path = "/blog";

require_once __DIR__ . '/includes/header.php';

// Fetches list of posts (cached)
$posts = rdt_get_posts(100);

$posts_per_page = 12;
$total_posts = count($posts);
$total_pages = ceil($total_posts / $posts_per_page);
$current_page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$start_index = ($current_page - 1) * $posts_per_page;
$paginated_posts = array_slice($posts, $start_index, $posts_per_page);
?>

<main class="min-h-screen flex flex-col flex-grow bg-white text-left">
    <!-- Blog Hero -->
    <section class="relative pt-16 pb-8 bg-white text-center">
        <div class="container mx-auto px-4 max-w-4xl">
            <h1 class="section-title text-[32px] md:text-[40px] font-black text-slate-900 mb-4 tracking-tight leading-tight animate-fade-in-up">
                Latest Articles & Guides
            </h1>
            <p class="section-subtitle text-[15px] md:text-[16px] text-slate-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-150 mb-12">
                Learn how to download and convert Reddit videos, audio, and images in high quality on all your devices.
            </p>
        </div>
    </section>

    <!-- Blog List -->
    <div class="flex-grow pb-16 pt-4">
        <div class="container mx-auto px-4 max-w-[1200px]">
            <?php if (!empty($paginated_posts)): ?>
                <!-- Blog Cards Grid -->
                <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 list-none m-0 p-0">
                    <?php foreach ($paginated_posts as $post): ?>
                        <li class="list-none animate-fade-in-up">
                            <a href="/blog/<?php echo htmlspecialchars($post['slug']); ?>"
                               class="group flex flex-col bg-white/75 backdrop-blur-md border border-[#FFE8DF] hover:border-brand-orange/40 rounded-[28px] transition-all duration-300 h-full p-5 text-left hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(255,87,34,0.08)]">
                                <article class="flex flex-col h-full flex-grow">
                                    <?php if (!empty($post['image'])): ?>
                                        <div class="blog-image-wrapper aspect-[1200/628] w-full overflow-hidden bg-slate-50 rounded-[16px] relative">
                                            <img src="<?php echo htmlspecialchars($post['image']); ?>"
                                                 alt="<?php echo htmlspecialchars($post['title']); ?>"
                                                 width="800"
                                                 height="419"
                                                 class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                                                 loading="lazy"
                                                 onerror="this.src='/logo.png'" />
                                        </div>
                                    <?php endif; ?>
                                    
                                    <div class="flex flex-col flex-grow pt-4 px-2">
                                        <!-- Metadata Row -->
                                        <div class="flex items-center gap-2 text-[12px] font-medium text-slate-500 mb-2.5">
                                            <span><?php echo htmlspecialchars($post['date']); ?></span>
                                            <span>•</span>
                                            <span><?php echo htmlspecialchars($post['reading_time'] ?? 5); ?> min read</span>
                                        </div>
                                        
                                        <!-- Card Title -->
                                        <h2 class="text-[20px] font-bold text-slate-900 mb-2.5 leading-[1.3] group-hover:text-brand-orange transition-colors">
                                            <?php echo htmlspecialchars($post['title']); ?>
                                        </h2>
                                        
                                        <!-- Excerpt Text -->
                                        <p class="text-slate-500 text-[14px] leading-[1.5] line-clamp-3 mb-5 flex-grow">
                                            <?php echo htmlspecialchars($post['excerpt']); ?>
                                        </p>
                                        
                                        <!-- Read More Link -->
                                        <div class="blog-card-link mt-auto text-brand-orange font-semibold text-[13.5px] inline-flex items-center gap-1.5 hover:text-brand-orange-light">
                                            <span>Read Full Article</span>
                                            <svg class="transition-transform duration-200 group-hover:translate-x-1 w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>

                <!-- Pagination Row -->
                <?php if ($total_pages > 1): ?>
                    <div class="flex justify-center items-center gap-2 mt-12">
                        <?php for ($page = 1; $page <= $total_pages; $page++): ?>
                            <a href="/blog?page=<?php echo $page; ?>"
                               class="px-4 py-2 text-[14px] font-semibold rounded-lg border transition-all duration-200 <?php
                                    echo ($current_page === $page)
                                        ? 'bg-brand-orange border-brand-orange text-white'
                                        : 'bg-transparent border-slate-200 text-slate-500 hover:border-slate-300';
                               ?>">
                                <?php echo $page; ?>
                            </a>
                        <?php endfor; ?>
                    </div>
                <?php endif; ?>
            <?php else: ?>
                <div class="text-center py-32 bg-white">
                    <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
                    <p class="text-slate-500">We're currently writing new guides for you. Check back soon!</p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</main>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
