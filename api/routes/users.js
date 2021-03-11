const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');

const user = require('../models/user');

router.get('/',(req,res,next)=>{

    user.find().exec().then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err); 
        res.status(500).json({
            error : err
        })
    });
});

router.post('/', (req,res,next)=>{
    const tempuser = new user({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name, 
        surname : req.body.surname,
        email : req.body.email,
        tc: req.body.tc
    });
    if(req.body.name===null||req.body.surname===null||req.body.email===null)
    {
        res.status(406).json({
            Error : 'Please fill every part of the user',
        });
    }else{

        
        tempuser.save().then(result =>{
            console.log(result); 
        }).catch(err => console.log(err));
        res.status(201).json({
            message : 'This user saved',
            savedUser : tempuser
        });
    }
});

router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    user.findById(id).exec().then(doc =>
        {
            console.log("entered ",id);
            console.log("From Database",doc);
            if(doc)
            {
                res.status(200).json(doc);
            }else
            {
                res.status(404).json({message : "No Valid Entry Found for This ID "});
            }
    
        }).catch(err => {
            console.log(err);
            res.status(500).json({message : "No Valid Entry Found for This ID "})
        });
});

router.patch('/:id',(req, res, next) =>
{
    const id = req.params.id;
    const updateArr = {}; 
    for(const ops of req.body)
    {
        updateArr[ops.propName]= ops.value ; 
    }
    user.update({_id:id},{$set: updateArr}).exec().then(result =>
        {
            console.log(result);
            res.status(200).json(result);
        }).catch(err =>{
            console.log(err);
            res.status(500).json({
                error :err
            });
        });
});

router.put('/:id',(req, res, next) =>
{
    const id = req.params.id;
    const updateArr = {}; 
    for(const ops of req.body)
    {
        updateArr[ops.propName]= ops.value ; 
    }
    user.update({_id:id},{$set: updateArr}).exec().then(result =>
        {
            console.log(result);
            res.status(200).json(result);
        }).catch(err =>{
            console.log(err);
            res.status(500).json({
                error :err
            });
        });
});

router.delete('/:id',(req, res, next) =>
{
    const id = req.params.id;
   user.remove({_id:id}).exec().then(result =>
    {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
});

module.exports = router;