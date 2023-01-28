import { Request, Response } from "express";
import { Direction, getProducts, SortBy } from "../models/index";

export const getProductsController = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);
  const sortBy = req.query.sortBy as SortBy;
  const dir = req.query.dir as Direction;

  const result = await getProducts(page, limit, sortBy, dir);

  res.json(result);
};
