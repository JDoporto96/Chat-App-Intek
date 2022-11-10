const Conversations = require ('../model/conversationModel');
const logger = require('../utils/logger');

module.exports.createGroupConversation = async (req,res,next)=>{
    try{
        const {name,members,creator} = req.body;
        members.push(creator);
        const group = await Conversations.create({
            name,
            admins: [creator],
            members
        })
        if (group){
            logger.info(`New group created with id: ${group._id}`) 
            return res.json({ msg: "Group created successfully.", status:true });
        }
        else return res.json({ msg: "Failed to create group and add it to the database", status:false});
    }catch(err){
        next(err)
    }
}

module.exports.addMembers = async (req,res,next)=>{
    const {_id,newMembers} = req.body;
    try{
        const group = await Conversations.findOne({_id});
        if(!group){
            return res.json({msg: "Invalid group", status:false})
        }
        newMembers.forEach(member => {
            group.members.push(member)
        });
        await group.save();
        logger.info(`Group with id: ${group._id} has been updated`) 
        res.json({msg: "Members added succesfully", group})
        
    }catch(err){
        next(err)
    }
}

module.exports.removeMembers = async (req,res,next)=>{
    const {_id,members} = req.body;
    try{
        const group = await Conversations.findOne({_id});
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        members.forEach(member=>group.members.pull(member))
        await group.save();
        logger.info(`Group with id: ${group._id} has been updated`)
        res.json({msg: "Member removed succesfully", group})
        
    }catch(err){
        next(err)
    }
}
module.exports.addAdmins = async (req,res,next)=>{
    const {_id,newAdmins} = req.body;
    try{
        const group = await Conversations.findById(_id);
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        newAdmins.forEach(member => {
            group.admins.push(member)
        });
        await group.save();
        logger.info(`Group with id: ${group._id} has been updated`)
        res.json({msg: "Admins added succesfully", group})
        
    }catch(err){
        next(err)
    }
}
module.exports.removeAdmins = async (req,res,next)=>{
    const {_id,admins} = req.body;
    try{
        const group = await Conversations.findOne({_id});
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        // group.admins = group.admins.filter(element => element !== admin)
        admins.forEach(admin=> group.admins.pull(admin));
        await group.save();
        logger.info(`Group with id: ${group._id} has been updated`)
        res.json({msg: "Admin removed succesfully", group})
        
    }catch(err){
        next(err)
    }
}

module.exports.updateGroupName =async (req,res,next)=>{
    const {_id, newName} = req.body;
    try{
        const group = await Conversations.findOne({_id});
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        group.name = newName;
        await group.save();
        logger.info(`Group with id: ${group._id} has been updated`)
        res.send(group)

    }catch(err){
        next(err)
    }
}

module.exports.showMyGroups = async(req,res,next)=>{
    try{
        const userId = req.params.userId;
        let groups = await Conversations.find();
        const projectedGroups = groups.filter(group=>group.members.includes(userId)&& group.members.length >2).sort((a,b)=>(a.name > b.name)?1:-1);
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
        res.send({msg:"Group removed successfully", group});
    }catch(err){
        next(err)
    }
}

