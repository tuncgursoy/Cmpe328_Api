const express = require('express'); 
const router = express.Router();



router.get('/',function(req, res)
{
    res.render('index');
}); 
router.get('/create',function(req, res)
{
    res.render('create');
}); 
router.get('/read',function(req,res)
{
    res.redirect('/viewsapi/read');
});

module.exports = router;
