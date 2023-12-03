import express from "express";
import userController from "../controller/userController.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { upload } from "../middleware/multer-middleware.js";
import productController from "../controller/productController.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get("/api/users/current", userController.getUser);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Products
userRouter.use(upload.single("image"));
userRouter.post("/api/products", productController.createProduct);
userRouter.patch("/api/products/:id", productController.updateProduct);
userRouter.delete("/api/products/:id", productController.deleteProduct);

export { userRouter };
