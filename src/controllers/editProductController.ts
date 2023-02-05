import { Request, Response } from "express";
import { EditedProduct } from "../helpers/types";
import { editProduct } from "../models";

export const editProductController = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);

  const editedProduct: EditedProduct = req.body;

  try {
    const response = await editProduct(productId, editedProduct);

    if (!response) {
      res.status(404).send("Product does not exist");
    } else {
      res.json(response);
    }
  } catch (error) {
    console.log("error:", error);
  }
};
