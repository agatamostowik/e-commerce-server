import { QueryTypes } from "sequelize";
import { sequelize } from "../app";
import { slugify } from "../helpers/functions";
import {
  Direction,
  EditedProduct,
  NewProduct,
  Product,
  Products,
  SortBy,
} from "../helpers/types.js";
import _ from "lodash";

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

export const addProduct = async (product: NewProduct) => {
  const slug = slugify(product.name);
  const queryToProductTable = `INSERT INTO product ("name","price", "stock", "description", "slug") VALUES ('${product.name}', ${product.price}, ${product.stock}, '${product.description}', '${slug}') RETURNING *;`;

  const response = await sequelize.query<Product>(queryToProductTable, {
    type: QueryTypes.SELECT,
  });

  return response[0];
};

export const deleteProduct = async (productId: number) => {
  const queryString = `DELETE FROM product WHERE id = ${productId} RETURNING id;`;
  const result = await sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

  return result[0];
};

export const editProduct = async (
  productId: number,
  product: EditedProduct
) => {
  const tempProduct = product.name
    ? { ...product, slug: slugify(product.name) }
    : product;

  const modifiedColumns = _.reduce(
    tempProduct,
    function (acc, propertyValue, propertyKey) {
      const value = _.isString(propertyValue)
        ? `'${propertyValue}'`
        : propertyValue;

      if (acc.length !== 0) {
        return acc + `, ${propertyKey} = ${value}`;
      } else {
        return acc + `${propertyKey} = ${value}`;
      }
    },
    ""
  );

  const queryString = `UPDATE product SET ${modifiedColumns} WHERE id = ${productId} RETURNING *;`;

  const result = await sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

  return result[0];
};
