export interface NewsAuthor {
  name: string;
  role?: string;
  imageUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  author: NewsAuthor;
  category: 'announcement' | 'story' | 'update' | 'event';
  tags: string[];
  featured: boolean;
  slug: string;
  excerpt: string;
  readTime: number; // in minutes
  createdAt?: string;
  updatedAt?: string;
} 