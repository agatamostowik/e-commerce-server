import { sequelize } from "../app.js";

export const getProducts = async (page, limit, sortBy, dir) => {
  const offset = (page - 1) * limit;

  const queryString = `SELECT * FROM (SELECT * FROM product LIMIT ${limit} OFFSET ${offset}) AS subquery ORDER BY ${sortBy} ${dir};`;
  const products = await sequelize.query(queryString);
  return products[0];
};

export const getProduct = async (slug) => {
  const queryString = `SELECT * FROM product WHERE slug='${slug}';`;
  const product = await sequelize.query(queryString);
  return product[0][0];
};
