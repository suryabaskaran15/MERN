import { Router } from "express";
import getAccounts from "../controllers/accountControllers/getAccounts.controller";

const accountsRouter = Router();

accountsRouter.post("/", getAccounts);

export default accountsRouter;