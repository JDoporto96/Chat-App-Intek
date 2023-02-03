import { gql } from "@apollo/client";
const REQUEST_RESPONSE_SUB = gql`
subscription Subscription {
    requestResponded {
      from
      status
      to
    }
  }
`;
  
  export default REQUEST_RESPONSE_SUB;