import { 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc,
  doc,
  orderBy,
  limit,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Event } from '@/types/event';

const COLLECTION_NAME = 'events';

export const eventService = {
  async getFeaturedEvent(): Promise<Event | null> {
    try {
      const eventsRef = collection(db, COLLECTION_NAME);
      const q = query(
        eventsRef,
        where('status', '==', 'upcoming'),
        orderBy('startDate', 'asc'),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;

      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as Event;
    } catch (error) {
      console.error('Error fetching featured event:', error);
      return null;
    }
  },

  async getUpcomingEvents(limitCount: number = 3): Promise<Event[]> {
    try {
      const eventsRef = collection(db, COLLECTION_NAME);
      const q = query(
        eventsRef,
        where('status', '==', 'upcoming'),
        orderBy('startDate', 'asc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }
  },

  async getEventById(id: string): Promise<Event | null> {
    try {
      const eventRef = doc(db, COLLECTION_NAME, id);
      const eventDoc = await getDoc(eventRef);

      if (!eventDoc.exists()) return null;

      return {
        id: eventDoc.id,
        ...eventDoc.data()
      } as Event;
    } catch (error) {
      console.error('Error fetching event by id:', error);
      return null;
    }
  },

  async getAllEvents(): Promise<Event[]> {
    try {
      const eventsRef = collection(db, COLLECTION_NAME);
      const q = query(eventsRef, orderBy('startDate', 'asc'));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
    } catch (error) {
      console.error('Error fetching all events:', error);
      return [];
    }
  }
}; 