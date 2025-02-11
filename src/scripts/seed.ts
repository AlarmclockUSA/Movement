import { config } from 'dotenv';
import { resolve } from 'path';
import { db } from './firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// Load environment variables from .env.local
const result = config({
  path: resolve(process.cwd(), '.env.local')
});

if (result.error) {
  throw new Error('Error loading environment variables: ' + result.error.message);
}

// Log the loaded environment variables (without sensitive values)
console.log('Environment variables loaded:', {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
});

// Helper function to get the first Monday of a given month and year
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

// Get next three months' first Monday dates
const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const nextThreeMonths = Array.from({ length: 3 }, (_, i) => {
  const targetMonth = (currentMonth + i) % 12;
  const targetYear = currentYear + Math.floor((currentMonth + i) / 12);
  return getFirstMondayDate(targetMonth, targetYear);
});

const initialEvents = [
  // First Monthly Movement Gathering
  {
    title: 'Monthly Movement Gathering',
    description: "Join us for our monthly global gathering featuring powerful worship and transformative teaching. Connect with believers from over 24 countries and 48 US States.",
    longDescription: "Experience the power of global unity as we come together for our monthly Movement Gathering. This transformative event features dynamic worship, profound biblical teaching, and a chance to connect with believers from across the globe. Whether you're a long-time member or joining us for the first time, you'll find a welcoming community dedicated to living the life Jesus paid for.",
    date: nextThreeMonths[0],
    time: '4:00P',
    location: {
      type: 'online' as const,
      url: 'https://movement.online/live'
    },
    routing: {
      useDefault: true // Use the default event page
    },
    registration: {
      required: true,
      url: '/register',
      deadline: new Date(currentYear, currentMonth, parseInt(nextThreeMonths[0].day) - 1)
    },
    speakers: [
      {
        name: 'Graham Cooke',
        role: 'Global Pastor',
        image: '/graham-theresa.jpg'
      }
    ],
    image: {
      url: '/church-background.jpg',
      alt: 'Monthly Movement Gathering'
    },
    order: 1,
    active: true,
    recurring: {
      type: 'monthly' as const,
      dayOfWeek: 1,
      weekOfMonth: 1,
      enabled: true
    }
  },
  // Leadership Events
  {
    title: 'Leadership Collective',
    description: "Discover a delightful, easy way to lead as you deploy the world's best leadership practices into your life. Join our community of emerging leaders.",
    longDescription: "The Leadership Collective is more than just a training program—it's a transformative journey into Kingdom leadership. Through interactive sessions, practical workshops, and real-world applications, you'll develop the skills and mindset needed to lead with purpose and impact.",
    date: {
      day: '15',
      month: nextThreeMonths[0].month
    },
    time: '6:30P',
    location: {
      type: 'hybrid' as const,
      url: 'https://movement.online/leadership',
      address: '123 Leadership Way',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101'
    },
    routing: {
      useDefault: false,
      externalUrl: 'https://movement.online/leadership-register'
    },
    registration: {
      required: true,
      capacity: 100,
      deadline: new Date(currentYear, currentMonth, 14)
    },
    image: {
      url: '/leadership-background.jpg',
      alt: 'Leadership Collective'
    },
    order: 2,
    active: true
  },
  // Prayer & Worship Events
  {
    title: 'Prayer & Worship Night',
    description: "Experience an intimate evening of prayer and worship as we come together to seek God's presence and celebrate His goodness.",
    longDescription: "Join us for a powerful evening of worship and intercession. This intimate gathering creates space for deep encounters with God through extended worship, guided prayer, and prophetic ministry. Come expecting to experience God's presence in a profound way.",
    date: {
      day: '22',
      month: nextThreeMonths[0].month
    },
    time: '7:00P',
    location: {
      type: 'online' as const,
      url: 'https://movement.online/worship'
    },
    routing: {
      useDefault: true // Use the default event page
    },
    image: {
      url: '/worship-background.jpg',
      alt: 'Prayer & Worship Night'
    },
    order: 3,
    active: true
  },
  // Community Groups
  {
    title: 'Community Groups Launch',
    description: "Be part of our growing community! Join a small group to connect deeply with others, grow in your faith, and find support in your journey.",
    longDescription: "Community Groups are the heart of our movement, where real relationships are formed and authentic faith is lived out. At our launch event, you'll learn about different group options, meet potential group members, and find the perfect fit for your schedule and interests.",
    date: {
      day: '29',
      month: nextThreeMonths[0].month
    },
    time: '7:30P',
    location: {
      type: 'online' as const,
      url: 'https://movement.online/groups'
    },
    routing: {
      useDefault: true // Use the default event page
    },
    registration: {
      required: true,
      url: '/groups/register'
    },
    image: {
      url: '/community-background.jpg',
      alt: 'Community Groups Launch'
    },
    order: 4,
    active: true
  },
  // Second Monthly Movement Gathering
  {
    title: 'Monthly Movement Gathering',
    description: "Join us for our monthly global gathering featuring powerful worship and transformative teaching. Connect with believers from over 24 countries and 48 US States.",
    longDescription: "Experience the power of global unity as we come together for our monthly Movement Gathering. This transformative event features dynamic worship, profound biblical teaching, and a chance to connect with believers from across the globe. Whether you're a long-time member or joining us for the first time, you'll find a welcoming community dedicated to living the life Jesus paid for.",
    date: nextThreeMonths[1],
    time: '4:00P',
    location: {
      type: 'online' as const,
      url: 'https://movement.online/live'
    },
    routing: {
      useDefault: true // Use the default event page
    },
    registration: {
      required: true,
      url: '/register',
      deadline: new Date(
        nextThreeMonths[1].month === 'JAN' ? currentYear + 1 : currentYear,
        ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].indexOf(nextThreeMonths[1].month),
        parseInt(nextThreeMonths[1].day) - 1
      )
    },
    speakers: [
      {
        name: 'Graham Cooke',
        role: 'Global Pastor',
        image: '/graham-theresa.jpg'
      }
    ],
    image: {
      url: '/church-background.jpg',
      alt: 'Monthly Movement Gathering'
    },
    order: 5,
    active: true,
    recurring: {
      type: 'monthly' as const,
      dayOfWeek: 1,
      weekOfMonth: 1,
      enabled: true
    }
  }
];

async function seedEvents() {
  try {
    console.log('Clearing existing events...');
    const eventsRef = db.collection('events');
    const existingEvents = await eventsRef.get();
    
    const batch = db.batch();
    existingEvents.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('Existing events cleared.');

    console.log('Adding new events...');
    const timestamp = Timestamp.now();
    
    const addPromises = initialEvents.map(event => 
      eventsRef.add({
        ...event,
        createdAt: timestamp,
        updatedAt: timestamp
      })
    );

    await Promise.all(addPromises);
    console.log('Events seeded successfully!');
  } catch (error) {
    console.error('Error seeding events:', error);
    throw error;
  }
}

console.log('Starting to seed events...');

seedEvents()
  .then(() => {
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  }); 