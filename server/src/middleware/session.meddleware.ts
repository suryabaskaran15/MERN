import type { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';
import { SESSION_EXPIRE_TIME } from '../config/config';

const sessionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the Authorization header
    const sessionId = req.cookies['sessionId'] ?? '';
    const token = await redisClient.get(sessionId);
    if (token) {
        await redisClient.expire(sessionId, parseInt(SESSION_EXPIRE_TIME));
    }
    next();
};

export default sessionMiddleware;
