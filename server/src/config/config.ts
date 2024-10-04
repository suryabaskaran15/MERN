import { config } from 'dotenv';

config({path:"../.env"}); // Load environment variables from .env file

export const PORT = process.env.SERVER_PORT!;
export const DATABASE_URL = process.env.DB_URL!;
export const DB_USER = process.env.DB_USER!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const ES_BASE_URL = process.env.ES_BASE_URL!;
export const SESSION_SECRET = process.env.SESSION_SECRET!;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL!;