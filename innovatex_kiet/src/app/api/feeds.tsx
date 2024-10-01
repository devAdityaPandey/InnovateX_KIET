import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import { Feed } from '../../models/feed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const feed = await Feed.find({});
    res.status(200).json(feed);
  }

  if (req.method === 'POST') {
    const newFeed = await Feed.create(req.body);
    res.status(201).json(newFeed);
  }
}
