const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/land', (req,res) =>{
    let id = req.body.id
    let errors = req.validationErrors()

    if (errors) {
        res.json({errors})
    } else {
        let lands = null
        User.getUserById(req.user._id, function (err, doc) {
            if (err) throw err
            doc.data.tax.land.pull(id)
            lands = doc.data.tax.land
            doc.save(err => {
                if(err) throw err
            })

            res.json({ status: true, lands })
        })

        
    }
})

router.post('/vehicle', (req, res) => {
    let id = req.body.id
    let errors = req.validationErrors()

    if (errors) {
        res.json({ errors })
    } else {
        let vehicles = null
        User.getUserById(req.user._id, function (err, doc) {
            if (err) throw err
            doc.data.tax.vehicle.pull(id)
            vehicles = doc.data.tax.vehicle
            doc.save(err => {
                if (err) throw err
            })
            res.json({ status: true, vehicles })
        })
        
    }
})

router.post('/expense', (req, res) => {
    let id = req.body.id
    let idt = req.body.idt

    let errors = req.validationErrors()

    if (errors) {
        res.json({ errors })
    } else {
        let expenses = null
        User.getUserById(req.user._id, function (err, doc) {
            if (err) throw err
            doc.data.expense.id(idt).items.pull(id)
            expenses = doc.data.expense
            doc.save(err => {
                if (err) throw err
            })
            res.json({ status: true, expenses })
        })

    }
})

router.post('/income', (req, res) => {
    let id = req.body.id
    let idt = req.body.idt

    let errors = req.validationErrors()

    if (errors) {
        res.json({ errors })
    } else {
        let incomes = null
        User.getUserById(req.user._id, function (err, doc) {
            if (err) throw err
            doc.data.income.id(idt).items.pull(id)
            incomes = doc.data.income
            doc.save(err => {
                if (err) throw err
            })
            res.json({ status: true, incomes })
        })

    }
})

module.exports = router