import express from "express";
import userController from "../controller/userController.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import productController from "../controller/productController.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get("/api/users/current", userController.getUser);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

const productRouter = new express.Router();
productRouter.use(authMiddleware);
productRouter.post("/api/products", productController.createProduct);

export { userRouter, productRouter };
