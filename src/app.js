import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const initApp = () => {
  const app = express();

  db();

  // Global middlewares
  app.use(cors());
  app.use(bodyParser.json());

  // Routes
  app.get("/", (req, res) => {
    res.json({ status: "ok" });
  });

  return app;
};
