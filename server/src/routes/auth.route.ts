import { Router } from "express";
import signUpUser from "../controllers/authController/signUp.controller";
import { login } from "../controllers/authController/login.controller";

const authRouter = Router();

authRouter.post("/signup", signUpUser);
authRouter.post("/login", login);

export default authRouter;