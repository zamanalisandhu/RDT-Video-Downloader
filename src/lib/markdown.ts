import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostData, FAQItem } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

function pickOptionalString(record: Record<string, unknown>, keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const v = record[key];
    if (typeof v === 'string' && v.trim() !== '') return v;
  }
  return undefined;
}

function coercePostFields(slug: string, data: Record<string, unknown>): Partial<PostData> {
  const title = typeof data.title === 'string' && data.title.trim() !== '' ? data.title : slug;
  const fallbackDate = new Date().toISOString().split('T')[0];
  const date = pickOptionalString(data, ['date', 'publishDate', 'publish_date', 'publishdate', 'publish_date']) || fallbackDate;
  const excerpt = pickOptionalString(data, ['excerpt', 'metaDescription', 'description']);
  const image = pickOptionalString(data, ['image', 'featuredImage', 'coverImage']);
  const author = pickOptionalString(data, ['author']);
  
  const metaTitle = pickOptionalString(data, ['metaTitle', 'meta_title', 'seotitle', 'seo_title']);
  const metaDescription = pickOptionalString(data, ['metaDescription', 'meta_description', 'seodescription', 'seo_description']);
  const categoryName = pickOptionalString(data, ['categoryName', 'category_name', 'category', 'genre']);
  
  const tags = Array.isArray(data.tags)
    ? (data.tags as unknown[]).filter((t): t is string => typeof t === 'string')
    : undefined;
    
  const faqs = Array.isArray(data.faqs)
    ? (data.faqs as unknown[]).filter((f): f is FAQItem => {
        return typeof f === 'object' && f !== null && 'question' in f && 'answer' in f;
      })
    : undefined;

  return {
    title,
    date,
    ...(excerpt !== undefined ? { excerpt } : {}),
    ...(image !== undefined ? { image } : {}),
    ...(author !== undefined ? { author } : {}),
    ...(metaTitle !== undefined ? { metaTitle } : {}),
    ...(metaDescription !== undefined ? { metaDescription } : {}),
    ...(categoryName !== undefined ? { categoryName } : {}),
    ...(tags !== undefined ? { tags } : {}),
    ...(faqs !== undefined ? { faqs } : {}),
  };
}

function rewriteInternalLinks(htmlContent: string): string {
  const dirPath = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(dirPath)) return htmlContent;
  const fileNames = fs.readdirSync(dirPath);
  const slugs = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));

  let rewritten = htmlContent;
  for (const slug of slugs) {
    // Replace href="/slug" with href="/blog/slug"
    const rootRelativeRegex = new RegExp(`href=["']\\/${slug}(["'\\/])`, 'g');
    rewritten = rewritten.replace(rootRelativeRegex, `href="/blog/${slug}$1`);

    // Replace href="https://rdtvideodownloader.com/slug" with href="https://rdtvideodownloader.com/blog/slug"
    const absoluteRegex = new RegExp(`href=["']https?:\\/\\/(?:www\\.)?rdtvideodownloader\\.com\\/${slug}(["'\\/])`, 'g');
    rewritten = rewritten.replace(absoluteRegex, `href="https://rdtvideodownloader.com/blog/${slug}$1`);
  }
  return rewritten;
}

export function getSortedPostsData(category: 'blog' | 'legal' = 'blog') {
  const dirPath = path.join(contentDirectory, category);
  
  if (!fs.existsSync(dirPath)) return [];

  const fileNames = fs.readdirSync(dirPath);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(dirPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const raw = matterResult.data as Record<string, unknown>;
      const coerced = coercePostFields(slug, raw);

      return {
        slug,
        category,
        ...raw,
        ...coerced,
      } as PostData;
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export async function getPostData(slug: string, category: 'blog' | 'legal' = 'blog'): Promise<PostData> {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  let content = matterResult.content;
  // Programmatically strip leading H1 heading if present (e.g., # Title)
  content = content.replace(/^#\s+.+$/m, '');

  const processedContent = await remark()
    .use(html)
    .process(content);
  let contentHtml = processedContent.toString();

  // Dynamically rewrite internal links in the article body to maximize crawl budget efficiency
  if (category === 'blog') {
    contentHtml = rewriteInternalLinks(contentHtml);
  }

  const raw = matterResult.data as Record<string, unknown>;
  const coerced = coercePostFields(slug, raw);

  return {
    slug,
    contentHtml,
    category,
    ...raw,
    ...coerced,
  } as PostData;
}
