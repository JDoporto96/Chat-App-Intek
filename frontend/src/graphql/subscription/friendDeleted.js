import { gql } from "@apollo/client";


const FRIEND_DELETED = gql`
subscription Subscription {
    friendDeleted {
      exfriends
    }
  }
`;

export default FRIEND_DELETED;


