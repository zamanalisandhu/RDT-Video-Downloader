export interface FAQItem {
  question: string;
  answer: string;
}

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  image?: string;
  contentHtml?: string;
  category?: 'blog' | 'legal';
  // Advanced SEO fields
  metaTitle?: string;
  metaDescription?: string;
  categoryName?: string;
  tags?: string[];
  faqs?: FAQItem[];
}

