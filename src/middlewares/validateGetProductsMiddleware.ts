import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const querySchema = z.object({
  page: z
    .string()
    .refine((value) => {
      const number = Number(value);

      return Number.isFinite(number);
    })
    .optional(),
  limit: z
    .string()
    .refine((value) => {
      const number = Number(value);
      return Number.isFinite(number);
    })
    .optional(),
  sortBy: z.enum(["price", "name", "created_at"]).optional(),
  dir: z.enum(["asc", "desc"]).optional(),
});

export const validateGetProductsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    querySchema.parse(req.query);
    next();
  } catch (error) {
    res.json({ message: "Validation of body failed" });
  }
};
