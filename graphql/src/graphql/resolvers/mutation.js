import axios from 'axios';
import { createGroupRoute, newConversationRoute ,profilesAPIRoute,
    registerRoute,loginRoute,sendMessageRoute,
    updateGroupRoute} from '../../utils/APIRoutes.js';
import { PubSub } from 'graphql-subscriptions';
import logger from '../../utils/logger.js';

const pubsub = new PubSub();

const mutationResolvers={
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
                return {success: false, error:err}
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
            logger.info(`New profile created with id: ${_id}`)
            return {success: false, message:"User created successfully"}
            
            
            
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
                return{success: false, error: "Please authenticate"}
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
                return {success:true, error:null, message:"Log out successfully"}
            }catch(err){
                return {success: false}
            }

        },
        createConversation:async(_,input, context) => {
            const {currentUser} = context;
            const {receiverId}=input;
            if(!currentUser){
                return{success: false, error: "Please authenticate"}
            }
            try{
                const response = await axios.post(`${newConversationRoute}`,{
                    senderId: currentUser._id, 
                    receiverId
                })
                logger.info(`New conversation created`)
                pubsub.publish(`CONVERSATION_CREATED`, {newConversation: response.data} )
                return{success:true, conversation: response.data}
            }catch(err){
                return {success: false, error: err}
            }
        },
        createGroup:async(_,{input},context) => {
            const {currentUser} = context;
            if(!currentUser){
                return{success: false, error: "Please authenticate"}
            }
            const {name, members} = input;
            try{
                const response = await axios.post(`${createGroupRoute}`,{
                    name, 
                    members,
                    creator:currentUser._id
                })
                pubsub.publish('CONVERSATION_CREATED',{newConversation: response.data})
                logger.info(`New group conversation created`)
                return{success:true, conversation: response.data}
            }catch(err){
                return {success: false, error:err}
            }
        },
        updateGroup: async(_,{input}, context) => {
            const {currentUser} = context;
            if(!currentUser){
                return{success: false, error: "Please authenticate"}
            }
            const {conversationId,newName, newMembers, newAdmins, removedAdmins,removedMembers}=input;
            try{
                const response = await axios.patch(updateGroupRoute,{
                    conversationId,
                    newName, 
                    newMembers, 
                    newAdmins, 
                    removedAdmins,
                    removedMembers
                });
                if(!response.data.status){
                    return{success:false, error:"Error updating group"}
                }
                logger.info(`Group conversation has been updated`)
                pubsub.publish('GROUP_UPDATED',{updateGroup: response.data.group})
                return {success: true, message: "Group updated successfully"}

            }catch(err){
                return {success: false, err: err}
            }
            
        },
        sendMessage:async(_,{input}, context) => {
            const {currentUser} = context;
            if(!currentUser){
                return{success: false, error: "Please authenticate"}
            }
            const {conversationId, message} = input;
            try{
                const response = await axios.post(`${sendMessageRoute}`,{
                    conversationId,
                    sender:currentUser._id,
                    message
                })
                if(!response.status){
                    return {success: false, error: response.data.msg}
                }
                pubsub.publish(`MESSAGE_SENT`, {newMessage: response.data} )
                logger.info(`Message sent to conversation:${conversationId}`)
                return{success: true, message: response.data}
            }catch(err){
                return {success: false}
            }
        },
        sendContactRequest:async(_,input, context) => {
            const {currentUser} = context;
            if(!currentUser){
                return{success: false, error: "Please authenticate"}
            }
            const senderId=currentUser._id;
            const {receiverUsername }= input;
            try{
                const response = await axios.post(`${profilesAPIRoute}/${senderId}/sendcontactrequest`,{
                    username: receiverUsername
                })
                if(!response.data.status){
                    return {success: false, error: response.data.msg}
                }
                logger.info(`Request sent to:${receiverUsername}`)
                pubsub.publish(`REQUEST_SENT`, {requestSend: {
                    to:receiverUsername,
                    from:senderId,
                    status:"Pending"
                }} )
                return{success: true,message: response.data.msg}
            }catch(err){
                return {success: false}
            }
        },
        respondContactRequest:async(_,{input}, context) => {
            const {currentUser} = context;
            if(!currentUser){
                return{success: false, error: "Please authenticate"}
            }
            const receiverId =currentUser._id
            const {senderId, accepted} = input;
            try{
                const response = await axios.post(`${profilesAPIRoute}/${receiverId}/respondcontactrequest`,{
                    _id: senderId,
                    accepted
                })
                if(!response.status){
                    return {success: false, error: response.data.msg}
                }
                logger.info(`Request to:${receiverId} has been responded`)
                pubsub.publish(`REQUEST_RESPONDED`, {requestResponded: {
                    to:receiverId,
                    from:senderId,
                    status: accepted?"Accepted":"Rejected"
                }} )
                return{success: true, message:response.data.msg}
            }catch(err){
                return {success: false}
            }
        }
    },
    Subscription:{
        newMessage:{
            subscribe: () => {
              return pubsub.asyncIterator([`MESSAGE_SENT`]);
            },
        },
        newConversation:{
            subscribe: () => {
              return pubsub.asyncIterator([`CONVERSATION_CREATED`]);
            },
        },
        updateGroup:{
            subscribe: () => {
                return pubsub.asyncIterator([`GROUP_UPDATED`]);
              },
        },
        requestSend:{
            subscribe:()=>{
                return pubsub.asyncIterator(['REQUEST_SENT'])
            }
        },
        requestResponded:{
            subscribe:()=>{
                return pubsub.asyncIterator(['REQUEST_RESPONDED'])
            }
        }
        
      } 
}

export default mutationResolvers;