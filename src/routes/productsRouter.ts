import { Router } from "express";
import { addProductController } from "../controllers/addProductController";
import { deleteProductController } from "../controllers/deleteProductController";
import { getProductController } from "../controllers/getProductController";
import { getProductsController } from "../controllers/getProductsController";
import { validateAddProductMiddleware } from "../middlewares/validateAddProductMiddleware";
import { validateProductParamsMiddleware } from "../middlewares/validateProductParamsMiddleware";
import { validateGetProductMiddleware } from "../middlewares/validateGetProductMiddleware";
import { validateGetProductsMiddleware } from "../middlewares/validateGetProductsMiddleware";
import { editProductController } from "../controllers/editProductController";
import { validateUpdateProductBodyMiddleware } from "../middlewares/validateUpdateProductBodyMiddleware";

export const productsRouter = Router();

productsRouter.get("/", validateGetProductsMiddleware, getProductsController);
productsRouter.get("/slug", validateGetProductMiddleware, getProductController);
productsRouter.post("/", validateAddProductMiddleware, addProductController);
productsRouter.delete(
  "/:productId",
  validateProductParamsMiddleware,
  deleteProductController
);
productsRouter.put(
  "/:productId",
  validateProductParamsMiddleware,
  validateUpdateProductBodyMiddleware,
  editProductController
);
