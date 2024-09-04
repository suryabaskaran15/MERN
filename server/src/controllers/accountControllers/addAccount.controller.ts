import type { Request, Response } from "express";
import { addNewAccount } from "../../services/accounts.service";

/**
 * @openapi
 * /accounts/add:
 *   post:
 *     operationId: AddNewAccount
 *     summary: Create a new account
 *     description: Create a new account in the system with the provided details.
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - age
 *               - gender
 *               - address
 *               - employer
 *               - email
 *               - city
 *               - state
 *               - balance
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               age:
 *                 type: number
 *                 example: 30
 *               gender:
 *                 type: string
 *                 enum: [M, F]
 *                 example: "M"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               employer:
 *                 type: string
 *                 example: "Company Inc."
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               city:
 *                 type: string
 *                 example: "Springfield"
 *               state:
 *                 type: string
 *                 example: "IL"
 *               balance:
 *                 type: number
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account created successfully"
 *       400:
 *         description: Bad request, validation or other error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: Missing required field"
 */

const addAccount = async (req: Request, res: Response) => {
    const payload = req.body;
    try{
        await addNewAccount(payload);
        res.status(200).send({ message: "Account created successfully"});
    }catch(error : any){
        res.status(400).send({ message: error.message });
    }
}

export default addAccount;