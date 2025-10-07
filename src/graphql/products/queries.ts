import { gql } from "@apollo/client";

export const QUERY_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      title
      description
      condition
      categories {
        category
      }
      rentPrice
      rentInterval
      salePrice
      status
      currency
      ownerId
      createdAt
    }
  }
`;

export const QUERY_USER_PRODUCTS = gql`
  query GetUserProducts {
    getUserProducts {
      id
      title
      description
      condition
      categories {
        category
      }
      rentPrice
      rentInterval
      salePrice
      status
      currency
      ownerId
      createdAt
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
      rentPrice
      rentInterval
      salePrice 
      status
      currency
      ownerId
      createdAt
    }
  }
`;
