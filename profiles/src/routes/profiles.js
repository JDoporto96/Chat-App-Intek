const router =require('express').Router();
const Profile = require('../models/profile');

router.post('/profiles', async (req,res,next)=>{
    try{
        const {username }= req.body;
        const userCheck= await Profile.findOne({username});
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

router.get('/profiles/:username', async (req,res,next)=>{
    const username = req.params.username;
    try{
        const profile = await Profile.findOne({username});
        if(!username){
            return res.json({msg:"No user found", status:false})
        }
        res.json(profile);

    }catch (err) {
        res.json({msg:"An error ocurred", status:false,error: err});
    }
})

router.patch('/profiles/:username',async (req,res,next)=>{
    const updates= Object.keys(req.body);
    const allowedUpdates =['status','profilePicture', 'contacts'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({msg: 'Invalid updates', status:false})
    }

    try{
        const profile = await Profile.findOne({username:req.params.username});
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

router.delete('/profiles/:username', async(req,res,next)=>{
    try{
        const profile = await Profile.findOne({username:req.paams.username});
        await profile.remove();
        if(!profile){
            return res.status(404).send();
        }
        res.send(profile)
    }catch(e){
        res.stats(500).send(e)
    }

})




module.exports = router;

