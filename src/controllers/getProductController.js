import { getProducts } from "../models/index.js";

// sortowanie po cenie (asc / desc)
// sortowanie po nazwie (asc / desc)
// sortowanie po dacie (asc / desc)
// paginacja po stronie
// ilość elementów na stronie

// todo: dodanie ZOD walidacja req.query
export const getProductsController = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;

  const result = await getProducts(page, limit);

  res.json(result);
};
