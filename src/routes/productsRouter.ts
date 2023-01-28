import { Router } from "express";
import { getProductController } from "../controllers/getProductController";
import { getProductsController } from "../controllers/getProductsController";
import { validateGetProductMiddleware } from "../middlewares/validateGetProductMiddleware";
import { validateGetProductsMiddleware } from "../middlewares/validateGetProductsMiddleware";

export const productsRouter = Router();

productsRouter.get("/", validateGetProductsMiddleware, getProductsController);
productsRouter.get("/slug", validateGetProductMiddleware, getProductController);
// productsRouter.post("/");
// productsRouter.delete(":productId");
// productsRouter.put();
