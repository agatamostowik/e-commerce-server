"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.sequelize.query(`CREATE TABLE "user" (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      first_name character varying(255) NOT NULL,
      last_name character varying(255) NOT NULL,
      phone_number character varying(255) NOT NULL,
      email character varying(255) NOT NULL,
      password character varying(255) NOT NULL,
      role character varying(255) NOT NULL,
      updated_at timestamp without time zone DEFAULT now(),
      created_at timestamp without time zone DEFAULT now()
  );`);

    await queryInterface.sequelize.query(`
  CREATE TABLE discount (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
  );
  `);

    await queryInterface.sequelize.query(`
CREATE TABLE address (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    street character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    postal_code character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    phone_number integer NOT NULL,
    is_default boolean,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);`);

    await queryInterface.sequelize.query(`CREATE TABLE cart (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    discount_id integer REFERENCES discount(id),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
`);

    await queryInterface.sequelize.query(`
CREATE TABLE product (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name character varying(255) NOT NULL,
  price integer NOT NULL,
  stock integer NOT NULL,
  description character varying(255) NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now()
);
`);

    await queryInterface.sequelize.query(`
CREATE TABLE cart_product (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cart_id integer NOT NULL REFERENCES cart(id),
  product_id integer REFERENCES product(id) ON DELETE SET NULL ON UPDATE CASCADE,
  quantity integer NOT NULL
);`);

    await queryInterface.sequelize.query(`
CREATE TABLE payment (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  provider character varying(255),
  payment_type character varying(255),
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now()
);
`);

    await queryInterface.sequelize.query(`CREATE TABLE user_address (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  address_id integer NOT NULL REFERENCES address(id) ON DELETE CASCADE
);
`);

    await queryInterface.sequelize.query(`CREATE TABLE user_payment (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  payment_id integer NOT NULL REFERENCES payment(id),
  user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE);`);

    await queryInterface.sequelize.query(`
CREATE TABLE "order" (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  address_id integer REFERENCES user_address(id) ON DELETE SET NULL ON UPDATE CASCADE,
  payment_id integer REFERENCES user_payment(id) ON DELETE SET NULL ON UPDATE CASCADE,
  cart_id integer NOT NULL REFERENCES cart(id) ON DELETE CASCADE ON UPDATE CASCADE,
  status character varying(255) NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now()
);
`);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.sequelize.query(`DROP TABLE "order";`);
    await queryInterface.sequelize.query(`DROP TABLE "user_payment";`);
    await queryInterface.sequelize.query(`DROP TABLE "user_address";`);
    await queryInterface.sequelize.query(`DROP TABLE "payment";`);
    await queryInterface.sequelize.query(`DROP TABLE "cart_product";`);
    await queryInterface.sequelize.query(`DROP TABLE "product";`);
    await queryInterface.sequelize.query(`DROP TABLE "cart";`);
    await queryInterface.sequelize.query(`DROP TABLE "address";`);
    await queryInterface.sequelize.query(`DROP TABLE "discount";`);
    await queryInterface.sequelize.query(`DROP TABLE "user";`);
  },
};
