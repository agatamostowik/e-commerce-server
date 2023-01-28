import { QueryTypes } from "sequelize";
import { sequelize } from "../app.js";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  slug: string;
};

type Products = Product[];
export type Direction = "asc" | "desc";
export type SortBy = "name" | "price" | "created_at";

export const getProducts = async (
  page: number = 1,
  limit: number = 5,
  sortBy: SortBy = "created_at",
  dir: Direction = "desc"
) => {
  const offset = (page - 1) * limit;

  const queryString = `SELECT * FROM (SELECT * FROM product LIMIT ${limit} OFFSET ${offset}) AS subquery ORDER BY ${sortBy} ${dir};`;
  const response = await sequelize.query<Products>(queryString, {
    type: QueryTypes.SELECT,
  });
  const products = response[0];

  return products;
};

export const getProduct = async (slug: string) => {
  const queryString = `SELECT * FROM product WHERE slug='${slug}';`;
  const response = await sequelize.query<Product>(queryString, {
    type: QueryTypes.SELECT,
  });
  const product = response[0];

  return product;
};
