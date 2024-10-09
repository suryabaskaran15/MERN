import { Request, Response } from 'express';
import { loginUser } from '../../services/user.service';


/**
 * @openapi
 * /auth/login:
 *   post:
 *     operationId: loginUser
 *     summary: login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the new user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password of the new user
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *                 - token
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: ajsfhegipaegavbpairgpierb
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const token = await loginUser({ email, password });
        if (!token) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        res.cookie('jwt', token);
        res.status(200).json({
            message: 'Login successful'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to login' });
    }
};
