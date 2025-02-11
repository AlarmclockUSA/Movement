import { config } from 'dotenv';
import { resolve } from 'path';
import { db } from './firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// Load environment variables from .env.local
const result = config({
  path: resolve(process.cwd(), '.env.local')
});

if (result.error) {
  throw new Error('Error loading environment variables: ' + result.error.message);
}

// Log the loaded environment variables (without sensitive values)
console.log('Environment variables loaded:', {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
});

const initialEvents = [
  {
    title: 'Monthly Movement Gathering',
    description: "Join us for our monthly global gathering featuring powerful worship and transformative teaching. Connect with believers from over 24 countries and 48 US States.",
    date: { day: '01', month: 'APR' },
    time: '4:00P',
    link: '/watch',
    order: 1,
    active: true
  },
  {
    title: 'Leadership Collective',
    description: "Discover a delightful, easy way to lead as you deploy the world's best leadership practices into your life. Join our community of emerging leaders.",
    date: { day: '11', month: 'APR' },
    time: '6:30P',
    link: '/leadership',
    order: 2,
    active: true
  },
  {
    title: 'Prayer & Worship Night',
    description: "Experience an intimate evening of prayer and worship as we come together to seek God's presence and celebrate His goodness.",
    date: { day: '18', month: 'APR' },
    time: '7:00P',
    link: '/events',
    order: 3,
    active: true
  },
  {
    title: 'Community Groups Launch',
    description: "Be part of our growing community! Join a small group to connect deeply with others, grow in your faith, and find support in your journey.",
    date: { day: '25', month: 'APR' },
    time: '7:30P',
    link: '/groups',
    order: 4,
    active: true
  },
  {
    title: 'Monthly Movement Gathering',
    description: "Join us for our monthly global gathering featuring powerful worship and transformative teaching. Connect with believers from over 24 countries and 48 US States.",
    date: { day: '06', month: 'MAY' },
    time: '4:00P',
    link: '/watch',
    order: 5,
    active: true
  }
];

async function seedEvents() {
  try {
    console.log('Clearing existing events...');
    const eventsRef = db.collection('events');
    const existingEvents = await eventsRef.get();
    
    const batch = db.batch();
    existingEvents.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('Existing events cleared.');

    console.log('Adding new events...');
    const timestamp = Timestamp.now();
    
    const addPromises = initialEvents.map(event => 
      eventsRef.add({
        ...event,
        createdAt: timestamp,
        updatedAt: timestamp
      })
    );

    await Promise.all(addPromises);
    console.log('Events seeded successfully!');
  } catch (error) {
    console.error('Error seeding events:', error);
    throw error;
  }
}

console.log('Starting to seed events...');

seedEvents()
  .then(() => {
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  }); 