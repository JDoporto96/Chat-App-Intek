const Conversations = require ('../model/conversationModel');
const logger = require('../utils/logger');

module.exports.createGroupConversation = async (req,res,next)=>{
    try{
        const {name,members,creator} = req.body;
        
        if(!name || !members){
            logger.error("Group creation failed. Err: Missing name or members")
            return res.json({status: false, msg: "Invalid group"})
        }
        if(name.length > 100){
            logger.error("Group creation failed. Err: Group name is too large")
            return res.json({status: false, msg:"Name is too large"})
        }
        if(members.length > 10000){
            logger.error("Group creation failed. Err: Too many members in group")
            return res.json({status: false, msg:"Too many members in group"})
        }
       
        members.push(creator);
        const group = await Conversations.create({
            name,
            admins: [creator],
            members,
            isGroup:true
        })
        if (group){
            logger.info(`New group conversation created with id: ${group._id}`) 
            return res.json(group);
        }
        else return res.json({ msg: "Failed to create group and add it to the database", status:false});
    }catch(err){
        logger.error(`Server error: ${err}`) 
        return res.status(500).json(err);
    }
}

module.exports.updateGroup = async (req,res,next)=>{
    const {newMembers,removedMembers,newAdmins,removedAdmins,newName,updater,isLeaving} = req.body;
    const conversationId = req.params.id 
    try{
        const group = await Conversations.findOne({_id:conversationId});
        if(!group){
            logger.error("Group update failed. Err: Group not found")
            return res.json({msg: "Group not found", status:false})
        }
        if(!group.isGroup){
            logger.error(`Group update failed. Err: Conversation with id:${conversationId} is not a group conversation `)
            return res.json({msg:'Not a group conversation. Invalid request', status:false})
        }

        if(!group.members.includes(updater)){
            logger.error(`Group update failed. Err: User: ${updater} try to modify the conversation with id:${conversationId} 
            in wich is not a member`)
            return res.json({msg:'You are not part of the group. Invalid request', status:false})
        }


        if(!isLeaving && !group.admins.includes(updater)){
            logger.error(`Group update failed. Err: User: ${updater} try to modify the conversation with id:${conversationId} 
            in wich is not an admin`)

            return res.json({msg:'Only admins can manage the group settings. Invalid request', status:false})
        }
       
        if(newAdmins){
            newAdmins.forEach(member => {
                if(!group.admins.includes(member)){
                    group.admins.push(member)
                }   
            });
            await group.save();
        }
        if(newMembers){
            newMembers.forEach(member => {
                if(!group.members.includes(member)){
                    group.members.push(member)
                }   
            });
            await group.save();
        }
        if(removedMembers){
            removedMembers.forEach(member=>group.members.pull(member));
            removedMembers.forEach(member=>group.admins.pull(member))
            await group.save();
        }
        if(removedAdmins){
            removedAdmins.forEach(admin=> group.admins.pull(admin));
            await group.save();
        }
        
        if(newName){
            group.name = newName;
            await group.save();
        }


        logger.info(`Group with id: ${group._id} has been updated`) 
        res.json({status:true, group})
        
    }catch(err){
        logger.error(`Server error: ${err}`) 
        return res.status(500).json(err);
    }
}

module.exports.showMyGroups = async(req,res,next)=>{
    try{
        const userId = req.params.userId;
        if(userId.length > 50){
            logger.error(`Error fetching groups. Err: Payload too large `)
            return res.json({status: false, msg:"Payload too large"})
        }
        let groups = await Conversations.find();
        const projectedGroups = groups.filter(group=>group.members.includes(userId)&& group.isGroup >=1).sort((a,b)=>(a.name.toLowerCase() > b.name.toLowerCase())?1:-1);
        if(!projectedGroups){
            return res.json({msg:"Haven't joined any group "})
        }
        logger.info(`Fetching groups from user: ${userId}`)
        res.send(projectedGroups)
    }catch(err){
        logger.error(`Server error: ${err}`) 
        return res.status(500).json(err);
    }
}

module.exports.deleteGroup =async (req,res,next)=>{
    
    try{
        const group = await Conversations.findOne({_id:req.params.id});
        if(!group){
            logger.error("Group update failed. Err: Group not found")
            return res.json({msg: "Invalid group"})
        }
        await group.remove();
        logger.info(`Group with id: ${group._id} has been deleted`)
        res.send({msg:"Group removed successfully", group, status:true});
    }catch(err){
        logger.error(`Server error: ${err}`) 
        return res.status(500).json(err);
    }
}

