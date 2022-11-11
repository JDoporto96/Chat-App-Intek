
const tDefs = `
type User {
    _id: ID!
    username: String!
    status: String
}

type Message {
    _id: ID!
    sender: ID!
    message: String!
    createdAt: String!
    conversationId:ID!
}

type Conversation {
    _id: ID!
    name: String
    admins: [String]
    members: [String]!
}

type Contact{
    _id: ID!
    username:String!
}

type Request {
    to:String!
    from: ID!
    status: String!
}
`

export default tDefs
