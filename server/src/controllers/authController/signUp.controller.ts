import { Request, Response } from "express";
import { createNewUser } from "../../services/user.service";

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     operationId: signUpUser
 *     summary: Register a new user
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
 *               username:
 *                 type: string
 *                 optional: true
 *                 description: Username of the new user
 *                 example: johndoe
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
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 */
const signUpUser = async(req:Request,res:Response)=>{
const payload = req.body;
try{
    await createNewUser(payload);
    res.status(200).send({message:"User created successfully"});
}catch(err : any){
    res.status(409).send({ message: err.message });
}
}
export default signUpUser;