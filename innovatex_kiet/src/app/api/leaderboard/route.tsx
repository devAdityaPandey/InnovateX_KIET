// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb';

// export async function GET(req: NextRequest) {
//   try {
//     const { db } = await connectToDatabase();

//     // Fetch all leaderboard entries
//     const leaderboard = await db.collection('leaderboard').find({}).toArray();

//     // Return the leaderboard data as JSON
//     return NextResponse.json(leaderboard);
//   } catch (error) {
//     // Return an error response if something goes wrong
//     console.error('Error fetching leaderboard:', error);
//     return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { db } = await connectToDatabase();

//     // Parse the request body as JSON
//     const { name, score } = await req.json();

//     // Validate the presence of required fields
//     if (!name || score === undefined) {
//       return NextResponse.json({ message: 'Name and score are required' }, { status: 400 });
//     }

//     // Create a new leaderboard entry
//     const newEntry = {
//       name,
//       score,
//       createdAt: new Date(),
//     };

//     const result = await db.collection('leaderboard').insertOne(newEntry);

//     // Return the newly created entry as JSON
//     return NextResponse.json({ ...newEntry, id: result.insertedId.toString() }, { status: 201 });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error creating leaderboard entry:', error);
//     return NextResponse.json({ error: 'Failed to create leaderboard entry' }, { status: 500 });
//   }
// }
