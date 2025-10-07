import { gql } from "@apollo/client";

export const MUTATION_CREATE_RENT_ORDER = gql`
  mutation CreateRentOrder($input: CreateRentOrderInput!) {
    createRentOrder(input: $input) {
      statusCode
      message
      order {
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
        }
        buyer {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export const MUTATION_CREATE_BUY_ORDER = gql`
  mutation CreateBuyOrder($input: CreateBuyOrderInput!) {
    createBuyOrder(input: $input) {
      statusCode
      message
      order {
        id
        type
        status
        amount
        currency
        product {
          id
          title
          status
        }
        buyer {
          id
          firstName
          lastName
          email
        }
        createdAt
      }
    }
  }
`;
