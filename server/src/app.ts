import express from 'express';
import cors from "cors";
import connectDB from './config/db';
import authRouter from './routes/auth.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';
import accountsRouter from './routes/accounts.route';
import authMiddleware from './middleware/auth.middleware';
import passport from 'passport';
import session from 'express-session';
import cookieParser from "cookie-parser"
import { config } from 'dotenv';
import userModel from './models/user.model';
config({ path: "../../.env" }); // Load environment variables from .env file

const app = express();

connectDB();
app.use(cors({ origin: process.env.CLIENT_BASE_URL!, credentials: true, }));
app.use(express.json());
app.use(cookieParser());

// Set up session middleware
// Set up session middleware before passport initialization
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
