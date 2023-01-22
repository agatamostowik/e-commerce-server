"use strict";

const { QueryTypes } = require("sequelize");

const sampleProducts = [
  {
    name: "apple prince",
    price: 4,
    stock: 23,
    description: "apple prince description",
    slug: "apple-prince",
  },
  {
    name: "banana",
    price: 1,
    stock: 10,
    description: "banana-description",
    slug: "banana",
  },
  {
    name: "pineapple",
    price: 3,
    stock: 1,
    description: "pineapple-description",
    slug: "pineapple-pen",
  },
  {
    name: "orange",
    price: 2,
    stock: 10,
    description: "orange-description",
    slug: "orange",
  },
  {
    name: "coconut",
    price: 8,
    stock: 3,
    description: "coconut-description",
    slug: "coconut",
  },
  {
    name: "strawberry",
    price: 5,
    stock: 90,
    description: "strawberry-description",
    slug: "strawberry",
  },
  {
    name: "blueberry",
    price: 7,
    stock: 33,
    description: "blueberry-description",
    slug: "blueberry",
  },
  {
    name: "apple golden delicious",
    price: 3,
    stock: 444,
    description: "apple-description",
    slug: "apple-golden-delicious",
  },
  {
    name: "mango",
    price: 3,
    stock: 24,
    description: "mango-description",
    slug: "mango",
  },
  {
    name: "kiwi",
    price: 3,
    stock: 21,
    description: "kiwi-description",
    slug: "kiwi",
  },
  {
    name: "raspberry",
    price: 2,
    stock: 19,
    description: "raspberry-description",
    slug: "raspberry",
  },
  {
    name: "watermelon",
    price: 27,
    stock: 232,
    description: "watermelon-description",
    slug: "watermelon",
  },
  {
    name: "grape",
    price: 14,
    stock: 22,
    description: "grape-description",
    slug: "grape",
  },
  {
    name: "pumpkin",
    price: 34,
    stock: 222,
    description: "pumpkin-description",
    slug: "pumpkin",
  },
  {
    name: "tomato",
    price: 4,
    stock: 22,
    description: "tomato-description",
    slug: "tomato",
  },
];

const values = sampleProducts.map((product) => [
  product.name,
  product.price,
  product.stock,
  product.description,
  product.slug,
]);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const productQuery = `INSERT INTO "product" (name,price, stock, description,slug) VALUES ?`;
    await queryInterface.sequelize.query(productQuery, {
      replacements: [values],
      type: QueryTypes.SELECT,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     *
     *
     */

    const names = values.map((product) => product[0]);

    const productQuery = `DELETE FROM "product" WHERE name IN(:values)`;

    await queryInterface.sequelize.query(productQuery, {
      replacements: { values: names },
      type: QueryTypes.DELETE,
    });
  },
};
