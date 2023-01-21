"use strict";
const { QueryTypes } = require("sequelize");

const sampleProducts = [
  {
    name: "banana",
    price: 1,
    stock: 10,
    description: "banana-description",
  },
  {
    name: "pineapple",
    price: 3,
    stock: 1,
    description: "pineapple-description",
  },
  {
    name: "orange",
    price: 2,
    stock: 10,
    description: "orange-description",
  },
  {
    name: "coconut",
    price: 8,
    stock: 3,
    description: "coconut-description",
  },
  {
    name: "strawberry",
    price: 5,
    stock: 90,
    description: "strawberry-description",
  },
  {
    name: "blueberry",
    price: 7,
    stock: 33,
    description: "blueberry-description",
  },
  {
    name: "apple",
    price: 3,
    stock: 444,
    description: "apple-description",
  },
  {
    name: "mango",
    price: 3,
    stock: 24,
    description: "mango-description",
  },
  {
    name: "kiwi",
    price: 3,
    stock: 21,
    description: "kiwi-description",
  },
  {
    name: "raspberry",
    price: 2,
    stock: 19,
    description: "raspberry-description",
  },
  {
    name: "watermelon",
    price: 27,
    stock: 232,
    description: "watermelon-description",
  },
  {
    name: "grape",
    price: 14,
    stock: 22,
    description: "grape-description",
  },
  {
    name: "pumpkin",
    price: 34,
    stock: 222,
    description: "pumpkin-description",
  },
  {
    name: "tomato",
    price: 4,
    stock: 22,
    description: "tomato-description",
  },
];

const values = sampleProducts.map((product) => [
  product.name,
  product.price,
  product.stock,
  product.description,
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

    const productQuery = `INSERT INTO "product" (name,price, stock, description) VALUES ?`;
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
