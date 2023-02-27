const router =require('express').Router();
const Profile = require('../models/profileModel');
const logger = require('../utils/logger');

router.post('/profiles', async (req,res,next)=>{
    try{
        
        const {_id}= req.body;
        const userCheck= await Profile.findOne({_id});
        if(userCheck){
            return res.status(400).json({msg:"Profile already created", status: false});
        }
        const newProfile = new Profile(req.body);
        newProfile.save()
        logger.info(`New profile created with id: ${_id}`) 
        return res.status(201).json(newProfile);   
    }catch (err) {
        logger.error(err);
        res.status(500).json({msg:"An error ocurred", status:false,error: err});
    } 
})

router.get('/profiles/:id', async (req,res,next)=>{
    const _id = req.params.id;
    try{
        const profile = await Profile.findOne({_id});
        if(!profile){
            logger.error("Profile requested not found");
            return res.json({msg:"No user found", status:false})
        }
        logger.info(`Fetching profile with id: ${_id}`) 
        res.json(profile);

    }catch (err) {
        logger.error(err);
        res.json({msg:"An error ocurred", status:false,error: err});
    }
})


router.patch('/profiles/:id',async (req,res,next)=>{
    const updates= Object.keys(req.body);
    const allowedUpdates =['status','profilePicture'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({msg: 'Invalid updates', status:false})
    }

    try{
        const profile = await Profile.findOne({_id:req.params.id});
        if(!profile){
            logger.error("Profile requested not found");
            return res.status(404).send();
        }
        updates.forEach((update)=>profile[update]= req.body[update]);
        await profile.save();
        logger.info(`Profile updated with id: ${profile._id}`)
        res.send(profile);
    }catch(e){
        logger.error(err);
        res.status(400).json(e);
    }

})

router.delete('/profiles/:id', async(req,res,next)=>{
    try{
        const profile = await Profile.findOne({_id:req.params.id});
        if(!profile){
            return res.status(404).send();
        }
        await profile.remove();
        logger.info(`Profile with id: ${profile._id} has been deleted`)
        res.send(profile)
    }catch(e){
        logger.error(err);
        res.stats(500).send(e)
    }

})

router.get('/profiles/:id/contacts', async(req,res)=>{
    try{
        const _id = req.params.id;
        const profile = await Profile.findOne({_id});
        if(!profile){
            logger.error("Unable to find user");
            return res.status(404).send("Unable to find user");
        
        }
        const contacts = profile.contacts.filter(contact=>contact.request.status === "Accepted");
        logger.info(`Fetcing contacts from id: ${profile._id}`)
        res.json(contacts.sort((a,b)=>(a.username.toLowerCase() > b.username.toLowerCase())?1:-1));

    }catch(e){
        logger.error(err);
        res.status(500).json(e)
    }
})

router.get('/profiles/:id/requests', async(req,res)=>{
    try{
        const _id = req.params.id;
        const profile = await Profile.findOne({_id});
        if(!profile){
            logger.error("Unable to find user");
            return res.status(404).send("Unable to find user");
        }
        const requests = profile.contacts.filter(contact=>(contact.request.status === "Pending" && contact.request.from !== profile._id));
        const projectedRequests = requests.map(contact=>{return{
            _id:contact._id,
            username:contact.username,
            status: contact.request.status
            }})
            logger.info(`Fetcing contact requests from id: ${profile._id}`)
        res.send(projectedRequests);

    }catch(e){
        logger.error(e);
        res.status(500).send(e)
    }
})


router.post('/profiles/:id/sendcontactrequest', async(req,res)=>{
    
    try{
        const contact = await Profile.findOne({username:req.body.username})

        if(!contact){
            logger.error("Unable to find receiver");
            return res.json({msg:"User not found", status:false});
        }

        const profile = await Profile.findOne({_id:req.params.id});
        if(!profile){
            logger.error("Unable to find sender");
            return res.json({msg:"You are not in db", status:false});
        }
        let checkReq = profile.contacts.find(user => user._id === contact._id);
        if(checkReq){

        
            if(checkReq.request.status == 'Accepted'){
                
                logger.error("Contacts already in list");
                return res.json({msg:"Contact already in your contact's list", status:false});

            }else if(checkReq.request.status == 'Pending'){

                logger.error("Request is pending");
                return res.json({msg:"You have a pending request with this user", status:false});

            }
        }
        profile.contacts.push({_id:contact._id, username:contact.username, request:{from:profile._id,status: "Pending"}});
        await profile.save();

        contact.contacts.push({_id:profile._id, username:profile.username, request:{from:profile._id,status: "Pending"}});
        await contact.save();
        logger.info(`Requests from ${profile._id} sent to ${contact._id} `)
        res.json({msg:"Request sent sucessfully", status:true})
    }catch(e){
        logger.error(e);
        res.status(500).json(e)
    }
})

router.post('/profiles/:id/respondcontactrequest', async(req,res)=>{
    
    try{
        const contact = await Profile.findOne({_id:req.body._id})
        if(!contact){
            return res.status(404).send({msg:"User not found", status:false});
        }

        const profile = await Profile.findOne({_id:req.params.id});
        if(!profile){
            return res.status(404).send({msg:"User not found", status:false});
        }
        
        const request = {_id:contact._id, username:contact.username, request:{from:contact._id,status: "Pending"}}
        if(req.body.accepted){
            request.request.status = "Accepted";
            profile.contacts = profile.contacts.filter(contact => contact._id !== req.body._id);
            profile.contacts.push(request);
            await profile.save();

            request._id = profile._id;
            request.username = profile.username;
            contact.contacts = contact.contacts.filter(contact => contact._id !== profile._id);
            contact.contacts.push(request);
            await contact.save();

            logger.info(`Requests from ${profile._id} responded `)
            res.send({msg:"Request accepted sucessfully", status:true})

        }else{
            profile.contacts = profile.contacts.filter(contact => contact._id !== req.body._id);
            await profile.save();
            contact.contacts = contact.contacts.filter(contact => contact._id !== profile._id);
            await contact.save();

            logger.info(`Requests from ${profile._id} responded `)
            res.send({msg:"Request rejected sucessfully", status:true})
        }

    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/profiles/:id/deletecontact', async(req,res)=>{
    
    try{
        
        const contact = await Profile.findOne({_id:req.body._id});
        if(!contact){
            return res.send({msg:"User not found", status:false})
        }

        const profile = await Profile.findOne({_id:req.params.id});
        if(!profile){
            return res.send({msg:"Invalid user request", status:false})
        }

        contact.contacts=contact.contacts.filter(item => item._id!==profile._id);
        await contact.save();

        profile.contacts=profile.contacts.filter(item => item._id!==contact._id);
        await profile.save();


        return res.send({msg:"You've lost a friend", status:true})
    }catch(e){
        return res.status(500).send(e)
    }
})




module.exports = router;

