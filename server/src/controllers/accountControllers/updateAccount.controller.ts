import type { Request, Response } from "express";
import { updateExsistingAccount } from "../../services/accounts.service";

/**
 * @openapi
 * /accounts/update/{id}:
 *   post:
 *     operationId: UpdateAccount
 *     summary: Update an existing account
 *     description: Updates an existing account with the provided details.
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the account to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account updated successfully"
 *       400:
 *         description: Bad request, validation or other error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: Invalid input"
 */

const updateAccount = async (req: Request, res: Response) => {
    const acId = req.params.id as string;
    const payload = req.body;
    try{
        await updateExsistingAccount(acId, payload);
        res.status(200).json({message: "Account updated successfully"});
    }catch(err : any){
        res.status(400).json({message: err.message})
    }
}

export default updateAccount;