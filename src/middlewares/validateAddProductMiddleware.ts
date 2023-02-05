import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateAddProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bodySchema = z.object({
    name: z.string(),
    price: z.string().refine((value) => {
      const number = Number(value);
      return Number.isFinite(number);
    }),
    stock: z.string().refine((value) => {
      const number = Number(value);
      return Number.isFinite(number);
    }),
    description: z.string(),
  });

  try {
    bodySchema.parse(req.body);
    next();
  } catch (error) {
    res.json({ message: "Invalid params" });
  }
};
