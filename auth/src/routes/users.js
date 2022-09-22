const router =require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register',
async(req,res,next)=>{
  const {username, email} = req.body;
  try{ 
    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
      return res.status(401).json({msg: "Username already used", status: false});
    }
    const emailCheck = await User.findOne({email});
    if(emailCheck){
      return res.status(401).json({msg: "Email already used", status: false});
    }
    const newUser = new User(req.body);
    newUser.save()
    return res.status(201).json({
      msg: 'Register successful',
      status: true,
      user:req.user
    });   
  } catch (err) {
    res.status(500).json({msg:"An error ocurred", status:false,error: err});
  }  
})

router.post('/login',
async (req, res, next) => {
  passport.authenticate('login',
    async (err, user, info) => {
      try {
        if (err || !user) {
            return res.json(err)
          }
        req.login(
          user,
          { session: false },
          async (err) => {
            if (err) return next(err);

            const body = { _id: user._id, email: user.email, username:user.username };
            const token = "Bearer " + jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET);

            return res.status(200).json({user,token, msg: 'Logged in Successfully', status: true });
          }
        );
      } catch (err) {
        return next(err);
      }
    }
  )(req, res, next);
}
);

router.get('/logout', async (req, res) => {

    req.logout(function(err) {
        if (err) { return next(err); }
        next();
    })
})

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
      res.status(200).send(user);
    }catch(e){
      res.status(500).send(e)
    }
})


router.delete('/:id',passport.authenticate('jwt', { session: false }), async(req,res,next)=>{
  try{
    const user = await User.findOne({_id:req.params.id});
    await user.remove();
    if(!user){
      return res.status(404).send();
    }
  }catch(e){
    res.status(500).send(e)
  }
})


router.get('/profile', passport.authenticate('jwt', { session: false }), (req,res,next)=>{
  res.json(req.user)
})

router.get('/dashboard',passport.authenticate('jwt',{session:false}), (req,res,next)=>{
  res.json('Dashboard: ' + req.user.username)
})



module.exports = router;

