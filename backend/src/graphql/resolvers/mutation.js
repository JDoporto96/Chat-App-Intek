import { AuthenticationError } from 'apollo-server-core';
import axios from 'axios';
import { loginRoute, profilesAPIRoute, registerRoute, 
    removeAdminsRoute,removeMembersRoute,addAdminsRoute,addMembersRoute,
newConversationRoute,renameGroupRoute,createGroupRoute, sendMessageRoute } from '../../utils/APIRoutes';
import { PubSub } from 'graphql-subscriptions';
import logger from '../../utils/logger';

const pubsub = new PubSub();

const mutationResolvers ={
    Mutation:{
        createUser: async(_,{input}) => {
            let _id;
            const {username,password,email} = input;
            try{
                const authServerResponse = await axios.post(registerRoute,{
                    username,
                    email,
                    password
                })
                if(!authServerResponse.data.status){ 
                    return {success: false, error: authServerResponse.data.msg}
                }
                _id = authServerResponse.data.user._id
                logger.info(`New user registered with id: ${_id}`)
            }catch(err){
                return {success: false}
            }
            
            try{
                const profileServerResponse = await axios.post(profilesAPIRoute,{
                    _id:_id,
                    username: input.username
                })
                if(!profileServerResponse.data.status){
                    return {success: false, error: profileServerResponse.data.msg}
                }
            }catch(err){
                return {success: false}
            }
            logger.info(`New profile created with id: ${newUser._id}`)
            return {success: true}
        },

        logIn: async(_,{input}) => {
            let _id;
            let token;
            let user;
            const {email, password} = input;
            try{
                const authServerResponse = await axios.post(loginRoute,{
                    email,
                    password
                })
                if(!authServerResponse.data.status){
                    return {success: false, error: "Invalid credentials"}
                }
                _id = authServerResponse.data.user._id
                token = authServerResponse.data.token;
                user = authServerResponse.data.user;
                logger.info(`User logged in with id:${_id}`)
            }catch(err){
                return {success:false, error:err}
            }

            try{
                const profileServerResponse = await axios.patch(`${profilesAPIRoute}/${_id}`,{
                    status:"Online"
                })
                if(!profileServerResponse.status){
                    return {success: false, error: "No profile found"}
                }
            }catch(err){
                return {success: false}
            }
            logger.info(`User with id:${_id} went Online`)
            return {success:true, error:null, token , user}

        },

        logOut: async(_,{input},context) =>{
            const {currentUser} = context;
            if(!currentUser){
                throw new AuthenticationError('not authenticated')
            }
            const userId = currentUser._id
            try{
                const profileServerResponse = await axios.patch(`${profilesAPIRoute}/${userId}`,{
                    status:"Offline"
                })
                if(!profileServerResponse.status){
                    return {success: false, error: profileServerResponse.msg}
                }
                logger.info(`User with id:${userId} went Offline`)
                return {success:true, error:null}
            }catch(err){
                return {success: false}
            }

        },
        createConversation:async(_,{input}, context) => {
            const {currentUser} = context;
            if(!currentUser){
                throw new AuthenticationError('not authenticated')
            }
            const {senderId, receiverId} = input;
            try{
                const response = await axios.post(`${newConversationRoute}`,{
                    senderId, 
                    receiverId
                })
                logger.info(`New conversation created`)
                return{success:true, conversation: response.data}
            }catch(err){
                return {success: false}
            }
        },
        createGroup:async(_,{input}) => {
            const {name, members,creator} = input;
            try{
                const response = await axios.post(`${createGroupRoute}`,{
                    name, 
                    members,
                    creator
                })
                if(!response.data.status){
                    return {success:false, error: response.data.msg}
                }
                logger.info(`New group conversation created`)
                return{success:true}
            }catch(err){
                return {success: false}
            }
        },

        updateGroup: async(_,{input}, context) => {
            const {currentUser} = context;
            if(!currentUser){
                throw new AuthenticationError('not authenticated')
            }
            const {conversationId,
                newName,
                newMembers,
                removedMembers,
                newAdmins,
                removedAdmins} = input;

            if(newName){
                try{
                    await axios.patch(renameGroupRoute,{
                        _id:conversationId,
                        newName
                    })
                }catch(err){
                    return {success: false, err: "error in name"}
                }
            }
            if(newMembers){
                try{
                    await axios.patch(addMembersRoute,{
                        _id:conversationId,
                        newMembers
                    })
                }catch(err){
                    return {success: false, err: "error in adding members"}
                }
            }
            if(removedMembers){
                try{
                    await axios.patch(removeMembersRoute,{
                        _id:conversationId,
                        members:removedMembers
                    })
                }catch(err){
                    return {success: false, err: "error in removing members"}
                }
            }
            if(newAdmins){
                try{
                    await axios.patch(addAdminsRoute,{
                        _id:conversationId,
                        newAdmins
                    })
                }catch(err){
                    return {success: false, err: "error in adding admins"}
                }
            }
            if(removedAdmins){
                try{
                    await axios.patch(removeAdminsRoute,{
                        _id:conversationId,
                        admins:removedAdmins
                    })
                }catch(err){
                    return {success: false, err: "error in removing admins"}
                }
            }
            logger.info(`Group conversation has been updated`)
            return {success: true}
        },
        sendMessage:async(_,{input}, context) => {
            const {currentUser} = context;
            if(!currentUser){
                throw new AuthenticationError('not authenticated')
            }
            const {conversationId, sender, message} = input;
            try{
                const response = await axios.post(`${sendMessageRoute}`,{
                    conversationId,
                    sender,
                    message
                })
                if(!response.status){
                    return {success: false, error: response.data.msg}
                }
                console.log(response.data)
                pubsub.publish(`MESSAGE_SENT_TO_${conversationId}`, {newMessage: response.data} )
                
                logger.info(`Message sent to conversation:${conversationId}`)
                return{success: true, message: response.data}
            }catch(err){
                return {success: false}
            }
        },
        sendContactRequest:async(_,{input}, context) => {
            const {currentUser} = context;
            if(!currentUser){
                throw new AuthenticationError('not authenticated')
            }
            const {senderId, receiverUsername} = input;
            try{
                const response = await axios.post(`${profilesAPIRoute}/${senderId}/sendcontactrequest`,{
                    username: receiverUsername
                })
                if(!response.status){
                    return {success: false, error: response.data.msg}
                }
                logger.info(`Request sent to:${receiverUsername}`)
                return{success: true}
            }catch(err){
                return {success: false}
            }
        },
        respondContactRequest:async(_,{input}, context) => {
            const {currentUser} = context;
            if(!currentUser){
                throw new AuthenticationError('not authenticated')
            }
            const {senderId, receiverId, accepted} = input;
            try{
                const response = await axios.post(`${profilesAPIRoute}/${receiverId}/respondcontactrequest`,{
                    _id: senderId,
                    accepted
                })
                if(!response.status){
                    return {success: false, error: response.data.msg}
                }
                logger.info(`Request to:${receiverId} has been responded`)
                return{success: true}
            }catch(err){
                return {success: false}
            }
        }

    }
    
};

export default mutationResolvers;