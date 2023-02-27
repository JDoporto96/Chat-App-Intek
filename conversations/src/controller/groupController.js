const Conversations = require ('../model/conversationModel');
const logger = require('../utils/logger');

module.exports.createGroupConversation = async (req,res,next)=>{
    try{
        const {name,members,creator} = req.body;
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
        next(err)
    }
}

module.exports.updateGroup = async (req,res,next)=>{
    const {conversationId,newMembers,removedMembers,newAdmins,removedAdmins,newName,updater,isLeaving} = req.body;
    try{
        const group = await Conversations.findOne({_id:conversationId});
        if(!group){
            return res.json({msg: "Invalid group", status:false})
        }
        if(!group.isGroup){
            return res.json({msg:'Not a group conversation. Invalid request', status:false})
        }

        if(!group.members.includes(updater)){
            return res.json({msg:'You are not part of the group. Invalid request', status:false})
        }


        if(!isLeaving && !group.admins.includes(updater)){
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
        next(err)
    }
}

module.exports.showMyGroups = async(req,res,next)=>{
    try{
        const userId = req.params.userId;
        let groups = await Conversations.find();
        const projectedGroups = groups.filter(group=>group.members.includes(userId)&& group.isGroup >=1).sort((a,b)=>(a.name.toLowerCase() > b.name.toLowerCase())?1:-1);
        if(!projectedGroups){
            return res.json({msg:"Haven't joined any group "})
        }
        logger.info(`Fetching groups from user: ${userId}`)
        res.send(projectedGroups)
    }catch(err){
        next(err)
    }
}

module.exports.deleteGroup =async (req,res,next)=>{
    
    try{
        const group = await Conversations.findOne({_id:req.params.groupid});
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        await group.remove();
        logger.info(`Group with id: ${group._id} has been deleted`)
        res.send({msg:"Group removed successfully", group, status:true});
    }catch(err){
        next(err)
    }
}

