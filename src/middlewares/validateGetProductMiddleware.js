import { z } from "zod";

export const validateGetProductMiddleware = (req, res, next) => {
  const paramsSchema = z.object({
    slug: z.string().min(1),
  });

  try {
    paramsSchema.parse(req.params);
    next();
  } catch (error) {
    res.json({ message: "Invalid params" });
  }
};
