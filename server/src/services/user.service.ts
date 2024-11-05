import { MongooseError } from "mongoose";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/jwtToken";
import { UserCredentials } from "../types/type";

const createNewUser = async (user: UserCredentials) => {
    if (user) {
        const hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = new userModel({ ...user, password: hashPassword });
        try {
            await newUser.save();
            return newUser;
        } catch (err: any) {
            let message = "unable to create user";
            if (err instanceof MongooseError || err.code === 11000) {
                if (err?.keyPattern?.userName) {
                    message = "Username already exists";
                }
                if (err?.keyPattern?.email) {
                    message = "Email already exists";
                }
            }
            throw new Error(message);
        }
    }
}

const loginUser = async ({ email, password }: UserCredentials) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? generateToken(user) : null;
}

const getUserDetails = async (token: string): Promise<any> => {
    const decoded = await verifyToken(token);
    return decoded;
}

export { createNewUser, loginUser, getUserDetails };