import { getProducts } from "../models/index.js";

export const getProductsController = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const sortBy = req.query.sortBy || "created_at";
  const dir = req.query.dir || "desc";
  const result = await getProducts(page, limit, sortBy, dir);

  res.json(result);
};
