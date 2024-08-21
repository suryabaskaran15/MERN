import mongoose, { Error } from "mongoose";
import { DATABASE_URL } from "./config";
const connectDB = async (): Promise<void> => {
    try {
        mongoose.connect(DATABASE_URL)
        console.log('Connected to MongoDB');
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;