import { gql } from "@apollo/client";

export const QUERY_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      email
      address
      phone
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_FIND_USER_BY_ID = gql`
  query FindUserById($userId: String!) {
    findUserById(userId: $userId) {
      id
      firstName
      lastName
      email
      address
      phone
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_FIND_USER_BY_EMAIL = gql`
  query FindUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      id
      firstName
      lastName
      email
      address
      phone
      createdAt
      updatedAt
    }
  }
`;
