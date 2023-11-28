import express from "express";
import userController from "../controller/userController.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import productController from "../controller/productController.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get("/api/users/current", userController.getUser);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Products
userRouter.use(authMiddleware);
userRouter.post("/api/products", productController.createProduct);
userRouter.get("/api/products/:id", productController.getProductById);
userRouter.get("/api/products", productController.getProductAll);
userRouter.get("/api/products/:name", productController.getProductByName);

export { userRouter };
