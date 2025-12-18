import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increased from 10s to 30s
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000, // Added connection timeout
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(`Full error:`, error);
    console.error(`\n⚠️  Possible causes:`);
    console.error(`   1. Check if your IP is whitelisted in MongoDB Atlas`);
    console.error(`   2. Verify MONGO_URI in .env file`);
    console.error(`   3. Check internet connection`);
    console.error(`   4. Verify MongoDB Atlas cluster is running\n`);
    // process.exit(1); // Do not exit, let server logic retry
    throw error;
  }
};

export default connectDB;
