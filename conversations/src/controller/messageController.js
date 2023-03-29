const Messages = require("../model/messageModel");
const Conversations = require("../model/conversationModel")
const logger = require('../utils/logger');

module.exports.getMessages = async (req, res, next) => {
  
  try {
    if(req.params.conversationId.length > 100){
      logger.error("Conversation fetching failed. Error: Payload too large") 
      return res.status(500).json({status: false, msg:"Payload too large"})
    }
    const conversation = await Conversations.findOne({_id:req.params.conversationId})
    if(!conversation){
      logger.error("Conversation fetching failed. Error: Conversation does not exist") 
      return res.json({status:false, msg:"Conversation does not exist"});
    }
    const messages = await Messages.find({
      conversationId: req.params.conversationId
    }).sort({ updatedAt: 1 });
    logger.info(`Fetching messages from conversation with id: ${ req.params.conversationId}`) 
    return res.json(messages)
  } catch (err) {
    logger.error(`Server error: ${err}`) 
    return res.json({status:false, msg:err});
  }
};

module.exports.addMessage = async (req, res, next) => {
  const{conversationId, sender} = req.body;
  try {
    const conversation = await Conversations.findOne({_id:conversationId});
    if (!conversation.members.includes(sender)){
      logger.error(`User:${sender} tried to send a
      messages to conversation with id: ${ conversationId} but is not part of the conversation`)
      return res.json({status:false, msg:"Sender not in conversation"})
    }
    const newMessage = new Messages(req.body)
    const savedMessage = await newMessage.save();

    logger.info(`User:${req.body.sender} has sent a 
    messages to conversation with id: ${ req.body.conversationId}`) 
    

    return res.json({status:true, savedMessage})

  } catch (err) {
    logger.error(`Server error: ${err}`) 
    return res.status(500).json(err);
  }
};