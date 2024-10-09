import { Request, Response } from 'express';
import { getUserDetails } from '../../services/user.service';


export const getUser = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies['jwt'];
    if (!token) { 
        res.status(401).json({ message: 'Invalid user' });
        return;
    }
    try {
        const user = await getUserDetails(token);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        res.status(200).json({
            user
        });
    } catch (error : any) {
        res.status(500).json({ message: error?.message });
    }
};