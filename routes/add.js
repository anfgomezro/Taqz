const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')
const User = require('../models/user')
const Tax = require('../models/taxes')
const Land = require('../models/land')

router.post('/car', (req,res) => {
    let brand = req.body.brand
    let kind = req.body.kind
    let line = req.body.line
    let engine = req.body.engine

    let errors = req.validationErrors()

    if(errors){
        res.send('Fatal')
    } else {

        let newVehicle = new Vehicle({
            class : kind,
            brand : brand,
            line : line,
            cilinder : engine
        })

        User.updateUser(req.user._id, function(err, doc){
            if (err) throw err
            doc.data.tax.vehicle.push(newVehicle)
            doc.save((err) => {
                if(err) throw err
            })
        })

        res.send('fine')
    }
})

router.post('/land', (req,res) => {
    let valuation = req.body.valuation
    let bill = req.body.bill
    let name = req.body.name

    let errors = req.validationErrors()

    if(errors){
        res.send('error land added')
    } else {
        let newLand = new Land({
            value : valuation,
            bill : (bill == 'on') ? true : false,
            name : name
        })

        User.updateUser(req.user._id, function(err, doc){
            if(err) throw err
            doc.data.tax.land.push(newLand)
            doc.save( err => {
                if(err) throw err
            })
        })

        res.send('added land')
    }
})

module.exports = router 