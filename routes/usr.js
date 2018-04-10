const express = require('express')
const router = express.Router()

router.get('/',function(req,res,next){
    res.send('Someoensdafasdf')
})

router.get('/profile',function(req,res,next){
    res.send(req.user)
})

router.get('/test',(req,res) =>{
    res.json({'test':'fine'})
})

router.get('/dashboard', (req,res) =>{
    res.json({name : req.user.first_name})
})

module.exports = router