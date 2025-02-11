import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Event } from '@/types/event';

function getFirstMondayDate(month: number, year: number): { day: string; month: string } {
  const date = new Date(year, month, 1);
  const dayOfWeek = date.getDay();
  const daysUntilMonday = (dayOfWeek <= 1) ? 1 - dayOfWeek : 8 - dayOfWeek;
  date.setDate(1 + daysUntilMonday);
  
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  };
}

function processRecurringEvent(event: Event): Event {
  if (!event.recurring || !event.recurring.enabled) return event;

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // For monthly recurring events on first Monday
  if (event.recurring.type === 'monthly' && 
      event.recurring.dayOfWeek === 1 && 
      event.recurring.weekOfMonth === 1) {
    
    // Get the next occurrence
    let nextDate = getFirstMondayDate(currentMonth, currentYear);
    const nextDateObj = new Date(currentYear, currentMonth, parseInt(nextDate.day));
    
    // If this month's date has passed, get next month's date
    if (nextDateObj < today) {
      nextDate = getFirstMondayDate(
        currentMonth + 1 === 12 ? 0 : currentMonth + 1,
        currentMonth + 1 === 12 ? currentYear + 1 : currentYear
      );
    }
    
    return {
      ...event,
      date: nextDate
    };
  }
  
  return event;
}

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
        
        // Process recurring events and filter out past events
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const currentDay = currentDate.getDate().toString().padStart(2, '0');
        
        const processedEvents = eventsData.map(processRecurringEvent);
        
        const futureEvents = processedEvents.filter(event => {
          const eventMonth = event.date.month;
          const eventDay = parseInt(event.date.day);
          
          if (eventMonth > currentMonth) return true;
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