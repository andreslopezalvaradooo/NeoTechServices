import {
  CreateReviewMutation,
  CreateReviewMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
  GetProductsQuery,
  GetProductsQueryVariables,
  SearchProductsQuery,
  SearchProductsQueryVariables,
} from "@/src/types/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";
import { PRODUCT_FRAGMENT } from "../fragments/product";

export const GET_PRODUCTS: TypedDocumentNode<
  GetProductsQuery,
  GetProductsQueryVariables
> = gql`
  query GetProducts {
    getProducts {
      id
      name
      slug
      description
      price
      stock
      images
      isActive
      categoryId
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT: TypedDocumentNode<
  GetProductQuery,
  GetProductQueryVariables
> = gql`
  query GetProduct($slug: String!) {
    getProduct(slug: $slug) {
      id
      name
      slug
      description
      price
      stock
      images
      isActive
      categoryId
      createdAt
      updatedAt
      features
      discounts {
        productId
        discountId
        discount {
          id
          name
          type
          value
          startsAt
          endsAt
          isActive
          createdAt
          updatedAt
        }
      }
      reviews {
        id
        rating
        title
        body
        author
        createdAt
      }
    }
  }
`;

export const CREATE_REVIEW: TypedDocumentNode<
  CreateReviewMutation,
  CreateReviewMutationVariables
> = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      rating
      title
      body
      author
      createdAt
    }
  }
`;

export const SEARCH_PRODUCTS: TypedDocumentNode<
  SearchProductsQuery,
  SearchProductsQueryVariables
> = gql`
  ${PRODUCT_FRAGMENT}
  query SearchProducts($input: SearchProductsInput!) {
    searchProducts(input: $input) {
      products {
        ...ProductFragment
      }
      filters {
        categories {
          name
          slug
          image
          count
        }
      }
    }
  }
`;
