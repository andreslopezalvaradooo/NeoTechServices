import {
  CreateConsultingMutation,
  CreateConsultingMutationVariables,
} from "@/src/types/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CREATE_CONSULTING: TypedDocumentNode<
  CreateConsultingMutation,
  CreateConsultingMutationVariables
> = gql`
  mutation CreateConsulting($input: CreateConsultingInput!) {
    createConsulting(input: $input) {
      ticketCode
      createdAt
      name
      company
      phone
      email
      service
      size
      challenge
    }
  }
`;
