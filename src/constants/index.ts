import type { LinkItem,  } from "../types";
import { BoxIcon, HistoryIcon, PackageIcon } from "lucide-react";
import type { Product } from "../types/product";

export const LINKS: LinkItem[] = [
  { link: "/all-products", label: "All Products", icon: BoxIcon },
  { link: "/my-products", label: "My Products", icon: PackageIcon },
  { link: "/history", label: "History", icon: HistoryIcon },
];

export const CATEGORIES: Record<string, string> = {
  ELECTRONICS: "Electronics",
  FURNITURE: "Furniture",
  HOME_APPLIANCES: "Home Appliances",
  SPORTING_GOODS: "Sporting Goods",
  OUTDOOR: "Outdoor",
  TOYS: "Toys",
};

export const RENT_INTERVALS: Record<string, string> = {
  HOURLY: "Hourly",
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

// Derived options for Select components: value=API code, label=human-readable
export const RENT_INTERVAL_OPTIONS = Object.entries(RENT_INTERVALS).map(([value, label]) => ({ value, label }));
export const CATEGORIES_OPTIONS = Object.entries(CATEGORIES).map(([value, label]) => ({ value, label }));

export const MY_MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Product 1",
    salePrice: 100,
    categories: [{ category: "Category 1" }], 
    description: "Description 1",
    rentPrice: 100,
    rentInterval: "Daily",
    views: 100,
    status: "Active",
    currency: "USD",
    ownerId: "1",
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Product 2",
    salePrice: 200,
    categories: [{ category: "Category 2" }],
    description: "Description 2",
    rentPrice: 200,
    rentInterval: "Daily",
    status: "Active",
    currency: "USD",
    ownerId: "1",
    views: 200,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Product 3",
    salePrice: 300,
    categories: [{ category: "Category 3" }],
    description: "Description 3",
    rentPrice: 300,
    rentInterval: "Daily",
    status: "Active",
    currency: "USD",
    ownerId: "1",
    views: 300,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Product 4",
    salePrice: 400,
    categories: [{ category: "Category 4" }],
    description: "Description 4",
    rentPrice: 400,
    rentInterval: "Daily",
    status: "Active",
    currency: "USD",
    ownerId: "1",
    views: 400,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
  {
    id: "5",
    title: "Product 5",
    salePrice: 500,
    categories: [{ category: "Category 5" }],
    description: "Description 5",
    rentPrice: 500,
    rentInterval: "Daily",
    status: "Active",
    currency: "USD",
    ownerId: "1",
    views: 500,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
];
