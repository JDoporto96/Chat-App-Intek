const router =require('express').Router();
const Profile = require('../models/profileModel');
const logger = require('../utils/logger');

router.post('/', async (req,res,next)=>{
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

router.get('/:id', async (req,res,next)=>{
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


router.patch('/:id',async (req,res,next)=>{
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

router.delete('/:id', async(req,res,next)=>{
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




module.exports = router;

