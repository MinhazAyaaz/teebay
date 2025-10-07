import { gql } from "@apollo/client";

export const MUTATION_CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserDto!) {
    createUser(createUserInput: $createUserInput) {
      statusCode
      message
      user {
        id
        firstName
        lastName
        address
        phone
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export const MUTATION_LOGIN_USER = gql`
  mutation LoginUser($loginUserInput: LoginUserDto!) {
    loginUser(loginUserInput: $loginUserInput) {
      statusCode
      message
      user {
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
  }
`;
