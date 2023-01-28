import { Router } from "express";
import { productsRouter } from "./productsRouter";

export const apiRouter = Router();

apiRouter.use("/products", productsRouter);
