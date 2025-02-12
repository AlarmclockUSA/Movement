'use client';

import { useEffect, useState } from 'react';
import { NewsArticle } from '@/types/news';
import { newsService } from '@/services/newsService';
import { motion } from 'framer-motion';

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<NewsArticle['category'] | 'all'>('all');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const [allArticles, featured] = await Promise.all([
          newsService.getAllArticles(),
          newsService.getFeaturedArticles(3)
        ]);
        setArticles(allArticles);
        setFeaturedArticles(featured);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const categories: Array<{ value: NewsArticle['category'] | 'all', label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'announcement', label: 'Announcements' },
    { value: 'update', label: 'Updates' },
    { value: 'story', label: 'Stories' },
    { value: 'press', label: 'Press' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-white px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Movement News</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest stories, announcements, and press releases from Brilliant Movement
            </p>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                <h3 className="text-xl font-bold mt-2 group-hover:text-gray-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mt-2">{article.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedCategory(value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === value
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* All Articles */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium bg-white/90 rounded-full">
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">·</span>
                <span className="text-sm text-gray-500">{article.readTime} min read</span>
              </div>
              <h3 className="text-xl font-bold group-hover:text-gray-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 mt-2">{article.excerpt}</p>
              <div className="flex items-center mt-4">
                {article.author.imageUrl && (
                  <img
                    src={article.author.imageUrl}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="text-sm font-medium">{article.author.name}</p>
                  {article.author.role && (
                    <p className="text-xs text-gray-500">{article.author.role}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
} 