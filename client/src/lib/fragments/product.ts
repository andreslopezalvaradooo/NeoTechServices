import { gql } from "@apollo/client";
import { CATEGORY_FRAGMENT } from "./category";

export const PRODUCT_FRAGMENT = gql`
  ${CATEGORY_FRAGMENT}
  
  fragment ProductFragment on Product {
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
    category {
      ...CategoryFragment
    }
  }
`;