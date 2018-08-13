var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/users');
var router = express.Router();
const cors = require('./cors');
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json());
/* GET users listing. */
router.options('*',cors.corsWithOptions,(req,res)=>{res.sendStatus(200);});
router.get('/', cors.corsWithOptions,function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup',cors.corsWithOptions,(req,res,next)=>{
 User.register(new User({username: req.body.username}),req.body.password,(err,user)=>{
     if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err: err});
     }
     else{
       if(req.body.firstname)
       user.firstname = req.body.firstname;
       if(req.body.lastname)
       user.lastname = req.body.lastname;
       user.save((err,user)=>{
         if(err){
           res.statusCode=500;
           res.setHeader('Content-Type','application/json');
           res.json({err:err});
           return;
         }
        passport.authenticate('local')(req,res,()=>{
          res.statusCode =200;
          res.setHeader('Content-Type','application/json');
          res.json({success: true,status: ' Registration Succesful'});
         });
       });
    
     }
 });
});


router.post('/login',cors.corsWithOptions,(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
     if(err)
     return next(err);
     if(!user)
       {
        res.statusCode=401;
        res.setHeader('Content-Type','application/json');
        res.json({success: false,token: token,status: ' logged unsuccessful',err:info});
       }
       req.logIn(user,(err)=>{
         if(err){
          res.statusCode=401;
          res.setHeader('Content-Type','application/json');
          res.json({success: false,token: token,status: ' logged unsuccessful',err:'Could not login'});
         }
       
       var token = authenticate.getToken({_id: req.user._id}); 
       res.statusCode=200;
       res.setHeader('Content-Type','application/json');
       res.json({success: true,token: token,status: ' logged successful',token: token});
      });
      })(req,res,next); 
   
  var token = authenticate.getToken({_id: req.user._id});
  
  });

router.get('/logout',cors.corsWithOptions,(req,res)=>{
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})

router.get('/checkJWTToken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});
module.exports = router;