export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  image?: string;
  contentHtml?: string;
  category?: 'blog' | 'legal';
}

