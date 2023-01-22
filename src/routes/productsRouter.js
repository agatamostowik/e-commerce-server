import { Router } from "express";
import { getProductController } from "../controllers/getProductController.js";
import { getProductsController } from "../controllers/getProductsController.js";
import { validateGetProductMiddleware } from "../middlewares/validateGetProductMiddleware.js";
import { validateGetProductsMiddleware } from "../middlewares/validateGetProductsMiddleware.js";

export const productsRouter = Router();

productsRouter.get("/", validateGetProductsMiddleware, getProductsController);
productsRouter.get("/slug", validateGetProductMiddleware, getProductController);
// productsRouter.post("/");
// productsRouter.delete(":productId");
// productsRouter.put();
