import { NextFunction, Response, Request } from "express";
import { z } from "zod";

export const validateUpdateProductBodyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bodySchema = z.object({
    name: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    stock: z.number().positive().optional(),
    description: z.string().min(1).optional(),
  });

  try {
    bodySchema.parse(req.body);
    next();
  } catch (error) {
    res.json({ message: "Invalid params" });
  }
};
