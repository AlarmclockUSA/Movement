import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Event } from '@/types/event';

export function useEvents(eventLimit: number = 5) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventsQuery = query(
      collection(db, 'events'),
      where('active', '==', true),
      orderBy('order', 'asc'),
      orderBy('date.month', 'asc'),
      orderBy('date.day', 'asc'),
      limit(eventLimit)
    );

    const unsubscribe = onSnapshot(
      eventsQuery,
      (snapshot) => {
        const eventsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Event[];
        
        // Filter out past events
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const currentDay = currentDate.getDate().toString().padStart(2, '0');
        
        const futureEvents = eventsData.filter(event => {
          // Convert month strings to numbers for comparison
          const eventMonth = event.date.month;
          const eventDay = parseInt(event.date.day);
          
          // If event is in a future month
          if (eventMonth > currentMonth) return true;
          
          // If event is in current month, check the day
          if (eventMonth === currentMonth) {
            return eventDay >= parseInt(currentDay);
          }
          
          return false;
        });
        
        setEvents(futureEvents);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [eventLimit]);

  return { events, loading, error };
} 