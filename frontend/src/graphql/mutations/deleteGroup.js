import { gql } from "@apollo/client";

const DELETE_GROUP_CONV = gql`
mutation Mutation($conversationId: String!) {
    deleteGroup(conversationId: $conversationId) {
        success
        error
        message 
    }
}
`;

export default DELETE_GROUP_CONV;
