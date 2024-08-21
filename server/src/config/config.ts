import { config } from 'dotenv';

config({path:"../.env"}); // Load environment variables from .env file

export const PORT = process.env.SERVER_PORT!;
export const DATABASE_URL = process.env.DB_URL!;
export const JWT_SECRET = process.env.JWT_SECRET!;