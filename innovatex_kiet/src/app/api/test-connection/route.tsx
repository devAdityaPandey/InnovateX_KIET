import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    // Connect to the database using the cached connection or establish a new one
    const dbConnection = await connectToDatabase();

    // Ping the database to check the connection
    await dbConnection.db.command({ ping: 1 });

    // Return a success response if the database connection is healthy
    return NextResponse.json({ message: 'Database connection is healthy' });
  } catch (error) {
    // If the connection fails, return an error response with a 500 status
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
