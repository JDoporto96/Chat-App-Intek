const authHost = "/api/auth";
export const registerRoute = `${authHost}/register`
export const loginRoute = `${authHost}/login`
export const dashboardRoute = `${authHost}/dashboard`


const profilesHost = "api/profiles";
export const profilesAPIRoute = `${profilesHost}`


export const messagesHost = "/api/messages";
export const groupsHost = "/api/groups";
export const conversationsHost = "/api/conversations";

export const sendMessageRoute = `${messagesHost}/addmsg`
export const getAllMessagesRoute = `${messagesHost}`

export const getMyGroupsRoute = `${groupsHost}/mygroups`
export const createGroupRoute = `${groupsHost}/creategroup`
export const addAdminsRoute = `${groupsHost}/addadmins`
export const removeAdminsRoute = `${groupsHost}/removeadmins`
export const removeMembersRoute = `${groupsHost}/removemembers`
export const addMembersRoute = `${groupsHost}/addmembers`
export const deleteGroupRoute = `${groupsHost}/deleteGroup`
export const renameGroupRoute = `${groupsHost}/updategroupname`

export const conversationsRoute = `${conversationsHost}`
export const newConversationRoute = `${conversationsHost}/newconversation`




