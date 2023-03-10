import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { rootRouter } from "./routes";

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PGPORT: number;
      PGUSER: string;
      PGPASSWORD: string;
      PGHOST: string;
      DATABASE: string;
    }
  }
}

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.DATABASE,
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export const initApp = () => {
  const app = express();

  // Global middlewares
  app.use(cors());
  app.use(bodyParser.json());

  // Routes
  app.use("/", rootRouter);

  return app;
};
