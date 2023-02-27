
const mutationTypeDefs=`
input NewUserInput {
  username: String!
  email: String!
  password: String!
}

type ActionResponse{
  success: Boolean!
  error: String
  message: String
}

input UserCredentials{
  email: String!
  password: String!
}

type LoginActionResponse {
  success: Boolean!
  error: String
  token: String
  user:User
}

input newMessageInput{
  conversationId: ID
  message: String
}

type MessageActionResponse {
  success: Boolean!
  error: String
  message:Message
}

type NewConversationActionResponse {
  conversation: Conversation
  message: String
  success: Boolean!
  error: String
}

input NewGroupInput{
  name: String
  members:[String!]
}

input UpdateGroupInput{
  conversationId: String!
  newName: String
  newMembers: [String]
  removedMembers: [String]
  newAdmins: [String]
  removedAdmins:[String]
  isLeaving:Boolean
}


input RespondRequestInput{
  senderId: String!
  accepted: Boolean!
}

type Mutation {
  createUser(input: NewUserInput!): ActionResponse!
  logIn(input: UserCredentials!) : LoginActionResponse!
  logOut: ActionResponse!
  createConversation(receiverId: String!): NewConversationActionResponse!
  createGroup(input: NewGroupInput): NewConversationActionResponse!
  updateGroup(input: UpdateGroupInput): NewConversationActionResponse!
  deleteGroup(conversationId:String!): NewConversationActionResponse!
  sendMessage(input: newMessageInput):MessageActionResponse!
  sendContactRequest(receiverUsername:String!):ActionResponse!
  respondContactRequest(input: RespondRequestInput!):ActionResponse!
  removeContact(contactId: String!): ActionResponse!
  deleteConversation(conversationId: String!):ActionResponse!
  
}


`

export default mutationTypeDefs;