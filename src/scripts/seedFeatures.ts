import { db } from './firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import type { Feature } from '@/types/feature';

const initialFeatures: Omit<Feature, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: "Monthly Gatherings",
    description: "Experience powerful worship and teaching every first Monday",
    link: {
      text: "Join Us",
      url: "/gatherings"
    },
    image: {
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop",
      alt: "Monthly Gatherings"
    },
    order: 1,
    active: true
  },
  {
    title: "Small Groups",
    description: "Connect deeply in our intimate online communities",
    link: {
      text: "Find Your Group",
      url: "/groups"
    },
    image: {
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2574&auto=format&fit=crop",
      alt: "Small Groups"
    },
    order: 2,
    active: true
  },
  {
    title: "Brilliant Plus",
    description: "Daily devotionals and spiritual growth resources",
    link: {
      text: "Start Your Journey",
      url: "/plus"
    },
    image: {
      url: "https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?q=80&w=2574&auto=format&fit=crop",
      alt: "Brilliant Plus"
    },
    order: 3,
    active: true
  },
  {
    title: "Live Events",
    description: "Transformative conferences and workshops",
    link: {
      text: "View Calendar",
      url: "/events"
    },
    image: {
      url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2670&auto=format&fit=crop",
      alt: "Live Events"
    },
    order: 4,
    active: true
  },
  {
    title: "Business",
    description: "Kingdom principles for marketplace leaders",
    link: {
      text: "Learn More",
      url: "/business"
    },
    image: {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
      alt: "Business"
    },
    order: 5,
    active: true
  }
];

async function seedFeatures() {
  try {
    console.log('Clearing existing features...');
    const featuresRef = db.collection('features');
    const existingFeatures = await featuresRef.get();
    
    const batch = db.batch();
    existingFeatures.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('Existing features cleared.');

    console.log('Adding new features...');
    const timestamp = Timestamp.now();
    
    const addPromises = initialFeatures.map(feature => 
      featuresRef.add({
        ...feature,
        createdAt: timestamp,
        updatedAt: timestamp
      })
    );

    await Promise.all(addPromises);
    console.log('Features seeded successfully!');
  } catch (error) {
    console.error('Error seeding features:', error);
    throw error;
  }
}

// Only run if this file is being executed directly
if (require.main === module) {
  seedFeatures()
    .then(() => {
      console.log('Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error during seeding:', error);
      process.exit(1);
    });
} 