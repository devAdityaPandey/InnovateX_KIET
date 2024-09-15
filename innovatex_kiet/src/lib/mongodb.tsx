import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || 'myDatabase');

    // Check connection
    await db.command({ ping: 1 });
    
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
