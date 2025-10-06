export type LinkItem = {
  link: string;
  label: string;
  links?: Array<{ link: string; label: string }>;
};

export type Product = {
  id: number;
  name: string;
  categories: string[];
  description: string;
  rent: string;
  price: number;
  views: number;
  createdAt: string;
  updatedAt: string;
};
