import { gql } from "@apollo/client";


const CONV_SUBSCRIPTION = gql`
subscription Subscription {
    newConversation {
      _id
      admins
      members
      name
      isGroup
    }
  }
`;

export default CONV_SUBSCRIPTION;


