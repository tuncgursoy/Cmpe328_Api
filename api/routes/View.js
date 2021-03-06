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
router.get('/saved',function(req,res)
{
    res.render('saved');
});
router.get('/delete',function(req,res)
{
    res.render('saved');
});

router.get('/update',function(req,res)
{
    res.render('saved');
});

module.exports = router;