const Conversations = require ('../model/conversationModel');
const logger = require('../utils/logger');

module.exports.newConversation = async(req,res,next)=>{
    
    try{
        if(req.body.senderId.length > 100 || req.body.receiverId.length > 100){
            logger.error("Conversation creation failed. Error: Payload too large") 
            return res.status(500).json({status: false, msg:"Payload too large"})
        }
       const conversation = await Conversations.create({
        members:[req.body.senderId, req.body.receiverId],
        isGroup:false
       })
       logger.info(`New conversation created with id: ${conversation._id}`) 
       return res.status(200).json(conversation)

    }catch(err){
        logger.error(`Server error: ${err}`) 
        return res.status(500).json(err)
    }
}

module.exports.getConversations = async(req,res,next)=>{
    try{
        if(req.params.userId.length > 100){
            logger.error("Conversations fetching failed. Error: Payload too large") 
            return res.status(500).json({status: false, msg:"Payload too large"})
        }

       const conversation = await Conversations.find({
        members: {
            $in: [req.params.userId]}
       })
       logger.info(`Fetching conversations from user: ${req.params.userId}`) 
       return res.status(200).json(conversation)

    }catch(err){
        logger.error(`Server error: ${err}`) 
        return res.status(500).json(err)
    }
}

module.exports.getSingleConversationData = async(req,res,next)=>{
    try{
        const conversationId = req.params.id;
        if(req.params.id.length > 100){
            logger.error("Conversation fetching failed. Error: Payload too large") 
            return res.status(500).json({status: false, msg:"Payload too large"})
        }

       const conversation = await Conversations.findOne({_id:conversationId})
       if(!conversation){
        return res.json({status: false, msg:"Conversation does not exist" });
       }
       logger.info(`Fetching conversation with id: ${conversationId}`) 
       return res.status(200).json({status:true, conversation})

    }catch(err){
        logger.error(`Server error: ${err}`) 
        return res.status(500).json(err)
    }
}

module.exports.deleteConversation = async(req,res,next)=>{
    try{
        const conversationId = req.params.id
        if(conversationId.length > 100){
            logger.error("Conversation fetching failed. Error: Payload too large") 
            return res.status(500).json({status: false, msg:"Payload too large"})
        }
       const conversation = await Conversations.findOne({_id:conversationId})

       logger.info(`Deleting conversation with id: ${conversationId}`) 
       await conversation.remove();
       return res.status(200).json({conversation:conversation, status:true,msg:"Conversation deleted"})

    }catch(err){
        logger.error(`Server error: ${err}`) 
        return res.status(500).json({msg:err, status:false})
    }
}

