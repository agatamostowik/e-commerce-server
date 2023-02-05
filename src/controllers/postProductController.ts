import { Request, Response } from "express";
import { NewProduct } from "../helpers/types";
import { postProduct } from "../models";

export const postProductController = async (req: Request, res: Response) => {
  const newProduct: NewProduct = req.body;
  try {
    const result = await postProduct(newProduct);
    res.json(result);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
