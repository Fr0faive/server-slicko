import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { articleRouter, userRouter } from "../route/api.js";
import cors from "cors";

export const web = new express();
web.use(cors());
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(articleRouter);
web.use(errorMiddleware);
