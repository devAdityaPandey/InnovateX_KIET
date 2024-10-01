import mongoose, { Connection } from 'mongoose';

const uri = process.env.MONGODB_URI || '';
let cachedConnection: Connection | null = null;

export async function connectToDatabase() {
 
 
  if (cachedConnection && cachedConnection.readyState === 1) {
    // Return the cached connection if it's already connected
    return cachedConnection;
  }

  try {
    // Establish a new connection if not cached
    const connection = await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    cachedConnection = connection.connection;

    return cachedConnection;
  } catch (error) {
    console.error('Failed to connect to MongoDB with Mongoose:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
