import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import type { Event } from '@/types/event';

// GET all events
export async function GET() {
  try {
    const eventsRef = adminDb.collection('events');
    const snapshot = await eventsRef
      .orderBy('order', 'asc')
      .orderBy('date.month', 'asc')
      .orderBy('date.day', 'asc')
      .get();
    
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST new event
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, date, time, link } = body;

    // Validate required fields
    if (!title || !date || !time || !link) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const event: Omit<Event, 'id'> = {
      title,
      date,
      time,
      link,
      createdAt: new Date(),
      updatedAt: new Date(),
      order: date.month === 'APR' ? 1 : date.month === 'MAY' ? 2 : 3 // Simple ordering by month
    };

    const docRef = await adminDb.collection('events').add(event);
    const newEvent = { id: docRef.id, ...event };

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 