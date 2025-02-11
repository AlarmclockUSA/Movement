import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import type { Gathering } from '@/types/gathering';

// GET all gatherings
export async function GET() {
  try {
    const gatheringsRef = adminDb.collection('gatherings');
    const snapshot = await gatheringsRef.orderBy('date', 'asc').get();
    
    const gatherings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(gatherings);
  } catch (error) {
    console.error('Error fetching gatherings:', error);
    return NextResponse.json({ error: 'Failed to fetch gatherings' }, { status: 500 });
  }
}

// POST new gathering
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { day, date, time } = body;

    // Validate required fields
    if (!day || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const gathering: Omit<Gathering, 'id'> = {
      day,
      date,
      time,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await adminDb.collection('gatherings').add(gathering);
    const newGathering = { id: docRef.id, ...gathering };

    return NextResponse.json(newGathering, { status: 201 });
  } catch (error) {
    console.error('Error creating gathering:', error);
    return NextResponse.json(
      { error: 'Failed to create gathering' },
      { status: 500 }
    );
  }
} 