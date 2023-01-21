import { sequelize } from "../app.js";

export const getProducts = async (page, limit) => {
  const offset = (page - 1) * limit;

  const queryString = `SELECT * FROM product LIMIT ${limit} OFFSET ${offset};`;

  const products = await sequelize.query(queryString);
  return products[0];
};
