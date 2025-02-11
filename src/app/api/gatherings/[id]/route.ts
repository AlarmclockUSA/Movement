import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// GET single gathering
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = adminDb.collection('gatherings').doc(params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Gathering not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching gathering:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gathering' },
      { status: 500 }
    );
  }
}

// PUT/UPDATE gathering
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const docRef = adminDb.collection('gatherings').doc(params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Gathering not found' },
        { status: 404 }
      );
    }

    const updatedGathering = {
      day,
      date,
      time,
      updatedAt: new Date()
    };

    await docRef.update(updatedGathering);

    return NextResponse.json({ id: doc.id, ...updatedGathering });
  } catch (error) {
    console.error('Error updating gathering:', error);
    return NextResponse.json(
      { error: 'Failed to update gathering' },
      { status: 500 }
    );
  }
}

// DELETE gathering
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = adminDb.collection('gatherings').doc(params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Gathering not found' },
        { status: 404 }
      );
    }

    await docRef.delete();

    return NextResponse.json(
      { message: 'Gathering deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting gathering:', error);
    return NextResponse.json(
      { error: 'Failed to delete gathering' },
      { status: 500 }
    );
  }
} 