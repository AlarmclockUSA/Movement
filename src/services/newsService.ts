import { collection, getDocs, query, orderBy, where, doc, getDoc, limit, DocumentData, QueryDocumentSnapshot, startAfter } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NewsArticle } from '@/types/news';

const NEWS_COLLECTION = 'news';
const PAGE_SIZE = 9;

function convertToNewsArticle(doc: QueryDocumentSnapshot<DocumentData>): NewsArticle {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    subtitle: data.subtitle,
    content: data.content,
    imageUrl: data.imageUrl,
    publishedAt: data.publishedAt,
    author: data.author,
    category: data.category,
    tags: data.tags,
    featured: data.featured,
    slug: data.slug,
    excerpt: data.excerpt,
    readTime: data.readTime
  };
}

export const newsService = {
  async getAllNews(): Promise<NewsArticle[]> {
    try {
      const q = query(
        collection(db, NEWS_COLLECTION),
        orderBy('publishedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(convertToNewsArticle);
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  async getFeaturedNews(): Promise<NewsArticle[]> {
    try {
      const q = query(
        collection(db, NEWS_COLLECTION),
        where('featured', '==', true),
        orderBy('publishedAt', 'desc'),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(convertToNewsArticle);
    } catch (error) {
      console.error('Error fetching featured news:', error);
      throw error;
    }
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    try {
      const docRef = doc(db, NEWS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data()
      } as NewsArticle;
    } catch (error) {
      console.error('Error fetching news by ID:', error);
      throw error;
    }
  },

  async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    try {
      const q = query(
        collection(db, NEWS_COLLECTION),
        where('slug', '==', slug),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }

      return convertToNewsArticle(querySnapshot.docs[0]);
    } catch (error) {
      console.error('Error fetching news by slug:', error);
      throw error;
    }
  },

  async getNewsByCategory(category: string): Promise<NewsArticle[]> {
    try {
      const q = query(
        collection(db, NEWS_COLLECTION),
        where('category', '==', category),
        orderBy('publishedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(convertToNewsArticle);
    } catch (error) {
      console.error('Error fetching news by category:', error);
      throw error;
    }
  },

  async getPaginatedNews(lastDoc?: QueryDocumentSnapshot<DocumentData>): Promise<{
    news: NewsArticle[];
    lastDoc: QueryDocumentSnapshot<DocumentData> | undefined;
    hasMore: boolean;
  }> {
    try {
      let q = query(
        collection(db, NEWS_COLLECTION),
        orderBy('publishedAt', 'desc'),
        limit(PAGE_SIZE)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(q);
      const news = querySnapshot.docs.map(convertToNewsArticle);
      
      return {
        news,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
        hasMore: querySnapshot.docs.length === PAGE_SIZE
      };
    } catch (error) {
      console.error('Error fetching paginated news:', error);
      throw error;
    }
  },

  async getRelatedNews(article: NewsArticle, limit: number = 3): Promise<NewsArticle[]> {
    try {
      // First try to get news with the same category
      const q = query(
        collection(db, NEWS_COLLECTION),
        where('category', '==', article.category),
        where('id', '!=', article.id),
        orderBy('publishedAt', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(convertToNewsArticle);
    } catch (error) {
      console.error('Error fetching related news:', error);
      throw error;
    }
  }
}; 