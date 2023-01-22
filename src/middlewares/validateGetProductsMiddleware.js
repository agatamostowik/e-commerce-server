import { z } from "zod";

export const validateGetProductsMiddleware = (req, res, next) => {
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

  try {
    querySchema.parse(req.query);
    next();
  } catch (error) {
    res.json({ message: "Validation of body failed" });
  }
};
