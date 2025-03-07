import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const generateToken = (userDetails : object)=>{
    return jwt.sign({ ...userDetails }, JWT_SECRET!, {
        expiresIn: '1D',
    });
}

export const verifyToken = (token : string) => {
    return jwt.verify(token, JWT_SECRET)
}