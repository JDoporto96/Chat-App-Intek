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
    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
      return res.json({msg: "Username already used", status: false});
    }

    const usernameLength = username.replaceAll(' ', '').length;
    if(usernameLength<3){
      return res.json({msg: "Invalid username", status: false});
    }

    const emailCheck = await User.findOne({email});
    if(emailCheck){
      return res.json({msg: "Email already used", status: false});
    }

    if(!validator.isEmail(email)){
      return res.json({msg: "Invalid email", status: false});
    }

    if(password.toLowerCase().includes('password')){
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
    logger.error(err);
    console.log(err);
    
  }  
})

router.post('/login',
async (req, res, next) => {
  passport.authenticate('login',
    async (err, user, info) => {
      try {
        if (err || !user) {
            return res.json({status:false, msg:err})
          }
        req.login(
          user,
          { session: false },
          async (err) => {
            if (err) return next(err);

            const body = { _id: user._id, email: user.email, username:user.username};
            const token = jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "1d"});
            
            logger.info(`${user._id} logged in`) 
            return res.status(200)
            // .cookie('chat-user-token', token, {maxAge: 86400000, httpOnly:false})
            .json({status:true, token, user});
          }
        );
      } catch (err) {
        logger.error(err);
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
      return res.status(400).send({error: 'Invalid updates'})
    }
    try{
      const user = await User.findOne({_id:req.params.id});
      if(!user){
        return res.status(404).send();
      }
      updates.forEach((update)=>user[update]= req.body[update]);
      await user.save();
      logger.info(`${user._id} has made some changes on his data`);
      res.status(200).send(user);
    }catch(err){
      logger.error(err);
      res.status(500).send(err)
    }
})


router.delete('/:id',passport.authenticate('jwt', { session: false }), async(req,res,next)=>{
  try{
    const user = await User.findOne({_id:req.params.id});
    logger.info(`${user._id} has been removed from the database`)
    await user.remove();
    if(!user){
      return res.status(404).send();
    }
    res.status(200).send(user);
  }catch(err){
    logger.error(err);
    res.status(500).send(err)
  }
})


router.get('/authorize',passport.authenticate('jwt',{session:false}), async (req,res,next)=>{
  try{
    const user = await User.findById(req.user);
    res.json(user);
  }catch(err){
    res.json({error:err})
  }
})



module.exports = router;

