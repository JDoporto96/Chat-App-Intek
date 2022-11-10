import { gql } from "apollo-server-core";

const mutations = gql`
input NewUserInput {
    username: String!
    email: String!
    password: String!
}

input UpdateUserInput {
    username: String
    password: String
}

input UserCredentials{
    email: String!
    password: String!
}

input NewConversationInput{
    senderId: ID!
    receiverId: ID!
  }


input newMessageInput{
    conversationId: ID
    sender: ID
    message: String
}

input SendRequestInput{
  senderId: String!
  receiverUsername: String!
}

input RespondRequestInput{
  senderId: String!
  receiverId: String!
  accepted: Boolean!
}


input NewGroupInput{
    name: String
    members:[String]
    creator: String
  }

  input UpdateGroupInput{
    conversationId: String!
    newName: String
    newMembers: [String]
    removedMembers: [String]
    newAdmins: [String]
    removedAdmins:[String]
    }

  type Mutation {
    createGroup(input: NewGroupInput): ActionResponse!
    deleteGroup(conversationId: String!): ActionResponse!
    updateGroup(input: UpdateGroupInput): ActionResponse!
    sendMessage(input: newMessageInput):MessageActionResponse!
    createUser(input: NewUserInput!):ActionResponse!
    logIn(input: UserCredentials!) : LoginActionResponse!
    logOut(input: String!) : ActionResponse!
    createConversation(input: NewConversationInput): NewConversationActionResponse!
    sendContactRequest(input: SendRequestInput!):ActionResponse!
    respondContactRequest(input: RespondRequestInput!):ActionResponse!
  
  }

`

export default mutations

