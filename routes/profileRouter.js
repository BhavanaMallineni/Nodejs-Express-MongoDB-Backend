const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Profiles = require('../models/profiles');
const authenticate = require('../authenticate');
const cors = require('./cors');
const profileRouter = express.Router();
profileRouter.use(bodyParser.json());
profileRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{
    res.sendStatus(200);
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res)=>{
    res.statusCode = 403;//operation not supported
    res.send('will not support put the profiles');
})
.get(cors.cors,(req,res,next)=>{
    Profiles.find(req.query)
    .then((profile)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(profile);
    },(err)=>next(err))
    .catch((err)=>next(err));
   
   
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Profiles.create(req.body)
    .then((profile)=>{
        console.log('Profile created',profile);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(profile);
    },(err)=>next(err))
    .catch((err)=>next(err));
   
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Profiles.remove({})
    .then((resp)=>{

        console.log('Profiles Deleted');
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
    
 });


profileRouter.route('/:profileId')
.options(cors.corsWithOptions,(req,res)=>{
    res.sendStatus(200);
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Profiles.findByIdAndUpdate(req.params.profileId,{
        $set: req.body
    },{new : true})
    .then((profile)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(profile);

    },(err)=>next(err))
    .catch((err)=>next(err));
})
.get(cors.cors,(req,res,next)=>{
  Profiles.findById(req.params.profileId)
  .then((profile)=>{
    console.log('Profile created',profile);
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(profile);
},(err)=>next(err))
.catch((err)=>next(err));
  
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
   res.statusCode = 403;//operation not supported
   res.send('will not support put the profiles'+req.params.profileId);
  
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
   Profiles.findByIdAndRemove(req.params.profileId)
   .then((resp)=>{
    
    console.log('Profiles Deleted');
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
},(err)=>next(err))
.catch((err)=>next(err));      
      
});

module.exports = profileRouter;