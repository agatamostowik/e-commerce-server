import { Request, Response } from "express";
import { getProduct } from "../models";

export const getProductController = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const product = await getProduct(slug);

  res.json(product);
};
