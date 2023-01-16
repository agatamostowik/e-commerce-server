import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const initApp = () => {
  const app = express();

  // Global middlewares
  app.use(cors());
  app.use(bodyParser.json());

  // Routes
  app.get("/", (req, res) => {
    res.json({ status: "ok" });
  });

  return app;
};
