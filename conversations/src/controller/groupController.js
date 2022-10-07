const Groups = require ('../model/groupModel');

module.exports.createGroup = async (req,res,next)=>{
    try{
        const {groupName,members,creator} = req.body;
        const group = await Groups.create({
            groupName,
            admins: [creator],
            members
        })
        if (group) return res.json({ msg: "Group created successfully." });
        else return res.json({ msg: "Failed to creatge group and add it to the database", data: group });
    }catch(err){
        next(err)
    }
}

module.exports.addMembers = async (req,res,next)=>{
    const {_id,newMembers} = req.body;
    try{
        const group = await Groups.findOne({_id});
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        newMembers.forEach(member => {
            group.members.push(member)
        });
        group.save();
        res.json({msg: "Members added succesfully", group})
        
    }catch(err){
        next(err)
    }
}

module.exports.removeMember = async (req,res,next)=>{
    const {_id,member} = req.body;
    try{
        const group = await Groups.findOne({_id});
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        group.members = group.members.filter(element => element !== member)
        group.save();

        res.json({msg: "Member removed succesfully", group})
        
    }catch(err){
        next(err)
    }
}
module.exports.addAdmins = async (req,res,next)=>{
    const {_id,newAdmins} = req.body;
    try{
        const group = await Groups.findById(_id);
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        newAdmins.forEach(member => {
            group.admins.push(member)
        });
        group.save();
        res.json({msg: "Admins added succesfully", group})
        
    }catch(err){
        next(err)
    }
}
module.exports.removeAdmin = async (req,res,next)=>{
    const {_id,admin} = req.body;
    try{
        const group = await Groups.findOne({_id});
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        group.admins = group.admins.filter(element => element !== admin)
        group.save();

        res.json({msg: "Admin removed succesfully", group})
        
    }catch(err){
        next(err)
    }
}

module.exports.updateGroupName =async (req,res,next)=>{
    const {_id, newName} = req.body;
    try{
        const group = await Groups.findOne({_id});
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        group.groupName = newName;
        await group.save();
        res.send(group)

    }catch(err){
        next(err)
    }
}

module.exports.showMyGroups = async(req,res,next)=>{
    try{
        const userId = req.body.userId;
        let groups = await Groups.find();
        groups = groups.filter(group=>group.members.includes(userId));
        if(!groups){
            return res.json({msg:"Haven't joined any group "})
        }
        const projectedGroups = groups.map(group => {
            return {
                _id: group._id, 
                name: group.groupName,
                isGroup:true,
                members: group.members
            }
        })
        res.send(projectedGroups)
    }catch(err){
        next(err)
    }
}

module.exports.deleteGroup =async (req,res,next)=>{
    
    try{
        const group = await Groups.findOne({_id:req.params.groupid});
        if(!group){
            return res.json({msg: "Invalid group"})
        }
        await group.remove();
        res.send({msg:"Group removed successfully", group});
    }catch(err){
        next(err)
    }
}

