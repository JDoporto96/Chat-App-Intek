const router =require('express').Router();
const Profile = require('../models/profileModel');

router.post('/profiles', async (req,res,next)=>{
    try{
        // const userId = req.user._id;
        const {_id, username}= req.body;
        const userCheck= await Profile.findOne({_id});
        if(userCheck){
            return res.status(400).json({msg:"Profile already created", status: false});
        }
        const newProfile = new Profile(req.body);
        newProfile.save()
        return res.status(201).json({
            msg: 'Profile created successfully',
            status: true
        });   
    }catch (err) {
        res.status(500).json({msg:"An error ocurred", status:false,error: err});
    } 
})

router.get('/profiles/:id', async (req,res,next)=>{
    const _id = req.params.id;
    try{
        const profile = await Profile.findOne({_id});
        if(!profile){
            return res.json({msg:"No user found", status:false})
        }
        res.json(profile);

    }catch (err) {
        res.json({msg:"An error ocurred", status:false,error: err});
    }
})

router.patch('/profiles/:id',async (req,res,next)=>{
    const updates= Object.keys(req.body);
    const allowedUpdates =['status','profilePicture'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({msg: 'Invalid updates', status:false})
    }

    try{
        const profile = await Profile.findOne({_id:req.params.id});
        if(!profile){
            return res.status(404).send();
        }
        updates.forEach((update)=>profile[update]= req.body[update]);
        await profile.save();
        res.send(profile);
    }catch(e){
        res.status(400).send(e);
    }

})

router.delete('/profiles/:id', async(req,res,next)=>{
    try{
        const profile = await Profile.findOne({_id:req.params.id});
        await profile.remove();
        if(!profile){
            return res.status(404).send();
        }
        res.send(profile)
    }catch(e){
        res.stats(500).send(e)
    }

})

router.get('/profiles/:id/contacts', async(req,res)=>{
    try{
        const _id = req.params.id;
        const profile = await Profile.findOne({_id});
        if(!profile){
            return res.status(404).send("asaserror");
        }
        res.send(profile.contacts.filter(contact=>contact.status === "Accepted"))
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/profiles/:id/sendcontactrequest', async(req,res)=>{
    
    try{
        const contact = await Profile.findOne({_id:req.body._id})
        if(!contact){
            return res.status(404).send("User not found");
        }

        const profile = await Profile.findOne({_id:req.params.id});
        if(!profile){
            return res.status(404).send();
        }else if(profile.contacts.find(contact => contact._id === req.body._id)){
            return res.status(400).send("Contact already in your contact's list");
        }
        profile.contacts.push({_id:contact._id, username:contact.username, request:{from:profile._id,status: "Pending"}});
        await profile.save();

        contact.contacts.push({_id:profile._id, username:profile.username, request:{from:profile._id,status: "Pending"}});
        await contact.save();
        res.send(profile.contacts)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/profiles/:id/respondcontactrequest', async(req,res)=>{
    
    try{
        const contact = await Profile.findOne({_id:req.body._id})
        if(!contact){
            return res.status(404).send("User not found");
        }

        const profile = await Profile.findOne({_id:req.params.id});
        if(!profile){
            return res.status(404).send();
        }
        
        const request = {_id:contact._id, username:contact.username, request:{from:contact._id,status: "Pending"}}
        if(req.body.accepted){
            request.request.status = "Accepted"
        }else{
            request.request.status = "Rejected"
        }

        profile.contacts = profile.contacts.filter(contact => contact._id !== req.body._id);
        profile.contacts.push(request);
        await profile.save();

        request._id = profile._id;
        request.username = profile.username;
        contact.contacts = contact.contacts.filter(contact => contact._id !== profile._id);
        contact.contacts.push(request);
        await contact.save();
        
        res.send(profile.contacts)

    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/profiles/:id/deletecontact', async(req,res)=>{
    
    try{
        const contact = await Profile.findOne({_id:req.body._id});
        if(!contact){
            return res.status(404).send();
        }

        const profile = await Profile.findOne({_id:req.params.id});
        if(!profile){
            return res.status(404).send();
        }

        contact.contacts=contact.contacts.filter(item => item._id!==profile._id);
        await contact.save();

        profile.contacts=profile.contacts.filter(item => item._id!==contact._id);
        await profile.save();


        res.send(profile.contacts)
    }catch(e){
        res.status(500).send(e)
    }
})




module.exports = router;

