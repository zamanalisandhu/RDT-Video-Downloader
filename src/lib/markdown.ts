import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostData } from '@/types';

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
  const date = pickOptionalString(data, ['date', 'publishDate', 'publish_date']) || fallbackDate;
  const excerpt = pickOptionalString(data, ['excerpt', 'metaDescription', 'description']);
  const image = pickOptionalString(data, ['image', 'featuredImage', 'coverImage']);
  const author = pickOptionalString(data, ['author']);
  return {
    title,
    date,
    ...(excerpt !== undefined ? { excerpt } : {}),
    ...(image !== undefined ? { image } : {}),
    ...(author !== undefined ? { author } : {}),
  };
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

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

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
