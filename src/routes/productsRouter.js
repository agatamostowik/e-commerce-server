import { Router } from "express";
import { getProductsController } from "../controllers/getProductController.js";

export const productsRouter = Router();

productsRouter.get("/", getProductsController);
// productsRouter.post("/");
// productsRouter.delete(":productId");
// productsRouter.put();
