import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  const { db } = await connectToDatabase();

  if (!db) {
    return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
  }

  try {
    const { title, content, author } = await request.json();

    if (!title || !content || !author) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const newPost = {
      title,
      content,
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('posts').insertOne(newPost);

    return NextResponse.json({ ...newPost, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: 'Error creating post', error }, { status: 500 });
  }
}
