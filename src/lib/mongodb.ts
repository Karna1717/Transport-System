import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return mongoose.connection;
  }

  console.log('Creating new MongoDB connection');
  
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}; 