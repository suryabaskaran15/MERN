import { Router } from "express";
import getAccounts from "../controllers/accountControllers/getAccounts.controller";
import updateAccount from "../controllers/accountControllers/updateAccount.controller";
import addAccount from "../controllers/accountControllers/addAccount.controller";
import deleteAccountController from "../controllers/accountControllers/deleteAccount.controller";
import { getUser } from "../controllers/authController/getUser.controller";

const accountsRouter = Router();

accountsRouter.get('/me', getUser)
accountsRouter.post("/", getAccounts);
accountsRouter.post("/add", addAccount);
accountsRouter.post("/update/:id", updateAccount);
accountsRouter.delete("/:id", deleteAccountController);

export default accountsRouter;