import { Router } from "express";
import getAccounts from "../controllers/accountControllers/getAccounts.controller";
import updateAccount from "../controllers/accountControllers/updateAccount.controller";
import addAccount from "../controllers/accountControllers/addAccount.controller";
import deleteAccountController from "../controllers/accountControllers/deleteAccount.controller";

const accountsRouter = Router();

accountsRouter.post("/", getAccounts);
accountsRouter.post("/add", addAccount);
accountsRouter.post("/update/:id", updateAccount);
accountsRouter.delete("/:id", deleteAccountController);

export default accountsRouter;