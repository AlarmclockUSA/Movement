import { db } from './firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import type { HeroMessage } from '@/types/hero';

const initialHeroMessages: Omit<HeroMessage, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: "For God",
    subtitle: "Living in His presence and purpose daily",
    background: "/worship-background.jpg",
    order: 1,
    active: true
  },
  {
    title: "For People",
    subtitle: "Building authentic community and meaningful connections",
    background: "/community-background.jpg",
    order: 2,
    active: true
  },
  {
    title: "For the City",
    subtitle: "Transforming our local communities with Kingdom impact",
    background: "/city-background.jpg",
    order: 3,
    active: true
  },
  {
    title: "For the World",
    subtitle: "Reaching across borders to activate global change",
    background: "/world-background.jpg",
    order: 4,
    active: true
  }
];

async function seedHero() {
  try {
    console.log('Clearing existing hero messages...');
    const heroRef = db.collection('hero');
    const existingMessages = await heroRef.get();
    
    const batch = db.batch();
    existingMessages.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('Existing hero messages cleared.');

    console.log('Adding new hero messages...');
    const timestamp = Timestamp.now();
    
    const addPromises = initialHeroMessages.map(message => 
      heroRef.add({
        ...message,
        createdAt: timestamp,
        updatedAt: timestamp
      })
    );

    await Promise.all(addPromises);
    console.log('Hero messages seeded successfully!');
  } catch (error) {
    console.error('Error seeding hero messages:', error);
    throw error;
  }
}

// Only run if this file is being executed directly
if (require.main === module) {
  seedHero()
    .then(() => {
      console.log('Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error during seeding:', error);
      process.exit(1);
    });
} 