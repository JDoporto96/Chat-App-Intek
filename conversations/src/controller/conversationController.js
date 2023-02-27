const Conversations = require ('../model/conversationModel');
const logger = require('../utils/logger');

module.exports.newConversation = async(req,res,next)=>{
    try{
       const conversation = await Conversations.create({
        members:[req.body.senderId, req.body.receiverId],
        isGroup:false
       })
       logger.info(`New conversation created with id: ${conversation._id}`) 
       return res.status(200).json(conversation)

    }catch(err){
        return res.status(500).json(err)
    }
}

module.exports.getConversations = async(req,res,next)=>{
    try{
       const conversation = await Conversations.find({
        members: {
            $in: [req.params.userId]}
       })
       logger.info(`Fetching conversations from user: ${req.params.userId}`) 
       return res.status(200).json(conversation)

    }catch(err){
        return res.status(500).json(err)
    }
}
module.exports.getSingleConversationData = async(req,res,next)=>{
    try{
       const conversation = await Conversations.findOne({_id:req.params.conversationId})
       if(!conversation){
        return res.json({status: false, msg:"Conversation does not exist" });
       }
       logger.info(`Fetching conversation with id: ${req.params.conversationId}`) 
       return res.status(200).json({status:true, conversation})

    }catch(err){
        return res.status(500).json(err)
    }
}

module.exports.deleteConversation = async(req,res,next)=>{
    try{
       const conversation = await Conversations.findOne({_id:req.body._id})

       logger.info(`Deleting conversation with id: ${req.body._id}`) 
       await conversation.remove();
       return res.status(200).json({conversation:conversation, status:true,msg:"Conversation deleted"})

    }catch(err){
        return res.status(500).json({msg:err, status:false})
    }
}

