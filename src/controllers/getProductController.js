import { getProduct } from "../models/index.js";

export const getProductController = async (req, res) => {
  const slug = req.params.slug;
  const result = await getProduct(slug);
  res.json(result);
};
