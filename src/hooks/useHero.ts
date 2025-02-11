import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { HeroMessage } from '@/types/hero';

export function useHero() {
  const [messages, setMessages] = useState<HeroMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const heroQuery = query(
      collection(db, 'hero'),
      where('active', '==', true),
      orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(
      heroQuery,
      (snapshot) => {
        const heroData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as HeroMessage[];
        
        setMessages(heroData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error fetching hero messages:', error);
        setError('Failed to fetch hero messages');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { messages, loading, error };
} 