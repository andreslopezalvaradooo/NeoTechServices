import {
  CreateRepairMutation,
  CreateRepairMutationVariables,
  FindRepairsByEmailQuery,
  FindRepairsByEmailQueryVariables,
  TrackRepairQuery,
  TrackRepairQueryVariables,
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

export const TRACK_REPAIR: TypedDocumentNode<
  TrackRepairQuery,
  TrackRepairQueryVariables
> = gql`
  query TrackRepair($input: TrackRepairInput!) {
    trackRepair(input: $input) {
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

export const FIND_REPAIRS_BY_EMAIL: TypedDocumentNode<
  FindRepairsByEmailQuery,
  FindRepairsByEmailQueryVariables
> = gql`
  query FindRepairsByEmail($input: FindRepairsByEmailInput!) {
    findRepairsByEmail(input: $input) {
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
