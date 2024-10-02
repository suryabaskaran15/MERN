import type { Request, Response } from "express";
import { deleteAccount } from "../../services/accounts.service";

/**
 * @openapi
 * /accounts/{id}:
 *   delete:
 *     operationId: DeleteAccount
 *     summary: Delete an existing account
 *     description: Delete an existing account with the provided id.
 *     tags:
 *       - Accounts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the account to update
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account deleted successfully"
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
const deleteAccountController = async(req:Request , res:Response)=>{
    try{
        await deleteAccount(req.params.id);
        res.status(200).json({message : "Account deleted successfully !"});
    }catch(error : any){
        res.status(400).json({ message: error?.message});
    }
}

export default deleteAccountController;