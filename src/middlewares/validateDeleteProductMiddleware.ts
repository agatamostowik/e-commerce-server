import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateDeleteProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paramsSchema = z.object({
    productId: z.string().refine((value) => {
      const number = Number(value);
      return Number.isFinite(number);
    }),
  });

  try {
    paramsSchema.parse(req.params);
    next();
  } catch (error) {
    res.json({ message: "Invalid params" });
  }
};
