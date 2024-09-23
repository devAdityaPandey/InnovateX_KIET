import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Post from '@/models/post';

// Database connection
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || '';
  if (mongoose.connections[0].readyState) return;
  if (!uri) {
    throw new Error('MONGO_URI environment variable not defined');
  }
  await mongoose.connect(uri, {
    // Options (if required)
  });
};

// Define types for request body
interface PostBody {
  author: string;
  title: string;
  content: string;
  images?: string[];
  department?: string;
}

// GET handler: Fetch all posts
export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().populate('author', 'name').exec();
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

// POST handler: Create a new post
export async function POST(req: Request) {
  try {
    await connectDB();
    const body: PostBody = await req.json();
    const { title, content, images} = body;

    // Check for missing fields
    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const newPost = new Post({
      title,
      content,
      images,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newPost.save();
    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

// PUT handler: Update an existing post
export async function PUT(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }
    const body: PostBody = await req.json();
    const { title, content, images, department } = body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, images, department, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
