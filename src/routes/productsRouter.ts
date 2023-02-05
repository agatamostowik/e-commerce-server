import { Router } from "express";
import { addProductController } from "../controllers/addProductController";
import { deleteProductController } from "../controllers/deleteProductController";
import { getProductController } from "../controllers/getProductController";
import { getProductsController } from "../controllers/getProductsController";
import { validateAddProductMiddleware } from "../middlewares/validateAddProductMiddleware";
import { validateDeleteProductMiddleware } from "../middlewares/validateDeleteProductMiddleware";
import { validateGetProductMiddleware } from "../middlewares/validateGetProductMiddleware";
import { validateGetProductsMiddleware } from "../middlewares/validateGetProductsMiddleware";

export const productsRouter = Router();

productsRouter.get("/", validateGetProductsMiddleware, getProductsController);
productsRouter.get("/slug", validateGetProductMiddleware, getProductController);
productsRouter.post("/", validateAddProductMiddleware, addProductController);
productsRouter.delete(
  "/:productId",
  validateDeleteProductMiddleware,
  deleteProductController
);
// productsRouter.put();
