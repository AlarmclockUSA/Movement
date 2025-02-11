import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TeamMember } from '@/types/team';

export function useTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const teamQuery = query(
      collection(db, 'team'),
      where('active', '==', true),
      orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(
      teamQuery,
      (snapshot) => {
        const teamData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as TeamMember[];
        
        setTeam(teamData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error fetching team:', error);
        setError('Failed to fetch team');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { team, loading, error };
} 