import type { Product } from "./product";
import type { User } from "./user";

export type Order = {
  id: string;
  type: string;
  status: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  productId: string;
  buyerId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  buyer: User;
};

export type CreateBuyOrderInput = {
  productId: string;
};

export type CreateBuyOrderMutation = {
  createBuyOrder: {
    statusCode: number;
    message: string;
    order: Order;
  };
};

export type CreateBuyOrderMutationVariables = {
  input: CreateBuyOrderInput;
};

export type CreateRentOrderInput = {
  productId: string;
  startDate: string;
  endDate: string;
};

export type CreateRentOrderMutation = {
  createRentOrder: {
    statusCode: number;
    message: string;
    order: Order;
  };
};

export type CreateRentOrderMutationVariables = {
  input: CreateRentOrderInput;
};

export type GetUserOrdersQuery = {
  getCurrentUserOrders: Order[];
};

export type GetUserOrdersVars = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export type GetUserSalesQuery = {
  getCurrentUserSales: Order[];
};

export type GetUserSalesVars = {
  search?: string;
  page?: number;
  pageSize?: number;
};
