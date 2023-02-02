import { gql } from "@apollo/client";


const CONV_SUBSCRIPTION = gql`
subscription Subscription {
    newConversation {
      _id
      admins
      members
      name
    }
  }
`;

export default CONV_SUBSCRIPTION;


