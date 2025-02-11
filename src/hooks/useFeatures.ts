import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Feature } from '@/types/feature';

export function useFeatures() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const featuresQuery = query(
      collection(db, 'features'),
      where('active', '==', true),
      orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(
      featuresQuery,
      (snapshot) => {
        const featuresData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Feature[];
        
        setFeatures(featuresData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error fetching features:', error);
        setError('Failed to fetch features');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { features, loading, error };
} 