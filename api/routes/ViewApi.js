const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');

const user = require('../models/user');

router.post('/tempcreate',(req,res,next)=>{
    const tempuser = new user({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name, 
        surname : req.body.surname,
        email : req.body.email
    });
    if(req.body.name===null||req.body.surname===null||req.body.email===null)
    {
        res.status(406).json({
            Error : 'Please fill every part of the user',
        });
    }else{
        const temp = {
            id: tempuser._id,
            name : tempuser.name, 
            surname :tempuser.surname,
            email : tempuser.email
            };
        res.status(200).render('saved',temp);
    }
});

router.post('/create',(req,res,next)=>{
    console.log(req.body);
    const tempuser = new user({
        _id: req.body.id || new mongoose.Types.ObjectId(),
        name : req.body.name, 
        surname : req.body.surname,
        email : req.body.email
    });
    tempuser.save().then(result =>{
        console.log(result); 
    }).catch(err => console.log(err));
    res.status(201).render('index');

})


module.exports = router;