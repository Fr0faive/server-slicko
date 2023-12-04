import express from "express";
import userController from "../controller/userController.js";
import productController from "../controller/productController.js";

const publicRouter = new express.Router();
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
// Products
publicRouter.use("/images", express.static("uploads"));
publicRouter.get("/api/products/:productId", productController.getProductById);
publicRouter.get("/api/products", productController.getProductAll);

export { publicRouter };
