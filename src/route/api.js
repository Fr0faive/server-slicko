import express from "express";
import userController from "../controller/userController.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import articleController from "../controller/articleController.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get("/api/users/current", userController.getUser);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

const articleRouter = new express.Router();
articleRouter.use(authMiddleware);
articleRouter.post("/api/articles", articleController.create);

export { userRouter, articleRouter };
