import mongoose, { Error } from "mongoose";
import { DATABASE_URL, DB_PASSWORD, DB_USER } from "./config";
const connectDB = async (): Promise<void> => {
    try {
        mongoose.connect(DATABASE_URL,{
            auth:{
                username: DB_USER,
                password: DB_PASSWORD
            },
            authSource: 'admin',
        })
        console.log('Connected to MongoDB');
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;