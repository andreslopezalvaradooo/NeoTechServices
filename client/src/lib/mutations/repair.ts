import {
  CreateRepairMutation,
  CreateRepairMutationVariables,
} from "@/src/types/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CREATE_REPAIR: TypedDocumentNode<
  CreateRepairMutation,
  CreateRepairMutationVariables
> = gql`
  mutation CreateRepair($input: CreateRepairInput!) {
    createRepair(input: $input) {
      ticketCode
      createdAt
      name
      phone
      email
      type
      brand
      model
      issue
      problem
    }
  }
`;
