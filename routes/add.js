const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')
const User = require('../models/user')
const Tax = require('../models/taxes')

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

module.exports = router 