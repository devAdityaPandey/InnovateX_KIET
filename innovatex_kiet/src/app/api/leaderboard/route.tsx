import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
    try {
        const { db } = await connectToDatabase();

        // Fetch all leaderboard entries, sorted by points in descending order
        const leaderboard = await db.collection('leaderboard')
            .find({})
            .sort({ points: -1 })
            .limit(10)
            .toArray();

        // Return the leaderboard data as JSON
        return NextResponse.json({ success: true, data: leaderboard });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch leaderboard' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { db } = await connectToDatabase();

        const { name, points } = await req.json();

        // Validate the presence of required fields
        if (!name || points === undefined) {
            return NextResponse.json({ success: false, message: 'Name and points are required' }, { status: 400 });
        }

        // Create a new leaderboard entry
        const newEntry = {
            name,
            points,
            createdAt: new Date(),
        };

        const result = await db.collection('leaderboard').insertOne(newEntry);

        return NextResponse.json({ success: true, ...newEntry, id: result.insertedId.toString() }, { status: 201 });
    } catch (error) {
        console.error('Error creating leaderboard entry:', error);
        return NextResponse.json({ success: false, message: 'Failed to create leaderboard entry' }, { status: 500 });
    }
}
