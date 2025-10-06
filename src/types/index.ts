import type { ComponentType } from "react";

export type LinkItem = {
  link: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export type Product = {
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
