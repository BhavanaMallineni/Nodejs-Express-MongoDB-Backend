const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const Users = require('../models/users');

const userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.route('/')
.put((req,res)=>{
    res.statusCode = 403;//operation not supported
    res.send('will not support put the profiles');
})
.get((req,res,next)=>{
    Users.find({})
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    },(err)=>next(err))
    .catch((err)=>next(err));
   
   
})
.post((req,res,next)=>{
    Users.create(req.body)
    .then((user)=>{
        console.log('User created',user);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(user);
    },(err)=>next(err))
    .catch((err)=>next(err));
   
})
.delete((req,res,next)=>{
    Users.remove({})
    .then((resp)=>{

        console.log('Users Deleted');
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
    
 });




module.exports = userRouter;