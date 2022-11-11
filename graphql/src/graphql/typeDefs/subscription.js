
const subscriptionTypeDefs=`
type Subscription {
  newMessage(conversationId: ID!): Message!
  newConversation: Conversation!
  updateGroup: Conversation!
  requestSend:Request!
  requestResponded:Request!
}
`

export default subscriptionTypeDefs;