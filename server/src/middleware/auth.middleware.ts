import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded){
            next();
        }
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;
