const Conversations = require ('../model/conversationModel');


module.exports.newConversation = async(req,res,next)=>{
    try{
       const conversation = await Conversations.create({
        members:[req.body.senderId, req.body.receiverId],
       })
       res.status(200).json(conversation)

    }catch(err){
        res.status(500).json(err)
    }
}

module.exports.getConversations = async(req,res,next)=>{
    try{
       const conversation = await Conversations.find({
        members: {
            $in: [req.params.userId]}
       })
       res.status(200).json(conversation)

    }catch(err){
        res.status(500).json(err)
    }
}
