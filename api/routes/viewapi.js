//-----------------------------------------------------
// Title: Viewsapi
// Author: Tunç Gürsoy
// ID: 64528127274
// Section: 1
// Homework: 1
// Description: Html interface operation class 
//-----------------------------------------------------

const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');

const user = require('../models/user');

router.post('/tempcreate',(req,res,next)=>{
    
    const tempuser = new user({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name, 
        surname : req.body.surname,
        email : req.body.email,
        tc : req.body.tc,
    });
    if(req.body.name===null||req.body.surname===null||req.body.email===null)
    {
        res.status(406).render('Error',{
            Error : 'Please fill every part of the user',
            status: 406
        });
    }else{
        const temp = {
            id: tempuser._id,
            name : tempuser.name, 
            surname :tempuser.surname,
            email : tempuser.email,
            tc : tempuser.tc,
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
        email : req.body.email,
        tc : req.body.tc

    });
    tempuser.save().then(result =>{
        console.log(result); 
    }).catch(err => console.log(err));
    res.status(201).render('index');

});

router.get('/read',(req, res,next)=>
{
    user.find().lean().exec().then(docs =>{
        var result = {
            users: [],
            length: 0
        }
        for(var i =0 ;i<docs.length;i++)
        {
            result.users[i]= docs[i];
        }
        result.length=result.users.length;
        console.log(result);
        res.status(200).render('read',result);

      
    }).catch(err => {
        console.log(err); 
        res.status(500).render('Error',{
            error : err,
            status:500
        })
    });
}); 

router.get('/read/:id',(req, res,next)=>
{
    const id = req.params.id;
    user.findById(id).exec().then(doc =>
        {
            
            if(doc)
            {
                res.status(200).render('user',doc);
            }else
            {
                res.status(404).render('Error',{error : "No Valid Entry Found for This ID ",status:404});
            }
    
        }).catch(err => {
            console.log(err);
            res.status(500).render('Error',{
                error : err,
                status:500
            })
        });
}); 

router.get('/tempupdate/:id',(req,res,next)=>
{
    const id = req.params.id;
    user.findById(id).exec().then(doc=>{
        const id = req.params.id;
        user.findById(id).exec().then(doc =>
            {
                
                if(doc)
                {
                    res.status(200).render('getupdate',doc);
                }else
                {
                    res.status(404).render('Error',{error : "No Valid Entry Found for This ID ",status:404});
                }
        
            }).catch(err => {
                console.log(err);
                res.status(500).render('Error',{
                    error : err,
                    status:500
                })
            });
    })
});

router.post('/tempupdate/:id',(req,res,next)=>
{
    const tempuser = new user({
        _id: req.body.id,
        name : req.body.name, 
        surname : req.body.surname,
        email : req.body.email,
        tc : req.body.tc,
    });
    if(req.body.name===null||req.body.surname===null||req.body.email===null)
    {
        res.status(406).render('Error',{
            Error : 'Please fill every part of the user',
            status: 406
        });
    }else{
        const temp = {
            id: tempuser._id,
            name : tempuser.name, 
            surname :tempuser.surname,
            email : tempuser.email,
            tc : tempuser.tc,
            };
        res.status(200).render('update',temp);
    }
});


router.post('/update/:id',(req,res,next)=>{
    const tempuser = new user({
        _id: req.body.id,
        name : req.body.name, 
        surname : req.body.surname,
        email : req.body.email,
        tc : req.body.tc,
    });
    var result = {
        users: [],
    }
    console.log(tempuser);
    result.users[0]= tempuser;
    const id = req.params.id;
    user.update({_id:id},{$set: tempuser}).exec().then(result =>
        {
            console.log(result);
            res.status(200).redirect('/view');
        }).catch(err =>{
            console.log(err);
            res.status(500).render('Error',{
                error : err,
                status:500
            })
        });
});



router.patch('/update/:id',(req,res,next)=>{
    
    const id = req.params.id;
    console.log("patch entered");
    const updateArr = {}; 
    for(const ops of req.body)
    {
        updateArr[ops.propName]= ops.value ; 
    }
    user.update({_id:id},{$set: updateArr}).exec().then(result =>
        {
            console.log(result);
            res.status(200).redirect('/view');
        }).catch(err =>{
            console.log(err);
            res.status(500).render('Error',{
                error : err,
                status:500
            })
        });
});

router.put('/update/:id',(req,res,next)=>{
    
    const id = req.params.id;
    console.log("patch entered");
    const updateArr = {}; 
    for(const ops of req.body)
    {
        updateArr[ops.propName]= ops.value ; 
    }
    user.update({_id:id},{$set: updateArr}).exec().then(result =>
        {
            console.log(result);
            res.status(200).redirect('/view');
        }).catch(err =>{
            console.log(err);
            res.status(500).render('Error',{
                error : err,
                status:500
            })
        });
});
router.get('/delete/:id',(req,res,next)=>
{
    const id = req.params.id;
    user.findById(id).exec().then(doc =>
        {
            
            if(doc)
            {
                res.status(200).render('delete',doc);
            }else
            {
                res.status(404).render('Error',{error : "No Valid Entry Found for This ID ",status:404});
            }
    
        }).catch(err => {
            console.log(err);
            res.status(500).render('Error',{
                error : err,
                status:500
            })
        });  
})
router.delete('/delete/:id',(req, res, next) =>
{
    const id = req.params.id;
   user.remove({_id:id}).exec().then(result =>
    {
        res.status(200).redirect('/view');
    }).catch(err => {
        console.log(err);
        res.status(500).render('Error',{
            error : err,
            status:500
        })
    })
});

router.post('/delete/:id',(req, res, next) =>
{
    const id = req.params.id;
   user.remove({_id:id}).exec().then(result =>
    {
        res.status(200).redirect('/view');  
    }).catch(err => {
        console.log(err);
        res.status(500).render('Error',{
            error : err,
            status:500
        })
    })
});





module.exports = router;
