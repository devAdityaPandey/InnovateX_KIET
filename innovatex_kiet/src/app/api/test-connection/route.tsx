import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    await db.command({ ping: 1 });
    return NextResponse.json({ message: 'Database connection is healthy' });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
