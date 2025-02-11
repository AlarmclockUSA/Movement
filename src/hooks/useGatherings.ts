import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Gathering } from '@/types/gathering';

export function useGatherings() {
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const gatheringsQuery = query(
      collection(db, 'gatherings'),
      orderBy('date', 'asc')
    );

    const unsubscribe = onSnapshot(
      gatheringsQuery,
      (snapshot) => {
        const gatheringsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Gathering[];
        
        setGatherings(gatheringsData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error fetching gatherings:', error);
        setError('Failed to fetch gatherings');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { gatherings, loading, error };
} 