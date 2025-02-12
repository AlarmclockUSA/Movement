import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const sampleImages = [
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2574&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?q=80&w=2574&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2670&auto=format&fit=crop'
];

export async function updateEvents() {
  try {
    console.log('Updating events...');
    const eventsRef = collection(db, 'events');
    const snapshot = await getDocs(eventsRef);

    const updatePromises = snapshot.docs.map(async (docSnapshot) => {
      const existingEvent = docSnapshot.data();
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];

      // Convert the existing event to the new structure
      const updatedEvent = {
        title: existingEvent.title || 'Untitled Event',
        description: existingEvent.longDescription || existingEvent.description || '',
        startDate: new Date(
          existingEvent.date?.month === 'JAN' ? 2025 : 2024,
          ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].indexOf(existingEvent.date?.month || 'JAN'),
          parseInt(existingEvent.date?.day || '1')
        ).toISOString(),
        endDate: new Date(
          existingEvent.date?.month === 'JAN' ? 2025 : 2024,
          ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].indexOf(existingEvent.date?.month || 'JAN'),
          parseInt(existingEvent.date?.day || '1')
        ).toISOString(),
        imageUrl: randomImage,
        type: existingEvent.title?.toLowerCase().includes('gathering') ? 'gathering' 
          : existingEvent.title?.toLowerCase().includes('leadership') ? 'conference'
          : 'workshop',
        status: 'upcoming',
        location: {
          type: existingEvent.location?.type || 'virtual',
          address: existingEvent.location?.address || null,
          city: existingEvent.location?.city || null,
          country: 'United States'
        },
        registrationUrl: existingEvent.registration?.url || '/register',
        price: existingEvent.price || null,
        capacity: existingEvent.registration?.capacity || null,
        speakers: existingEvent.speakers?.map((speaker: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          name: speaker.name || 'Unknown Speaker',
          role: speaker.role || 'Speaker',
          imageUrl: speaker.image || null
        })) || [],
        schedule: [{
          date: new Date(
            existingEvent.date?.month === 'JAN' ? 2025 : 2024,
            ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].indexOf(existingEvent.date?.month || 'JAN'),
            parseInt(existingEvent.date?.day || '1')
          ).toISOString(),
          sessions: [{
            time: existingEvent.time || '00:00',
            title: 'Main Session',
            description: existingEvent.description || '',
            speaker: existingEvent.speakers?.[0]?.name || null
          }]
        }]
      };

      return updateDoc(doc(db, 'events', docSnapshot.id), updatedEvent);
    });

    await Promise.all(updatePromises);
    console.log('Events updated successfully!');
  } catch (error) {
    console.error('Error updating events:', error);
  }
} 