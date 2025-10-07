import { gql } from "@apollo/client";

export const QUERY_ALL_PRODUCTS = gql`
  query GetAllProducts($pageSize: Int!, $page: Int!, $search: String) {
    getAllProducts(pageSize: $pageSize, page: $page, search: $search) {
      products {
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
      totalCount
    }
  }
`;

export const QUERY_USER_PRODUCTS = gql`
  query GetUserProducts($pageSize: Int!, $page: Int!, $search: String) {
    getUserProducts(pageSize: $pageSize, page: $page, search: $search) {
      products {
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
      totalCount
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
