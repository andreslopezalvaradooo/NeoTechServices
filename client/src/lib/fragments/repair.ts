import { gql } from "@apollo/client";

export const REPAIR_BASE_FIELDS = gql`
  fragment RepairBaseFields on Repair {
    ticketCode
    status
    brand
    model
  }
`;
