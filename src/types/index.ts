export interface FAQItem {
  question: string;
  answer: string;
}

export interface PostData {
  id?: number;
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  image?: string;
  contentHtml?: string;
  category?: 'blog' | 'legal';
  readingTime?: number;
  // Advanced SEO fields
  metaTitle?: string;
  metaDescription?: string;
  categoryName?: string;
  tags?: string[];
  faqs?: FAQItem[];
}


