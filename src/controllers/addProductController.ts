import { Request, Response } from "express";
import { NewProduct } from "../helpers/types";
import { addProduct } from "../models";

export const addProductController = async (req: Request, res: Response) => {
  const newProduct: NewProduct = req.body;
  try {
    const result = await addProduct(newProduct);
    res.json(result);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
