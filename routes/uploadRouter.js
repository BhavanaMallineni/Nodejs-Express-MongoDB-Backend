const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('./cors');
const authenticate = require('../authenticate');
const storage = multer.diskStorage(
    {
        destination: (req,file,cb)=>{
             cb(null,'public/images')
        },
         filename:(req,file,cb)=>{
             cb(null,file.originalname);
         }
    }
);

const imageFileFilter = (req,file,cb)=>{
   if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
        {
             return cb(new Error('you can upload only image files'),false);

        }
        cb(null,true);
};

const upload = multer({storage: storage, fileFilter: imageFileFilter});


const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());
uploadRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{
    res.sendStatus(200);
})
.post(cors.corsWithOptions,authenticate.verifyUser,upload.single('imageFile'),(req,res)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json(req.file);
})
.get(cors.cors,authenticate.verifyUser,(req,res)=>{
    res.statusCode = 403;//operation not supported
    res.send('will not support get the imageupload');
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res)=>{
    res.statusCode = 403;//operation not supported
    res.send('will not support put the imageupload');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res)=>{
    res.statusCode = 403;//operation not supported
    res.send('will not support delete the imageupload');
});


module.exports = uploadRouter;