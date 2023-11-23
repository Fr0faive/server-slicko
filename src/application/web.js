import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { articleRouter, userRouter } from "../route/api.js";

export const web = new express();
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(articleRouter);
web.use(errorMiddleware);
