import { Request, Response } from "express";
import { deleteProduct } from "../models";

export const deleteProductController = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId);
  try {
    const response = await deleteProduct(productId);

    if (!response) {
      res.status(404).send("Product does not exist");
    } else {
      res.json(response);
    }
  } catch (error) {
    console.log("error:", error);
  }
};
