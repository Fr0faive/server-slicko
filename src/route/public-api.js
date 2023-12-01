import express from "express";
import userController from "../controller/userController.js";

const publicRouter = new express.Router();
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
// Products
publicRouter.get("/api/products/:id", productController.getProductById);
publicRouter.get("/api/products", productController.getProductAll);
publicRouter.get("/api/products/:name", productController.getProductByName);

export { publicRouter };
