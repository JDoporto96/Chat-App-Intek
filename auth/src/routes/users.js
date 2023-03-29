const router =require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../utils/logger');
const validator = require('validator');


router.post('/register',
async(req,res,next)=>{
  const {username, email, password} = req.body;
  try{ 
    if(username.length > 100 || email.length > 100 || password.length > 100){
      logger.error(`Registration attempt failed. Err: Payload too large.`);
      return res.json({msg: "Payload too large. Try using shorter input fields", status: false});
    }
    const usernameLength = username.replaceAll(' ', '').length;

    if(usernameLength>15){
      logger.error(`Registration attempt failed. Err: Invalid username.`);
      return {status: false, msg:"Username should be shorter than 15 characters "}
    }
    if(usernameLength<3){
      logger.error(`Registration attempt failed. Err: Invalid username.`);
      return res.json({msg: "Username should be longer than 3 characters", status: false});
    }

    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
      logger.error(`Registration attempt failed. Err: Username already used.`);
      return res.json({msg: "Username already used", status: false});
    }
    const emailCheck = await User.findOne({email});
    if(emailCheck){
      logger.error(`Registration attempt failed. Err: Email already used.`);
      return res.json({msg: "Email already used", status: false});
    }

    if(!validator.isEmail(email)){
      logger.error(`Registration attempt failed. Err: Invalid email.`);
      return res.json({msg: "Invalid email", status: false});
    }

    if(password.includes(" ")){
      logger.error(`Registration attempt failed. Err: Invalid password.`);
      return {status: false, msg:"Password can't contain whitespace(' ') characters"}
    }
    if(!password || password.length<6){
      logger.error(`Registration attempt failed. Err: Invalid password.`);
      return {status: false, msg:"Password must contain at least 6 characters"}
    }

    if(password.toLowerCase().includes('password')){
      logger.error(`Registration attempt failed. Err: Invalid password.`);
      return res.json({msg: "Invalid password", status: false});}

    const newUser = new User(req.body);
    newUser.save()
    logger.info(`New user registered with id: ${newUser._id}`) 
    return res.status(201).json({
      user:newUser,
      msg: 'Register successfull',
      status: true
    });
      
  } catch (err) {
    logger.error(`Server error: ${err}`);
    return err
    
  }  
})

router.post('/login',
async (req, res, next) => {
  passport.authenticate('login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          logger.error(`Login error. Err: ${err.msg}`);
            return res.json({status:false, msg:err})
          }
        req.login(
          user,
          { session: false },
          async (err) => {
            if (err) return next(err);

            const body = { _id: user._id, email: user.email, username:user.username};
            const token = jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET);
            
            logger.info(`${user._id} has logged in`) 
            return res.status(200)
            .json({status:true, token, user});
          }
        );
      } catch (err) {
        logger.error(`Server error: ${err}`);
        return next(err);
      }
    }
  )(req, res, next);
}
);


//Protected Routes
router.patch('/:id',passport.authenticate('jwt', { session: false }), async(req,res,next)=>{
    const updates= Object.keys(req.body);
    const allowedUpdates =['username'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
      logger.error("User update failed. Err: Invalid updates");
      return res.status(400).send({error: 'Invalid updates'})
    }
    try{
      const user = await User.findOne({_id:req.params.id});
      if(!user){
        return res.json({status:false, msg:"User not found"})
      }
      updates.forEach((update)=>user[update]= req.body[update]);
      await user.save();
      logger.info(`${user._id} has made some changes on his data`);
      return res.status(200).send(user);
    }catch(err){
      logger.error(`Server error: ${err}`);
      return res.status(500).send(err)
    }
})


router.delete('/:id',passport.authenticate('jwt', { session: false }), async(req,res,next)=>{
  try{
    const user = await User.findOne({_id:req.params.id});
    logger.info(`${user._id} has been removed from the database`)
    await user.remove();
    if(!user){
      return res.json({status:false, msg:"User not found"})
    }
    res.status(200).send(user);
  }catch(err){
    logger.error(`Server error: ${err}`);
    return res.status(500).send(err)
  }
})


router.get('/authorize',passport.authenticate('jwt',{session:false}), async (req,res,next)=>{
  try{
    const user = await User.findById(req.user);
    return res.json(user);
  }catch(err){
    logger.error(`Server error: ${err}`);
    return res.json({error:err})
  }
})



module.exports = router;

