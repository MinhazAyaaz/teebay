import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      title
      description
      condition
      categories {
        category
      }
      rentPricePerDay
      salePrice
      status
      currency
      ownerId
    }
  }
`;

export const QUERY_PRODUCT_BY_ID = gql`
  query GetProductById($id: String!) {
    getProductById(id: $id) {
      id
      title
      description
      condition
      categories {
        category
      }
      rentPricePerDay
      salePrice
      status
      currency
      ownerId
    }
  }
`;
