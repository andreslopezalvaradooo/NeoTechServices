import {
  FindRepairsByEmailQuery,
  FindRepairsByEmailQueryVariables,
  GetActivityFeedQuery,
  GetActivityFeedQueryVariables,
  GetRecentRepairsQuery,
  GetRecentRepairsQueryVariables,
  GetRepairStatsQuery,
  GetRepairStatsQueryVariables,
  MyRepairsQuery,
  MyRepairsQueryVariables,
  TrackRepairQuery,
  TrackRepairQueryVariables,
} from "@/src/types/__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";
import { REPAIR_BASE_FIELDS } from "../fragments/repair";

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

export const MY_REPAIRS: TypedDocumentNode<
  MyRepairsQuery,
  MyRepairsQueryVariables
> = gql`
  ${REPAIR_BASE_FIELDS}
  query MyRepairs {
    myRepairs {
      ...RepairBaseFields
      createdAt
      name
      phone
      email
      type
      issue
      problem
    }
  }
`;

export const GET_RECENT_REPAIRS: TypedDocumentNode<
  GetRecentRepairsQuery,
  GetRecentRepairsQueryVariables
> = gql`
  ${REPAIR_BASE_FIELDS}
  query GetRecentRepairs {
    myRepairs(limit: 6) {
      ...RepairBaseFields
      updatedAt
      id
    }
  }
`;

export const GET_ACTIVITY_FEED: TypedDocumentNode<
  GetActivityFeedQuery,
  GetActivityFeedQueryVariables
> = gql`
  query GetActivityFeed($limit: Int) {
    getActivityFeed(limit: $limit) {
      id
      type
      message
      timestamp
    }
  }
`;

export const GET_REPAIR_STATS: TypedDocumentNode<
  GetRepairStatsQuery,
  GetRepairStatsQueryVariables
> = gql`
  query GetRepairStats {
    getRepairStats {
      active
      activeDelta
      pending
      completed
      completedDelta
      avgDays
    }
  }
`;
