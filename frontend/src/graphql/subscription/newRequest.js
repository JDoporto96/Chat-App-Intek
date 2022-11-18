import { gql } from "@apollo/client";
const NEW_REQUEST_SUBSCRIPTION = gql`
  subscription Subscription {
    requestSend {
      from
      to
      senderUsername
    }
}
`;
  
  export default NEW_REQUEST_SUBSCRIPTION;