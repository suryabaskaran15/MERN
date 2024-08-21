import express from 'express';
import cors from "cors";
import connectDB from './config/db';
import authRouter from './routes/auth.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';

const app = express();

connectDB();
app.use(cors({ origin: process.env.CLIENT_BASE_URL! }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
