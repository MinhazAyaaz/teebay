import { gql } from "@apollo/client";

export const QUERY_GET_USER_ORDERS = gql`
  query GetCurrentUserOrders {
    getCurrentUserOrders {
      id
      type
      status
      amount
      currency
      startDate
      endDate
      productId
      buyerId
      createdAt
      product {
        id
        title
        categories {
          category
        }
        rentPrice
        rentInterval
        salePrice
        status
        currency
        createdAt
      }
    }
  }
`;

export const QUERY_GET_USER_SALES = gql`
  query GetCurrentUserSales {
    getCurrentUserSales {
      id
      type
      status
      amount
      currency
      startDate
      endDate
      productId
      buyerId
      createdAt
      product {
        id
        title
        categories {
          category
        }
        rentPrice
        rentInterval
        salePrice
        status
        currency
        createdAt
      }
    }
  }
`;
