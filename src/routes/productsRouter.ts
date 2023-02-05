import { Router } from "express";
import { postProductController } from "../controllers/postProductController";
import { getProductController } from "../controllers/getProductController";
import { getProductsController } from "../controllers/getProductsController";
import { validatePostProductMiddleware } from "../middlewares/validatePostProductMiddleware";
import { validateGetProductMiddleware } from "../middlewares/validateGetProductMiddleware";
import { validateGetProductsMiddleware } from "../middlewares/validateGetProductsMiddleware";

export const productsRouter = Router();

productsRouter.get("/", validateGetProductsMiddleware, getProductsController);
productsRouter.get("/slug", validateGetProductMiddleware, getProductController);
productsRouter.post("/", validatePostProductMiddleware, postProductController);
// productsRouter.delete(":productId");
// productsRouter.put();
