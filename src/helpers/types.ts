export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  slug: string;
};

export type NewProduct = Omit<
  Product,
  "id" | "created_at" | "updated_at" | "slug"
>;

export type EditedProduct = Partial<NewProduct>;

export type Products = Product[];
export type Direction = "asc" | "desc";
export type SortBy = "name" | "price" | "created_at";
