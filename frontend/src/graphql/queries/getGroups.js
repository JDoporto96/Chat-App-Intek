import { gql } from "@apollo/client";

const GET_USER_GROUPS = gql`
query Query{
    getUserGroups{
        _id
        members
        name
        admins
    }
  }
`;

export default GET_USER_GROUPS;
