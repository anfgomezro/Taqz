const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/dashboard', (req,res) =>{
    res.json({name : req.user.first_name})
})

router.get('/properties', (req,res) => {

    let vehicles = null

    User.getUserById(req.user._id, function(err, user){
        vehicles = user.data.tax.vehicle
        res.json({properties : vehicles})
    })    
})

module.exports = router