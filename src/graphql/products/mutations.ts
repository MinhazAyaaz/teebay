import { gql } from "@apollo/client";

export const MUTATION_CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      statusCode
      message
      product {
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
      }
    }
  }
`;

export const MUTATION_UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      statusCode
      message
      product {
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
      }
    }
  }
`;

export const MUTATION_DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id) {
      statusCode
      message
    }
  }
`;
