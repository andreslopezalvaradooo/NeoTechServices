import {
  CreateDevelopmentMutation,
  CreateDevelopmentMutationVariables,
} from "@/src/types/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CREATE_DEVELOPMENT: TypedDocumentNode<
  CreateDevelopmentMutation,
  CreateDevelopmentMutationVariables
> = gql`
  mutation CreateDevelopment($input: CreateDevelopmentInput!) {
    createDevelopment(input: $input) {
      ticketCode
      createdAt
      name
      phone
      email
      type
      budget
      timeline
      description
    }
  }
`;
