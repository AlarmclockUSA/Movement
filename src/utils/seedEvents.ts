import { db } from '@/lib/firebase';
import { collection, addDoc, writeBatch, getDocs, query, where, deleteDoc, Firestore } from 'firebase/firestore';
import type { Event } from '@/types/event';

const initialEvents: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Monthly Movement Gathering',
    date: { day: '01', month: 'APR' },
    time: '4:00P',
    link: '/watch',
    order: 1
  },
  {
    title: 'Leadership Collective',
    date: { day: '11', month: 'APR' },
    time: '6:30P',
    link: '/leadership',
    order: 2
  },
  {
    title: 'Prayer & Worship Night',
    date: { day: '18', month: 'APR' },
    time: '7:00P',
    link: '/events',
    order: 3
  },
  {
    title: 'Community Groups Launch',
    date: { day: '25', month: 'APR' },
    time: '7:30P',
    link: '/groups',
    order: 4
  },
  {
    title: 'Monthly Movement Gathering',
    date: { day: '06', month: 'MAY' },
    time: '4:00P',
    link: '/watch',
    order: 5
  }
];

export async function seedEvents(database: Firestore = db) {
  try {
    // First, clear existing events
    const eventsRef = collection(database, 'events');
    const existingEvents = await getDocs(eventsRef);
    
    const batch = writeBatch(database);
    existingEvents.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Add new events
    const timestamp = new Date();
    for (const event of initialEvents) {
      await addDoc(collection(database, 'events'), {
        ...event,
        createdAt: timestamp,
        updatedAt: timestamp
      });
    }

    console.log('Events seeded successfully!');
  } catch (error) {
    console.error('Error seeding events:', error);
  }
}

// Function to clear all events (useful for testing)
export async function clearEvents(database: Firestore = db) {
  try {
    const eventsRef = collection(database, 'events');
    const existingEvents = await getDocs(eventsRef);
    
    const batch = writeBatch(database);
    existingEvents.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    console.log('Events cleared successfully!');
  } catch (error) {
    console.error('Error clearing events:', error);
  }
} 