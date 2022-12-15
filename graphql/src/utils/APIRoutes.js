import * as dotenv from "dotenv";
dotenv.config();


const authHost = process.env.AUTH_URL+"/api/auth";
export const registerRoute = `${authHost}/register`
export const loginRoute = `${authHost}/login`
export const dashboardRoute = `${authHost}/dashboard`
export const authorizationRoute = `${authHost}/authorize`


const profilesHost = process.env.PROFILES_URL+ "/api/profiles";
export const profilesAPIRoute = `${profilesHost}`


export const messagesHost =process.env.CONVERSATIONS_URL+ "/api/messages";
export const groupsHost = process.env.CONVERSATIONS_URL+"/api/groups";
export const conversationsHost = process.env.CONVERSATIONS_URL+"/api/conversations";

export const sendMessageRoute = `${messagesHost}/addmsg`
export const getAllMessagesRoute = `${messagesHost}`

export const getMyGroupsRoute = `${groupsHost}/mygroups`
export const createGroupRoute = `${groupsHost}/creategroup`
export const deleteGroupRoute = `${groupsHost}/deleteGroup`
export const updateGroupRoute = `${groupsHost}/updategroup`

export const conversationsRoute = `${conversationsHost}`
export const newConversationRoute = `${conversationsHost}/newconversation`





