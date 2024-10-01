import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

interface Post {
  name: string;
  content: string;
  image?: string;
  upvotes: string[];
  isUpvoted: boolean;
  isSaved: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { db } = await connectToDatabase();
      const post: Post = req.body;

      const result = await db.collection('posts').insertOne(post);

      res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
