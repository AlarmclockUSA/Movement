import { adminDb } from '../lib/firebase-admin';
import { NewsArticle } from '../types/news';
import { FieldValue } from 'firebase-admin/firestore';

const NEWS_COLLECTION = 'news';

const sampleNews: Omit<NewsArticle, 'id'>[] = [
  {
    title: "Brilliant Movement Launches Global Prayer Initiative",
    subtitle: "24/7 Prayer Movement Across Time Zones",
    content: `We are thrilled to announce the launch of our Global Prayer Initiative, a continuous chain of prayer that spans across all time zones. This initiative represents a significant step in our mission to unite believers worldwide in constant communion with God.

The program will feature:
- 24/7 prayer rooms in major cities
- Virtual prayer gatherings
- Real-time prayer request sharing
- Monthly global prayer summits

Join us as we create a perpetual stream of prayer and worship, connecting hearts across continents in unified purpose.`,
    imageUrl: "https://images.unsplash.com/photo-1445251836269-d158eaa028a6",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    author: {
      name: "Sarah Anderson",
      role: "Global Prayer Coordinator",
      imageUrl: "/images/team/sarah-anderson.jpg"
    },
    category: "announcement",
    tags: ["prayer", "global", "community", "worship"],
    featured: true,
    slug: "global-prayer-initiative-launch",
    excerpt: "A new 24/7 prayer movement connecting believers across all time zones in continuous worship and intercession.",
    readTime: 5
  },
  {
    title: "Testimonies of Transformation: Stories from Our Community",
    subtitle: "Real Stories of God's Faithfulness",
    content: `We are honored to share these powerful testimonies from our global community. Each story represents a unique journey of faith and transformation, highlighting God's faithful presence in our daily lives.

Featured Stories:
- Maria's Journey: From Anxiety to Peace
- David's Story: Restoration in Business
- The Thompson Family: Healing and Hope
- Rachel's Path: Discovering Purpose

These testimonies remind us that God is constantly at work in our midst, bringing about transformation in ways both big and small.`,
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    author: {
      name: "Michael Rachel",
      role: "Community Stories Editor",
      imageUrl: "/images/team/michael-rachel.jpg"
    },
    category: "story",
    tags: ["testimonies", "transformation", "community", "faith"],
    featured: true,
    slug: "testimonies-of-transformation",
    excerpt: "Inspiring stories of transformation and God's faithfulness from members of our global community.",
    readTime: 8
  },
  {
    title: "New Leadership Development Program Announced",
    subtitle: "Equipping the Next Generation of Leaders",
    content: `We are excited to introduce our comprehensive Leadership Development Program, designed to equip and empower the next generation of Christian leaders. This program combines biblical principles with practical leadership skills for today's challenges.

Program Highlights:
- Mentorship from experienced leaders
- Practical ministry experience
- Advanced theological training
- Leadership skills workshops
- Cross-cultural ministry exposure

Applications open next month for our first cohort starting in September.`,
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    author: {
      name: "David Thompson",
      role: "Leadership Development Director",
      imageUrl: "/images/team/david-thompson.jpg"
    },
    category: "announcement",
    tags: ["leadership", "development", "training", "ministry"],
    featured: true,
    slug: "leadership-development-program",
    excerpt: "A new program launching to equip and empower the next generation of Christian leaders with practical and spiritual tools.",
    readTime: 6
  }
];

export async function seedNews() {
  try {
    console.log('Starting news seeding process...');
    
    // Clear existing news
    console.log('Clearing existing news articles...');
    const existingNews = await adminDb.collection(NEWS_COLLECTION).get();
    const deletePromises = existingNews.docs.map(doc => {
      console.log(`Deleting article: ${doc.id}`);
      return doc.ref.delete();
    });
    await Promise.all(deletePromises);
    console.log('Successfully cleared existing news articles');

    // Add new news articles
    console.log('Adding new news articles...');
    const addPromises = sampleNews.map(async (article) => {
      try {
        const docRef = await adminDb.collection(NEWS_COLLECTION).add({
          ...article,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });
        console.log(`Added article: ${docRef.id} - ${article.title}`);
        return docRef;
      } catch (error) {
        console.error(`Failed to add article: ${article.title}`, error);
        throw error;
      }
    });

    await Promise.all(addPromises);
    console.log('Successfully added all news articles');

  } catch (error) {
    console.error('Error during news seeding:', error);
    throw error;
  }
}

// Only run the seed function if this script is being run directly
if (require.main === module) {
  seedNews()
    .then(() => {
      console.log('News seeding completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error during news seeding:', error);
      process.exit(1);
    });
} 