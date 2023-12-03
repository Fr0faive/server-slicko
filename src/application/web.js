import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors";
import morgan from "morgan";

export const web = new express();
web.use(cors());
web.use(express.json());
web.use(morgan("dev"));
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
