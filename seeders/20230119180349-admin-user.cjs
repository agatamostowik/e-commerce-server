"use strict";

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
    await queryInterface.sequelize.query(
      `INSERT INTO "user" (first_name, last_name, phone_number, email, password, role) VALUES ('Agata', 'Mostowik', '123456', 'example@example.com', 'qwerty', 'admin');`
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.query(
      `DELETE FROM "user" WHERE email='example@example.com' AND role='admin';`
    );
  },
};
