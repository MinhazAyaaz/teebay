type Product = {
  id: number;
  name: string;
  categories: string[];
  description: string;
  rent: string;
  interval: string; // e.g., "Hourly", "Daily", "Weekly", "Monthly", "Yearly"
  price: number;
  views: number;
  createdAt: string;
  updatedAt: string;
};

type ProductQuery = {
  products: {
    items: Product[];
    total: number;
    page: number;
    pageSize: number;
  };
};

type ProductsVars = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export type { Product, ProductQuery, ProductsVars };
