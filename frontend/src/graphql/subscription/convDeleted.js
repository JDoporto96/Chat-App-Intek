import { gql } from "@apollo/client";


const CONV_DELETED_SUB = gql`
subscription Subscription {
    conversationDeleted {
      _id
      members
    }
  }
`;

export default CONV_DELETED_SUB;


