export type CreateProductFormInput = {
  title: string;
  categories: string[];
  description: string;
  rentPrice: number;
  rentInterval: string;  
  salePrice: number;
};
    
export type UpdateProductFormInput = {
  id?: string;
  title?: string;
  categories?: string[];
  description?: string;
  rentPrice?: number;
  rentInterval?: string;  
  salePrice?: number;
};

export type Product = {
  id: string;
  title: string;
  categories: { category: string }[];
  description: string;
  rentPrice: number;
  rentInterval: string;  
  salePrice: number;
  status: string;
  currency: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  views: number;
};

export type MyProductQuery = {
  getUserProducts: {
    products: Product[];
    totalCount: number;
  };
};

export type MyProductsVars = {
  search?: string;
  page: number;
  pageSize: number;
};

export type AllProductQuery = {
  getAllProducts: {
    products: Product[];
    totalCount: number;
  };
};

export type AllProductsVars = {
  search?: string;
  page: number;
  pageSize: number;
};

export type ProductQuery = {
  getProductById: Product;
};

export type CreateProductMutation = {
  createProduct: {
    statusCode: number;
    message: string;
    product: Product;
  };
};

export type CreateProductMutationVariables = {
  input: CreateProductFormInput;
};

export type UpdateProductMutation = {
  updateProduct: {
    statusCode: number;
    message: string;
    product: Product;
  };
};

export type UpdateProductMutationVariables = {
  input: UpdateProductFormInput;
};

export type DeleteProductMutation = {
  deleteProduct: { 
    statusCode: number;
    message: string;
  };
};

export type DeleteProductMutationVariables = {
  id: string;
};
