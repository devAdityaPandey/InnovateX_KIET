import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import { Leaderboard } from '../../../models/leaderboard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const leaderboard = await Leaderboard.find({});
    res.status(200).json(leaderboard);
  }

  if (req.method === 'POST') {
    const newEntry = await Leaderboard.create(req.body);
    res.status(201).json(newEntry);
  }
}
