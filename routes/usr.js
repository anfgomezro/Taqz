const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/dashboard', (req,res) =>{
    res.json({name : req.user.first_name})
})

router.get('/properties', (req,res) => {
    let vehicles = null
    let lands = null
    User.getUserById(req.user._id, function(err, user){
        vehicles = user.data.tax.vehicle
        lands = user.data.tax.land
        res.json({properties : {
            vehicles,
            lands
        }})
    })    
})

router.get('/incomes', (req,res) =>{
    let incomes = null
    User.getUserById(req.user._id, function(err, user){
        incomes = user.data.income
        res.json({incomes})
    })
})

router.get('/expenses', (req, res) => {
    let expenses = null
    User.getUserById(req.user._id, function (err, user) {
        expenses = user.data.expense
        res.json({ expenses })
    })
})

module.exports = router