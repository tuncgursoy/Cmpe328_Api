//-----------------------------------------------------
// Title: root
// Author: Tunç Gürsoy
// ID: 64528127274
// Section: 1
// Homework: 1
// Description: Directory of the connection checks
//-----------------------------------------------------


const express = require('express'); 
const router = express.Router();



router.get('/',(req,res,next)=>{

    res.status(200).json({
        message : "Connection Established",
        
    })
});

module.exports = router;