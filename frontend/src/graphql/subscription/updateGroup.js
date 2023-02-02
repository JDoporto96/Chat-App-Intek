import { gql } from "@apollo/client";


const UPDATE_GROUP_SUB = gql`
subscription Subscription {
  updateGroup {
    _id
    members
    name
    admins
  }
}
`;

export default UPDATE_GROUP_SUB;


